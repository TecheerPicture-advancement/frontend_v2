import React from "react";
import { Link } from "react-router-dom";

const Onboarding5: React.FC = () => {
    return (
        <>
        <div className="bg-black px-80 pb-44 ">
            <div className="flex flex-col justify-center items-center mb-16">
                <span className="text-green-Normal font-PR_BO text-5xl mb-2">
                    광고를 생성하고 싶다면?
                </span>
                <span className="text-gray-100 font-PR_L text-base">
                광고 이미지부터 광고 비디오까지 모든 것을 한 자리에서 제공합니다.
                </span>
                <span className="text-gray-100 font-PR_L text-base">
                돈과 시간을 절약하며 광고를 만들 준비가 되셨나요? 
                </span>
            </div>
            <div className="mx-72 flex justify-center items-center">
            <Link to="/nickname">
            <button className="bg-green-Normal text-black font-PR_M text-lg px-20 py-5 rounded-lg hover:font-PR_BO ">
                생성하러 가기
            </button>
            </Link>
            </div>
        </div>
        </>
    );
};

export default Onboarding5;