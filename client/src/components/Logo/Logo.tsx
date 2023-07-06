import { useNavigate } from 'react-router-dom';
import { LogoFont } from './Logo.style';

function TextLogo() {
  const navigate = useNavigate();

  const handleClickHome = () => {
    navigate('/');
  };

  return <LogoFont onClick={handleClickHome}>BUYTE</LogoFont>;
}

export default TextLogo;
