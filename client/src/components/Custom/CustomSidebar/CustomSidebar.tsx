/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import custom_icon from '../../../assets/images/img_modal/custom_icon.png';
import { getCustomBoard } from '../../../api/customApis';
import ToppingSection from './ToppingSection';
import FillingSection from './FillingSection';
import CreamSection from './CreamSection';
const Sidebar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 21%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(50px);
  overflow: hidden;
`;

const SidebarContent = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 25px;
  overflow: hidden;
`;

const CustomIcon = styled.img`
  width: 40px;
  height: 10px;
  margin-bottom: 20px;
  margin-left: 15px;
`;
interface CustomSidebarProps {
  store_id: number;
  product_id: number;
}
const CustomSidebar: React.FC<CustomSidebarProps> = ({ store_id, product_id }) => {
  const [toppingIngredientList, setToppingIngredientList] = useState<any[]>([]);
  const [fillingIngredientList, setFillingIngredientList] = useState<any[]>([]);
  const [creamIngredientList, setCreamIngredientList] = useState<any[]>([]);

  const handleImageDragStart = (event: React.DragEvent<HTMLImageElement>, imageUrl: string) => {
    event.dataTransfer.setData('text/plain', imageUrl);
    event.dataTransfer.setData('application/my-app-type', 'image');
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCustomBoard(store_id, product_id);
      if (data) {
        setToppingIngredientList(data.toppingIngredientList || []);
        setFillingIngredientList(data.fillingIngredientList || []);
        setCreamIngredientList(data.creamIngredientList || []);
      }
    };

    fetchData();
  }, [store_id, product_id]);

  return (
    <Sidebar>
      <SidebarContent>
        <CustomIcon src={custom_icon} alt="Custom Icon" />
        <CreamSection
          onImageDragStart={handleImageDragStart}
          creamIngredientList={creamIngredientList}
        />
        <ToppingSection
          onImageDragStart={handleImageDragStart}
          toppingIngredientList={toppingIngredientList}
        />
        <FillingSection
          onImageDragStart={handleImageDragStart}
          fillingIngredientList={fillingIngredientList}
        />
      </SidebarContent>
    </Sidebar>
  );
};

export default CustomSidebar;
