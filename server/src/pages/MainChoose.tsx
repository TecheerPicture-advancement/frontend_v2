import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MoveChoose from '../components/MoveChoose';
import MoveChoose2 from '../components/MoveChoose2';
import MainButton from '../components/MainButton';
import axios from 'axios';

interface NicknameResponse {
  data: {
    id: string;
    nickname: string;
  };
}

const MainChoose: React.FC = () => {
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [Rayout, setRayout] = useState<string | null>(null);
  const [data, setData] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();
  const { userid } = location.state || {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userid) {
          const response = await axios.get<NicknameResponse>(`http://localhost:8000/api/v1/nicknames/${userid}`);
          setData(response.data.data.nickname); // 응답 데이터에서 닉네임을 추출하여 상태로 설정
        }
      } catch (error) {
        console.error('Error fetching nickname:', error);
      }
    };
    fetchData();
  }, [userid]);

  const handleButtonClick = (buttonType: string) => {
    setActiveButton(buttonType);
    setRayout(buttonType);
  };

  const handleStartClick = () => {
    if (activeButton === '상품 배경을') {
      navigate('/background');
    } else if (activeButton === '광고 배너를') {
      navigate('/banner');
    }
  };

  return (
    <div className='bg-black min-h-screen flex place-items-center place-content-center'>
      <div className="flex flex-row w-10/12 gap-40 p-2.5 place-content-center">
        {/* 왼쪽 레이아웃 */}
        <div className="w-7/12 gap-14 place-content-center justify-center">
          <div className="flex flex-col relative overflow-hidden">
            {Rayout ? (
              <div className="">
                <p className="my-12 text-4xl font-PR_BO text-left text-white">
                  {activeButton} 생성해 드릴게요
                </p>
              </div>
            ) : (
              <div>
                <p className="absolute left-0 text-3xl font-PR_BO text-left text-gray-200">
                  안녕하세요!
                </p>
                <p className="my-12 text-4xl font-PR_BO text-left text-white">
                  {data}님
                </p>
              </div>
            )}
          </div>
          {activeButton ? (
            <div
              onClick={handleStartClick}
              className='bg-green-Normal w-full h-14 rounded-[10px] overflow-hidden place-content-center'
            >
              <MainButton value='시작하기' />
            </div>
          ) : (
            <div className="w-full h-14 rounded-[10px] bg-[#B8B8B8] overflow-hidden place-content-center">
              <button className="text-xl font-PR_BO text-center text-white w-full h-full">
                메뉴 선택 후 시작하기
              </button>
            </div>
          )}
        </div>
        {/* 오른쪽 레이아웃 */}
        <div className="w-full flex flex-col gap-10 justify-center items-center">
          <MoveChoose
            isActive={activeButton === '상품 배경을'}
            onButtonClick={() => handleButtonClick('상품 배경을')}
          />
          <MoveChoose2
            isActive={activeButton === '광고 배너를'}
            onButtonClick={() => handleButtonClick('광고 배너를')}
          />
        </div>
      </div>
    </div>
  );
};

export default MainChoose;
