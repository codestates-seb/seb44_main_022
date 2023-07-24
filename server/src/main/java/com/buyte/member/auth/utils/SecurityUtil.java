package com.buyte.member.auth.utils;

import com.buyte.exception.BusinessLogicException;
import com.buyte.exception.ExceptionCode;
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
            throw new BusinessLogicException(ExceptionCode.ACCESS_TOKEN_EXPIRED);
        }
    }
}
