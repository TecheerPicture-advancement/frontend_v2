import { AnimatePresence, motion } from 'framer-motion';
import React, { useState, useEffect, useRef } from 'react';
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
  { theme: '대리석', imageSource: 'ThemeImage/marble.jpg', detail: '고급스러운 대리석 질감', sentence: '대리석 느낌의 세련된 분위기를 연출합니다.' },
  { theme: '집', imageSource: 'ThemeImage/home.jpg', detail: '포근한 느낌의', sentence: '따뜻한 집안 분위기에 어울리는 이미지를 생성해드립니다.' },
  { theme: '바다', imageSource: 'ThemeImage/ocean.jpg', detail: '상쾌한 바다의 풍경', sentence: '바다의 청량한 느낌을 담은 이미지를 생성합니다.' },
  { theme: '파리', imageSource: 'ThemeImage/place.png', detail: '우아한 파리의 분위기', sentence: '파리의 세련된 도시적 느낌을 전달합니다.' },
  { theme: '카운터', imageSource: 'ThemeImage/counter.jpg', detail: '모던한 카운터 디자인', sentence: '스타일리시한 카운터 공간을 연출합니다.' },
  { theme: '가을', imageSource: 'ThemeImage/fall.png', detail: '낭만적인 단풍잎', sentence: '가을의 단풍잎이 어울리는 이미지를 생성해드립니다.' },
  { theme: '다채로운', imageSource: 'ThemeImage/cafe.png', detail: '화려한 디자인', sentence: '다양한 색상으로 활기찬 분위기를 만들어냅니다.' },
  { theme: '산', imageSource: 'ThemeImage/mountain.jpg', detail: '웅장한 산의 풍경', sentence: '산의 장엄하고 시원한 느낌을 전달합니다.' },
  { theme: '일몰', imageSource: 'ThemeImage/sunset.jpg', detail: '아름다운 일몰 풍경', sentence: '따뜻하고 평화로운 일몰을 담은 이미지를 제공합니다.' },
  { theme: '그래피티', imageSource: 'ThemeImage/graffiti.jpg', detail: '독특한 그래피티 아트', sentence: '개성 있는 그래피티의 자유로운 분위기를 연출합니다.' },
  { theme: '꽃', imageSource: 'ThemeImage/flower.jpg', detail: '상큼한 꽃의 느낌', sentence: '화사한 꽃의 아름다움과 상쾌함을 표현합니다.' },
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
  const themeSectionRef = useRef<HTMLDivElement>(null);
  

  const handleThemeSelect = (themeDetails: ThemeDetails) => {
    if (selectedTheme?.theme === themeDetails.theme) return;
    setSelectedTheme(themeDetails);
    setIsThemeSelected(true);
  };
  
  useEffect(() => {
    console.log("현재 선택된 테마:", selectedTheme);
    console.log("isThemeSelected 상태:", isThemeSelected);

    if (selectedTheme && themeSectionRef.current) {
      themeSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedTheme]);
  
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
      
      navigate(`/theme/result`, { state: { imageUrls } });
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("데이터를 전송하지 못했습니다.");
      setIsLoading(false);
    }
  };
  

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
          <div className="w-full h-full flex flex-col items-center justify-start overflow-hidden gap-20">
            <div ref={themeSectionRef}>
              <header className="flex flex-col items-center gap-2.5 md:gap-3 overflow-hidden">
                <h1 className="text-5xl leading-tight font-PR_BL text-center text-black dark:text-white">
                  내 마음대로 만드는<br />
                  <span className="text-green-Normal">상품 이미지</span>
                </h1>
                <span className="text-center text-black dark:text-white font-PR_L">원하는 상품 이미지를 클릭해주세요</span>
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
                    <div className="flex relative overflow-hidden gap-9 mt-20">
                      <div className="flex-grow-0 flex-shrink-0 w-[250px] h-[250px] relative overflow-hidden rounded-[30px]">
                        <div
                          className="w-[260px] h-[260px] absolute inset-0 bg-white rounded-3xl"
                          style={{
                            boxShadow:
                              '10.5px 123.5px 34.5px 0 rgba(255,255,255,0), 6.5px 79px 31.5px 0 rgba(255,255,255,0.01), 4px 44.5px 27px 0 rgba(255,255,255,0.05), 1.5px 19.5px 20px 0 rgba(255,255,255,0.09), 0.5px 5px 11px 0 rgba(255,255,255,0.1)',
                          }}
                        />
                        <img
                          src={selectedTheme?.imageSource}
                          className="w-[260px] h-[260px] absolute left-[0px] top-[0px] object-cover rounded-[30px]"
                        />
                        <div className="w-[250px] h-[250px] absolute left-0 top-[0px] opacity-50 bg-gradient-to-b from-white to-black mix-blend-multiply" />
                      </div>
                      <div className="relative flex flex-col justify-between w-full">
                        <div className="w-full overflow-hidden">
                          <p className="text-sm font-PR_M text-left text-gray-300 dark:text-white">
                            {selectedTheme?.detail}
                          </p>
                          <p className="w-full text-2xl font-PR_BO text-left text-black dark:text-green-Light">
                            {selectedTheme?.theme}
                          </p>
                          <p className="w-full text-sm font-PR_M text-left text-gray-300 dark:text-gray-100">
                            {selectedTheme?.sentence}
                          </p>
                        </div>
                        {selectedTheme && selectedTheme.theme === '직접입력' && (
                          <textarea
                            className="w-full resize-none p-4 rounded-md border z-10 text-sm font-PR_L border-gray-300 dark:border-green-Light bg-white dark:bg-black text-gray-400 dark:text-green-Light placeholder:text-gray-200"
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
                          <div onClick={openModal}>
                            <MainButton value="생성하러 가기" width='[430px]' height='11' textSize='text-lg' />
                          </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                {showModal && <ImageUploadModal onClose={handleModalClose} />}
              </AnimatePresence>
            </div>

            {/* 테마 목록 */}
            <main className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {themeList.map((theme, index) => (
                <motion.div
                  key={theme.theme}
                  className={`relative transition-transform cursor-pointer ${index % 2 !== 0 ? "mt-10" : ""}`}
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