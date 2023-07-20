package com.buyte.member.service;

import com.buyte.exception.BusinessLogicException;
import com.buyte.exception.ExceptionCode;
import com.buyte.member.auth.jwt.JwtTokenizer;
import com.buyte.member.dto.MemberDto;
import com.buyte.member.entity.Member;
import com.buyte.member.mapper.MemberMapper;
import com.buyte.member.repository.MemberRepository;
import com.buyte.order.entity.Orders;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberServiceImpl implements MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenizer jwtTokenizer;
    private final MemberMapper mapper;

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
        String tokenStatus = (String) redisTemplate.opsForValue().get(refreshToken);

        if(tokenStatus == null) {
            response.setStatus(403);
            throw new BusinessLogicException(ExceptionCode.INVALID_REFRESH_TOKEN_STATE);
        }
        else if (tokenStatus.equals("login")) {
            String accessToken = jwtTokenizer.delegateAccessToken(memberRepository.findById(Long.parseLong(memberId)).orElseThrow());
            response.setHeader("Authorization", "Bearer " + accessToken);
        } else {
            response.setStatus(403);
            throw new BusinessLogicException(ExceptionCode.INVALID_REFRESH_TOKEN_STATE);
        }
        return response;
    }

    @Override
    public void logout(HttpServletRequest request) {
        String accessToken = request.getHeader("Authorization").replace("Bearer ", "");
        String refreshToken = getCookieValue(request, "RefreshToken");

        RedisTemplate<Object, Object> redisTemplate = jwtTokenizer.getRedisTemplate();
        redisTemplate.opsForValue().set(accessToken, "logout", 5, TimeUnit.MINUTES);
        redisTemplate.opsForValue().set(refreshToken, "logout", 300, TimeUnit.MINUTES);
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

    @Override
    public MemberDto.OrderResponse getOrderDetails(long memberId, int page, int size) {
        Member findMember = findVerifiedMember(memberId);
        List<Orders> orders = findMember.getOrderList();
        MemberDto.OrderResponse response = mapper.ordersToOrderResponse(orders, page, size);
        return response;
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
