package com.buyte.member.auth.filter;

import com.buyte.exception.BusinessLogicException;
import com.buyte.exception.ExceptionCode;
import com.buyte.member.auth.jwt.JwtTokenizer;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.ObjectUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class JwtVerificationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;

    public JwtVerificationFilter(JwtTokenizer jwtTokenizer) {
        this.jwtTokenizer = jwtTokenizer;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        try {
            checkLogout(request);
            Jws<Claims> claims = verifyJws(request);
            setAuthenticationToContext(claims);
        } catch (SignatureException se) {
            log.info("Exception, {}", se.getMessage());
            BusinessLogicException be = new BusinessLogicException(ExceptionCode.INVALID_ACCESS_TOKEN_STATE);
            request.setAttribute("exception", be);
        } catch (ExpiredJwtException ee) {
            log.info("ExpiredJwtException: {}", ee.getMessage());
            BusinessLogicException be = new BusinessLogicException(ExceptionCode.ACCESS_TOKEN_EXPIRED);
            request.setAttribute("exception", be);
        } catch (Exception e) {
            log.info("Exception, {}", e.getMessage());
            request.setAttribute("exception", e);
        }

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authorization = request.getHeader("Authorization");

        return authorization == null || !authorization.startsWith("Bearer");
    }

    private void setAuthenticationToContext(Jws<Claims> claims) {
        String loginId = (String) claims.getBody().get("loginId");
        Authentication authentication = new UsernamePasswordAuthenticationToken(loginId, null, null);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    private Jws<Claims> verifyJws(HttpServletRequest request) {
        String jws = request.getHeader("Authorization").replace("Bearer", "");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Jws<Claims> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey);
        return claims;
    }

    private void checkLogout(HttpServletRequest request) {
        String accessToken = jwtTokenizer.getAccessToken(request);
        RedisTemplate redisTemplate = jwtTokenizer.getRedisTemplate();

        String isLogout = (String) redisTemplate.opsForValue().get(accessToken);
        // accessToken의 로그아웃 여부 확인. 값 없으면 다음 단계로 넘어가고 있으면 로그아웃상태이므로 오류발생
        if (!ObjectUtils.isEmpty(isLogout)) throw new BusinessLogicException(ExceptionCode.LOGOUT);
    }
}