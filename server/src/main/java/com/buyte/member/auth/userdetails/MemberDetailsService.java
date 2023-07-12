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
