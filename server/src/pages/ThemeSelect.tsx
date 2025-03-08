import { AnimatePresence, motion } from 'framer-motion';
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ImageBox from '../components/ImageBox';
import Loading from '../components/Loading';
import ImageUploadModal from '../components/UploadImageModal';
import MainButton from '../components/MainButton';
import useImageStore from '../store/useImageStore';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const sceneMapping: Record<string, string> = {
  marble: '대리석',
  home: '집',
  wood: '나무',
  ocean: '바다',
  paris: '파리',
  counter: '카운터',
  autumn: '가을',
  colorful: '다채로운',
  sunset: '일몰',
  mountain: '산',
  graffiti: '그래피티',
  floral: '꽃',
};

const themeList = [
  { theme: '대리석', imageSource: 'ThemeImage/AI.png', detail: '고급스러운 대리석 질감', sentence: '대리석 느낌의 세련된 분위기를 연출합니다.' },
  { theme: '집', imageSource: 'ThemeImage/spring.png', detail: '따뜻한 봄날에 어울리는 이미지', sentence: '따뜻한 봄날에 어울리는 이미지를 생성해드립니다.' },
  { theme: '나무', imageSource: 'ThemeImage/studio.png', detail: '감성적인 디자인', sentence: '스튜디오에서 찍은 것처럼 이미지를 생성해드립니다.' },
  { theme: '파리', imageSource: 'ThemeImage/place.png', detail: '아름답고 현실적인', sentence: '유명한 파리를 배경으로 이미지를 생성해드립니다.' },
  { theme: '카운터', imageSource: 'ThemeImage/summer.png', detail: '시원한 바닷가', sentence: '여름철 시원한 배경으로 이미지를 생성해드립니다.' },
  { theme: '가을', imageSource: 'ThemeImage/fall.png', detail: '낭만적인 단풍잎', sentence: '가을의 단풍잎이 어울리는 이미지를 생성해드립니다.' },
  { theme: '다채로운', imageSource: 'ThemeImage/cafe.png', detail: '모던한 디자인', sentence: '카페처럼 모던한 디자인의 이미지를 생성해드립니다.' },
  { theme: '산', imageSource: 'ThemeImage/city.png', detail: '차갑고 세련된', sentence: '세련된 도시를 배경으로 이미지를 생성해드립니다.' },
  { theme: '일몰', imageSource: 'ThemeImage/winter.png', detail: '얼어붙은 나무들', sentence: '겨울철 차가운 느낌의 배경으로 이미지를 생성해드립니다.' },
  { theme: '그래피티', imageSource: 'ThemeImage/winter.png', detail: '얼어붙은 나무들', sentence: '겨울철 차가운 느낌의 배경으로 이미지를 생성해드립니다.' },
  { theme: '꽃', imageSource: 'ThemeImage/winter.png', detail: '얼어붙은 나무들', sentence: '겨울철 차가운 느낌의 배경으로 이미지를 생성해드립니다.' },
  { theme: '직접입력', imageSource: 'ThemeImage/pen.png', detail: '내가 원하는 테마가 없다면?', sentence: '' },
];

interface ThemeDetails {
  theme: string;
  imageSource: string;
  detail: string;
  sentence: string;
}

const ThemeResult: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState<ThemeDetails | null>(null);
  const [isThemeSelected, setIsThemeSelected] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [customTheme, setCustomTheme] = useState('');
  const navigate = useNavigate();

  const openModal = () => setShowModal(true);
  

  const handleModalClose = async (imageId: number | null) => {
    setShowModal(false);
    useImageStore.getState().setImageId(imageId);
  
    if (!imageId) return;
  
    const themeToUse =
      selectedTheme?.theme === "직접입력" ? customTheme : selectedTheme?.theme || "";
    const sceneValue =
      selectedTheme?.theme === "직접입력"
        ? ""
        : Object.keys(sceneMapping).find((key) => sceneMapping[key] === themeToUse) || "";
  
    const requestData = {
      imageId: imageId,
      imageTransform: { scale: 0.5, xcenter: 0.5, ycenter: 0.5 },
      scene: sceneValue,
      prompt: selectedTheme?.theme === "직접입력" ? customTheme : "",
      negativePrompt: "",
    };
  
    try {
      setIsLoading(true);
  
      const responses = await Promise.all(
        Array.from({ length: 3 }).map(() => axios.post(`${BASE_URL}/background`, requestData))
      );
  
      const imageUrls = responses.map((res) => (res.data as { imageUrl: string }).imageUrl);
  
      setIsLoading(false);
      setSelectedTheme(null);
      setIsThemeSelected(false);
  
      navigate(`/theme/result`, { state: { imageUrls } });
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("데이터를 전송하지 못했습니다.");
      setIsLoading(false);
    }
  };
  
  

  const handleThemeSelect = (themeDetails: ThemeDetails) => {
    if (themeDetails.theme === '직접입력' && selectedTheme?.theme !== '직접입력') {
      setSelectedTheme(themeDetails);
    } else if (themeDetails.theme !== '직접입력') {
      setSelectedTheme(themeDetails);
    }
    setIsThemeSelected(true);
  };

  useEffect(() => {
    console.log("imageId changed:", useImageStore.getState().imageId);
  }, [useImageStore().imageId]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
          <div className="w-full h-full flex flex-col items-center justify-start gap-10 md:gap-20 lg:gap-[90px] overflow-hidden">
            <header className="flex flex-col items-center gap-2.5 md:gap-3 overflow-hidden">
              <h1 className="text-xl md:text-2xl lg:text-[40px] leading-tight font-PR_BL text-center text-white">
                내 마음대로 만드는<br />
                <span className="text-green-Normal">상품 이미지</span>
              </h1>
              <span className="text-center text-white font-PR_L">원하는 상품 이미지를 클릭해주세요</span>
            </header>
            <AnimatePresence>
            {isThemeSelected && (
                <motion.div
                  key={selectedTheme?.theme}
                  layoutId={selectedTheme?.theme}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                >
                  <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative overflow-hidden gap-[35px] px-2.5 h-full">
                    <div className="flex-grow-0 flex-shrink-0 w-[250px] h-[250px] relative overflow-hidden rounded-[30px]">
                      <div
                        className="w-[250px] h-[250px] absolute left-0 top-[-0.5px] bg-green-Light rounded-[30px]"
                        style={{
                          boxShadow:
                            '10.5px 123.5px 34.5px 0 rgba(255,255,255,0), 6.5px 79px 31.5px 0 rgba(255,255,255,0.01), 4px 44.5px 27px 0 rgba(255,255,255,0.05), 1.5px 19.5px 20px 0 rgba(255,255,255,0.09), 0.5px 5px 11px 0 rgba(255,255,255,0.1)',
                        }}
                      />
                      <img
                        src={selectedTheme?.imageSource}
                        className="w-[250px] h-[250px] absolute left-[0px] top-[0px] object-cover rounded-[30px]"
                      />
                      <div className="w-[250px] h-[250px] absolute left-0 top-[0px] opacity-50 bg-gradient-to-b from-white to-black mix-blend-multiply" />
                    </div>
                    <div className="relative flex flex-col items-start justify-between flex-grow-0 flex-shrink-0 gap-20">
                      <div className="flex-grow-0 flex-shrink-0 w-[191.5px] h-[121px] relative overflow-hidden"></div>
                      <p className="w-[191.5px] h-[36px] absolute left-[-0.25px] top-[75px] text-sm font-PR_M text-left text-white">
                        {selectedTheme?.sentence}
                      </p>
                      <div className="w-full h-[50px] absolute left-0 top-0 overflow-hidden">
                        <p className="w-full h-[45px] absolute left-0 top-[19.5px] text-2xl font-PR_BO text-left text-green-Light">
                          {selectedTheme?.theme}
                        </p>
                        <p className="w-full absolute left-0 top-0 text-sm font-PR_M text-left text-[#d9d9d9]">
                          {selectedTheme?.detail}
                        </p>
                      </div>
                      {selectedTheme && selectedTheme.theme === '직접입력' && (
                        <textarea
                          className="w-full -mt-32 p-4 -mb-16 rounded-md border z-10 text-sm font-PR_L border-green-Light bg-black text-green-Light placeholder:text-gray-200"
                          placeholder="테마를 입력하세요..."
                          value={customTheme}
                          onClick={() => {
                            if (selectedTheme) {
                              handleThemeSelect({ imageSource: selectedTheme.imageSource, detail: selectedTheme.detail, theme: '직접입력', sentence: selectedTheme.sentence });
                            }
                          }}
                          onChange={(e) => setCustomTheme(e.target.value)}
                        />
                      )}
                        <div onClick={openModal} className="w-[430px] h-[44px] rounded-lg">
                          <MainButton value="생성하러 가기" />
                        </div>
                    </div>
                  </div>
                </motion.div>
              )}
              {showModal && <ImageUploadModal onClose={handleModalClose} />}
            </AnimatePresence>
            <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {themeList.map((theme, index) => (
                <motion.div
                  key={theme.theme}
                  className={`relative transition-transform 
                    ${index % 2 !== 0 ? "mt-10" : ""}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  layoutId={theme.theme}
                  onClick={() => handleThemeSelect(theme)}
                >
                  <ImageBox imageSource={theme.imageSource} detail={theme.detail} theme={theme.theme} />
                </motion.div>
              ))}
            </main>
          </div>
      )}
    </>
  );
};

export default ThemeResult;