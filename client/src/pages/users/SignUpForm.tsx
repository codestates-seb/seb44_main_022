import { MdLocalPostOffice } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import UserInput from '../../components/UserInput';
import { AiFillLock } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import RoundButton from '../../components/RoundButton';
import { AUTH_FAILED_MESSAGE, REGEX } from '../../assets/constantValue/constantValue';

function SignUpForm() {
  const [nickname, setNickname] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userIdValid, setUserIdValid] = useState<boolean>(false);
  const [passwordValid, setPasswordValid] = useState<boolean>(false);
  const [nicknameValid, setNicknameValid] = useState<boolean>(false);

  const handleLoginSubmit: React.FormEventHandler<HTMLElement> = (e) => {
    e.preventDefault();
    if (userIdValid && passwordValid) {
      // 통신 코드 예정
      console.log(nickname, userId, password);
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
    setNicknameValid(strCheck(nickname, 'nickname'));
  }, [nickname]);

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
          setState={setNickname}
          state={nickname}
          placeholderText="Nickname"
          dataValid={nicknameValid}
          vaildMessage={AUTH_FAILED_MESSAGE.nickname}
          icon={<FaUserCircle />}
        />
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
      <div style={{ marginTop: '2.5rem' }}>
        <RoundButton title="회원가입" types="dark" enabled={userIdValid && passwordValid} />
        <RoundButton title="사업자 회원이신가요?" types="purple" />
      </div>
    </form>
  );
}

export default SignUpForm;
