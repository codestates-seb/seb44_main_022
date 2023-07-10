import React, { useState } from 'react';
import styled from 'styled-components';
import modal_cake from '../../../assets/images/img_modal/modal_cake.png';
import custom_icon from '../../../assets/images/img_modal/custom_icon.png';

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
  padding-top: 20px;
  overflow: auto;
`;

const CustomIcon = styled.img`
  width: 40px;
  height: 10px;
  margin-bottom: 20px;
  margin-left: 10px;
`;

const ContentItem = styled.div`
  width: 90%;
  height: 80px;
  background-color: #fff;
  margin-bottom: 15px;
  margin-left: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 10px;
`;

const ContentImage = styled.img`
  width: 45px;
  height: 45px;
  margin-right: 10px;
  border: 1px solid var(--light-gray);
  border-radius: 4px;
`;

const ContentText = styled.p`
  font-family: 'Open Sans', cursive;
  font-size: 14px;
  color: var(--light-black);
  text-align: left;
  margin-left: 10px;
  margin-bottom: 8px;
`;

const ContentImageContainer = styled.div`
  display: flex;
  align-items: center;
  overflow: auto;
  margin-top: 10px;
  height: 60px;
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
        <ContentText>베이스</ContentText>
        <ContentItem>
          <ContentImageContainer>
            <ContentImage
              src={modal_cake}
              alt="Cake Icon"
              draggable
              onDragStart={(event) => handleImageDragStart(event, modal_cake)}
            />
            <ContentImage
              src={modal_cake}
              alt="Cake Icon"
              draggable
              onDragStart={(event) => handleImageDragStart(event, modal_cake)}
            />
            <ContentImage
              src={modal_cake}
              alt="Cake Icon"
              draggable
              onDragStart={(event) => handleImageDragStart(event, modal_cake)}
            />
            <ContentImage
              src={modal_cake}
              alt="Cake Icon"
              draggable
              onDragStart={(event) => handleImageDragStart(event, modal_cake)}
            />
            <ContentImage
              src={modal_cake}
              alt="Cake Icon"
              draggable
              onDragStart={(event) => handleImageDragStart(event, modal_cake)}
            />
            <ContentImage
              src={modal_cake}
              alt="Cake Icon"
              draggable
              onDragStart={(event) => handleImageDragStart(event, modal_cake)}
            />
          </ContentImageContainer>
        </ContentItem>
        <ContentText>맛</ContentText>
        <ContentItem>
          <ContentImage src={modal_cake} alt="Cake Icon" draggable />
        </ContentItem>
        <ContentText>크림</ContentText>
        <ContentItem>
          <ContentImage src={modal_cake} alt="Cake Icon" draggable />
        </ContentItem>
        <ContentText>토핑</ContentText>
        <ContentItem>
          <ContentImage src={modal_cake} alt="Cake Icon" draggable />
        </ContentItem>
        <ContentText>그림판</ContentText>
        <ContentItem>
          <ContentImage src={modal_cake} alt="Cake Icon" draggable />
        </ContentItem>
      </SidebarContent>
    </Sidebar>
  );
};

export default CustomSidebar;
