import { useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../LoginForm';
import RoundButton from '../../../components/RoundButton/RoundButton';
import SignUpForm from '../SignUpForm';
import Logo from '../../../components/Logo/Logo';
import { LocalStorage } from '../../../utils/browserStorage';
import { LOCAL_STORAGE_KEY_LIST } from '../../../assets/constantValue/constantValue';
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
  const navigate = useNavigate();
  useEffect(() => {
    if (LocalStorage.get(LOCAL_STORAGE_KEY_LIST.AccessToken) !== null) {
      navigate('/');
    }
  }, []);

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
