import React from "react";
import * as S from "./styled_components/BodyInput.styled";

type BodyInputProps = {
  name: string;
  id: string;
  placeholder?: string;
  unit?: string;
  value: string;
  onChange: (id: string, value: string) => void;
};

export default function BodyInput({
  name,
  id,
  placeholder,
  unit,
  value,
  onChange,
}: BodyInputProps) {
  const bodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    onChange?.(id, raw);
  };

  return (
    <S.Container>
      <S.Label>{name}</S.Label>
      <S.Input
        id={id}
        type="text"
        value={value}
        onChange={bodyChange}
        placeholder={placeholder}
      />
      {unit && <S.Unit>{unit}</S.Unit>}
    </S.Container>
  );
}
