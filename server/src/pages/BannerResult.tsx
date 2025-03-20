import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import html2canvas from "html2canvas";

import Loading from "../components/Loading";
import ResultButton3 from "../components/ResultButton3";
import PRthumbnail from "../components/banner/PRthumbnail";
import Gongthumbnail from "../components/banner/Gongthumbnail";
import Jalthumbnail from "../components/banner/Jalthumbnail";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface BannerData {
  maintext: string;
  servetext: string;
  maintext2?: string;
  servetext2?: string;
}

  type PhotoComponent = React.FC<{
    imageUrl: string;
    maintext?: string;
    servetext?: string;
    scale?: number;
  }>;

  interface BannerResponse {
    code: number;
    data: BannerData;
  }

const BannerResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bannerId = location.state?.id;
  const originalImageUrl = location.state?.imageUrl;
  console.log("location",location.state)

  const [isLoading, setIsLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<React.FC<{ imageUrl: string; maintext?: string; servetext?: string; scale?: number }> | "original">("original");
  const [bannerData, setBannerData] = useState<BannerData | null>({
    maintext: location.state?.maintext || "",
    servetext: location.state?.servetext || "",
  });

  console.log("location.state:", location.state);


  useEffect(() => {
    console.log("Received location state:", location.state);
  
    if (location.state?.maintext && location.state?.servetext) {
      setBannerData({
        maintext: location.state.maintext,
        servetext: location.state.servetext,
      });
      setIsLoading(false);
      return;
    }
  
    if (!bannerId) return;
  
    const fetchBannerData = async () => {
      try {
        const { data } = await axios.get<BannerResponse>(`${BASE_URL}/banners/${bannerId}`);
        if (data.code === 200) {
          setBannerData(data.data);
        }
      } catch (error) {
        console.error("배너 데이터를 불러오는 중 오류 발생", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchBannerData();
  }, [bannerId, location.state]);
  

  if (isLoading) return <Loading />;

  const photos: {
    id: string;
    component: PhotoComponent | "original";
    imageUrl: string;
  }[] = [
    { id: "original", component: "original", imageUrl: originalImageUrl },
    { id: "pr", component: PRthumbnail, imageUrl: originalImageUrl },
    { id: "gong", component: Gongthumbnail, imageUrl: originalImageUrl },
    { id: "jal", component: Jalthumbnail, imageUrl: originalImageUrl },
  ];

  const handleCapture = async () => {
    if (!selectedComponent) {
      alert("먼저 썸네일을 선택해주세요!");
      return;
    }

    try {
      const captureElement = document.getElementById("thumbnail-capture");
      if (!captureElement) {
        console.error("캡처할 요소를 찾을 수 없습니다.");
        return;
      }

      const canvas = await html2canvas(captureElement, {
        useCORS: true,
        scale: 2,
      });

      return canvas.toDataURL("image/png");
    } catch (error) {
      console.error("캡처 실패", error);
      return null;
    }
  };

  const handleUpload = async () => {
    const imageData = await handleCapture();
    if (!imageData) return;

    try {
      const blob = await (await fetch(imageData)).blob();
      const formData = new FormData();
      formData.append("file", blob, "result.png");

      const response = await axios.post(`${BASE_URL}/images`, formData);

      if (response.status === 200) {
        alert("이미지 업로드 성공!");
        navigate("/upload");
      }
    } catch (error) {
      console.error("이미지 업로드 실패", error);
    }
  };

  const handleDownload = async () => {
    const imageData = await handleCapture();
    if (!imageData) return;

    const link = document.createElement("a");
    link.href = imageData;
    link.download = "thumbnail.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  console.log("BannerId", bannerId)
  const handleEditText = () => {
    if (!bannerData) return;

    const selectedComponentId =
      selectedComponent === "original"
        ? "original"
        : photos.find((p) => p.component === selectedComponent)?.id;
  
    navigate("/banner/result/edit", {
      state: {
        bannerId,
        imageUrl: selectedPhoto,
        selectedComponentId,
      },
    });
  };
  
  if (selectedComponent !== "original" && typeof selectedComponent !== "function") {
    console.error("selectedComponent가 올바르지 않음:", selectedComponent);
    return <div>잘못된 컴포넌트입니다.</div>;
  }
  
  console.log("photos:", photos);
  console.log("selectedComponent:", selectedComponent);
  if (isLoading) return <Loading />;

  return (
    <>
      <header className="flex items-center justify-center my-6 text-4xl font-PR_BL">
        <span className="font-PR_BO text-black dark:text-white "> 인스타그램 썸네일 제작 결과</span>
      </header>
      <div className="flex flex-row items-start justify-center w-full h-full">
        <div className="grid h-full grid-cols-2 gap-10">
        {photos.map((photo) => (
          <div key={photo.id} className="flex flex-wrap items-center justify-center h-full">
            <div
              onClick={() => {
                setSelectedPhoto(photo.imageUrl);
                setSelectedComponent(() =>
                  photo.component === "original" ? "original" : photo.component
                );
              }}
              className={`cursor-pointer ${selectedPhoto === photo.imageUrl ? "border-2 border-green-500" : ""}`}
            >
              {photo.component === "original" ? (
                <div className="w-64 aspect-[3/4] relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#c6c6c6] to-[#1e1e1e] mix-blend-hard-light" />
                  <img src={photo.imageUrl} alt="original" className="w-64 aspect-[3/4] object-cover" />
                  <p className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 text-gray-100 font-PR_M">[ 원본이미지 ]</p>
                </div>
              ) : (
                React.createElement(photo.component, {
                  imageUrl: photo.imageUrl,
                  maintext: bannerData?.maintext,
                  servetext: bannerData?.servetext,
                  scale: 1,
                })
              )}

            </div>
          </div>
        ))}
        </div>

        {selectedPhoto && (
          <div className="flex flex-col gap-10 ml-24 minHeight" id="capture-area">
            <div id="thumbnail-capture" className="relative">
            {selectedComponent === "original" ? (
              <img src={selectedPhoto} alt="Selected" className="w-64 aspect-[3/4] object-cover" />
            ) : (
              React.createElement(selectedComponent, {
                imageUrl: selectedPhoto || "",
                maintext: bannerData?.maintext,
                servetext: bannerData?.servetext,
                scale: 1,
              })
            )}
            </div>
            <div className="flex flex-col gap-10 mt-[4px]">
              <ResultButton3 value="문구 편집" onClick={handleEditText} />
              <ResultButton3 value="인스타그램 업로드" onClick={handleUpload}/>
              <ResultButton3 value="다운로드" onClick={handleDownload} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BannerResult;
