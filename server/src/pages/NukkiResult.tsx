import React, { useState } from 'react';
import ResultImage from '../components/ResultImage';
import ResultButton from '../components/ResultButton';

const NukkiResult: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const photos: string[] = [
    '../../public/assets/Beauty1.png',
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="w-7/12 h-4/5 border border-green-Light shadow-md p-4 flex flex-col">
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
                <ResultButton value='배경 생성으로 이동' />
                <ResultButton value='다운로드' />
                <ResultButton value='복사하기' />
            </div>
            </div>
        </div>
            
      </div>
    </div>
  );
};

export default NukkiResult;
