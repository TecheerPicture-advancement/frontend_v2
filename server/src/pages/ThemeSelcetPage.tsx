import React from 'react';
import ImageBox from '../components/ImageBox';

const BackgroundTheme: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-start p-2.5 bg-[#111] overflow-hidden">
      <div className="w-full max-w-screen-2xl h-full flex flex-col items-center justify-start gap-24 md:gap-20 lg:gap-[90px] overflow-hidden">
        <header className="h-30 md:h-52 lg:h-[200px] flex flex-col items-center justify-start gap-2.5 md:gap-3 lg:gap-[10px] pt-6 md:pt-8 lg:pt-[23px] pr-6 md:pr-8 lg:pr-[119px] pl-6 md:pl-8 lg:pl-[120px] overflow-hidden">
          <h1 className="text-xl md:text-2xl lg:text-[40px] leading-tight font-['Noto_Sans_KR'] font-black text-center text-[#fff]">
            내 마음대로 만드는<br />
            <span className="text-[#00d54b]">상품 이미지</span>
          </h1>
          <p className="text-sm md:text-base lg:text-[18px] leading-tight font-['Pretendard'] text-[#b8b8b8] text-center">
            원하는 상품 이미지를 클릭해주세요
          </p>
        </header>
        <main className="flex flex-col items-center justify-center w-full overflow-hidden">
          <div className="relative w-full max-w-4xl h-[230px] shrink-0 flex items-center justify-center">
            <ImageBoxPosition
              className="left-[75%] top-[140px]"
              imageSource="ThemeImage/city.png"
              detail="차갑고 세련된"
              theme="도시"
            />
            <ImageBoxPosition
              className="left-[50%] top-0"
              imageSource="ThemeImage/natural.png"
              detail="편안하고 포근한"
              theme="자연"
            />
            <ImageBoxPosition
              className="left-[25%] top-[140px]"
              imageSource="ThemeImage/place.png"
              detail="아름답고 현실적인"
              theme="명소"
            />
            <ImageBoxPosition
              className="left-0 top-0 lg:w-[280px] lg:h-[280px]"
              imageSource="ThemeImage/AI.png"
              detail="적합한 이미지 추천"
              theme="AI"
            />
          </div>
          <div className="relative w-full max-w-4xl h-[230px] shrink-0 flex items-center justify-center">
            <ImageBoxPosition
              className="left-[75%] top-[140px]"
              imageSource="ThemeImage/winter.png"
              detail="얼어붙은 나무들"
              theme="겨울"
            />
            <ImageBoxPosition
              className="left-[50%] top-0"
              imageSource="ThemeImage/fall.png"
              detail="낭만적인 단풍잎"
              theme="가을"
            />
            <ImageBoxPosition
              className="left-[25%] top-[140px]"
              imageSource="ThemeImage/summer.png"
              detail="시원한 바닷가"
              theme="여름"
            />
            <ImageBoxPosition
              className="left-0 top-0 lg:w-[280px] lg:h-[280px]"
              imageSource="ThemeImage/spring.png"
              detail="흩날리는"
              theme="봄"
            />
          </div>
          <div className="relative w-full max-w-4xl h-[400px] shrink-0 flex items-center justify-center">
            <ImageBoxPosition
              className="left-[75%] top-[140px] w-56 h-56 md:w-64 md:h-64"
              imageSource="ThemeImage/pen.png"
              detail="내가 원하는 테마가 없다면?"
              theme="직접입력"
            />
            <ImageBoxPosition
              className="left-[50%] top-0 w-56 h-56 md:w-64 md:h-64"
              imageSource="ThemeImage/cafe.png"
              detail="모던한 디자인"
              theme="카페"
            />
            <ImageBoxPosition
              className="left-[25%] top-[140px] w-56 h-56 md:w-64 md:h-64"
              imageSource="ThemeImage/office.png"
              detail="정돈된 환경"
              theme="오피스"
            />
            <ImageBoxPosition
              className="left-0 top-0 w-56 h-56 md:w-64 md:h-64 lg:w-[280px] lg:h-[280px]"
              imageSource="ThemeImage/studio.png"
              detail="감성적인 디자인"
              theme="스튜디오"
            />
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
}

const ImageBoxPosition: React.FC<ImageBoxPositionProps> = ({ className, imageSource, detail, theme }) => {
  return (
    <div className={`absolute ${className} w-50 h-50 md:w-50 md:h-50`}>
      <ImageBox imageSource={imageSource} detail={detail} theme={theme} />
    </div>
  );
};

export default BackgroundTheme;
