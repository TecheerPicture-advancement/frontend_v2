import React from 'react';
import NavBar from './NavBar';
import ResultButton from './ResultButton';

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
    <div className="flex flex-col items-center min-h-screen bg-black">
      <div className="w-full mb-10">
        <NavBar />
      </div>
      <div className="w-full max-w-screen-2xl flex flex-col items-center justify-start gap-20 md:gap-20 lg:gap-[90px]">
        <header className="w-full flex flex-col items-center justify-center gap-2.5 md:gap-3 lg:gap-[10px] pt-6 md:pt-8 lg:pt-[23px] pr-6 md:pr-8 lg:pr-[119px] pl-6 md:pl-8 lg:pl-[120px]">
          <h1 className="text-3xl md:text-2xl lg:text-[40px] leading-tight font-PR_BL text-center text-white">
            자유롭게 만드는<br />
            <span className="text-green-Normal">광고 동영상</span>
          </h1>
        </header>
        <div className="flex items-center justify-center gap-24 mt-10">
          <div className="w-[380px] h-[380px] relative overflow-hidden rounded-[30px] bg-[#e6ffef]" style={{ boxShadow: '10.5px 123.5px 34.5px 0 rgba(255,255,255,0), 6.5px 79px 31.5px 0 rgba(255,255,255,0.01), 4px 44.5px 27px 0 rgba(255,255,255,0.05), 1.5px 19.5px 20px 0 rgba(255,255,255,0.09), 0.5px 5px 11px 0 rgba(255,255,255,0.1)' }}>
            <img src="ThemeImage/video.png" className="w-full h-full object-cover rounded-[30px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-white to-black opacity-50 mix-blend-multiply rounded-[30px]" />
          </div>
          <div className="flex flex-col items-start justify-between w-[300px]">
            <div className="w-full">
              <p className="text-sm text-left text-gray-200 font-PR_BO">동영상 생성을 위해 설명을 입력해주세요</p>
            </div>
            <div className="w-full mt-2 mb-8">
              <p className="text-2xl text-white text-xxl font-PR_BO">텍스트 입력</p>
            </div>
            <div className="w-full h-[150px] border-[1px] border-solid border-white rounded-[6px] overflow-hidden">
              <textarea placeholder="텍스트 입력" className="w-full h-full p-2 text-sm text-white bg-black font-PR_M" />
            </div>
            <div className="w-full h-[44px] mt-16">
              <ResultButton value="생성하러 가기" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};


export default TexttoVideo;
