import { useState } from 'react';
import styled from 'styled-components';
const SidebarContainer = styled.div`
  position: fixed;
  top: 40%;
  left: 2%;
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 10px;
  border-color: var(--purple);
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  border-radius: 20px;
`;

interface SidebarItemProps {
  active: boolean;
}

const SidebarItem = styled.div<SidebarItemProps>`
  height: 12px;
  width: 12px;
  margin-bottom: 15px;
  margin-right: 10px;
  background-color: ${(props) => (props.active ? 'var(--purple)' : '#bebebe')};
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--light-purple);
    cursor: pointer;
  }

  &:active {
    animation: clickAnimation 0.3s forwards;
    border: 2px solid #000;
    cursor: pointer;
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
}

function MainSidebar({ fullpageApi }: MainSidebarProps) {
  const [activeItem, setActiveItem] = useState(1);

  const handleClick = (section: number) => {
    fullpageApi.moveTo(section);
    setActiveItem(section);
  };

  return (
    <SidebarContainer>
      <SidebarItem active={activeItem === 1} onClick={() => handleClick(1)} />
      <SidebarItem active={activeItem === 2} onClick={() => handleClick(2)} />
      <SidebarItem active={activeItem === 3} onClick={() => handleClick(3)} />
    </SidebarContainer>
  );
}

export default MainSidebar;
