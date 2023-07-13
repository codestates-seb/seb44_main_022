package com.buyte.member.service;

import com.buyte.exception.BusinessLogicException;
import com.buyte.exception.ExceptionCode;
import com.buyte.member.auth.jwt.JwtTokenizer;
import com.buyte.member.entity.Member;
import com.buyte.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberServiceImpl implements MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenizer jwtTokenizer;

    @Override
    public Member createMember(Member member) {
        Member findMember = memberRepository.findByLoginId(member.getLoginId());
        Member.checkExistLoginId(findMember);

        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        member.setMemberType(Member.MemberType.BASIC);
        member.setMemberRole(Member.MemberRole.CUSTOMER);

        return memberRepository.save(member);
    }

    @Override
    public HttpServletResponse checkRefreshAndReIssueAccess(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = getCookieValue(request, "RefreshToken");
        String memberId = jwtTokenizer.getMemberIdFromRefreshToken(refreshToken);

        RedisTemplate<Object, Object> redisTemplate = jwtTokenizer.getRedisTemplate();
        String findRefreshToken = (String) redisTemplate.opsForValue().get(memberId);

        if (findRefreshToken.equals(refreshToken)) {
            String accessToken = jwtTokenizer.delegateAccessToken(memberRepository.findById(Long.parseLong(memberId)).orElseThrow());
            response.setHeader("Authorization", "Bearer " + accessToken);
        } else {
            throw new BusinessLogicException(ExceptionCode.INVALID_REFRESH_TOKEN_STATE);
        }
        return response;
    }

    @Override
    public void logout(HttpServletRequest request) {
        String accessToken = request.getHeader("Authorization").replace("Bearer ", "");
        String refreshToken = getCookieValue(request, "RefreshToken");
        String memberId = jwtTokenizer.getMemberIdFromRefreshToken(refreshToken);

        RedisTemplate<Object, Object> redisTemplate = jwtTokenizer.getRedisTemplate();
        redisTemplate.opsForValue().set(accessToken, "logout", 5, TimeUnit.MINUTES);
        redisTemplate.opsForValue().set(memberId, "logout", 300, TimeUnit.MINUTES);
    }

    @Override
    public Member getMemberDetails(long memberId) {
        Member member = findVerifiedMember(memberId);
        return member;
    }

    @Override
    public Member updateMember(Member member) {
        Member findMember = findVerifiedMember(member.getMemberId());
        Optional.ofNullable(member.getPassword())
                .ifPresent(password -> findMember.setPassword(passwordEncoder.encode(password)));
        Optional.ofNullable(member.getMemberName())
                .ifPresent(memberName -> findMember.setMemberName(memberName));

        return memberRepository.save(findMember);
    }

    private Member findVerifiedMember(long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return member;
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
}
