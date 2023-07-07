import { FlattenSimpleInterpolation, css } from 'styled-components';

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

export const ROUND_BUTTON_TYPE: { [index: string]: FlattenSimpleInterpolation } = {
  google: css`
    background-color: var(--background);
    color: var(--dark-blue-black);
    font-weight: 700;
    &:hover {
      background-color: var(--gray);
    }
    &:active {
      background-color: var(--normal-gray);
    }
  `,
  dark: css`
    background-color: var(--dark-gray);
    color: var(--white);
    &:hover {
      background-color: var(--white-gray);
    }
    &:active {
      background-color: var(--bright-black);
    }
    :disabled {
      background-color: var(--dark-gray);
      color: var(--white);
      opacity: 0.6;
    }
  `,
  purple: css`
    background-color: var(--purple);
    color: var(--white);
  `,
};

export const RECTANGLE_BUTTON_TYPE: { [index: string]: FlattenSimpleInterpolation } = {
  white: css`
    border: 1px solid var(--purple);
    background-color: var(--white);
    color: var(--purple);
  `,
  dark: css`
    border: 1px solid var(--purple);
    background-color: var(--dark-gray);
    color: white;
  `,
  purple: css`
    border: 1px solid var(--purple);
    background-color: var(--purple);
    color: white;
  `,
};

export const CART_CATEGORY_NAME = [
  {
    name: 'Cart',
    path: '/cart',
    arrowDesign: true,
    icon: 'cart',
  },
  {
    name: 'Payment',
    path: '/payment',
    arrowDesign: true,
    icon: 'payment',
  },
  {
    name: 'Order Complete',
    path: '/complete',
    arrowDesign: false,
    icon: 'order',
  },
];
