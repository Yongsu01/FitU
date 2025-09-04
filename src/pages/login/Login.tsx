import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";

const Login: React.FC = () => {
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = "dsa";
  const [showContent, setShowContent] = useState(false);
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const LoginHandler = () => {
    // window.location.href = link;
    console.log(REST_API_KEY);
  };

  return (
    <Wrapper showContent={showContent}>
      <Logo showContent={showContent}>
        <SmallText>헬린이를 위한</SmallText>
        <Brand>FitU</Brand>
      </Logo>

      {showContent && (
        <ButtonWrapper>
          <KakaoButton onClick={LoginHandler}>카카오로 시작하기</KakaoButton>
        </ButtonWrapper>
      )}
    </Wrapper>
  );
};

export default Login;

const gradientWave = keyframes`
  0% { background-position: 0% 50%, 100% 50%, 50% 50%; }
  25% { background-position: 25% 60%, 75% 40%, 60% 55%; }
  50% { background-position: 50% 50%, 50% 50%, 40% 60%; }
  75% { background-position: 75% 40%, 25% 60%, 55% 45%; }
  100% { background-position: 0% 50%, 100% 50%, 50% 50%; }
`;

const Wrapper = styled.div<{ showContent: boolean }>`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 80px;

  background: ${({ showContent }) =>
    showContent
      ? "#fff"
      : `
        radial-gradient(circle at 20% 30%, rgba(30,144,255,0.6), transparent 70%),
        radial-gradient(circle at 80% 70%, rgba(0,82,204,0.6), transparent 60%),
        linear-gradient(135deg, #001f80, #0052cc, #76b3ef)
      `};

  background-size: 200% 200%, 150% 150%, 300% 300%;
  background-blend-mode: screen;
  transition: background 3s ease-in-out;

  ${({ showContent }) =>
    !showContent &&
    css`
      animation: ${gradientWave} 1.5s ease-in-out infinite;
    `}
`;

const Logo = styled.div<{ showContent: boolean }>`
  text-align: center;
  transition: color 1s ease-in-out;
  color: ${({ showContent }) => (showContent ? "#007AFF" : "#fff")};
`;

const SmallText = styled.div`
  font-size: 25px;
`;

const Brand = styled.h1`
  font-size: 60px;
  font-weight: bold;
  margin: 0;
`;

const ButtonWrapper = styled.div`
  margin-top: 40px;
  animation: fadeIn 1s ease forwards;
  width: 100%;
  display: flex;
  justify-content: center;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const KakaoButton = styled.button`
  background-color: #fee500;
  border: none;
  border-radius: 8px;
  padding: 14px 24px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  width: 80%;
`;
