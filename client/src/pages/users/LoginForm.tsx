import { MdLocalPostOffice } from 'react-icons/md';
import UserInput from '../../components/UserInput';
import { AiFillLock } from 'react-icons/ai';
import { useState } from 'react';
import RoundButton from '../../components/RoundButton';

function LoginForm() {
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLoginSubmit: React.FormEventHandler<HTMLElement> = (e) => {
    e.preventDefault();
    setUserId('');
    setPassword('');
    console.log(userId, password);
    return;
  };

  return (
    <form onSubmit={handleLoginSubmit}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
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
        <RoundButton title="로그인" types="dark" />
      </div>
    </form>
  );
}

export default LoginForm;
