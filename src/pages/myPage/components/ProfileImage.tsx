import React from "react";
import * as S from "./styled_components/ProfileImage.styled";

type ProfileImageProps = {
  viewImage: string;
  onClick: () => void;
};

export default function ProfileImage({ viewImage, onClick }: ProfileImageProps) {
  return (
    <S.Container onClick={onClick}>
      <S.Image src={viewImage} alt="프로필 이미지" />
    </S.Container>
  );
}
