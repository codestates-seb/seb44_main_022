import { useGoogleLogin } from '@react-oauth/google';
import { ButtonProps } from '../../assets/interface/Button.interface';
// import { getMembers } from '../../api/memberApis';
import { Icons, RoundButtonStyle } from './RoundButton.style';
// import { postGoogleOAuth } from '../../api/authApis';

function RoundButton({ title, types, icon, enabled }: ButtonProps) {
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
      // postGoogleOAuth(code)
      //   .then((res) => console.log(res))
      //   .catch((err) => console.log(err));
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
