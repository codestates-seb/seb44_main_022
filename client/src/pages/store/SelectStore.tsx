import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SelectStoreImg from '../../assets/images/img_select/select_store.png';
import SelectMenuImg from '../../assets/images/img_select/select_menu.png';
import { Container, ContentContainer, Button, TextButtonContainer } from './SelectStore.style';

const MainRoot = styled.div`
  background-color: var(--background);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;
const Text = styled.div`
  font-size: 16px;
  text-align: center;
  color: var(--light-gray);

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const SelectStore = () => {
  const navigate = useNavigate();

  const handleSelectStoreClick = () => {
    navigate('/store');
  };
  const handleSelectProductClick = () => {
    navigate('/recommended');
  };
  return (
    <MainRoot>
      <div
        style={{
          marginTop: '20vh',
          fontFamily: 'BMJUA',
          fontSize: '32px',
          fontWeight: 'bold',
          textAlign: 'center',
          color: 'var(--bright-black)',
        }}
      >
        ORDER
      </div>
      <Container>
        <ContentContainer>
          <img
            src={SelectStoreImg}
            alt="Select Store"
            style={{
              width: '80%',
              fontFamily: 'BMJUA',
              maxWidth: '300px',
              height: 'auto',
              objectFit: 'cover',
              marginTop: '5px',
            }}
          />
          <Button onClick={handleSelectStoreClick}>입점매장 보기(클릭!)</Button>
          <TextButtonContainer>
            <Text>
              입점된 매장들을 보고 싶으시면 <br /> 리스트를 먼저 확인해보세요
            </Text>
            <div
              style={{
                marginTop: '22px',
                fontSize: '14px',
                fontFamily: 'BMJUA',
                color: '#bebebe',
                textDecoration: 'underline',
                textAlign: 'center',
              }}
            >
              다양한 매장들을 확인해보세요.
            </div>
          </TextButtonContainer>
        </ContentContainer>
        <ContentContainer>
          <img
            src={SelectMenuImg}
            alt="Select Menu"
            style={{
              width: '80%',
              fontFamily: 'BMJUA',
              maxWidth: '300px',
              height: 'auto',
              objectFit: 'cover',
            }}
          />
          <Button onClick={handleSelectProductClick}>추천메뉴 보기 (클릭!)</Button>
          <TextButtonContainer>
            <Text>
              추천 메뉴를 보고 싶으시면
              <br /> 추천 메뉴 보기를 선택해주세요
            </Text>
            <div
              style={{
                marginTop: '21px',
                fontSize: '14px',
                color: '#bebebe',
                fontFamily: 'BMJUA',
                textDecoration: 'underline',
                textAlign: 'center',
              }}
            >
              {' '}
              다양한 메뉴를 확인해보세요.
            </div>
          </TextButtonContainer>
        </ContentContainer>
      </Container>
    </MainRoot>
  );
};

export default SelectStore;
