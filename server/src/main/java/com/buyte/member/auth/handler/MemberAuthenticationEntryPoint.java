package com.buyte.member.auth.handler;

import com.buyte.member.auth.utils.ErrorResponder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
public class MemberAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        log.error("# Unauthorized error happened: {}", request.getAttribute("exception"));

        Exception exception = (Exception) request.getAttribute("exception");
        if(exception == null) ErrorResponder.sendErrorResponse(response, HttpStatus.UNAUTHORIZED);
        else ErrorResponder.sendErrorResponse(response, HttpStatus.UNAUTHORIZED, exception.getClass().getSimpleName());
    }
}
