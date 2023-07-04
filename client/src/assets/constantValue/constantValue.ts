export const REGEX = {
  nickname: /^[가-힣a-zA-Z0-9]{4,12}$/,
  id: /^[a-zA-Z0-9]{4,12}$/,
  password: /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/,
};

export const AUTH_FAILED_MESSAGE = {
  nickname: 'NickName은 특수문자를 제외하고 4~12글자만 입력 가능합니다.',
  id: 'ID는 영어, 숫자로 구분되어 4~12글자만 입력 가능합니다.',
  password: 'Password는 영어, 숫자, 특수문자가 1개 이상 포함되어 8~16 글자만 입력 가능합니다.',
};
