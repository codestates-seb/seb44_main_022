import { MdLocalPostOffice } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import { AiFillLock } from 'react-icons/ai';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserInput from '../../components/UserInput/UserInput';
import RoundButton from '../../components/RoundButton/RoundButton';
import { AUTH_FAILED_MESSAGE } from '../../assets/constantValue/constantValue';
import { postSignUp } from '../../api/authApis';
import useValidText from '../../hooks/useValidText';
import { SignUpFormProps } from '../../assets/interface/Auth.interface';

function SignUpForm({ setIsSignUp }: SignUpFormProps) {
  const [nickname, setNickname] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userIdValid, setUserIdValid] = useState<boolean>(false);
  const [passwordValid, setPasswordValid] = useState<boolean>(false);
  const [nicknameValid, setNicknameValid] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLoginSubmit: React.FormEventHandler<HTMLElement> = (e) => {
    e.preventDefault();
    if (userIdValid && passwordValid) {
      postSignUp(userId, password, nickname)
        .then(() => {
          alert('회원가입에 성공하셨습니다.');
          setIsSignUp(false);
          navigate('/auth');
        })
        .catch(() => alert('데이터를 잘못 입력했음 ㅇㅇ'));
    }
  };

  useValidText(nickname, setNicknameValid, 'nickname');
  useValidText(userId, setUserIdValid, 'id');
  useValidText(password, setPasswordValid, 'password');

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
