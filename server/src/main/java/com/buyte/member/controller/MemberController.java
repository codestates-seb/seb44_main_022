package com.buyte.member.controller;

import com.buyte.member.dto.MemberDto;
import com.buyte.member.entity.Member;
import com.buyte.member.mapper.MemberMapper;
import com.buyte.member.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@RestController
@RequestMapping("/")
public class MemberController {
    private final MemberMapper mapper;
    private final MemberService memberService;

    public MemberController(MemberMapper mapper, MemberService memberService) {
        this.mapper = mapper;
        this.memberService = memberService;
    }

    @PostMapping("/signup")
    public ResponseEntity postMember(@RequestBody @Valid MemberDto.Post memberPostDto) {
        Member member = mapper.memberPostDtoToMember(memberPostDto);
        Member savedMember = memberService.createMember(member);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/token/refresh")
    public ResponseEntity reIssueAccessToken(HttpServletRequest request, HttpServletResponse response) {
        response = memberService.checkRefreshAndReIssueAccess(request, response);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity logout(HttpServletRequest request) {
        memberService.logout(request);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
