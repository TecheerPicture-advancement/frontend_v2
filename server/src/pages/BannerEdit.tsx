import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import ResultButton from "../components/ResultButton";
import RadioButton from "../components/radio/RadioButton";
import CustomRadioButton from "../components/radio/CustomRadioButton";
import PRthumbnail from "../components/banner/PRthumbnail";
import Gongthumbnail from "../components/banner/Gongthumbnail";
import Jalthumbnail from "../components/banner/Jalthumbnail";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const BannerEdit: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bannerId, imageUrl, selectedComponentId } = location.state || {};
  const [customMainText, setCustomMainText] = useState(""); 
  const [customServeText, setCustomServeText] = useState("");
  const [selectedTexts, setSelectedTexts] = useState({
    maintext: "",
    servetext: "",
  });
  console.log("location.state:", location.state);

  const [bannerData, setBannerData] = useState({
    maintext: "",
    maintext2: "",
    servetext: "",
    servetext2: "",
  });

  useEffect(() => {
    if (!bannerId) return;
  
    interface BannerResponse {
      code: number;
      data: {
        maintext: string;
        maintext2: string;
        servetext: string;
        servetext2: string;
      };
    }
  
    const fetchBannerData = async () => {
      try {
        const { data } = await axios.get<BannerResponse>(`${BASE_URL}/banners/${bannerId}`);
        if (data.code === 200) {
          setBannerData(data.data);
  
          setSelectedTexts((prev) => ({
            maintext: prev.maintext || data.data.maintext,
            servetext: prev.servetext || data.data.servetext,
          }));
        }
      } catch (error) {
        console.error("배너 데이터 불러오기 실패", error);
      }
    };
  
    fetchBannerData();
  }, [bannerId]);
  
  useEffect(() => {
    if (location.state) {
      const { maintext, servetext } = location.state;
  
      setSelectedTexts({
        maintext: maintext || "",
        servetext: servetext || "",
      });
  
      if (maintext && ![bannerData.maintext, bannerData.maintext2].includes(maintext)) {
        setCustomMainText(maintext);
      }
      if (servetext && ![bannerData.servetext, bannerData.servetext2].includes(servetext)) {
        setCustomServeText(servetext);
      }
    }
  }, [location.state]);  
  
  
  

    const handleConfirm = () => {
      console.log("Navigating with:", { 
        bannerId, imageUrl, selectedComponentId, selectedTexts 
      });     
      navigate("/banner/result", {
        state: {
          id: bannerId,
          imageUrl,
          selectedComponentId,
          maintext: selectedTexts.maintext,
          servetext: selectedTexts.servetext,
        },
      });
    };

    

    const handleTextChange = (type: "maintext" | "servetext", value: string, isCustom = false) => {
      setSelectedTexts((prev) => ({
        ...prev,
        [type]: value,
      }));
    
      if (isCustom) {
        if (type === "maintext") {
          setCustomMainText(value);
        } else if (type === "servetext") {
          setCustomServeText(value);
        }
      }
    };

  return (
    <div className="flex flex-col justify-center items-center gap-12">
      <header className="text-3xl font-PR_BO text-center text-white"> 인스타그램 썸네일 문구 편집</header>

      <div className="flex justify-center gap-12">
        {/* 썸네일 미리보기 */}
        <div className="w-96 aspect-[3/4] bg-white flex items-center justify-center">
        {selectedComponentId === "pr" && (
          <PRthumbnail imageUrl={imageUrl} maintext={selectedTexts.maintext} servetext={selectedTexts.servetext} scale={1.5}/>
        )}          
          {selectedComponentId === "gong" && <Gongthumbnail imageUrl={imageUrl} maintext={selectedTexts.maintext} servetext={selectedTexts.servetext} scale={1.5}/>}
          {selectedComponentId === "jal" && <Jalthumbnail imageUrl={imageUrl} maintext={selectedTexts.maintext} scale={1.5}/>}
        </div>

        {/* 문구 선택 */}
        <div className="flex flex-col gap-16">
          {/* 주요 문구 선택 */}
          <div className="flex flex-col gap-3">
            <p className="text-xl font-PR_BO text-black dark:text-green-Light">주요 문구</p>
            <RadioButton
              label={bannerData.maintext}
              checked={selectedTexts.maintext === bannerData.maintext}
              onChange={() => handleTextChange("maintext", bannerData.maintext)}
            />
            <RadioButton
              label={bannerData.maintext2}
              checked={selectedTexts.maintext === bannerData.maintext2}
              onChange={() => handleTextChange("maintext", bannerData.maintext2)}
            />
            <CustomRadioButton
              checked={selectedTexts.maintext === customMainText}
              onToggle={() => handleTextChange("maintext", customMainText, true)}
              value={customMainText}
              onValueChange={(value) => handleTextChange("maintext", value, true)}
            />
          </div>

          {/* 부가 문구 선택 */}
          <div className="flex flex-col gap-3">
            <p className="text-xl font-PR_BO text-black dark:text-green-Light">부가 문구</p>
            <RadioButton
              label={bannerData.servetext}
              checked={selectedTexts.servetext === bannerData.servetext}
              onChange={() => handleTextChange("servetext", bannerData.servetext)}
            />
            <RadioButton
              label={bannerData.servetext2}
              checked={selectedTexts.servetext === bannerData.servetext2}
              onChange={() => handleTextChange("servetext", bannerData.servetext2)}
            />
            <CustomRadioButton
              checked={selectedTexts.servetext === customServeText}
              onToggle={() => handleTextChange("servetext", customServeText, true)}
              value={customServeText}
              onValueChange={(value) => handleTextChange("servetext", value, true)}
            />
          </div>
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex justify-center gap-10 w-[960px] ">
        <div onClick={handleConfirm}>
          <ResultButton value="확인" />
        </div>
        <div onClick={() => navigate(-1)} >
          <ResultButton value="닫기"/>
        </div>
      </div>
    </div>
  );
};

export default BannerEdit;
