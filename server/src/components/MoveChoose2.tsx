import React from 'react';
import img2 from "../../public/assets/BackgroundImage2.png";

interface MoveChooseProps {
  onButtonClick: () => void;
  isActive: boolean;
}

const MoveChoose: React.FC<MoveChooseProps> = ({ onButtonClick, isActive }) => {
  return (
    <button
      className={`flex flex-row-reverse w-full h-72 justify-center items-center rounded-md border-2 
        ${isActive ? 'border-green-Normal' : 'border-white'} 
        hover:border-green-Normal hover:scale-[1.03] transition-transform duration-200`}
      onClick={onButtonClick}
    >
      <img src={img2} className="object-cover w-64 h-64 my-5 mr-12" />
      <div className="flex flex-col items-end justify-end w-full ml-20 mr-10">
        <p className="mb-3 text-left desktop:text-3xl labtop:text-2xl tablet:text-xl font-PR_BO text-green-Normal">
          광고 배너 생성
        </p>
        <p className="text-left text-white desktop:text-lg labtop:text-base tablet:text-sm font-PR_L">
          AI가 제품 이미지와 컨셉을 분석하여
        </p>
        <p className="text-left text-white desktop:text-lg labtop:text-base tablet:text-sm font-PR_L">
          적합한 광고 배너를 생성합니다.
        </p>
      </div>
    </button>
  );
};

export default MoveChoose;
