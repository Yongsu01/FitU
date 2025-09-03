import "./App.css";
import Login from "./pages/login/Login";
import AdminLogin from "./pages/adminLogin/adminLogin";
import AdminRequest from "./pages/adminMain/adminRequest";
import AdminPost from "./pages/adminMain/adminPost";
import AdminMember from "./pages/adminMain/adminMember";

import { Route, Routes, useLocation } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/adminrequest" element={<AdminRequest />} />
        <Route path="/adminpost" element={<AdminPost />} />
        <Route path="/adminmember" element={<AdminMember />} />
      </Routes>
    </div>
  );
}

export default App;
