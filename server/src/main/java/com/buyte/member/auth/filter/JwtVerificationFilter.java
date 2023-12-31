package com.buyte.member.auth.filter;

import com.buyte.exception.BusinessLogicException;
import com.buyte.exception.ExceptionCode;
import com.buyte.member.auth.utils.JwtUtils;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
public class JwtVerificationFilter extends OncePerRequestFilter {
    private final JwtUtils jwtUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        try {
            jwtUtils.checkLogout(request);
            Jws<Claims> claims = jwtUtils.verifyJws(request);
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
        Long memberId = claims.getBody().get("memberId", Long.class);
        Object memberRole = claims.getBody().get("memberRole");
        List<GrantedAuthority> authority = jwtUtils.createAuthorities(memberRole);
        Authentication authentication = new UsernamePasswordAuthenticationToken(memberId, null, authority);
        log.info("# authority: {}", Arrays.toString(authority.toArray()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}