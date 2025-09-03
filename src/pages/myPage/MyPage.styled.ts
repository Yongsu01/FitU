import styled from "styled-components";

// 페이지 전체 컨테이너
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: flex-start;
  padding: 0 16px;
`;

// 상단 정보 영역
export const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 402px;
  margin: 5rem auto 0 auto;
  width: 100%;
`;

// 신체 정보 입력 영역
export const BodyInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 60%;
`;

export const SectionTitle = styled.p`
  font-size: 1.25rem;
  color: black;
  border-bottom: 2px solid black;
  padding-bottom: 8px;
  margin-bottom: 8px;
`;

// 프로필 이미지 영역
export const ProfileWrapper = styled.div`
  width: 200px;
  height: 200px;
  margin-left: 16px;
  margin-top: 2.5rem;
`;

// 버튼
export const Button = styled.button`
  font-weight: bold;
  border: 2px solid black;
  border-radius: 8px;
  width: 100%;
  margin-top: 16px;
  padding: 8px 0;
  cursor: pointer;
`;

// 차트 모달
export const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background-color: white;
  width: 90%;
  max-width: 80rem;
  padding: 50px 20px 20px 20px;
  border-radius: 12px;
  position: relative;
`;
