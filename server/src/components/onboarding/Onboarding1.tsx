import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar';
import Oboardingmain from '../../../public/assets/onboardingmain.jpg'

const Onboarding1: React.FC = () => {
    return (
    <div>
        <NavBar />
        <div className="relative overflow-hidden">
        <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-400 to-white mix-blend-multiply"></div>
        </div>
        <div className='absolute inset-0 flex items-center mx-12 desktop:mx-80 laptop:mx-64 tablet:mx-52'>
            <div className='flex flex-col'>
                <span className="mb-4 text-xl text-white font-PR_BO">AI기반 광고 이미지 생성 서비스</span>
                <span className="mb-4 text-7xl text-green-Normal font-PR_BL">테커픽처</span>
                <span className="mt-20 mb-4 text-xl text-white font-PR_M">1분만에 생성하는 광고 배너와 광고 이미지 <br/>SNS 플랫폼에 맞게 조절하는 간편한 이미지 리사이징</span>
                <Link to="/nickname">
                <button className='bg-green-Normal transition duration-300 hover:bg-[#00b43f] w-1/2 h-[60px] rounded-lg font-PR_BO text-xl mt-4'>바로 시작하기</button>
                </Link>
            </div>
        </div>
        <img src={Oboardingmain} alt="온보딩페이지 첫 메인 사진" className="object-cover w-full h-auto" />
        </div>
    </div>
    );
}

export default Onboarding1;
