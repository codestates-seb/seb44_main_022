package com.buyte.member.auth.utils;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtil {
    public static Long getLoginMemberId() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Object principal = authentication.getPrincipal();
            return (Long) principal;
        }
        catch (ClassCastException e) {
            throw new IllegalArgumentException("잘못된 토큰 정보입니다.");
        }
    }
}
