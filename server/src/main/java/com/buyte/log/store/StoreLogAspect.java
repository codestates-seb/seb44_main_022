package com.buyte.log.store;

import java.util.stream.IntStream;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class StoreLogAspect {

    private static final Logger log = LoggerFactory.getLogger(StoreLogAspect.class);

    @Pointcut("within(com.buyte.store.controller.*) && execution(@org.springframework.web.bind.annotation.GetMapping * *(..))")
    public void getRequests() {
    }

    @Before("getRequests()")
    public void beforeControllerRequest(JoinPoint joinPoint) {
        MethodSignature methodSignature = (MethodSignature) joinPoint.getSignature();
        String[] parameterNames = methodSignature.getParameterNames();

        log.info("### INFO Start request {}", joinPoint.getSignature().toShortString());

        Object[] args = joinPoint.getArgs();
        IntStream.range(0, args.length)
            .forEach(i -> {
                Object arg = args[i];
                String paramName = parameterNames[i];
                log.info("### INFO Param: {} = {}", paramName, arg);
            });
    }

    @AfterReturning(pointcut = "getRequests()", returning = "response")
    public void afterControllerResponse(JoinPoint joinPoint, Object response) {
        log.info("### INFO Completed request {}", joinPoint.getSignature().toShortString());
        log.info("### INFO Response: {}", response.toString());
    }

    @AfterThrowing(pointcut = "getRequests()", throwing = "exception")
    public void afterThrowingException(JoinPoint joinPoint, Throwable exception) {
        MethodSignature methodSignature = (MethodSignature) joinPoint.getSignature();
        String[] parameterNames = methodSignature.getParameterNames();

        log.error("### ERROR Exception occurred in {}", joinPoint.getSignature().toShortString());
        log.error("### ERROR Exception message: {}", exception.getMessage());

        Object[] args = joinPoint.getArgs();
        IntStream.range(0, args.length)
            .forEach(i -> {
                Object arg = args[i];
                String paramName = parameterNames[i];
                log.error("### ERROR Param: {} = {}", paramName, arg);
            });
    }
}
