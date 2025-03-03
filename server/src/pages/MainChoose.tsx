import React, { useState, useEffect } from 'react';
import MoveChoose from '../components/MoveChoose';
import BackgroundImage1 from '../../public/assets/BackgroundImage1.png';
import BackgroundImage2 from '../../public/assets/BackgroundImage2.png';
import BackgroundImage4 from '../../public/assets/BackgroundImage4.png';

const MainChoose: React.FC = () => {
  const [Rayout, setRayout] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRayout(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen bg-black justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-7">
        {/* 상단 레이아웃 */}
        <div className="h-20 flex flex-col items-center justify-center">
          <div className={`transition-opacity duration-800 ease-in-out ${Rayout ? 'opacity-0' : 'opacity-100'}`}>
          </div>
          <div className={`transition-opacity duration-1000 ease-in-out ${Rayout ? 'opacity-100' : 'opacity-0'}`}>
            {Rayout && (
              <div className="text-4xl text-white font-PR_BO">
                원하시는 광고 기능을 선택해주세요
              </div>
            )}
          </div>
        </div>
        {/* 하단 레이아웃 */}
        <div className="flex flex-row gap-6 place-items-center">
          <MoveChoose
            src={BackgroundImage1}
            maintext={'광고 이미지 생성'}
            servetext={'AI가 제품 이미지와 컨셉을 분석 후'}
            servetext2={'적합한 광고문구와 이미지를 생성합니다.'}
            index={1}
          />
          <MoveChoose
            src={BackgroundImage2}
            maintext={'상품 배경 생성'}
            servetext={'AI가 사용자의 제품 이미지를 분석하여'}
            servetext2={'적합한 배경을 생성합니다. '}
            index={2}
          />
          <MoveChoose
            src={BackgroundImage4}
            maintext={'이미지 변환 영상 생성'}
            servetext={'AI가 이미지를 분석하여 '}
            servetext2={'적합한 광고 영상을 생성합니다.'}
            index={4}
          />
        </div>
      </div>
    </div>
  );
};

export default MainChoose;
