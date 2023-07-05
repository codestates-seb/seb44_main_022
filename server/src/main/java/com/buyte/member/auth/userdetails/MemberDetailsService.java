package com.buyte.member.auth.userdetails;

import com.buyte.member.entity.Member;
import com.buyte.member.repository.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collection;

@Component
@Slf4j
public class MemberDetailsService implements UserDetailsService {
    private final MemberRepository memberRepository;

    public MemberDetailsService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }
    // User(Member) 이름을 통해 로그인 대상 찾는 메서드, 일치하는 회원 없으면 예외 던짐
    // UserDetails 객체는 사용자 상세 정보를 나타낸다. 사용자 인증정보(비밀번호)나 권한 등이 포함될 수 있다.
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Member findMember = memberRepository.findByLoginId(username);
        if(findMember == null) throw new RuntimeException("Member Not Found");

        return new MemberDetails(findMember);
    }

    private final class MemberDetails extends Member implements UserDetails{
        public MemberDetails(Member member) {
            setMemberId(member.getMemberId());
            setLoginId(member.getLoginId());
            setPassword(member.getPassword());
            setMemberType(member.getMemberType());
            setMemberRole(member.getMemberRole());
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return null;
        }

        @Override
        public String getUsername() {
            return getLoginId();
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }
    }
}
