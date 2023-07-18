import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { ButtonProps } from '../../assets/interface/Button.interface';
import { postGoogleOAuthLogin } from '../../api/authApis';
import { LocalStorage } from '../../utils/browserStorage';
import { LOCAL_STORAGE_KEY_LIST } from '../../assets/constantValue/constantValue';
import { Icons, RoundButtonStyle } from './RoundButton.style';

function RoundButton({ title, types, icon, enabled }: ButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (types === 'google') handleGoogleLogin();
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: ({ code }) => {
      postGoogleOAuthLogin(code)
        .then((res) => {
          const accessToken = res.headers['authorization'];
          LocalStorage.set<string>(LOCAL_STORAGE_KEY_LIST.AccessToken, accessToken);
          navigate('/');
          return;
        })
        .catch(() => alert('로그인 실패'));
    },
    onError: (errorResponse) => {
      console.log(errorResponse);
    },
    flow: 'auth-code',
  });

  return (
    <RoundButtonStyle
      types={types}
      disabled={enabled === false && true}
      onClick={() => handleClick()}
    >
      {icon && <Icons>{icon}</Icons>}
      {title}
    </RoundButtonStyle>
  );
}

export default RoundButton;
