/* eslint-disable react/no-children-prop */
import styled from 'styled-components';
import Header from '../../share/Header';
import ModalComponentDetail from '../../share/ModalComponentDetail';
import ModalComponentCustom from '../../share/ModalComponentCustom';
import { useState } from 'react';

import SelectStoreImg from '../../assets/images/img_select/select_store.png';
import SelectMenuImg from '../../assets/images/img_select/select_menu.png';
const MainRoot = styled.div`
  background-color: #fffffc;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-size: 22px;
  position: relative;
`;

const OrderText = styled.h1`
  margin-top: 220px;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 100px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 50px;
`;

const Image = styled.img`
  width: 80%;
  max-width: 300px;
  height: auto;
  object-fit: cover;
`;

const Text = styled.div`
  margin-top: 20px;
  font-size: 18px;
  text-align: center;
  color: #282828;
`;

const GrayText = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: gray;
  text-decoration: underline;
  text-align: center;
`;

const Button = styled.button`
  margin-top: 20px;
  font-size: 15px;
  padding: 12px 30px;
  border-radius: 20px;
  border: solid;
  border-color: var(--purple);
  color: var(--purple);
`;

const SelectStore: React.FunctionComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <MainRoot>
      <Header />
      <OrderText>ORDER</OrderText>
      <Container>
        <ContentContainer>
          <Image src={SelectStoreImg} alt="Select Store" />
          <Button onClick={handleOpenModal}>매장 리스트보기 (클릭!)</Button>
          <Text>
            입점된 매장들을 보고 싶으시
            <br /> 다면 리스트를 먼저 확인해보세요
          </Text>
          <GrayText>다양한 매장들을 확인해보세요.</GrayText>
        </ContentContainer>
        <ContentContainer>
          <Image src={SelectMenuImg} alt="Select Menu" />
          <Button onClick={() => console.log('추천 메뉴보기 열기!')}>추천 메뉴보기 (클릭!)</Button>
          <Text>
            추천 메뉴를 보고 싶으시다면
            <br /> 추천 메뉴 보기를 선택해주세요
          </Text>
          <GrayText> 다양한 메뉴를 확인해보세요.</GrayText>
        </ContentContainer>
      </Container>
      <ModalComponentCustom
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="매장 리스트"
        children={undefined}
      />
    </MainRoot>
  );
};
export default SelectStore;
