import React from 'react';
import img1 from "../../public/assets/BackgroundImage1.png";


const MoveChoose:React.FC = () =>  {
    return(

<button className="flex flex-row justify-center items-center w-full rounded-md border-2 border-white hover:border-green-Normal :hover active:border-green-Normal :active">
        <img
          src={img1}
          className="w-64 h-64 ml-12 my-5 object-cover"
        />
        <div className="flex flex-col justify-center items-start w-full ml-10 mr-20">
          <p className="desktop:text-3xl labtop:text-2xl tablet:text-xl font-PR_BO text-left mb-3 text-green-Normal">
           상품 배경 생성
          </p>
          <p className="desktop:text-lg labtop:text-base tablet:text-sm font-PR_L text-left text-white">
            AI가 사용자의 제품 이미지를 분석 후 적합한 배경을 생성합니다.
          </p>
        
        </div>
      </button>
);
};

export default MoveChoose;
