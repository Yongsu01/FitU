import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface AdminHeaderProps {
  active: "request" | "post" | "member";
  setActive: React.Dispatch<
    React.SetStateAction<"request" | "post" | "member">
  >;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ active, setActive }) => {
  const navigate = useNavigate();

  const handleClick = (tab: "request" | "post" | "member") => {
    setActive(tab);
    switch (tab) {
      case "request":
        navigate("/adminRequest");
        break;
      case "post":
        navigate("/adminPost");
        break;
      case "member":
        navigate("/adminMember");
        break;
    }
  };
  return (
    <HeaderContainer>
      <Nav>
        <NavButton
          active={active === "request"}
          onClick={() => handleClick("request")}
        >
          요청 문의
        </NavButton>
        <NavButton
          active={active === "post"}
          onClick={() => handleClick("post")}
        >
          게시물 관리
        </NavButton>
        <NavButton
          active={active === "member"}
          onClick={() => handleClick("member")}
        >
          회원 관리
        </NavButton>
      </Nav>
    </HeaderContainer>
  );
};

export default AdminHeader;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 33px 24px;
  margin: 21px 367px;
  align-items: center;

  width: 100%;
  max-width: 1200px;
  min-width: 600px;
  margin: 0 auto;
`;

const Nav = styled.nav`
  display: flex;
  gap: 96px;
`;

const NavButton = styled.button<{ active?: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 700;
  font-size: 22px;
  color: #212528;

  padding-bottom: 27px;
  border-bottom: ${({ active }) => (active ? "2px solid #212528" : "none")};
`;
