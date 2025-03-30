import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import { captureElementAsPng } from '../utils/captureUtils'
import { saveAuthData } from "../utils/instaAuth";
import { handleCaptureDownload } from "../utils/downloadImage";
import { loginToInstagram, checkInstagramToken } from '../apis/instagram'
import { uploadImage } from '../apis/upload'

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

  const [isLoading, setIsLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  //프록시url 사용하지 않을시 proxyUrl 삭제 후 proxyUrl 들어가는 곳에 originalImageUrl를 넣기
  const proxyUrl = `http://localhost:8080/api/v1/image/proxy?url=${encodeURIComponent(originalImageUrl)}`;

  const [selectedComponent, setSelectedComponent] = useState<React.FC<{ imageUrl: string; maintext?: string; servetext?: string; scale?: number }> | "original">("original");
  const [bannerData, setBannerData] = useState<BannerData | null>({
    maintext: location.state?.maintext || "",
    servetext: location.state?.servetext || "",
  });
  const testImage = new Image();
  testImage.crossOrigin = "anonymous";
  testImage.src = proxyUrl;
  testImage.onload = () => console.log("프록시 이미지 로드 성공!");
  testImage.onerror = () => console.error("프록시 이미지 로드 실패!");
  

  const photos: {
    id: string;
    component: PhotoComponent | "original";
    imageUrl: string;
  }[] = [
    { id: "original", component: "original", imageUrl: proxyUrl },
    { id: "pr", component: PRthumbnail, imageUrl: proxyUrl },
    { id: "gong", component: Gongthumbnail, imageUrl: proxyUrl },
    { id: "jal", component: Jalthumbnail, imageUrl: proxyUrl },
  ];


  const handleUpload = async () => {
    try {
      const authData = await loginToInstagram();
      if (!authData) return;
  
      const dataUrl = await captureElementAsPng("thumbnail-capture");
      if (!dataUrl) return;
  
      const imageId = await uploadImage(dataUrl);
      if (imageId) {
        navigate("/upload", { state: { imageId } });
      } else {
        console.error("업로드 응답에 imageId가 없음");
      }
    } catch (error) {
      console.error("업로드 실패:", error);
    }
  };
  
  useEffect(() => {
    checkInstagramToken();
  }, []);

  useEffect(() => {  
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

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (!event.origin.includes(window.location.origin)) return;
  
      const { accessToken, userId } = event.data;
      if (accessToken && userId) {
        console.log("Instagram 인증 완료", { accessToken, userId });
        saveAuthData(accessToken, userId);
        const dataUrl = await captureElementAsPng("thumbnail-capture");
        if (dataUrl) {
          await uploadImage(dataUrl);
        } else {
          console.error("Failed to capture element as PNG");
        }
      }
    };
  
    window.addEventListener("message", handleMessage);
  
    return () => window.removeEventListener("message", handleMessage);
  }, []);

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
              <ResultButton3 value="다운로드" onClick={handleCaptureDownload} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BannerResult;
