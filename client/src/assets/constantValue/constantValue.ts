import { FlattenSimpleInterpolation, css } from 'styled-components';
import testImg from '../images/img_main/divimgbox.png';

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

export const DELIVERY_FEE = 3500;

export const STORE_MAP_INTRODUCE_LIMIT = 70;

export const UNMOUNT_ANIMATION_TIME = 290;

export const IMAGE_NUMBER_BUTTON = [0, 1, 2];

export const POSITIONS = [
  {
    storeId: 1,
    storeLatitude: 37.301011,
    storeLongitude: 127.012222,
    storeAddress: '수원시 장안구',
    storeImage: testImg,
    storeName: '수원 종합 운동장',
    storeIntroduction:
      '수원 종합 운동장입니다. 뭐 어쩌구 저쩌구 솰라솰라수원 종합 운동장입니다. 뭐 어쩌구 저쩌구 솰라솰라수원 종합 운동장입니다. 뭐 어쩌구 저쩌구 솰라솰라수원 종합 운동장입니다. 뭐 어쩌구 저쩌구 솰라솰라수원 종합 운동장입니다. 뭐 어쩌구 저쩌구 솰라솰라',
    productPreferenceList: [
      {
        productId: 1,
        productImage: testImg,
      },
      {
        productId: 2,
        productImage: testImg,
      },
      {
        productId: 3,
        productImage: testImg,
      },
    ],
  },
  {
    storeId: 2,
    storeLatitude: 37.591625,
    storeLongitude: 127.131863,
    storeAddress: '구리시 OO구',
    storeImage: testImg,
    storeName: '구리시',
    storeIntroduction:
      'asdasd zxcajskdiqw apoxcpoisadm;kqw asdasd zxcajskdiqw apoxcpoisadm;kqwasdasd zxcajskdiqw apoxcpoisadm;kqwasdasd zxcajskdiqw apoxcpoisadm;kqwasdasd zxcajskdiqw apoxcpoisadm;kqwasdasd zxcajskdiqw apoxcpoisadm;kqw ',
    productPreferenceList: [
      {
        productId: 2,
        productImage: testImg,
      },
    ],
  },
  {
    storeId: 3,
    storeLatitude: 37.612458,
    storeLongitude: 126.717777,
    storeImage: testImg,
    storeAddress: '김포시 OO구',
    storeName: '김포시',
    storeIntroduction: '경기도 김포입니다. 김포시에는 공항이 있어요. 굳굳! ',
    productPreferenceList: [
      {
        productId: 3,
        productImage: testImg,
      },
    ],
  },
];

export const LOCAL_STORAGE_KEY_LIST = {
  AccessToken: 'AccessToken',
  IdList: 'IdList',
};
