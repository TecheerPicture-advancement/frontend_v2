import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ImageBox from '../components/ImageBox';
import ThemeBox from '../components/ThemeBox';
import MainButton from '../components/MainButton';

const ThemeResult: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState({
    imageSource: '',
    prompt: '원하는 사진을 만들어드립니다.',
    theme: '',
    detail: '',
  });

  const handleThemeSelect = (themeDetails: { imageSource: string; detail: string; theme: string }) => {
    setSelectedTheme({
      imageSource: themeDetails.imageSource,
      prompt: '원하는 사진을 만들어드립니다.', // Assuming prompt remains the same
      theme: themeDetails.theme,
      detail: themeDetails.detail,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-start p-2.5 bg-[#111] overflow-hidden">
      <div className="w-full max-w-screen-2xl h-full flex flex-col items-center justify-start gap-10 md:gap-20 lg:gap-[90px] overflow-hidden">
        <header className="h-30 md:h-52 lg:h-[200px] flex flex-col items-center justify-start gap-2.5 md:gap-3 lg:gap-[10px] pt-6 md:pt-8 lg:pt-[23px] pr-6 md:pr-8 lg:pr-[119px] pl-6 md:pl-8 lg:pl-[120px] overflow-hidden">
          <h1 className="text-xl md:text-2xl lg:text-[40px] leading-tight font-['Noto_Sans_KR'] font-black text-center text-[#fff]">
            내 마음대로 만드는<br />
            <span className="text-[#00d54b]">상품 이미지</span>
          </h1>
          <p className="flex justify-center items-center flex-grow-0 flex-shrink-0 w-[270px] h-[32px] relative gap-3 px-3 rounded-[10px]">
            <MainButton value="이미지 업로드 하러 가기"/>
          </p>
        </header>
        <motion.div
          key={selectedTheme.theme}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
        >
          <ThemeBox
            imageSource={selectedTheme.imageSource}
            prompt={selectedTheme.prompt}
            theme={selectedTheme.theme}
            detail={selectedTheme.detail}
          />
        </motion.div>
        <main className="flex flex-col items-center justify-center w-full">
          <div className="relative w-full max-w-4xl h-[230px] shrink-0 flex items-center justify-center">
            {selectedTheme.theme !== '도시' && (
              <ImageBoxPosition
                className="left-[75%] top-[140px]"
                imageSource="ThemeImage/city.png"
                detail="차갑고 세련된"
                theme="도시"
                onClick={handleThemeSelect}
              />
            )}
            {selectedTheme.theme !== '자연' && (
              <ImageBoxPosition
                className="left-[50%] top-0"
                imageSource="ThemeImage/natural.png"
                detail="편안하고 포근한"
                theme="자연"
                onClick={handleThemeSelect}
              />
            )}
            {selectedTheme.theme !== '명소' && (
              <ImageBoxPosition
                className="left-[25%] top-[140px]"
                imageSource="ThemeImage/place.png"
                detail="아름답고 현실적인"
                theme="명소"
                onClick={handleThemeSelect}
              />
            )}
            {selectedTheme.theme !== 'AI' && (
              <ImageBoxPosition
                className="left-0 top-0 lg:w-[280px] lg:h-[280px]"
                imageSource="ThemeImage/AI.png"
                detail="적합한 이미지 추천"
                theme="AI"
                onClick={handleThemeSelect}
              />
            )}
          </div>
          <div className="relative w-full max-w-4xl h-[230px] shrink-0 flex items-center justify-center">
            {selectedTheme.theme !== '겨울' && (
              <ImageBoxPosition
                className="left-[75%] top-[140px]"
                imageSource="ThemeImage/winter.png"
                detail="얼어붙은 나무들"
                theme="겨울"
                onClick={handleThemeSelect}
              />
            )}
            {selectedTheme.theme !== '가을' && (
              <ImageBoxPosition
                className="left-[50%] top-0"
                imageSource="ThemeImage/fall.png"
                detail="낭만적인 단풍잎"
                theme="가을"
                onClick={handleThemeSelect}
              />
            )}
            {selectedTheme.theme !== '여름' && (
              <ImageBoxPosition
                className="left-[25%] top-[140px]"
                imageSource="ThemeImage/summer.png"
                detail="시원한 바닷가"
                theme="여름"
                onClick={handleThemeSelect}
              />
            )}
            {selectedTheme.theme !== '봄' && (
              <ImageBoxPosition
                className="left-0 top-0 lg:w-[280px] lg:h-[280px]"
                imageSource="ThemeImage/spring.png"
                detail="흩날리는"
                theme="봄"
                onClick={handleThemeSelect}
              />
            )}
          </div>
          <div className="relative w-full max-w-4xl h-[400px] shrink-0 flex items-center justify-center">
            {selectedTheme.theme !== '직접입력' && (
              <ImageBoxPosition
                className="left-[75%] top-[140px] w-56 h-56 md:w-64 md:h-64"
                imageSource="ThemeImage/pen.png"
                detail="내가 원하는 테마가 없다면?"
                theme="직접입력"
                onClick={handleThemeSelect}
              />
            )}
            {selectedTheme.theme !== '카페' && (
              <ImageBoxPosition
                className="left-[50%] top-0 w-56 h-56 md:w-64 md:h-64"
                imageSource="ThemeImage/cafe.png"
                detail="모던한 디자인"
                theme="카페"
                onClick={handleThemeSelect}
              />
            )}
            {selectedTheme.theme !== '오피스' && (
              <ImageBoxPosition
                className="left-[25%] top-[140px] w-56 h-56 md:w-64 md:h-64"
                imageSource="ThemeImage/office.png"
                detail="정돈된 환경"
                theme="오피스"
                onClick={handleThemeSelect}
              />
            )}
            {selectedTheme.theme !== '스튜디오' && (
              <ImageBoxPosition
                className="left-0 top-0 w-56 h-56 md:w-64 md:h-64 lg:w-[280px] lg:h-[280px]"
                imageSource="ThemeImage/studio.png"
                detail="감성적인 디자인"
                theme="스튜디오"
                onClick={handleThemeSelect}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

interface ImageBoxPositionProps {
  className: string;
  imageSource: string;
  detail: string;
  theme: string;
  onClick: (themeDetails: { imageSource: string; detail: string; theme: string }) => void;
}

const ImageBoxPosition: React.FC<ImageBoxPositionProps> = ({ className, imageSource, detail, theme, onClick }) => {
  return (
    <motion.div
      className={`absolute ${className} w-50 h-50 md:w-50 md:h-50 cursor-pointer`}
      onClick={() => onClick({ imageSource, detail, theme })}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      layout
    >
      <ImageBox imageSource={imageSource} detail={detail} theme={theme} />
    </motion.div>
  );
};

export default ThemeResult;
