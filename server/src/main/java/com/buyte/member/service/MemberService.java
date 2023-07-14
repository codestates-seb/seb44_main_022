package com.buyte.member.service;

import com.buyte.member.entity.Member;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface MemberService {
    Member createMember(Member member);

    HttpServletResponse checkRefreshAndReIssueAccess(HttpServletRequest request, HttpServletResponse response);

    void logout(HttpServletRequest request);

    Member getMemberDetails(long memberId);

    Member updateMember(Member member);
}
