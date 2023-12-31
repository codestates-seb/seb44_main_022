import { useNavigate } from 'react-router-dom';
import RectangleButton from '../../components/RectangleButton/RectangleButton';
import { NotFountContentBox } from './NotFount.style';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div style={{ marginTop: '80px', width: '100%', height: 'calc(100vh - 244px)' }}>
      <NotFountContentBox>
        <div style={{ fontSize: '10rem' }}>404</div>
        <div style={{ fontSize: '3rem' }}>Page Not Found</div>
        <div style={{ textAlign: 'center' }}>
          <div>페이지를 찾을 수 없습니다.</div>
          <div>입력하신 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.</div>
        </div>
        <RectangleButton text="홈으로 가기" types="purple" handleClick={() => navigate('/')} />
      </NotFountContentBox>
    </div>
  );
}

export default NotFound;
