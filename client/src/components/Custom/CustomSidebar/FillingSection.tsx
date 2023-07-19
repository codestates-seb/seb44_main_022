import React from 'react';
import styled from 'styled-components';

const SectionContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  margin-left: 11px;
`;

const ContentItem = styled.div`
  margin-left: 1.5%;
  width: 88%;
  height: 130px;
  background-color: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding-left: 13px;
  padding-bottom: 10px;
`;
const ContentImage = styled.img`
  width: 57px;
  height: 57px;
  margin-right: 5px;
  border: 0.9px solid var(--light-gray);
  border-radius: 8px;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  cursor: grab;
  &:hover {
    background-color: var(--gray);
  }
  &:active {
    background-color: var(--normal-gray);
  }
`;
const ContentImageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
  grid-auto-rows: 1fr;
  gap: 8px;
  max-width: 100%;
  overflow-y: auto;
  margin-top: 8px;
`;
interface Filling {
  ingredientName: string;
  ingredientImage: string;
  ingredientPrice: number;
}

interface FillingSectionProps {
  onImageDragStart: (event: React.DragEvent<HTMLImageElement>, imageUrl: string) => void;
  fillingIngredientList: Filling[];
}

function FillingSection({ onImageDragStart, fillingIngredientList }: FillingSectionProps) {
  const handleImageDragStart = (event: React.DragEvent<HTMLImageElement>) => {
    event.dataTransfer.setData('text/plain', '');
    const imageUrl = event.currentTarget.getAttribute('src');
    if (imageUrl) {
      onImageDragStart(event, imageUrl);
    }
  };

  return (
    <SectionContainer>
      <div
        style={{
          background: '#FFF4E4',
          width: '80px',
          height: '30px',
          paddingTop: '6px',
          borderRadius: '2px',
          marginBottom: '5px',
        }}
      >
        <p
          style={{
            fontFamily: "'Just Another Hand', cursive",
            fontSize: '22px',
            color: '#AAA8E0',
            textAlign: 'left',
            marginLeft: '12px',
            marginBottom: '12px',
            textShadow: '1px 1px 2px #ffd596',
          }}
        >
          FILLING.
        </p>
      </div>
      <ContentItem>
        <ContentImageContainer>
          {fillingIngredientList.map((filling, index) => (
            <ContentImage
              key={index}
              src={filling.ingredientImage}
              alt={filling.ingredientName}
              draggable
              onDragStart={handleImageDragStart}
            />
          ))}
        </ContentImageContainer>
      </ContentItem>
    </SectionContainer>
  );
}

export default FillingSection;
