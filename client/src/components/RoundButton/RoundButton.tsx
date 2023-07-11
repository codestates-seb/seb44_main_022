// import { useGoogleLogin } from '@react-oauth/google';
import { ButtonProps } from '../../assets/interface/Button.interface';
// import { postAccessToken } from '../../api/authApis';
import { getMembers } from '../../api/memberApis';
import { Icons, RoundButtonStyle } from './RoundButton.style';

function RoundButton({ title, types, icon, enabled }: ButtonProps) {
  const handleClick = () => {
    console.log('a');
    if (types === 'google')
      getMembers()
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    // handleGoogleLogin();

    // postAccessToken()
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
  };

  // const handleGoogleLogin = useGoogleLogin({
  //   onSuccess: ({ code }) => {
  //     console.log(code);
  //     // axios
  //     //   .get('https://604b-218-53-232-194.ngrok-free.app/oauth2/authorization/google', {
  //     //     headers: {
  //     //       'ngrok-skip-browser-warning': true,
  //     //     },
  //     //   })
  //     //   .then((res) => console.log(res))
  //     //   .catch((err) => console.log(err));
  //   },
  //   onError: (errorResponse) => {
  //     console.log(errorResponse);
  //   },
  //   flow: 'auth-code',
  // });

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
