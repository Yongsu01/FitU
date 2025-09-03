"use client";

import { useState, useRef, useEffect } from "react";
import ProfileCropper from "./ProfileCropper";
import * as S from "./styled_components/ProfileHistory.styled";
import DefaultProfile from "../../../assets/images/anonymous_profile_image2.svg";

interface ProfileHistoryProps {
  onClose: () => void;
  onImageChange: (img: string) => void;
}

interface HistoryItem {
  url: string;
}

export default function ProfileHistory({ onClose, onImageChange }: ProfileHistoryProps) {
  const [showCropper, setShowCropper] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [historyImages, setHistoryImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const API_BASE = "https://hanseifitu.shop";

  useEffect(() => {
    const fetchHistory = async () => {
      const token = sessionStorage.getItem("Authorization");
      if (!token) return;

      try {
        const res = await fetch(`${API_BASE}/body-image/history`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("히스토리 불러오기 실패");

        const data: HistoryItem[] = await res.json();
        const urls = data.map((item) => item.url || DefaultProfile);
        setHistoryImages(urls);
      } catch (err) {
        console.error("프로필 히스토리 에러:", err);
      }
    };

    fetchHistory();
  }, []);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setSelectedImage(reader.result);
          setShowCropper(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropCancel = () => {
    setShowCropper(false);
    setSelectedImage(null);
  };

  const handleCropComplete = async (croppedImage: string) => {
    const token = sessionStorage.getItem("Authorization");
    if (!token) return;

    try {
      const blob = await (await fetch(croppedImage)).blob();
      const formData = new FormData();
      formData.append("image", blob, "profile.jpg");

      const res = await fetch(`${API_BASE}/body-image`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error("이미지 업로드 실패");

      const data = await res.json();
      const newUrl = data.imageUrl || DefaultProfile;
      const updated = [newUrl, ...historyImages].slice(0, 10);
      setHistoryImages(updated);
      onImageChange(newUrl);
      onClose();
    } catch (err) {
      console.error("이미지 업로드 에러:", err);
    } finally {
      setShowCropper(false);
      setSelectedImage(null);
    }
  };

  return (
    <S.Overlay>
      {!showCropper && (
        <S.Modal>
          <S.CloseButton onClick={onClose}>✖</S.CloseButton>
          <S.Title>프로필 이미지 변경</S.Title>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onFileChange}
            style={{ display: "none" }}
          />

          <S.UploadButton onClick={() => fileInputRef.current?.click()}>
            이미지 업로드
          </S.UploadButton>

          {historyImages.length > 0 && (
            <S.HistorySection>
              <S.HistoryTitle>이전 이미지</S.HistoryTitle>
              <S.HistoryList>
                {historyImages.map((img, idx) => (
                  <S.HistoryImage
                    key={idx}
                    src={img || DefaultProfile}
                    alt={`history-${idx}`}
                    onClick={() => {
                      onImageChange(img || DefaultProfile);
                      onClose();
                    }}
                  />
                ))}
              </S.HistoryList>
            </S.HistorySection>
          )}
        </S.Modal>
      )}

      {showCropper && selectedImage && (
        <ProfileCropper
          imageSrc={selectedImage}
          onCancel={handleCropCancel}
          onCropComplete={handleCropComplete}
        />
      )}
    </S.Overlay>
  );
}


// import { useState, useRef, useEffect } from "react";
// import ProfileCropper from "./ProfileCropper";
// import * as S from "./ProfileHistory.styled";

// interface ProfileHistoryProps {
//   onClose: () => void;
//   onImageChange: (img: string) => void;
// }

// // API에서 받는 히스토리 이미지 타입
// interface BodyImageHistoryItem {
//   url: string;
//   createdAt: string; // 필요하다면
// }

// export default function ProfileHistory({
//   onClose,
//   onImageChange,
// }: ProfileHistoryProps) {
//   const [showCropper, setShowCropper] = useState(false);
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [historyImages, setHistoryImages] = useState<string[]>([]);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const API_BASE = "https://hanseifitu.shop";

//   useEffect(() => {
//     const fetchHistory = async () => {
//       const token = sessionStorage.getItem("Authorization");
//       if (!token) return;

//       try {
//         const res = await fetch(`${API_BASE}/body-image/history`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (!res.ok) throw new Error("히스토리 불러오기 실패");

//         const data: BodyImageHistoryItem[] = await res.json();
//         const urls = data.map((item) => item.url);
//         setHistoryImages(urls);
//       } catch (err) {
//         console.error("프로필 히스토리 에러:", err);
//       }
//     };

//     fetchHistory();
//   }, []);

//   const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const file = e.target.files[0];
//       const reader = new FileReader();
//       reader.onload = () => {
//         if (typeof reader.result === "string") {
//           setSelectedImage(reader.result);
//           setShowCropper(true);
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleCropCancel = () => {
//     setShowCropper(false);
//     setSelectedImage(null);
//   };

//   const handleCropComplete = async (croppedImage: string) => {
//     const token = sessionStorage.getItem("Authorization");
//     if (!token) return;

//     try {
//       const blob = await (await fetch(croppedImage)).blob();
//       const formData = new FormData();
//       formData.append("image", blob, "profile.jpg");

//       const res = await fetch(`${API_BASE}/body-image`, {
//         method: "POST",
//         headers: { Authorization: `Bearer ${token}` },
//         body: formData,
//       });

//       if (!res.ok) throw new Error("이미지 업로드 실패");

//       const data: { imageUrl: string } = await res.json();
//       const newUrl = data.imageUrl;
//       const updated = [newUrl, ...historyImages].slice(0, 10);
//       setHistoryImages(updated);
//       onImageChange(newUrl);
//       onClose();
//     } catch (err) {
//       console.error("이미지 업로드 에러:", err);
//     } finally {
//       setShowCropper(false);
//       setSelectedImage(null);
//     }
//   };

//   return (
//     <S.Overlay>
//       {!showCropper && (
//         <S.Modal>
//           <S.CloseButton onClick={onClose}>✖</S.CloseButton>
//           <S.Title>프로필 이미지 변경</S.Title>

//           <input
//             ref={fileInputRef}
//             type="file"
//             accept="image/*"
//             onChange={onFileChange}
//             style={{ display: "none" }}
//           />

//           <S.UploadButton onClick={() => fileInputRef.current?.click()}>
//             이미지 업로드
//           </S.UploadButton>

//           {historyImages.length > 0 && (
//             <S.HistorySection>
//               <S.HistoryTitle>이전 이미지</S.HistoryTitle>
//               <S.HistoryList>
//                 {historyImages.map((img, idx) => (
//                   <S.HistoryImage
//                     key={idx}
//                     src={img}
//                     alt={`history-${idx}`}
//                     onClick={() => {
//                       onImageChange(img);
//                       onClose();
//                     }}
//                   />
//                 ))}
//               </S.HistoryList>
//             </S.HistorySection>
//           )}
//         </S.Modal>
//       )}

//       {showCropper && selectedImage && (
//         <ProfileCropper
//           imageSrc={selectedImage}
//           onCancel={handleCropCancel}
//           onCropComplete={handleCropComplete}
//         />
//       )}
//     </S.Overlay>
//   );
// }
