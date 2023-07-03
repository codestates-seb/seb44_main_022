import { useState } from 'react';
import loginImage from '../../assets/images/loginImage.png';
import { FcGoogle } from 'react-icons/fc';
import LoginForm from './LoginForm';
import RoundButton from '../../components/RoundButton';
import SignUpForm from './SignUpForm';
import styled from 'styled-components';
import TextLogo from '../../components/Logo';

function Login() {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);

  return (
    <AuthContainer>
      <AuthImage />
      <AuthContentContainer>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: '20rem',
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
            <div
              style={{
                color: 'var(--bright-black)',
                opacity: `${isSignUp ? '0.6' : ''}`,
                cursor: 'pointer',
              }}
              onClick={() => setIsSignUp(false)}
            >
              로그인
            </div>
            <div
              style={{
                color: 'var(--bright-black)',
                opacity: `${isSignUp ? '' : '0.6'}`,
                cursor: 'pointer',
              }}
              onClick={() => setIsSignUp(true)}
            >
              회원가입
            </div>
          </div>
          <div style={{ width: '100%' }}>
            <RoundButton title="Continue with Google" types="default" icon={<FcGoogle />} />
          </div>
          <div style={{ width: '100%', position: 'relative', margin: '1.25rem 0' }}>
            <hr style={{ border: '1px solid var(--normal-gray)' }} />
            <TextLogo />
            {isSignUp ? <SignUpForm /> : <LoginForm />}
          </div>
        </div>
      </AuthContentContainer>
    </AuthContainer>
  );
}

const AuthContainer = styled.div`
  display: flex;
  height: 100vh;
  @media screen and (max-width: 840px) {
    flex-direction: column;
  }
`;

const AuthImage = styled.div`
  background-image: url(${loginImage});
  flex-grow: 1;
  width: auto;
  height: auto;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  @media screen and (max-width: 840px) {
    flex-grow: 0.2;
  }
`;

const AuthContentContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Login;
