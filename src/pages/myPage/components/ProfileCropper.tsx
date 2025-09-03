import React, { useState, useCallback } from "react";
import Cropper, { Area } from "react-easy-crop";
import * as S from "./styled_components/ProfileCropper.styled";

type ProfileCropperProps = {
  imageSrc: string;
  onCancel: () => void;
  onCropComplete: (croppedImage: string) => void;
};

export default function ProfileCropper({
  imageSrc,
  onCancel,
  onCropComplete,
}: ProfileCropperProps) {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropCompleteInternal = useCallback(
    (_croppedArea: Area, croppedArea: Area) => {
      setCroppedAreaPixels(croppedArea);
    },
    []
  );

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = (err) => reject(err);
      image.src = url;
    });

  const getCroppedImg = async (imageSrc: string, pixelCrop: Area) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return canvas.toDataURL("image/jpeg");
  };

  const onCropConfirm = async () => {
    if (!croppedAreaPixels) return;
    const croppedImg = await getCroppedImg(imageSrc, croppedAreaPixels);
    onCropComplete(croppedImg);
  };

  return (
    <S.Container>
      <Cropper
        image={imageSrc}
        crop={crop}
        zoom={zoom}
        aspect={1}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropCompleteInternal}
      />
      <S.ButtonGroup>
        <S.CancelButton onClick={onCancel}>취소</S.CancelButton>
        <S.ConfirmButton onClick={onCropConfirm}>적용</S.ConfirmButton>
      </S.ButtonGroup>
    </S.Container>
  );
}
