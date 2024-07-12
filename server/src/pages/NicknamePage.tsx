import React from 'react';
import NavBar from '../components/NavBar';
import MainButton from '../components/MainButton';

interface NicknameProps {
  nickname: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Nickname: React.FC<NicknameProps> = ({ nickname, onChange }) => {
  return (
    <div className="relative w-full h-full min-h-screen bg-[#111] overflow-hidden">
      <NavBar />
      <div className="flex flex-col items-center justify-start min-h-screen mt-20"> {/* Adjusted here */}
        <div className="w-full flex flex-col items-center justify-center py-[30px] px-[5%] bg-[#111] overflow-hidden">
        </div>
        <div className="w-[90%] max-w-[600px] flex flex-wrap items-center justify-center py-[5%] px-[5%] overflow-hidden">
          <div className="w-full flex flex-col items-center justify-center overflow-hidden mb-[5%]">
            <div className="flex items-center justify-center">
              <div className="text-[1.5rem] leading-[160%] font-['Pretendard'] font-bold text-[#fff] whitespace-nowrap">닉네임 입력</div>
              <div className="ml-2 text-[1.5rem] leading-[160%] font-['Pretendard'] font-bold text-[#ff3939] opacity-[.8]">*</div>
            </div>
            <div className="relative w-full h-[60px] flex mt-[5%]">
              <div className="absolute left-0 top-0 w-full h-full border-[1px] border-solid border-[#e6fbed] rounded-[6px] overflow-hidden">
                <input
                  type="text"
                  value={nickname}
                  onChange={onChange}
                  className="absolute left-[10px] top-[10px] w-[calc(100%-20px)] h-[calc(100%-20px)] text-[1rem] leading-[160%] font-['Pretendard'] font-medium text-white bg-black outline-none"
                />
              </div>
            </div>
          </div>
            <MainButton value='확인'/>
        </div>
      </div>
    </div>
  );
}

export default Nickname;
