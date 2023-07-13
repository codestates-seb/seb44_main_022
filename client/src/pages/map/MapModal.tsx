import { MapModalProps } from '../../assets/interface/Map.interface';
import { STORE_MAP_INTRODUCE_LIMIT } from '../../assets/constantValue/constantValue';
import { MarkerModal } from './Map.style';

function MapModal({ position, isClose, handleCloseModal }: MapModalProps) {
  const sliceText = (text: string) => {
    if (text.length > STORE_MAP_INTRODUCE_LIMIT)
      return text.slice(0, STORE_MAP_INTRODUCE_LIMIT) + '...';
    return text;
  };

  return (
    <MarkerModal toggle={isClose ? 'fadeOut' : 'fadeIn'}>
      <div
        style={{
          position: 'absolute',
          right: '5%',
          cursor: 'pointer',
          top: '2%',
          fontSize: '1.5rem',
          fontFamily: 'Just Another Hand, cursive',
        }}
        onClick={handleCloseModal}
      >
        BUYTE
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: '2rem',
            paddingTop: '2rem',
          }}
        >
          <img
            src={position.storeImage}
            style={{ width: '2.75rem', height: '2.75rem', borderRadius: '50%' }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              paddingLeft: '1.25rem',
            }}
          >
            <div
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
              }}
            >
              {position.storeName}
            </div>
            <div
              style={{
                fontSize: '10px',
                fontWeight: 'normal',
                color: 'gray',
                paddingTop: '6px',
              }}
            >
              {position.storeAddress}
            </div>
          </div>
        </div>

        <img
          src={position.productPreferenceList[0].productImage}
          style={{ width: '100%', padding: '2rem 2rem' }}
          alt="추천 제품 사진"
        />
        <div style={{ padding: '1.5rem', fontSize: '14px', lineHeight: '1.25' }}>
          {sliceText(position.storeIntroduction)}
        </div>
      </div>
    </MarkerModal>
  );
}

export default MapModal;