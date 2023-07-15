import styled from 'styled-components';
import ExampleImage from '../../../assets/images/img_modal/Example.png';
import Example2 from '../../../assets/images/img_modal/Example2.png';
import { PopupContainer } from './PopupContainer';

const PopupImage = styled.img`
  width: 500px;
  height: auto;
  max-height: 100%;
  max-width: 100%;

  @media (max-width: 768px) {
    width: auto;
  }
`;

const PopupContent = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 40px;
  flex-grow: 1;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 10px;

    ${PopupImage} {
      width: auto;
      max-width: 100%;
      height: auto;
    }
  }
`;

const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  flex-shrink: 0;
  border: 0.1px solid rgba(0, 0, 0, 0.1);
  border-width: 0.5px 1px 1px 0.5px;
  border-radius: 15px;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2);
  @media (max-width: 900px) {
    width: auto;
    max-width: 100%;
    height: auto;
  }
`;

const Part1 = styled.div`
  height: 18%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px 15px 0 0;
  margin: 5px;
`;

const Part2 = styled.div`
  height: 64%;
  background: url(${Example2}) no-repeat;
  background-color: rgba(242, 242, 242, 0.2);
  background-blend-mode: overlay;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: white;
  line-height: 2.8;
  font-size: 20px;
`;

const Part3 = styled.div`
  height: 18%;
  font-family: Just Another Hand, cursive;
  font-size: 28px;
  border-radius: 0 0 15px 15px;
  padding-top: 26px;
  color: #726e6e;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Popup = () => {
  return (
    <PopupContainer show={true}>
      <PopupContent>
        <PopupImage src={ExampleImage} alt="Example" />
        <RightContent>
          <Part1>커스텀 주문제작 방법</Part1>
          <Part2>
            1. 단면 그림으로 그려주면 사장님이 알기 쉬움 <br />
            2. 참고할 만한 이미지를 같이 추가해줘도 됨 <br />
            3. 사이드바(?)에서 원하는 재료들을 추가해 <br />
            4. 장바구니에 넣으면 됨
          </Part2>
          <Part3>BUYTE BUYTE BUYTE BUYTE BUYTE BUYTE BUYTE</Part3>
        </RightContent>
      </PopupContent>
    </PopupContainer>
  );
};

export default Popup;
