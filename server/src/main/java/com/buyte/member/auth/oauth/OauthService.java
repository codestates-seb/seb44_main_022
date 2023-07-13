package com.buyte.member.auth.oauth;

import com.buyte.exception.BusinessLogicException;
import com.buyte.exception.ExceptionCode;
import com.buyte.member.auth.jwt.JwtTokenizer;
import com.buyte.member.entity.Member;
import com.buyte.member.repository.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
@Service
public class OauthService {
    private final RestTemplate restTemplate = new RestTemplate();
    private final MemberRepository memberRepository;
    private final JwtTokenizer jwtTokenizer;

    public OauthService(MemberRepository memberRepository, JwtTokenizer jwtTokenizer) {
        this.memberRepository = memberRepository;
        this.jwtTokenizer = jwtTokenizer;
    }

    @Value("${security.oauth2.google.token-uri}")
    private String tokenUri;

    @Value("${security.oauth2.google.resource-uri}")
    private String resourceUri;

    @Value("${security.oauth2.google.fe-uri}")
    private String feUri;

    @Value("${security.oauth2.google.fe-id}")
    private String feId;

    @Value("${security.oauth2.google.fe-secret}")
    private String feSecret;

    public HttpServletResponse socialLogInWithAuthorization(HttpServletRequest request, HttpServletResponse response) {
        log.info("==social log in==");
        String authorization = request.getParameter("authorization");

        GoogleUserInfo memberInfo = getUserResource(getAccessTokenWithAuthorization(authorization));

        Member member = memberRepository.findByLoginId(memberInfo.getEmail());

        // memberRepository에 회원정보 없으면 회원가입 후 토큰 발급, 있으면 바로 토큰 발급
        if (member == null) {
            Member newMember = new Member();
            newMember.setLoginId(memberInfo.getEmail());
            newMember.setMemberName(memberInfo.getName());
            newMember.setMemberType(Member.MemberType.GOOGLE);
            newMember.setMemberRole(Member.MemberRole.CUSTOMER);

            member = memberRepository.save(newMember);
        }

        String accessToken = jwtTokenizer.delegateAccessToken(member);

        response.setHeader("Authorization", "Bearer " + accessToken);
        response.addHeader("Set-Cookie", jwtTokenizer.createCookie(member).toString());

        return response;
    }

    public String getAccessTokenWithAuthorization(String authorizationCode) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("code", authorizationCode);
        body.add("client_id", feId);
        body.add("client_secret", feSecret);
        body.add("redirect_uri", feUri);
        body.add("grant_type", "authorization_code");

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(body, headers);

        ResponseEntity<AccessTokenResponse> responseEntity = restTemplate.exchange(
                tokenUri,
                HttpMethod.POST,
                requestEntity,
                AccessTokenResponse.class
        );

        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            AccessTokenResponse accessTokenResponse = (AccessTokenResponse) responseEntity.getBody();
            return accessTokenResponse.getAccessToken();
        } else {
            throw new RuntimeException("Failed to get access token");
        }
    }

    public GoogleUserInfo getUserResource(String accessToken) {

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);

        RequestEntity<?> requestEntity = RequestEntity.get(resourceUri)
                .headers(headers)
                .build();

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<GoogleUserInfo> responseEntity = restTemplate.exchange(
                requestEntity,
                GoogleUserInfo.class
        );

        if (responseEntity.getStatusCode().is2xxSuccessful()) {
            return responseEntity.getBody();
        } else {
            throw new RuntimeException("Failed to fetch Google user info");
        }
    }
}
