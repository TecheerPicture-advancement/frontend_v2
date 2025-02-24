import React from "react";
import IPhone14 from '../../assets/onboaring/iPhone 14 Pro.svg?react'
import Music from '../../assets/onboaring/music.svg?react'
import Arrow from '../../assets/arrow_right.svg?react'


const Onboarding2: React.FC = () => {
    return(
        <div className="w-full h-[826px] relative overflow-hidden">
  <h1 className="absolute left-[1100px] top-[360px] text-[clamp(3rem,9vw,13rem)] font-bold text-right text-green-Light">
    Upload
  </h1>
  <div className="flex flex-col justify-start items-end w-[843px] absolute left-[-23px] top-24">
      <h1 className="self-stretch flex-grow-0 flex-shrink-0 w-[843px] text-[200px] font-bold text-right text-green-Light">
        Intagram
      </h1>
      <br />
    <div className="flex flex-col justify-start items-end self-stretch flex-grow-0 flex-shrink-0 relative gap-[31px] px-[100px]">
    <p className="text-green-Light text-[clamp(1rem,2vw,1.5rem)]">
        <span className="self-stretch flex-grow-0 flex-shrink-0 w-[643px] text-xl text-right text-green-Light font=PR_R">
          TecheerPicture에서 제작한 사진과 비디오로
        </span>
        <br />
        <span className="self-stretch flex-grow-0 flex-shrink-0 w-[643px] text-xl text-right text-green-Light">
          인스타그램에 바로 업로드 해보세요
        </span>
      </p>
      <button className="flex justify-center items-center gap-4 bg-green-Normal px-6 py-3 rounded-xl text-black mt-4">
      <p className="flex-grow-0 flex-shrink-0 text-base font-medium text-left text-black">
          제작하러가기
        </p>
        <Arrow/>
      </button>
    </div>
  </div>
  <div className="relative flex justify-center items-center w-full h-full max-w-screen-md bg-radial to-green-Normal from-[#434F52]">
    <div className="relative overflow-hidden rounded-[50px] w-[90%] max-w-[330px] h-full max-h-[694px] shadow-lg bg-gradient-to-r from-black to-white">
      <img
        src="../../../public/assets/lipstick.jpg"
        className="w-full h-full object-cover"
      />
      <div className="flex flex-col justify-start items-start absolute left-7 top-[581px] gap-3">
        <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 gap-2.5">
          <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-[9px]">
            <img src="../../../public/assets/lipstick.jpg" alt="profile" className="w-7 h-7 rounded-full"/>
            <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 gap-1.5">
              <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative">
                <p className="flex-grow-0 flex-shrink-0 text-xs font-semibold text-left text-white">
                  TecheerPicture
                </p>
                <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 relative">
                    <Music/>
                  <p className="flex-grow-0 flex-shrink-0 text-[10px] text-left text-white">
                    HIGHLIGHT · WAVE
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative overflow-hidden px-2 py-[5px] rounded-[10px] border border-white">
            <p className="flex-grow-0 flex-shrink-0 text-[8px] font-medium text-left text-white">
              팔로우
            </p>
          </div>
        </div>
        <pre className="font-PR_R text-xs truncate">
          세럼 하나로 완벽한 피부 케어를 💎 하루의 피로와 스트레스로 지친
          피부에 집중 보습을! [브랜드명] 세럼은 고농축 성분이 피부 깊숙이 흡수되어, 건조함을 잡고
          피부 속부터 차오르는 건강한 광채를 선사해요. 매일 아침, 저녁, 이 세럼 한 방울로 내 피부가
          다시 살아나는 느낌을 경험해보세요. 세련되면서도 진정성 있는 피부로 가꿔줄 거예요.
          #피부광채 #고농축세럼 #피부재생 #피부진정 #피부보습 #피부결정리 #피부진정 #피부보습 #피부결정리
        </pre>
      </div>
    </div>
    <IPhone14 className="absolute w-fit max-w-[420px] h-fit z-10" />
    </div>
</div>
    );
};
export default Onboarding2;