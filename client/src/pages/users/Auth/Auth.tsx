import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import LoginForm from '../LoginForm';
import RoundButton from '../../../components/RoundButton/RoundButton';
import SignUpForm from '../SignUpForm';
import Logo from '../../../components/Logo/Logo';
import {
  AuthCategory,
  AuthCategoryContainer,
  AuthContainer,
  AuthContentContainer,
  AuthForm,
  AuthImage,
} from './Auth.style';

function Login() {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);

  return (
    <AuthContainer>
      <AuthImage />
      <AuthContentContainer>
        <AuthForm>
          <Logo />
          <AuthCategoryContainer>
            <AuthCategory isSignUp={isSignUp} types="login" onClick={() => setIsSignUp(false)}>
              로그인
            </AuthCategory>
            <AuthCategory isSignUp={isSignUp} types="signup" onClick={() => setIsSignUp(true)}>
              회원가입
            </AuthCategory>
          </AuthCategoryContainer>
          <div style={{ width: '100%' }}>
            <RoundButton title="Continue with Google" types="google" icon={<FcGoogle />} />
          </div>
          <div style={{ width: '100%', position: 'relative', margin: '1.25rem 0' }}>
            <hr style={{ border: '1px solid var(--normal-gray)' }} />
            {isSignUp ? <SignUpForm setIsSignUp={setIsSignUp} /> : <LoginForm />}
          </div>
        </AuthForm>
      </AuthContentContainer>
    </AuthContainer>
  );
}

export default Login;
