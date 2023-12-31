package com.buyte.member.controller;

import com.buyte.member.auth.oauth.OauthService;
import com.buyte.member.auth.utils.SecurityUtil;
import com.buyte.member.dto.MemberDto;
import com.buyte.member.entity.Member;
import com.buyte.member.mapper.MemberMapper;
import com.buyte.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class MemberController {
    private final MemberMapper mapper;
    private final MemberService memberService;
    private final OauthService oauthService;

    @PostMapping("/signup")
    public ResponseEntity postMember(@RequestBody @Valid MemberDto.Post memberPostDto) {
        Member member = mapper.memberPostDtoToMember(memberPostDto);
        Member savedMember = memberService.createMember(member);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/login/oauth")
    public ResponseEntity googleLogInWithAuthorization(HttpServletRequest request, HttpServletResponse response) {
        response = oauthService.socialLogInWithAuthorization(request, response);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/token/refresh")
    public ResponseEntity reIssueAccessToken(HttpServletRequest request, HttpServletResponse response) {
        response = memberService.checkRefreshAndReIssueAccess(request, response);
        if (response.getStatus() == 403) return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        if (response.getStatus() == 401) return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        else return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity logout(HttpServletRequest request) {
        memberService.logout(request);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/members")
    public ResponseEntity memberDetails() {
        long authenticatedMemberId = SecurityUtil.getLoginMemberId();
        Member member = memberService.getMemberDetails(authenticatedMemberId);

        return new ResponseEntity<>(mapper.memberToMemberResponseDto(member), HttpStatus.OK);
    }

    @DeleteMapping("/members/withdraw")
    public ResponseEntity deleteMember() {
        long authenticatedMemberId = SecurityUtil.getLoginMemberId();
        memberService.deleteMember(authenticatedMemberId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/members/orders")
    public ResponseEntity orderDetails(@RequestParam(required = false, defaultValue = "1") int page,
                                       @RequestParam(required = false, defaultValue = "5") int size) {
        long authenticatedMemberId = SecurityUtil.getLoginMemberId();
        MemberDto.OrderResponse response = memberService.getOrderDetails(authenticatedMemberId, page, size);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/members")
    public ResponseEntity updateMemberDetails(@RequestBody @Valid MemberDto.Patch memberPatchDto) {
        long authenticatedMemberId = SecurityUtil.getLoginMemberId();
        memberPatchDto.setMemberId(authenticatedMemberId);

        Member member = mapper.memberPatchToMember(memberPatchDto);
        Member updatedMember = memberService.updateMember(member);

        return new ResponseEntity<>(mapper.memberToMemberResponseDto(updatedMember), HttpStatus.OK);
    }
}
