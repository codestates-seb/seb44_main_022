import { useState } from 'react';
import styled, { css } from 'styled-components';

const SidebarContainer = styled.div`
  position: fixed;
  top: 57%;
  left: 4%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transform: translateY(-50%);
  padding: 10px;
  height: 90px;
  border-color: var(--purple);
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  border-radius: 20px;
`;

interface SidebarItemProps {
  active: boolean;
  clicked: boolean;
}

const SidebarItem = styled.div<SidebarItemProps>`
  position: relative;
  height: 20px;
  width: 20px;

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
  fullpageApi: {
    moveTo: (section: number) => void;
  };
  activeSection: number;
}

function MainSidebar({ fullpageApi, activeSection }: MainSidebarProps) {
  const [clickedSection, setClickedSection] = useState(0);

  const handleClick = (section: number) => {
    setClickedSection(section);
    fullpageApi.moveTo(section);
    setTimeout(() => setClickedSection(0), 300);
  };

  return (
    <SidebarContainer>
      <SidebarItem
        active={activeSection === 1}
        clicked={clickedSection === 1}
        onClick={() => handleClick(1)}
      />
      <SidebarItem
        active={activeSection === 2}
        clicked={clickedSection === 2}
        onClick={() => handleClick(2)}
      />
      <SidebarItem
        active={activeSection === 3}
        clicked={clickedSection === 3}
        onClick={() => handleClick(3)}
      />
    </SidebarContainer>
  );
}

export default MainSidebar;
