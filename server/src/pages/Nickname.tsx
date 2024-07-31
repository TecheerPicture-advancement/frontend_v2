import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import MainButton from '../components/MainButton';
import { useUser } from '../api/Usercontext';

interface NicknameResponse {
  data: {
    id: string;
    nickname: string;
  };
}

const Nickname: React.FC = () => {
  const [nickname, setNickname] = useState<string>('');
  const [nicknameSuccess, setNicknameSuccess] = useState<string>('');
  const [nicknameError, setNicknameError] = useState<string>('');
  const navigate = useNavigate();
  const { setUserid } = useUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setNicknameError(''); // 입력할 때마다 에러 메시지를 초기화
    setNicknameSuccess(''); // 입력할 때마다 성공 메시지를 초기화
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post<NicknameResponse>('/api/v1/nicknames/', { nickname });
      console.log('Nickname registered successfully:', response.data);
      setNicknameSuccess('닉네임이 성공적으로 생성되었습니다.');
      const userId = response.data.data.id;
      setUserid(userId); // 전역 상태에 userid 설정
      navigate('/mainchoose'); // 닉네임 생성이 성공하면 페이지 이동
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setNicknameError('중복된 닉네임입니다. 다른 닉네임을 입력해주세요.');
      } else {
        console.error('Error registering nickname:', error);
        setNicknameError('닉네임 등록 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
      setNicknameSuccess('');
    }
  };

  return (
    <div className='flex flex-col h-screen'>
      <div className='flex-shrink-0'>
        <NavBar />
      </div>
      <div className="flex items-center justify-center flex-1 bg-black">
        <div className='flex flex-col items-center justify-center w-3/12 gap-3'>
          <div className='flex'>
            <div className="text-3xl text-white font-PR_BO whitespace-nowrap">닉네임 입력</div>
            <div className="ml-2 text-3xl font-PR_BO text-red">*</div>
          </div>
          <input
            type="text"
            value={nickname}
            onChange={handleChange}
            className="rounded-lg border border-green-Light text-green-Light font-PR_L w-full h-[44px] bg-black px-3"
          />
          {nicknameError && (
            <div className="mt-2 text-sm text-red">{nicknameError}</div>
          )}
          {nicknameSuccess && (
            <div className="mt-2 text-sm text-green-Normal">{nicknameSuccess}</div>
          )}
          <div className='w-full mt-4 h-[42px]'>
            <MainButton value='확인' onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nickname;
