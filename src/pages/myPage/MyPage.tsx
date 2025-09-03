"use client";

import { useState, useEffect } from "react";
import MyPageLayout from "./MyPageLayout";
import {
  TopSection,
  BodyInfoSection,
  SectionTitle,
  ProfileWrapper,
  Button,
  ModalBackdrop,
  ModalContent
} from "./MyPage.styled";
import DefaultProfile from "../../assets/images/anonymous_profile_image2.svg";
import BodyInput from "./components/BodyInput";
import ProfileImage from "./components/ProfileImage";
import ProfileHistory from "./components/ProfileHistory";
import LineChart from "./components/BodyStatLineChart";
import Calendar from "./components/Calendar";

interface BodyData {
  height: string;
  weight: string;
  muscle: string;
  bodyFat: string;
}

export default function MyPage() {
  // 테스트용 캘린더 관련
  type WorkoutDetail = {
    name: string;
    categoryId: number;
    sets: number;
    weight: number;
    repsPerSet: number;
  };

  type WorkoutRecord = {
    date: string;
    workout: WorkoutDetail[];
  };
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const [records, setRecords] = useState<WorkoutRecord[]>([]);
  /////////////////////////////

  const [bodyData, setBodyData] = useState<BodyData>({
    height: "",
    weight: "",
    muscle: "",
    bodyFat: "",
  });

  const [profileImg, setProfileImg] = useState<string>(DefaultProfile);
  const [showHistory, setShowHistory] = useState(false);
  const [showChartModal, setShowChartModal] = useState(false);

  // 데이터 조회
  useEffect(() => {
    const recentBodyData = async () => {
      const token = sessionStorage.getItem("Authorization");
      if (!token) return;

      try {
        const res = await fetch("https://hanseifitu.shop/physical-infos", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("최신 신체 정보 get 실패");
        const data = await res.json();
        setBodyData({
          height: data.height?.toString() || "",
          weight: data.weight?.toString() || "",
          muscle: data.muscle?.toString() || "",
          bodyFat: data.bodyFat?.toString() || "",
        });
      } catch (error) {
        console.error("신체 정보 조회 에러:", error);
      }
    };
    recentBodyData();
  }, []);

  // 입력값 변경
  const inputChange = (id: string, value: string) => {
    const numeric = value.replace(/[^0-9]/g, "");
    setBodyData((prev) => ({ ...prev, [id]: numeric }));
  };

  // 저장 로직
  const saveLogic = async () => {
    const token = sessionStorage.getItem("Authorization");
    if (!token) return;

    const payload = {
      height: Number(bodyData.height) || 0,
      weight: Number(bodyData.weight) || 0,
      muscle: Number(bodyData.muscle) || 0,
      bodyFat: Number(bodyData.bodyFat) || 0,
    };

    try {
      const res = await fetch("https://hanseifitu.shop/physical-infos", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("저장 실패");
      alert("수정 완료되었습니다!");
      console.log("저장된 데이터:", payload);
    } catch (err) {
      console.error("저장 에러:", err);
      alert("저장에 실패했습니다.");
    }
  };

  // 프로필 이미지 최신화
  useEffect(() => {
    const latestProfile = async () => {
      const token = sessionStorage.getItem("Authorization");
      if (!token) return;

      try {
        const res = await fetch("https://hanseifitu.shop/body-image", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("이미지 불러오기 실패");
        const data = await res.json();
        setProfileImg(data.imageUrl?.trim() || DefaultProfile);
      } catch (err) {
        console.error("프로필 이미지 에러:", err);
        setProfileImg(DefaultProfile);
      }
    };
    latestProfile();
  }, []);

  const imageChange = (newImage: string) => setProfileImg(newImage);

  return (
    <MyPageLayout>
      <TopSection>
        <BodyInfoSection>
          <SectionTitle>나의 신체 정보</SectionTitle>
          <BodyInput
            name="키"
            id="height"
            unit="cm"
            value={bodyData.height}
            onChange={inputChange}
          />
          <BodyInput
            name="몸무게"
            id="weight"
            unit="kg"
            value={bodyData.weight}
            onChange={inputChange}
          />
          <BodyInput
            name="골격근량"
            id="muscle"
            unit="kg"
            value={bodyData.muscle}
            onChange={inputChange}
          />
          <BodyInput
            name="체지방률"
            id="bodyFat"
            unit="%"
            value={bodyData.bodyFat}
            onChange={inputChange}
          />
          <Button onClick={saveLogic}>수정하기</Button>
        </BodyInfoSection>

        <ProfileWrapper>
          <ProfileImage
            viewImage={profileImg}
            onClick={() => setShowHistory(true)}
          />
          {showHistory && (
            <ProfileHistory
              onClose={() => setShowHistory(false)}
              onImageChange={imageChange}
            />
          )}
        </ProfileWrapper>
      </TopSection>

      <Button
        style={{
          position: "fixed",
          bottom: 80,
          right: 16,
          backgroundColor: "#17A1FA",
          color: "black",
          width: "auto",
          padding: "12px 20px",
          borderRadius: "8px",
          zIndex: 50,
        }}
        onClick={() => setShowChartModal(true)}
      >
        내 몸의 변화보기
      </Button>

      <Button
        style={{
          position: "fixed",
          bottom: 140,
          right: 16,
          backgroundColor: "#82ca9d",
          color: "black",
          width: "auto",
          padding: "12px 20px",
          borderRadius: "8px",
          zIndex: 50,
        }}
        onClick={() => setShowCalendar((prev) => !prev)}
      >
        Calendar 확인
      </Button>
      {showCalendar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start p-4 z-40 overflow-auto">
          <div className="bg-white p-4 rounded-lg w-full max-w-2xl">
            <button
              className="mb-2 px-2 py-1 bg-gray-300 rounded"
              onClick={() => setShowCalendar(false)}
            >
              닫기
            </button>
            <Calendar
              records={records}
              month={calendarMonth}
              onMonthChange={setCalendarMonth}
            />
          </div>
        </div>
      )}

      {showChartModal && (
        <ModalBackdrop>
          <ModalContent>
            <Button
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                color: "#999",
              }}
              onClick={() => setShowChartModal(false)}
            >
              ✖
            </Button>
            <LineChart />
          </ModalContent>
        </ModalBackdrop>
      )}
    </MyPageLayout>
  );
}


// import { useState, useEffect } from "react";
// import MyPageLayout from "./MyPageLayout";
// import {
//   TopSection,
//   BodyInfoSection,
//   SectionTitle,
//   ProfileWrapper,
//   Button,
//   ModalBackdrop,
//   ModalContent
// } from "./MyPage.styled";
// import BodyInput from "./components/BodyInput";
// import ProfileImage from "./components/ProfileImage";
// import ProfileHistory from "./components/ProfileHistory";
// import LineChart from "./components/BodyStatLineChart";

// export default function MyPage() {
//   const [bodyData, setBodyData] = useState({
//     height: "",
//     weight: "",
//     muscle: "",
//     bodyFat: "",
//   });

//   // public 폴더 이미지 경로 사용
//   const [profileImg, setProfileImg] = useState<string>("/images/anonymous_profile_image2.svg");
//   const [showHistory, setShowHistory] = useState(false);
//   const [showChartModal, setShowChartModal] = useState(false);

//   // 데이터 조회
//   useEffect(() => {
//     const recentBodyData = async () => {
//       const token = sessionStorage.getItem("Authorization");
//       if (!token) return;

//       try {
//         const res = await fetch("https://hanseifitu.shop/physical-infos", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (!res.ok) throw new Error("최신 신체 정보 get 실패");
//         const data = await res.json();
//         setBodyData({
//           height: data.height?.toString() || "",
//           weight: data.weight?.toString() || "",
//           muscle: data.muscle?.toString() || "",
//           bodyFat: data.bodyFat?.toString() || "",
//         });
//       } catch (error) {
//         console.error("신체 정보 조회 에러:", error);
//       }
//     };
//     recentBodyData();
//   }, []);

//   // 입력값 변경
//   const inputChange = (id: string, value: string) => {
//     const numeric = value.replace(/[^0-9]/g, "");
//     setBodyData((prev) => ({ ...prev, [id]: numeric }));
//   };

//   // 저장 로직
//   const saveLogic = async () => {
//     const token = sessionStorage.getItem("Authorization");
//     if (!token) return;

//     const payload = {
//       height: Number(bodyData.height) || 0,
//       weight: Number(bodyData.weight) || 0,
//       muscle: Number(bodyData.muscle) || 0,
//       bodyFat: Number(bodyData.bodyFat) || 0,
//     };

//     try {
//       const res = await fetch("https://hanseifitu.shop/physical-infos", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });
//       if (!res.ok) throw new Error("저장 실패");
//       alert("수정 완료되었습니다!");
//       console.log("저장된 데이터:", payload);
//     } catch (err) {
//       console.error("저장 에러:", err);
//       alert("저장에 실패했습니다.");
//     }
//   };

//   // 프로필 이미지 최신화
//   useEffect(() => {
//     const latestProfile = async () => {
//       const token = sessionStorage.getItem("Authorization");
//       if (!token) return;

//       try {
//         const res = await fetch("https://hanseifitu.shop/body-image", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (!res.ok) throw new Error("이미지 불러오기 실패");
//         const data = await res.json();
//         setProfileImg(data.imageUrl?.trim() || "/images/anonymous_profile_image2.svg");
//       } catch (err) {
//         console.error("프로필 이미지 에러:", err);
//         setProfileImg("/images/anonymous_profile_image2.svg");
//       }
//     };
//     latestProfile();
//   }, []);

//   const imageChange = (newImage: string) => setProfileImg(newImage);

//   return (
//     <MyPageLayout>
//       <TopSection>
//         <BodyInfoSection>
//           <SectionTitle>나의 신체 정보</SectionTitle>
//           <BodyInput name="키" id="height" unit="cm" value={bodyData.height} onChange={inputChange} />
//           <BodyInput name="몸무게" id="weight" unit="kg" value={bodyData.weight} onChange={inputChange} />
//           <BodyInput name="골격근량" id="muscle" unit="kg" value={bodyData.muscle} onChange={inputChange} />
//           <BodyInput name="체지방률" id="bodyFat" unit="%" value={bodyData.bodyFat} onChange={inputChange} />
//           <Button onClick={saveLogic}>수정하기</Button>
//         </BodyInfoSection>

//         <ProfileWrapper>
//           <ProfileImage viewImage={profileImg} onClick={() => setShowHistory(true)} />
//           {showHistory && (
//             <ProfileHistory onClose={() => setShowHistory(false)} onImageChange={imageChange} />
//           )}
//         </ProfileWrapper>
//       </TopSection>

//       <Button
//         style={{
//           position: "fixed",
//           bottom: 80,
//           right: 16,
//           backgroundColor: "#17A1FA",
//           color: "black",
//           width: "auto",
//           padding: "12px 20px",
//           borderRadius: "8px",
//           zIndex: 50,
//         }}
//         onClick={() => setShowChartModal(true)}
//       >
//         내 몸의 변화보기
//       </Button>

//       {showChartModal && (
//         <ModalBackdrop>
//           <ModalContent>
//             <Button
//               style={{
//                 position: "absolute",
//                 top: 12,
//                 right: 12,
//                 background: "none",
//                 border: "none",
//                 fontSize: "1.5rem",
//                 color: "#999",
//               }}
//               onClick={() => setShowChartModal(false)}
//             >
//               ✖
//             </Button>
//             <LineChart />
//           </ModalContent>
//         </ModalBackdrop>
//       )}
//     </MyPageLayout>
//   );
// }
