import React, { useState } from 'react';
import ResultImage from '../components/ResultImage';
import ResultButton from '../components/ResultButton';
import { useLocation, Link } from 'react-router-dom';
import NavBar from '../components/NavBar';

const STResult: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const location = useLocation();

  const photos: string[] = [
    '../../public/assets/Beauty.jpg',
    '../../public/assets/Beauty1.png',
    '../../public/assets/Beauty2.jpg',
    '../../public/assets/Beauty3.jpg',
    '../../public/assets/Beauty4.jpg',
    '../../public/assets/Beauty5.jpg',
  ];

  const getResultTitle = () => {
    if (location.pathname.includes('theme')) {
      return '테마 결과 이미지';
    }
    if (location.pathname.includes('simple')) {
      return '심플 결과 이미지';
    }
    return '결과 이미지';
  };

  const getResizingLink = () => {
    if (location.pathname.includes('theme')) {
      return '/theme/result/resizing';
    }
    if (location.pathname.includes('simple')) {
      return '/simple/result/resizing';
    }
    return '/result/resizing';
  };

  return (
    <div className="flex flex-col justify-start min-h-screen bg-black">
      <NavBar />
      <header className="text-white text-4xl font-PR_BL flex justify-center items-center my-14">{getResultTitle()}</header>
      <div className="flex flex-row w-full justify-center items-start shrink-0">
        <div className="grid grid-cols-3 gap-10 shrink-0">
          {photos.map((photo, index) => (
            <div key={index} className="flex justify-center items-center shrink-0 flex-wrap">
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
          <div className="ml-24">
            <img src={selectedPhoto} alt="selected" className="w-64 h-64 border border-gray-300 mb-5" />
            <div className="flex flex-col space-y-2 gap-10 mt-14">
              <ResultButton value="이미지 재생성" />
              <Link to={getResizingLink()}> {/*로딩컴포넌트 만든 후 다시 수정*/}
                <ResultButton value="이미지 크기 조절" />
              </Link>
              <ResultButton value="다운로드" />
            </div>
          </div>
          }
        </div>
      </div>
    </div>
  );
};

export default STResult;
