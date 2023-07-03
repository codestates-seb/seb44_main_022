import { useState } from 'react';
import loginImage from '../../assets/images/loginImage.png';
import { AiFillLock } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { MdLocalPostOffice } from 'react-icons/md';
import UserInput from '../../components/UserInput';
import styled from 'styled-components';

function Login() {
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
    <div style={{ display: 'flex', height: '100vh' }}>
      <div
        style={{
          backgroundImage: `url(${loginImage})`,
          flexGrow: 2,
          width: 'auto',
          height: 'auto',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      <div
        style={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontFamily: 'Just Another Hand, cursive',
              fontSize: '4rem',
              marginBottom: '4rem',
            }}
          >
            BUYTE
          </div>
          <div
            style={{
              marginTop: '100px',
              display: 'flex',
              width: '100%',
              padding: '1rem 0',
              margin: '1.5rem',
              borderBottom: '2px solid var(--normal-gray)',
              justifyContent: 'space-around',
            }}
          >
            <div style={{ color: 'var(--bright-black)' }}>로그인</div>
            <div style={{ color: 'var(--bright-black)', opacity: '0.6' }}>회원가입</div>
          </div>
          <div style={{ width: '100%' }}>
            <button
              style={{
                fontFamily: 'Roboto',
                fontWeight: '700',
                fontSize: '16px',
                width: '100%',
                padding: '1rem 3rem',
                color: 'var(--dark-blue-black)',
                border: '2px solid var(--normal-gray)',
                borderRadius: '99px',
                alignItems: 'center',
                backgroundColor: 'var(--white)',
              }}
            >
              <FcGoogle
                style={{
                  width: '1.2rem',
                  height: '1.2rem',
                  paddingTop: '2px',
                  paddingRight: '0.5rem',
                }}
              />
              Continue with Google
            </button>
          </div>
          <div style={{ width: '100%', position: 'relative', margin: '1.25rem 0' }}>
            <hr style={{ border: '1px solid var(--normal-gray)' }} />
            <div
              style={{
                position: 'absolute',
                top: '0px',
                left: '50%',
                transform: 'translateX(-50%)',
                padding: '0 2rem',
                backgroundColor: 'var(--background)',
                color: 'var(--bright-black)',
                fontSize: '14px',
              }}
            >
              BUYTE
            </div>
          </div>
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
              <button
                style={{
                  fontFamily: 'Roboto',
                  fontWeight: '700',
                  fontSize: '16px',
                  width: '100%',
                  padding: '1rem 3rem',
                  color: 'var(--white)',
                  border: '2px solid var(--normal-gray)',
                  borderRadius: '99px',
                  alignItems: 'center',
                  backgroundColor: 'var(--dark-gray)',
                }}
              >
                로그인
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
