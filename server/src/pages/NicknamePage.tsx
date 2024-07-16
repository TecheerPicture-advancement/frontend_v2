import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import MainButton from '../components/MainButton';
import axios from 'axios';

const Nickname: React.FC = () => {
  const [nickname, setNickname] = useState<string>('');
  const [nicknameSuccess, setNicknameSuccess] = useState<string>('');
  const [nicknameError, setNicknameError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setNicknameError(''); // 입력할 때마다 에러 메시지를 초기화
    setNicknameSuccess(''); // 입력할 때마다 성공 메시지를 초기화
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/nicknames/', { nickname });
      console.log('Nickname registered successfully:', response.data);
      setNicknameSuccess('닉네임이 성공적으로 생성되었습니다.');
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setNicknameError('중복된 닉네임입니다. 다른 닉네임을 입력해주세요.');
      } else {
        console.error('Error registering nickname:', error);
        setNicknameError('닉네임 등록 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <div className="relative w-full h-full min-h-screen bg-[#111] overflow-hidden">
      <NavBar />
      <div className="flex flex-col items-center justify-start min-h-screen mt-20">
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
                  onChange={handleChange}
                  className="absolute left-[10px] top-[10px] w-[calc(100%-20px)] h-[calc(100%-20px)] text-[1rem] leading-[160%] font-['Pretendard'] font-medium text-white bg-black outline-none"
                />
              </div>
            </div>
            {nicknameError && (
              <div className="mt-2 text-sm text-red">{nicknameError}</div>
            )}
            {nicknameSuccess && (
              <div className="mt-2 text-sm text-green-Normal">{nicknameSuccess}</div>
            )}
          </div>
          <MainButton value='확인' onClick={handleSubmit} /> {/* onClick 속성 추가 */}
        </div>
      </div>
    </div>
  );
}

export default Nickname;
