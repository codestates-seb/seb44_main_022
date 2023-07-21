import React from 'react';
import styled from 'styled-components';
const SectionContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  margin-left: 11px;

  max-height: 500px;
`;
const ContentItem = styled.div`
  margin-left: 1.5%;
  width: 88%;
  background-color: #fafcff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding-left: 8px;
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
  grid-template-columns: repeat(3, minmax(50px, 1fr)); // 3열로 고정
  gap: 8px;
  max-width: 100%;
  overflow-y: auto;
  max-height: 180px;
  margin-top: 8px;
`;

interface Cream {
  ingredientName: string;
  ingredientImage: string;
  ingredientPrice: number;
}

interface CreamSectionProps {
  onImageDragStart: (event: React.DragEvent<HTMLImageElement>, imageUrl: string) => void;
  creamIngredientList: Cream[];
}

function CreamSection({ onImageDragStart, creamIngredientList }: CreamSectionProps) {
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
            color: '#ffb144',
            textAlign: 'left',
            marginLeft: '12px',
            marginBottom: '12px',
            textShadow: '1px 1px 2px #FFADD4',
          }}
        >
          CREAM.
        </p>
      </div>

      <ContentItem>
        <ContentImageContainer>
          {creamIngredientList.map((cream, index) => (
            <ContentImage
              key={index}
              src={cream.ingredientImage}
              alt={cream.ingredientName}
              draggable
              onDragStart={handleImageDragStart}
            />
          ))}
        </ContentImageContainer>
      </ContentItem>
    </SectionContainer>
  );
}

export default CreamSection;
