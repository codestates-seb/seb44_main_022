package com.buyte.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class MemberDto {

    @Getter
    @AllArgsConstructor
    public static class Post {

        @NotBlank(message = "아이디를 입력해주세요.")
        @Pattern(regexp = "^[가-힣a-zA-Z0-9]{4,12}$",
                message = "아이디는 4~12 자리면이면서 한글, 영어, 숫자만 포함되어야 합니다.")
        private String loginId;

        @NotBlank(message = "비밀번호를 입력해주세요.")
        @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!@#$%^&*()_\\-+=])[a-zA-Z\\d!@#$%^&*()_\\-+=]{8,16}$",
                message = "비밀번호는 8~16 자리이면서 1개 이상의 알파벳, 숫자, 특수문자가 포함되어야합니다.")
        private String password;

        @NotBlank(message = "닉네임을 입력해주세요.")
        private String memberName;

    }

    @AllArgsConstructor
    @Getter
    public static class Response {
        private long memberId;
        private String memberName;
    }
}
