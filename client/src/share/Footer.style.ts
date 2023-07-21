import styled from 'styled-components';

export const FooterContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--purple);
  width: 100%;
  color: var(--color-white);
  font-family: var(--font-noto-sans-kr);
  margin-top: auto;
`;
export const FooterInfoContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 40%;
  margin-bottom: 8px;

  @media (max-width: 1000px) {
    font-size: 14px;
    margin-top: 24px;
    width: 100%;
  }
`;

export const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 70px;

  @media (max-width: 1000px) {
    font-size: 12px;
    margin-left: 50px;
  }
`;
export const RightInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 1000px) {
    font-size: 12px;
  }
`;
export const ImageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 12%;
  @media (max-width: 1000px) {
    width: 50%;
  }
`;
