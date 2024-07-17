import React from "react";
import Lipstick from '../../../public/assets/lipstick.jpg'
import Fan from '../../../public/assets/fan.jpg'
import Perfume from '../../../public/assets/perfume.jpg'
import Lotion from '../../../public/assets/lotion.jpg'
import Torretta from '../../../public/assets/torretta.jpg'

const Onboarding3 : React.FC = () => {
    
    return(
        <div className=" bg-black gap-20">
            <div className="flex justify-center items-center">
                <span className="text-4xl font-PR_BO text-green-Normal">제품 배경은</span>
                <span className="text-4xl font-PR_BO text-white ml-2"> 이렇게 생성돼요</span>
            </div>
            <div className="flex flex-nowrap gap-3 mt-12">
                <img src={Lipstick} alt="립스틱 사진" className="w-[230px] h-[440px]" />
                <img src={Fan} alt="선풍기사진" className="w-[230px] h-[440px]"/>
                <img src={Perfume} alt="향수 사진" className="w-[230px] h-[440px]"/>
                <img src={Lotion} alt="로션 사진" className="w-[230px] h-[440px]"/>
                <img src={Torretta} alt="토레타 사진" className="w-[230px] h-[440px]"/>
            </div>
        </div>
    );
}
export default Onboarding3