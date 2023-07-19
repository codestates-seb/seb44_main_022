import styled from 'styled-components';
import { Transition } from 'react-transition-group';
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
  @media (max-width: 1500px) {
    gap: 10px;

    ${PopupImage} {
      width: 70%;
      max-width: 100%;
      height: 70%;
    }
  }
  @media (max-width: 1200px) {
    flex-direction: column;
    gap: 10px;

    ${PopupImage} {
      width: 170%;
      max-width: 100%;
      height: 170%;
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
  @media (max-width: 1200px) {
    display: none;
  }
`;

type PopupProps = {
  show: boolean;
};

const Popup = ({ show }: PopupProps) => {
  return (
    <Transition in={show} timeout={200} unmountOnExit>
      {(state) => (
        <PopupContainer show={show} state={state}>
          <PopupContent>
            <PopupImage src={ExampleImage} alt="Example" />
            <RightContent>
              <div
                style={{
                  height: '18%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '15px 15px 0 0',
                  margin: '5px',
                  fontSize: '25px',
                  fontFamily: 'BMJUA',
                  fontWeight: 'bold',
                  color: '#2f5f72',
                }}
              >
                커스텀 주문제작 방법
              </div>
              <div
                style={{
                  height: '64%',
                  background: `url(${Example2}) no-repeat`,
                  backgroundColor: 'rgba(242, 242, 242, 0.2)',
                  backgroundBlendMode: 'overlay',
                  backgroundSize: 'cover',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '20px',
                  color: 'white',
                  lineHeight: '2.8',
                  fontSize: '20px',
                  fontFamily: 'BMJUA',
                }}
              >
                1. 단면으로 그려주면 사장님이 알기 쉬워요! <br />
                2. 참고할 만한 이미지를 추가할 수 있어요!
                <br />
                3. 원하는 재료들을 추가해주세요! <br />
                4. 마무리로 장바구니에 넣어주세요!
                <span style={{ color: '#726e6e' }}>
                  색상 | 펜/지우개 | 이미지 업로드 | 이미지 취소
                </span>
              </div>
              <div
                style={{
                  height: '18%',
                  fontFamily: 'Just Another Hand, cursive',
                  fontSize: '28px',
                  borderRadius: '0 0 15px 15px',
                  paddingTop: '26px',
                  color: '#726e6e',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                BUYTE BUYTE BUYTE BUYTE BUYTE BUYTE BUYTE
              </div>
            </RightContent>
          </PopupContent>
        </PopupContainer>
      )}
    </Transition>
  );
};

export default Popup;
