package com.buyte.member.service;

import com.buyte.exception.BusinessLogicException;
import com.buyte.exception.ExceptionCode;
import com.buyte.member.auth.jwt.JwtTokenizer;
import com.buyte.member.entity.Member;
import com.buyte.member.repository.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.concurrent.TimeUnit;

@Transactional
@Service
@Slf4j
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenizer jwtTokenizer;

    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder, JwtTokenizer jwtTokenizer) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenizer = jwtTokenizer;
    }

    public Member createMember(Member member){
        Member findMember = memberRepository.findByLoginId(member.getLoginId());
        Member.checkExistLoginId(findMember);

        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        // 회원가입 경로 설정(현재는 자체 로그인으로 고정. OAuth2 적용되면 편집)
        member.setMemberType(Member.MemberType.BASIC);

        // role 설정(현재는 Customer로 고정. 고객/관리자 기능 추가되면 편집)
        member.setMemberRole(Member.MemberRole.CUSTOMER);

        return memberRepository.save(member);
    }

    public HttpServletResponse checkRefreshAndReIssueAccess(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = getCookieValue(request, "RefreshToken");
        String memberId = jwtTokenizer.getMemberIdFromRefreshToken(refreshToken);

        RedisTemplate redisTemplate = jwtTokenizer.getRedisTemplate();
        String findRefreshToken = (String) redisTemplate.opsForValue().get(memberId);

        if (findRefreshToken.equals(refreshToken)) {
            String accessToken = jwtTokenizer.delegateAccessToken(memberRepository.findById(Long.parseLong(memberId)).orElseThrow());
            response.setHeader("Authorization", "Bearer " + accessToken);
        } else {
            throw new BusinessLogicException(ExceptionCode.INVALID_REFRESH_TOKEN_STATE);
        }
        return response;
    }

    public static String getCookieValue(HttpServletRequest request, String cookieName) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals(cookieName)) {
                    return cookie.getValue();
                }
            }
        } else throw new BusinessLogicException(ExceptionCode.NO_COOKIE);
        return null;
    }

    public void logout(HttpServletRequest request) {
        String accessToken = request.getHeader("Authorization");
        String refreshToken = getCookieValue(request, "RefreshToken");
        String memberId = jwtTokenizer.getMemberIdFromRefreshToken(refreshToken);

        // Redis에 accessToken 사용 못하도록 블랙리스트 등록
        RedisTemplate redisTemplate = jwtTokenizer.getRedisTemplate();
        redisTemplate.opsForValue().set(accessToken, "logout", 5, TimeUnit.MINUTES);
        redisTemplate.opsForValue().set(memberId, "logout", 300, TimeUnit.MINUTES);
    }
}
