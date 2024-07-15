import React, { useState } from 'react';
import ResultImage from '../components/ResultImage';
import ResultButton from '../components/ResultButton';
import NavBar from '../components/NavBar';

const BannerResult: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const photos: string[] = [
    '../../public/assets/Beauty.jpg',
    '../../public/assets/Beauty1.png',
    '../../public/assets/Beauty2.jpg',
    '../../public/assets/Beauty3.jpg',
  ];

  return (
    <div className="flex flex-col items-center justify-start w-full h-full min-h-screen px-10 pb-12 bg-black">
        <NavBar/>
        <header className="my-6 text-4xl font-PR_BL">
            <span className="text-white">배너 </span>
            <span className="text-green-Normal">결과 이미지</span>
        </header>
      <div className="flex flex-row items-start justify-center w-full shrink-0">
        <div className="grid grid-cols-2 gap-10 shrink-0">
          {photos.map((photo, index) => (
            <div key={index} className='flex flex-wrap items-center justify-center shrink-0'>
              <ResultImage 
                src={photo} 
                onClick={() => setSelectedPhoto(photo)}
                isSelected={selectedPhoto === photo}
                width="64"
                height="64"
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center shrink-0">
          {selectedPhoto && 
          <div className='ml-24'>
          <img src={selectedPhoto} alt="selected" className="w-64 h-64 mb-5 border border-gray-300" />
          <div className="flex flex-col gap-10 space-y-2 mt-14">
            <ResultButton value='문구 편집' />
            <ResultButton value='다운로드' />
            <ResultButton value='복사하기' />
          </div>
          </div>
          }
        </div>
      </div>
    </div>
  );
};

export default BannerResult;
