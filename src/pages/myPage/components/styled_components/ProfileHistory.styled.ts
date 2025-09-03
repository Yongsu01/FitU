import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 50;
`;

export const Modal = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  max-width: 400px;
  width: 100%;
  position: relative;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  color: #4b5563;
  font-size: 1.25rem;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    color: black;
  }
`;

export const Title = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 12px;
`;

export const UploadButton = styled.button`
  padding: 8px 16px;
  background-color: #06b6d4;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #0891b2;
  }
`;

export const HistorySection = styled.div`
  margin-top: 16px;
`;

export const HistoryTitle = styled.h3`
  font-size: 0.875rem;
  color: #374151;
  margin-bottom: 8px;
`;

export const HistoryList = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
`;

export const HistoryImage = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  cursor: pointer;
  border: 1px solid #d1d5db;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;
