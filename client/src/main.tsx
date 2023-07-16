import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import App from './App';
import { GlobalStyle } from './styles/globalStyle';
import store from './redux/store/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <GoogleOAuthProvider
      clientId={import.meta.env.VITE_GOOGLE_CLIENT_KEY}
      onScriptLoadError={() => console.log('실패')}
      onScriptLoadSuccess={() => console.log('성공')}
    >
      <BrowserRouter>
        <GlobalStyle />
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </Provider>
);
