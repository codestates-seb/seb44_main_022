import { MdLocalPostOffice } from 'react-icons/md';
import { AiFillLock } from 'react-icons/ai';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserInput from '../../components/UserInput/UserInput';
import RoundButton from '../../components/RoundButton/RoundButton';
import {
  AUTH_FAILED_MESSAGE,
  LOCAL_STORAGE_KEY_LIST,
} from '../../assets/constantValue/constantValue';
import { postLogin } from '../../api/authApis';
import useValidText from '../../hooks/useValidText';
import { LocalStorage } from '../../utils/browserStorage';
import { LinkText } from './Auth/Auth.style';

function LoginForm() {
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userIdValid, setUserIdValid] = useState<boolean>(false);
  const [passwordValid, setPasswordValid] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLoginSubmit: React.FormEventHandler<HTMLElement> = (e) => {
    e.preventDefault();
    if (userIdValid && passwordValid) {
      postLogin(userId, password)
        .then((res) => {
          const accessToken = res.headers['authorization'];
          LocalStorage.set<string>(LOCAL_STORAGE_KEY_LIST.AccessToken, accessToken);
          navigate('/');
          return;
        })
        .catch(() => alert('로그인 실패'));
      return;
    }
  };

  useValidText(userId, setUserIdValid, 'id');
  useValidText(password, setPasswordValid, 'password');

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
        <LinkText>Forgot password</LinkText>
      </div>
      <div>
        <RoundButton title="로그인" types="dark" enabled={userIdValid && passwordValid} />
      </div>
    </form>
  );
}

export default LoginForm;
