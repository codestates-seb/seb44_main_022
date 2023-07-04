package com.buyte.member.mapper;

import com.buyte.member.dto.MemberDto;
import com.buyte.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface MemberMapper {
    Member memberPostDtoToMember(MemberDto.Post memberPostDto);

    MemberDto.Response memberToMemberResponseDto(Member member);
}
