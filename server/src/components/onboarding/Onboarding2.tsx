import React from "react";
import ResultImage from "../../../public/assets/BannerResult.jpg";
import Beauty from '../../../public/assets/Beauty.jpg'
import Arrow from '../../assets/arrow.svg?react'

const Onboarding2 : React.FC = () => {
    
    return(
        <div className="bg-black flex flex-col min-h-screen justify-center items-center gap-16">
            <div>
                <span className="text-green-Normal text-4xl font-PR_BO">광고 배너는</span>
                <span className="text-white text-4xl font-PR_BO"> 이렇게 생성돼요</span>
            </div>
            <div className="flex justify-center gap-16">
                <div className="flex flex-col justify-center items-center gap-4" >
                    <img src={Beauty} alt="처음 이미지"  className="w-[300px] h-[300px]"/>
                    <span className="border border-white rounded-md px-6 py-2 text-white font-PR_L">Before</span>
                </div>
                <Arrow className="w-7 h-7 mt-36"/>
                <div className="flex flex-col justify-center items-center gap-4">
                    <img src={ResultImage} alt="결과 이미지" className="w-[300px] h-[300px]" />
                    <span className="border border-white rounded-md px-8 py-2 text-white font-PR_L">After</span>
                </div>
            </div>
        </div>
    );
}
export default Onboarding2