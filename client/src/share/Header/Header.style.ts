import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { dropDown, dropUp, fadeIn, fadeOut } from '../../styles/keyframes';

export const LinkText = styled(Link)`
  display: flex;
  font-size: 1.3rem;
  font-family: 'Yaldevi', sans-serif;
  color: #6d4924;
  transition: 0.3s;
  &:hover {
    transform: scale(110%, 110%);
    color: var(--purple);
    cursor: pointer;
  }
`;

export const SmallLinkText = styled.div`
  font-family: 'Yaldevi', sans-serif;
  line-height: 30px;
  display: flex;
  height: 2rem;
  font-size: 15px;
  color: #6d4924;
  transition: 0.3s;
`;

export const Icon = styled(Link)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80px;
  min-width: 60px;

  &:hover > div {
    transform: scale(110%, 110%);
    color: var(--purple);
    cursor: pointer;
  }

  & > img {
    transition: 0.3s;
  }

  &:hover > img {
    transform: scale(110%, 110%);
  }
`;

export const IconDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80px;
  min-width: 60px;

  &:hover > div {
    transform: scale(110%, 110%);
    color: var(--purple);
    cursor: pointer;
  }

  & > img {
    transition: 0.3s;
  }

  &:hover > img {
    transform: scale(110%, 110%);
  }
`;

export const HeaderContainer = styled.div<{ animation: string }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  width: 100%;
  height: 80px;
  z-index: 1;
  align-items: center;
  justify-content: space-between;
  background-color: #fcfcffaa;

  animation: 0.3s ${({ animation }) => (animation === 'fadeIn' ? fadeIn : fadeOut)} forwards;
`;

export const AuthRelativeContainer = styled.div`
  display: flex;
  width: 18%;
  justify-content: center;

  @media screen and (max-width: 700px) {
    display: none;
  }
`;

export const DropDownContainer = styled.div<{ isOpenMenu: boolean }>`
  display: none;
  position: relative;
  width: 10%;
  height: 100%;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 700px) {
    display: flex;
  }

  & > ul {
    ${({ isOpenMenu }) =>
      isOpenMenu
        ? css`
            visibility: visible;
            animation: ${dropDown} 0.3s forwards;
          `
        : css`
            animation: ${dropUp} 0.3s forwards;
          `}
  }
`;

export const DropDownContent = styled.ul`
  visibility: hidden;
  background-color: white;
  position: absolute;
  top: 100%;
  right: 0px;
  width: 150px;
  border-radius: 0px 0px 15px 15px;
  overflow: hidden;
  & > li {
    padding: 1rem;
    text-align: center;
    transition: 0.3s;
    display: flex;
    align-items: center;
    justify-content: space-around;
    &:hover {
      background-color: var(--normal-gray);
    }
  }
`;

export const HeaderLogo = styled.div`
  font-family: Just Another Hand, cursive;
  font-size: 2.5rem;
  cursor: pointer;
  display: flex;
  width: 18%;
  justify-content: flex-end;

  & > a {
    transition: 0.3s;
    color: #6d4924;
  }
  &:hover > a {
    transform: scale(110%, 110%);
    color: var(--purple);
  }
`;

export const HamburgerMenuStyle = styled.a<{ isOpenModal: boolean }>`
  position: relative;
  width: 50px;
  height: 44px;
  cursor: pointer;

  & > span {
    width: 75%;
    height: 3px;
    left: 25%;
    background-color: #6d4924;
    position: absolute;
    border-radius: 4px;
    transition: all 0.3s;
  }
  & > span:nth-of-type(1) {
    top: 25%;
    ${({ isOpenModal }) => (isOpenModal ? 'transform: translateY(11.5px) rotate(-45deg);' : '')}
  }
  & > span:nth-of-type(2) {
    top: 50%;
    ${({ isOpenModal }) => (isOpenModal ? 'opacity: 0' : '')}
  }
  & > span:nth-of-type(3) {
    top: 75%;
    ${({ isOpenModal }) => (isOpenModal ? 'transform: translateY(-11.5px) rotate(45deg);' : '')}
  }
`;
