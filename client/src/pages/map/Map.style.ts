import styled from 'styled-components';

export const MapContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 80%;
  min-height: 500px;
  margin-bottom: 2rem;
`;

export const MarkerModal = styled.div<{ toggle: string }>`
  position: absolute;
  z-index: 10;
  width: 330px;
  height: 500px;
  background-color: rgb(255, 255, 255);
  border-radius: 15px;
  border: 1px solid var(--normal-gray);
  top: 25%;
  right: 15%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  animation: ${({ toggle }) => toggle} 0.3s;
  box-shadow: 1px 1px 5px 1px var(--light-gray);
  @media screen and (max-width: 1000px) {
    animation: fadeNone 0.3s forwards;
  }
  @media screen and (max-height: 950px) {
    animation: fadeUpNone 0.3s forwards;
  }
`;
