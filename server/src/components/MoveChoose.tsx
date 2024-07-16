import React from 'react';
import img1 from "../../public/assets/BackgroundImage1.png";

interface MoveChooseProps {
  onButtonClick: () => void;
  isActive: boolean;
}

const MoveChoose: React.FC<MoveChooseProps> = ({ onButtonClick, isActive }) => {
  return (
    <button
      className={`flex flex-row w-full h-72 justify-center items-center rounded-md border-2 ${isActive ? 'border-green-Normal' : 'border-white'} hover:border-green-Normal`}
      onClick={onButtonClick}
    >
      <img src={img1} className="w-64 h-64 ml-12 my-5 object-cover" />
      <div className="flex flex-col justify-start items-start w-full mr-20 ml-10">
        <p className="desktop:text-3xl labtop:text-2xl tablet:text-xl mb-3 font-PR_BO text-right text-green-Normal">
          상품 배경 생성
        </p>
        <p className="desktop:text-lg labtop:text-base tablet:text-sm font-PR_L text-right text-white">
          AI가 사용자의 제품 이미지를 분석 후
        </p>
        <p className="desktop:text-lg labtop:text-base tablet:text-sm font-PR_L text-right text-white">
          적합한 배경을 생성합니다.
        </p>
      </div>
    </button>
  );
};

export default MoveChoose;

