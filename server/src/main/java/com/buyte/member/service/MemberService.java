package com.buyte.member.service;

import com.buyte.member.entity.Member;
import com.buyte.member.repository.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
@Slf4j
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Member createMember(Member member){
        Member findMember = memberRepository.findByLoginId(member.getLoginId());
        Member.checkExistLoginId(findMember);

        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        // 회원가입 경로 설정(현재는 자체 로그인으로 고정. OAuth2 적용되면 편집)
        member.setMemberType(Member.MemberType.BASIC);

        // role 설정(현재는 Customer로 고정. 고객/관리자 기능 추가되면 편집)
        member.setMemberRole(Member.MemberRole.CUSTOMER);

        return memberRepository.save(member);
    }
}
