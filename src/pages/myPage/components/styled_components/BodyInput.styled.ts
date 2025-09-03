import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
`;

export const Label = styled.span`
  width: 45%;
  font-size: 1rem;
  color: black;
`;

export const Input = styled.input`
  width: 40%;
  padding: 4px;
  border-radius: 6px;
  text-align: right;
  font-size: 0.875rem;
  background-color: #4b4b4b;
  color: white;
  border: 1px solid black;

  &:focus {
    outline: none;
    border-color: #00bcd4;
  }
`;

export const Unit = styled.span`
  margin-left: 4px;
  font-size: 0.875rem;
  color: white;
`;
