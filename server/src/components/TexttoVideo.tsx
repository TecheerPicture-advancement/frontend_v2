import React from 'react';
import NavBar from './NavBar';
import MainButton from './MainButton';
import VideoImage from '../../public/ThemeImage/video.png'

// interface TextoVideoProps {
//   user_id: number;
//   prompt: string;
// }

// interface PostData {
//   user_id: string;
//   prompt: string;
// }

// interface ResponseData {
//   TexttoVideo: string;
// }



const TexttoVideo: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <NavBar />
      <div className="flex-grow flex flex-col items-center justify-center mb-10">
        <header className="flex flex-col items-center justify-center">
          <h1 className="text-3xl leading-tight font-PR_BL text-center text-white">
            자유롭게 만드는<br />
            <span className="text-green-Normal">광고 동영상</span>
          </h1>
        </header>
        <div className="flex flex-row items-center justify-center mt-12 gap-16">
          <div className="w-[380px] h-[380px] relative overflow-hidden rounded-[30px] bg-[#e6ffef]">
            <img src={VideoImage} className="w-full h-full object-cover rounded-[30px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-white to-black opacity-50 mix-blend-multiply rounded-[30px]" />
          </div>
          <div className="flex flex-col items-center justify-between w-[300px]">
            <div className="w-full">
              <p className="text-sm text-left text-gray-200 font-PR_BO">동영상 생성을 위해 설명을 입력해주세요</p>
            </div>
            <div className="w-full mt-2 mb-8">
              <p className="text-2xl text-white font-PR_BO">텍스트 입력</p>
            </div>
            <div className="w-full h-[150px] border-[1px] border-solid border-white rounded-[6px] overflow-hidden">
              <textarea placeholder="텍스트 입력" className="w-full h-full p-2 text-sm text-white bg-black font-PR_M" />
            </div>
            <div className="w-full h-[44px] mt-16">
              <MainButton value="생성하러 가기" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TexttoVideo;
