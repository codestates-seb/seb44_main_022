import React, { useState } from 'react';
import styled from 'styled-components';
import custom_icon from '../../../assets/images/img_modal/custom_icon.png';
import FlavorSection from './FlavorSeciton';
import ToppingSection from './ToppingSection';
import FillingSection from './FillingSection';
import CreamSection from './CreamSection';

const Sidebar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 20%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(50px);
`;

const SidebarContent = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 30px;
  overflow: auto;
`;

const CustomIcon = styled.img`
  width: 40px;
  height: 10px;
  margin-bottom: 20px;
  margin-left: 10px;
`;

const CustomSidebar: React.FC = () => {
  const [draggedImage, setDraggedImage] = useState<string | null>(null);

  const handleImageDragStart = (event: React.DragEvent<HTMLImageElement>, imageUrl: string) => {
    event.dataTransfer.setData('text/plain', imageUrl);
    event.dataTransfer.setData('application/my-app-type', 'image');
    setDraggedImage(imageUrl);
  };

  return (
    <Sidebar>
      <SidebarContent>
        <CustomIcon src={custom_icon} alt="Custom Icon" />
        <FlavorSection onImageDragStart={handleImageDragStart} />
        <CreamSection onImageDragStart={handleImageDragStart} />
        <ToppingSection onImageDragStart={handleImageDragStart} />
        <FillingSection onImageDragStart={handleImageDragStart} />
      </SidebarContent>
    </Sidebar>
  );
};

export default CustomSidebar;
