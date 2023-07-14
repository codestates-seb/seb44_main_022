import React from 'react';
import styled from 'styled-components';
import modal_cake from '../../../assets/images/img_modal/modal_cake.png';

const SectionContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 42px;
  margin-left: 11px;
`;

const SectionTitle = styled.p`
  font-family: 'Open Sans', cursive;
  font-size: 16px;
  color: var(--light-black);
  text-align: left;
  margin-left: 12px;
  margin-bottom: 12px;
`;

const ContentItem = styled.div`
  width: 90%;
  height: 80px;
  background-color: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 12px;
`;

const ContentImage = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border: 1px solid var(--light-gray);
  border-radius: 4px;
`;

const ContentImageContainer = styled.div`
  display: flex;
  align-items: center;
  overflow: auto;
  margin-top: 8px;
  height: 70px;
`;

type FlavorSectionProps = {
  onImageDragStart: (event: React.DragEvent<HTMLImageElement>, imageUrl: string) => void;
};

function FlavorSection({ onImageDragStart }: FlavorSectionProps) {
  const handleImageDragStart = (event: React.DragEvent<HTMLImageElement>) => {
    event.dataTransfer.setData('text/plain', '');
    const imageUrl = event.currentTarget.getAttribute('src');
    if (imageUrl) {
      onImageDragStart(event, imageUrl);
    }
  };

  return (
    <SectionContainer>
      <SectionTitle>맛</SectionTitle>
      <ContentItem>
        <ContentImageContainer>
          <ContentImage
            src={modal_cake}
            alt="Cake Icon"
            draggable
            onDragStart={handleImageDragStart}
          />
          <ContentImage
            src={modal_cake}
            alt="Cake Icon"
            draggable
            onDragStart={handleImageDragStart}
          />
          <ContentImage
            src={modal_cake}
            alt="Cake Icon"
            draggable
            onDragStart={handleImageDragStart}
          />
          <ContentImage
            src={modal_cake}
            alt="Cake Icon"
            draggable
            onDragStart={handleImageDragStart}
          />
          <ContentImage
            src={modal_cake}
            alt="Cake Icon"
            draggable
            onDragStart={handleImageDragStart}
          />
          <ContentImage
            src={modal_cake}
            alt="Cake Icon"
            draggable
            onDragStart={handleImageDragStart}
          />
        </ContentImageContainer>
      </ContentItem>
    </SectionContainer>
  );
}

export default FlavorSection;
