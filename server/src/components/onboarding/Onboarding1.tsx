import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../MainButton'

const Onboarding1: React.FC = () => {
    return (
    <div>
        <div className="relative overflow-hidden w-auto h-[760px] bg-[url('/assets/onboardingmain.jpg')] bg-cover bg-center">
            <div className='relative w-[1180px] mx-auto h-full flex items-center z-20'>
                <div className='flex flex-col'>
                    <h2 className="text-[28px] text-white font-PR_BO">AI기반 광고 이미지 생성 서비스</h2>
                    <h1 className="text-7xl text-green-Normal font-PR_BL">테커픽처</h1>
                    <div className='flex flex-col gap-10 mt-20'>
                        <h3 className="text-lg text-white font-PR_R">1분만에 생성하는 광고 배너와 광고 이미지 <br/>SNS 플랫폼에 맞게 조절하는 간편한 이미지 리사이징</h3>
                        <Link to="/mainchoose">
                            <Button value='바로 시작하기' textSize='text-lg' width='[230px]' height='14'/>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-black  to-white mix-blend-multiply z-10"/>
        </div>
    </div>
    );
}

export default Onboarding1;
