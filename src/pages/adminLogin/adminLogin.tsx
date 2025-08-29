import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const AdminLogin: React.FC = () => {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!id || !password) {
      alert("아이디 또는 비밀번호가 올바르지 않습니다.");
      return;
    }
    console.log("로그인:", { id, password });
    navigate("/adminmain");
  };

  return (
    <LoginContainer>
      <Title>로그인</Title>
      <LoginCard>
        <form onSubmit={handleLogin}>
          <div className="input">
            <input
              type="text"
              placeholder="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">로그인</button>
        </form>
      </LoginCard>
    </LoginContainer>
  );
};

export default AdminLogin;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 200px;
`;

const Title = styled.div`
  font-size: 34px;
  font-weight: 700;
`;

const LoginCard = styled.div`
  form {
    display: flex;
    flex-direction: column;
    margin-top: 80px;
  }
  input,
  button {
    width: 357px;
    height: 58px;
    border-radius: 12px;
    border: none;
    outline: none;
    box-sizing: border-box;
  }

  input {
    margin-top: 18px;
    display: flex;
    flex-direction: column;
    padding-left: 18px;
    background-color: #f8fafb;

    font-size: 18px;
  }

  input::placeholder {
    color: #abb5bd;
    font-size: 18px;
  }

  button {
    display: flex;
    margin-top: 60px;
    align-items: center;
    justify-content: center;
    background-color: #212528;
    color: #fff;
    cursor: pointer;

    font-size: 24px;
    font-weight: 400;
  }
`;
