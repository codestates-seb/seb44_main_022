import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import LoginForm from '../LoginForm';
import RoundButton from '../../../components/RoundButton/RoundButton';
import SignUpForm from '../SignUpForm';
import Logo from '../../../components/Logo/Logo';
import { AuthCategory, AuthContainer, AuthContentContainer, AuthImage } from './Auth.style';

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
          <Logo />
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
            <AuthCategory isSignUp={isSignUp} types="login" onClick={() => setIsSignUp(false)}>
              로그인
            </AuthCategory>
            <AuthCategory isSignUp={isSignUp} types="signup" onClick={() => setIsSignUp(true)}>
              회원가입
            </AuthCategory>
          </div>
          <div style={{ width: '100%' }}>
            <RoundButton title="Continue with Google" types="google" icon={<FcGoogle />} />
          </div>
          <div style={{ width: '100%', position: 'relative', margin: '1.25rem 0' }}>
            <hr style={{ border: '1px solid var(--normal-gray)' }} />
            {isSignUp ? <SignUpForm /> : <LoginForm />}
          </div>
        </div>
      </AuthContentContainer>
    </AuthContainer>
  );
}

export default Login;
