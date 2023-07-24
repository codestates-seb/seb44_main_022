import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const SidebarContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 3%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  height: 160px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 20px;
  z-index: 10;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

interface SidebarItemProps {
  active: boolean;
  clicked: boolean;
  onClick: () => void;
}

const SidebarItem = styled.div<SidebarItemProps>`
  position: relative;
  height: 20px;
  width: 20px;
  &::after {
    content: attr(data-label);
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    padding-left: 25px;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    color: var(--bright-black);
    font-size: 17px;
    font-family: 'BMJUA';
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: ${(props) => (props.active ? '10px' : '8px')};
    width: ${(props) => (props.active ? '10px' : '8px')};
    background-color: ${(props) => (props.active ? 'var(--purple)' : '#bebebe')};
    border-radius: 50%;
    transition: height 0.3s ease, width 0.3s ease;

    ${(props) =>
      props.clicked &&
      css`
        animation: clickAnimation 0.3s forwards;
        border: 2px solid #000;
      `}
  }

  &:hover::before {
    background-color: var(--light-purple);
  }

  &:hover::after {
    opacity: 1;
  }

  @keyframes clickAnimation {
    from {
      border: none;
    }
    to {
      border: 2px solid var(--light-purple);
    }
  }
`;
interface MainSidebarProps {
  activeSection: number;
  handleScrollToSection: (section: number) => void;
}

const MainSidebar: React.FC<MainSidebarProps> = ({ activeSection, handleScrollToSection }) => {
  const [clickedSection, setClickedSection] = useState(0);

  const handleClick = (section: number) => {
    setClickedSection(section);
    handleScrollToSection(section);
    setTimeout(() => setClickedSection(0), 300);
  };

  return (
    <SidebarContainer>
      <SidebarItem
        active={activeSection === 1}
        clicked={clickedSection === 1}
        onClick={() => handleClick(1)}
        data-label="BUYTE"
      />
      <SidebarItem
        active={activeSection === 2}
        clicked={clickedSection === 2}
        onClick={() => handleClick(2)}
        data-label="BUYTE의 제품"
      />
      <SidebarItem
        active={activeSection === 3}
        clicked={clickedSection === 3}
        onClick={() => handleClick(3)}
        data-label="BUYTE의 제품"
      />
      <SidebarItem
        active={activeSection === 4}
        clicked={clickedSection === 4}
        onClick={() => handleClick(4)}
        data-label="주문방법"
      />
      <SidebarItem
        active={activeSection === 5}
        clicked={clickedSection === 5}
        onClick={() => handleClick(5)}
        data-label="커스텀 리뷰"
      />
    </SidebarContainer>
  );
};

export default MainSidebar;
