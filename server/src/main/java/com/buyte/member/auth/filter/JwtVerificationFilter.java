package com.buyte.member.auth.filter;

import com.buyte.member.auth.jwt.JwtTokenizer;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
            Jws<Claims> claims = verifyJws(request);
            setAuthenticationToContext(claims);
        } catch (SignatureException se) {
            log.info("Exception, {}", se.getMessage());
            request.setAttribute("exception", se);
        } catch (ExpiredJwtException ee) {
            log.info("ExpiredJwtException: {}", ee.getMessage());
            request.setAttribute("exception", ee);
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
}