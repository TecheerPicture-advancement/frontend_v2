import React, { useState } from 'react';
import ResultImage from '../components/ResultImage';
import ResultButton from '../components/ResultButton';
import NavBar from '../components/NavBar';
import { Link } from 'react-router-dom';

const NukkiResult: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const photos: string[] = [
    '../../public/assets/Beauty1.png',
  ];

  return (
    <div className="flex flex-col justify-start min-h-screen bg-black">
      <NavBar/>
      <div className='flex flex-col justify-center items-center'>
      <div className="w-7/12 h-4/5  border border-green-Light shadow-md p-4 flex flex-col">
            <div className="flex justify-center text-white text-3xl font-PR_BL mt-10">
            누끼 결과 이미지
            </div>
            <div className='grid grid-cols-1'>
            <div className="flex justify-around items-center my-14 flex-wrap">
            {photos.map((photo, index) => (
                <div key={index} className='w-5/4 h-5/4 flex justify-center items-center shrink-0 flex-wrap'>
                <ResultImage 
                    src={photo} 
                    onClick={() => setSelectedPhoto(null)}
                    isSelected={selectedPhoto === photo}
                    width="80" 
                    height="[300px]"
                />
                </div>
            ))}
            <div className="flex flex-col space-y-2 gap-10">
                <ResultButton value='테마 이미지 생성' />
                <Link to='/simple/result'> {/* 일단 심플 결과페이지로 이동시키게 했는데 원래는 로딩 컴포넌트 들어가고 결과페이지로 이동될 것*/}
                <ResultButton value='심플 이미지 생성' />
                </Link>
                <ResultButton value='다운로드' />
            </div>
            </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default NukkiResult;
