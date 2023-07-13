/* eslint-disable react/no-children-prop */
import styled from 'styled-components';
import { useState } from 'react';
import Header from '../../share/Header';

import ModalComponentCustom from '../../share/ModalComponentCustom';

import SelectStoreImg from '../../assets/images/img_select/select_store.png';
import SelectMenuImg from '../../assets/images/img_select/select_menu.png';
const MainRoot = styled.div`
  background-color: #fffffc;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const OrderText = styled.h1`
  margin-top: 20vh;
  font-size: 30px;
  font-weight: bold;
  text-align: center;

  @media (max-width: 768px) {
    margin-top: 18vh;
    font-size: 24px;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15rem;
  margin-top: 15vh;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8rem;
    margin-top: 8vh;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 45%;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const Image = styled.img`
  width: 80%;
  max-width: 300px;
  height: auto;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const GrayText = styled.div`
  margin-top: 1vh;
  font-size: 14px;
  color: gray;
  text-decoration: underline;
  text-align: center;

  @media (max-width: 768px) {
    margin-top: 0.5vh;
    font-size: 10px;
  }
`;

const TextButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2vh;

  @media (max-width: 768px) {
    margin-top: 1vh;
  }
`;

const Text = styled.div`
  font-size: 16px;
  text-align: center;
  color: #282828;

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

const Button = styled.button`
  margin-top: 1vh;
  font-size: 15px;
  padding: 12px 30px;
  border-radius: 20px;
  border: solid;
  border-color: var(--purple);
  color: var(--purple);

  @media (max-width: 768px) {
    margin-top: 1vh;
    width: 110%;
    font-size: 11px;
  }
`;
function SelectStore() {
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
          <Button onClick={handleOpenModal}>입점매장 보기(클릭!)</Button>
          <TextButtonContainer>
            <Text>
              입점된 매장들을 보고 싶으시면 <br /> 리스트를 먼저 확인해보세요
            </Text>
            <GrayText>다양한 매장들을 확인해보세요.</GrayText>
          </TextButtonContainer>
        </ContentContainer>
        <ContentContainer>
          <Image src={SelectMenuImg} alt="Select Menu" />
          <Button>추천메뉴 보기 (클릭!)</Button>
          <TextButtonContainer>
            <Text>
              추천 메뉴를 보고 싶으시면
              <br /> 추천 메뉴 보기를 선택해주세요
            </Text>
            <GrayText> 다양한 메뉴를 확인해보세요.</GrayText>
          </TextButtonContainer>
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
}
export default SelectStore;
