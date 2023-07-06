import React from 'react';
import styled from 'styled-components';
const CircleShape = styled.div`
  position: absolute;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  background-color: rgba(49, 129, 97, 0.25);
  box-shadow: 10px 14px 104px rgba(0, 0, 0, 0.12);
  filter: blur(100px);
  top: 150px;
  left: calc(15%);
`;

const Rectangle = styled.div`
  position: absolute;
  width: 100px;
  height: 700px;
  background-color: #f9e1c3;
  box-shadow: 10px 14px 104px rgba(0, 0, 0, 0.12);
  filter: blur(100px);
  transform: rotate(38.26deg);
  transform-origin: 0 0;
  top: 20px;
  left: calc(82%);
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Text = styled.h2`
  font-family: 'Open Sans', cursive;
  font-size: 15px;
  margin: 28px;
  margin-bottom: 70px;
  color: var(--light-black);
`;

const Title = styled.h3`
  font-family: 'Just Another Hand', cursive;
  margin-bottom: 20px;
  font-size: 40px;
  align-self: flex-end;
  position: absolute;
  left: 50px;
  top: 30px;
  color: var(--light-black);
`;

const StyledModal = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-height: 77%;
  min-width: 77%;
  border-radius: 40px;
  box-shadow: 0px 8px 24px rgba(49, 70, 86, 0.12);
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 10;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9;
`;

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ModalContent = styled.div`
  flex: 1;
  overflow: auto;
  padding: 10px;
`;

const ModalButtons = styled.div`
  align-self: flex-end;
  padding: 10px;
  margin-top: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  width: 70px;
  height: 50px;
  top: 0px;
  right: 0px;
  padding: 10px;
  border: none;
  background-color: rgba(20, 46, 56, 0.9);
  color: white;
  border-radius: 0px 40px 0px 0px;
`;

const CartButton = styled.button`
  position: absolute;
  width: 115px;
  height: 75px;
  bottom: 0px;
  right: 0px;
  padding: 10px;
  border: none;
  background-color: transparent;
  border: 1px solid var(--light-black);
  border-radius: 0px 0px 40px 0px;
  background-color: rgba(20, 46, 56, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Line = styled.div`
  width: 1px;
  height: 160px;
  background-color: rgba(20, 46, 56, 0.7);
  margin-top: 250px;
  margin-right: 15px;
`;

const CartImage = styled.img`
  width: 30px;
  height: 30px;
  margin-bottom: 8px;
`;

const CartButtonText = styled.span`
  color: var(--white);
  font-size: 6px;
`;

const ImageBox = styled.div`
  position: absolute;
  background-color: #fab65d;
  width: 155px;
  height: 75px;
  bottom: 0px;
  right: 115px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 40px 0px 0px 0px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
`;

const CustomContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 96%;
  height: 80%;
  background-color: rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2), 0px 25px 30px rgba(0, 0, 0, 0.35);
  border: 0.5px solid rgba(0, 0, 0, 0.12);
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
`;

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

const ContentContainer = styled.div`
  margin-left: 20%;
  width: 80%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(50px);
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
const CustomSidebar: React.FunctionComponent = () => {
  return;
  <Sidebar>
    <SidebarContent>
      <CustomIcon src={custom_icon} alt="Custom Icon" />
      <ContentText>베이스</ContentText>
      <ContentItem>
        <ContentImageContainer>
          <ContentImage src={modal_cake} alt="Cake Icon" />
          <ContentImage src={modal_cake} alt="Cake Icon" />
          <ContentImage src={modal_cake} alt="Cake Icon" />
          <ContentImage src={modal_cake} alt="Cake Icon" />
          <ContentImage src={modal_cake} alt="Cake Icon" />
          <ContentImage src={modal_cake} alt="Cake Icon" />
        </ContentImageContainer>
      </ContentItem>
      <ContentText>맛</ContentText>
      <ContentItem>
        <ContentImage src={modal_cake} alt="Cake Icon" />
      </ContentItem>
      <ContentText>크림</ContentText>
      <ContentItem>
        <ContentImage src={modal_cake} alt="Cake Icon" />
      </ContentItem>
      <ContentText>토핑</ContentText>
      <ContentItem>
        <ContentImage src={modal_cake} alt="Cake Icon" />
      </ContentItem>
      <ContentText>그림판</ContentText>
      <ContentItem>
        <ContentImage src={modal_cake} alt="Cake Icon" />
      </ContentItem>
    </SidebarContent>
  </Sidebar>;
};
export default CustomSidebar;
