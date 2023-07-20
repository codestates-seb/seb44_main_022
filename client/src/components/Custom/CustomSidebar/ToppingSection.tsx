import React from 'react';
import styled from 'styled-components';

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
  height: 100px;
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
  border-radius: 4px;
`;

const ContentImageContainer = styled.div`
  display: flex;
  align-items: center;
  overflow: auto;
  margin-top: 8px;
  height: 70px;
`;
interface Topping {
  ingredientName: string;
  ingredientImage: string;
  ingredientPrice: number;
}

interface ToppingSectionProps {
  onImageDragStart: (event: React.DragEvent<HTMLImageElement>, imageUrl: string) => void;
  toppingIngredientList: Topping[];
}

function ToppingSection({ onImageDragStart, toppingIngredientList }: ToppingSectionProps) {
  const handleImageDragStart = (event: React.DragEvent<HTMLImageElement>) => {
    event.dataTransfer.setData('text/plain', '');
    const imageUrl = event.currentTarget.getAttribute('src');
    if (imageUrl) {
      onImageDragStart(event, imageUrl);
    }
  };

  return (
    <SectionContainer>
      <SectionTitle>토핑</SectionTitle>
      <ContentItem>
        <ContentImageContainer>
          {toppingIngredientList.map((topping, index) => (
            <ContentImage
              key={index}
              src={topping.ingredientImage}
              alt={topping.ingredientName}
              draggable
              onDragStart={handleImageDragStart}
            />
          ))}
        </ContentImageContainer>
      </ContentItem>
    </SectionContainer>
  );
}

export default ToppingSection;
