import React from 'react';
import img1 from "../../public/assets/BackgroundImage1.png";

interface MoveChooseProps {
  onButtonClick: () => void;
  isActive: boolean;
}

const MoveChoose: React.FC<MoveChooseProps> = ({ onButtonClick, isActive }) => {
  return (
    <button
      className={`flex flex-row w-full h-72 justify-center items-center rounded-md border-2
         ${isActive ? 'border-green-Normal' : 'border-white'}
        hover:border-green-Normal hover:scale-[1.03] transition-transform duration-200`}
      onClick={onButtonClick}
    >
      <img src={img1} className="object-cover w-64 h-64 my-5 ml-12" />
      <div className="flex flex-col items-start justify-start w-full ml-10 mr-20">
        <p className="mb-3 text-right desktop:text-3xl labtop:text-2xl tablet:text-xl font-PR_BO text-green-Normal">
          상품 배경 생성
        </p>
        <p className="text-right text-white desktop:text-lg labtop:text-base tablet:text-sm font-PR_L">
          AI가 사용자의 제품 이미지를 분석 후
        </p>
        <p className="text-right text-white desktop:text-lg labtop:text-base tablet:text-sm font-PR_L">
          적합한 배경을 생성합니다.
        </p>
      </div>
    </button>
  );
};

export default MoveChoose;

