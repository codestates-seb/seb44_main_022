import { MdLocalPostOffice } from 'react-icons/md';
import UserInput from '../../components/UserInput/UserInput';
import { AiFillLock } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import RoundButton from '../../components/RoundButton/RoundButton';
import { AUTH_FAILED_MESSAGE, REGEX } from '../../assets/constantValue/constantValue';
import { useDispatch } from 'react-redux';
import { setAccessToken } from '../../redux/reducer/loginReducer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginForm() {
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userIdValid, setUserIdValid] = useState<boolean>(false);
  const [passwordValid, setPasswordValid] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginSubmit: React.FormEventHandler<HTMLElement> = (e) => {
    e.preventDefault();
    if (userIdValid && passwordValid) {
      // 통신 코드 예정
      // axios
      //   .post(
      //     'https://604b-218-53-232-194.ngrok-free.app/login',
      //     {
      //       loginId: userId,
      //       password: password,
      //     },
      //     {
      //       headers: {
      //         'ngrok-skip-browser-warning': true,
      //       },
      //     }
      //   )
      //   .then((res) => console.log(res))
      //   .catch((err) => console.log(err));
      dispatch(setAccessToken('AccessToken'));
      document.cookie = `refreshToken=refreshToken; Secure; Path=/;`;
      console.log(userId, password);
      navigate('/');
      alert('통신 성공');
      return;
    }
  };

  const strCheck = (str: string, type: string) => {
    if (type === 'id') {
      return REGEX.id.test(str);
    }
    if (type === 'password') {
      return REGEX.password.test(str);
    }
    return REGEX.nickname.test(str);
  };

  useEffect(() => {
    setUserIdValid(strCheck(userId, 'id'));
  }, [userId]);

  useEffect(() => {
    setPasswordValid(strCheck(password, 'password'));
  }, [password]);

  return (
    <form onSubmit={handleLoginSubmit}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <UserInput
          setState={setUserId}
          state={userId}
          placeholderText="ID"
          dataValid={userIdValid}
          vaildMessage={AUTH_FAILED_MESSAGE.id}
          icon={<MdLocalPostOffice />}
        />
        <UserInput
          setState={setPassword}
          state={password}
          placeholderText="Password"
          dataValid={passwordValid}
          vaildMessage={AUTH_FAILED_MESSAGE.password}
          icon={<AiFillLock />}
        />
      </div>
      <div
        style={{
          margin: '1rem 0',
        }}
      >
        <a
          style={{
            color: 'var(--bright-black)',
            fontSize: '14px',
            display: 'flex',
            justifyContent: 'center',
            textDecorationLine: 'underline',
          }}
        >
          Forgot password
        </a>
      </div>
      <div>
        <RoundButton title="로그인" types="dark" enabled={userIdValid && passwordValid} />
      </div>
    </form>
  );
}

export default LoginForm;
