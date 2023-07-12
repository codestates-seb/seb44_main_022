import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { ButtonProps } from '../../assets/interface/Button.interface';
// import { getMembers } from '../../api/memberApis';
import { postGoogleOAuth, postGoogleOAuthLogin } from '../../api/authApis';
import { Icons, RoundButtonStyle } from './RoundButton.style';
// import { postGoogleOAuth } from '../../api/authApis';

function RoundButton({ title, types, icon, enabled }: ButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log('a');
    if (types === 'google') handleGoogleLogin();
    // getMembers()
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: ({ code }) => {
      console.log(code);
      postGoogleOAuthLogin(code)
        .then((res) => {
          const accessToken = res.headers['authorization'];
          localStorage.setItem('AccessToken', accessToken);
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
