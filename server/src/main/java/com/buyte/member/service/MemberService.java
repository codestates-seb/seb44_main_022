package com.buyte.member.service;

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

    public HttpServletResponse checkRefreshAndReIssueAccess(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String refreshToken = getCookieValue(request, "RefreshToken");
        String memberId = jwtTokenizer.getMemberIdFromRefreshToken(refreshToken);

        RedisTemplate redisTemplate = jwtTokenizer.getRedisTemplate();
        String findRefreshToken = (String) redisTemplate.opsForValue().get(memberId);

        if (findRefreshToken.equals(refreshToken)) {
            String accessToken = jwtTokenizer.delegateAccessToken(memberRepository.findById(Long.parseLong(memberId)).orElseThrow());
            response.setHeader("Authorization", "Bearer " + accessToken);
        } else {
            throw new Exception("인증되지 않았습니다. 다시 로그인하세요.");
        }
        return response;
    }

    public static String getCookieValue(HttpServletRequest request, String cookieName) throws Exception {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals(cookieName)) {
                    return cookie.getValue();
                }
            }
        } else throw new Exception("쿠키가 없습니다.");
        return null;
    }
}
