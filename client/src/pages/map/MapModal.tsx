import styled from 'styled-components';
import { MapModalProps } from '../../assets/interface/Map.interface';

function MapModal({ position, isClose, setIsClose, CheckState }: MapModalProps) {
  const a = () => {
    setIsClose(true);
    CheckState();
  };

  return (
    <MarkerModal toggle={isClose ? 'fadeOut' : 'fadeIn'}>
      <div
        style={{
          position: 'absolute',
          right: '5%',
          cursor: 'pointer',
        }}
        onClick={a}
      >
        x
      </div>
      {position.title}
    </MarkerModal>
  );
}

const MarkerModal = styled.div<{ toggle: string }>`
  position: absolute;
  z-index: 10;
  border: 1px solid red;
  width: 15vw;
  height: 40%;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 28px;
  min-width: 250px;
  max-width: 315px;
  padding: 1rem;
  top: 40%;
  right: 5%;

  animation: ${(props) => props.toggle} 0.3s;
`;

export default MapModal;
