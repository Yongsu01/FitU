import './App.css';
import Login from './pages/login/Login';
import AdminLogin from './pages/adminLogin/adminLogin';
import MyPage from './pages/myPage/MyPage';
import { Route, Routes, useLocation } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/adminlogin' element={<AdminLogin/>}/>
        <Route path='/mypage' element={<MyPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
