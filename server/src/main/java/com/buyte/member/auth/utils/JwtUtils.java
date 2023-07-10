package com.buyte.member.auth.utils;

import com.buyte.exception.BusinessLogicException;
import com.buyte.exception.ExceptionCode;
import com.buyte.member.auth.jwt.JwtTokenizer;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.util.ObjectUtils;

import javax.servlet.http.HttpServletRequest;

public class JwtUtils {

    private final JwtTokenizer jwtTokenizer;

    public JwtUtils(JwtTokenizer jwtTokenizer) {
        this.jwtTokenizer = jwtTokenizer;
    }

    public void checkLogout(HttpServletRequest request) {
        String accessToken = getAccessTokenFromRequest(request);
        RedisTemplate redisTemplate = jwtTokenizer.getRedisTemplate();

        String isLogout = (String) redisTemplate.opsForValue().get(accessToken);

        if (!ObjectUtils.isEmpty(isLogout)) throw new BusinessLogicException(ExceptionCode.LOGOUT);
    }

    public Jws<Claims> verifyJws(HttpServletRequest request) {
        String jws = getAccessTokenFromRequest(request);
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Jws<Claims> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey);
        return claims;
    }

    public String getAccessTokenFromRequest(HttpServletRequest request) {
        String accessToken = request.getHeader("Authorization").replace("Bearer ", "");

        return accessToken;
    }
}
