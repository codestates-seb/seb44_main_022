package com.buyte.member.mapper;

import com.buyte.member.dto.MemberDto;
import com.buyte.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {
    Member memberPostDtoToMember(MemberDto.Post memberPostDto);

    Member memberPatchToMember(MemberDto.Patch memberPatchDto);

    MemberDto.Response memberToMemberResponseDto(Member member);
}
