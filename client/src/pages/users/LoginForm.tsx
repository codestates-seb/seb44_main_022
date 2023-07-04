import { MdLocalPostOffice } from 'react-icons/md';
import UserInput from '../../components/UserInput';
import { AiFillLock } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import RoundButton from '../../components/RoundButton';
import { AUTH_FAILED_MESSAGE, REGEX } from '../../assets/constantValue/constantValue';

function LoginForm() {
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userIdValid, setUserIdValid] = useState<boolean>(false);
  const [passwordValid, setPasswordValid] = useState<boolean>(false);

  const handleLoginSubmit: React.FormEventHandler<HTMLElement> = (e) => {
    e.preventDefault();
    if (userIdValid && passwordValid) {
      // 통신 코드 예정
      console.log(userId, password);
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
