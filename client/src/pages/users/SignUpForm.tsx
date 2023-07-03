import { MdLocalPostOffice } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import UserInput from '../../components/UserInput';
import { AiFillLock } from 'react-icons/ai';
import { useState } from 'react';
import RoundButton from '../../components/RoundButton';

function SignUpForm() {
  const [nickname, setNickname] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <form>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <UserInput
          setState={setNickname}
          state={nickname}
          placeholderText="Nickname"
          icon={<FaUserCircle />}
        />
        <UserInput
          setState={setUserId}
          state={userId}
          placeholderText="ID"
          icon={<MdLocalPostOffice />}
        />
        <UserInput
          setState={setPassword}
          state={password}
          placeholderText="Password"
          icon={<AiFillLock />}
        />
      </div>
      <div style={{ marginTop: '2.5rem' }}>
        <RoundButton title="회원가입" types="dark" />
        <RoundButton title="사업자 회원이신가요?" types="purple" />
      </div>
    </form>
  );
}

export default SignUpForm;
