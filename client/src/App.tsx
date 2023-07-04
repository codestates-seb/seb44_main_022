import { Route, Routes } from 'react-router-dom';
import Main from './pages/main/Main';
import Auth from './pages/users/Auth';
import Mypage from './pages/mypage/Mypage';
import ShoppingCart from './pages/order/ShoppingCart';
import Store from './pages/store/Store';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/mypage/:id" element={<Mypage />} />
      <Route path="/cart" element={<ShoppingCart />} />
      <Route path="/store" element={<Store />} />
    </Routes>
  );
}

export default App;
