import './App.css';
import Login from './pages/login/Login';
import { Route, Routes, useLocation } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
