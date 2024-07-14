import React from 'react';
import img2 from "../../public/assets/BackgroundImage2.png";


const MoveChoose:React.FC = () =>  {
    return(
<button className="flex flex-row-reverse w-full justify-center items-center rounded-md border-2 border-white hover:border-green-Normal :hover active:border-green-Normal :active">
        <img
          src={img2}
          className="w-64 h-64 mr-12 my-5 object-cover"
        />
        <div className="flex flex-col justify-end items-end w-full mr-10 ml-20">
          <p className="desktop:text-3xl labtop:text-2xl tablet:text-xl mb-3 font-PR_BO text-left text-green-Normal">
           광고 배너 생성
          </p>
          <p className="desktop:text-lg labtop:text-base tablet:text-sm font-PR_L text-left text-white">
            AI가 제품 이미지와 컨셉을 분석하여 적합한 광고 배너를 생성합니다.
          </p>     
        </div>
      </button>
);
};

export default MoveChoose;
