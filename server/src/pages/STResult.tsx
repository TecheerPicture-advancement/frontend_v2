import React, { useState, useEffect } from 'react';
import ResultImage from '../components/ResultImage';
import ResultButton from '../components/ResultButton';
import { useLocation, Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import axios from 'axios';

interface SimpleData {
  background_id: string;
  image_url: string;
}

const STResult: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [backgroundData, setBackgroundData] = useState<SimpleData[]>([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const backgroundIdsParam = searchParams.get('backgroundIds');
  const backgroundIds = backgroundIdsParam ? backgroundIdsParam.split(',') : [];
  const imageId = searchParams.get('imageId');

  useEffect(() => {
    const fetchBackgroundData = async () => {
      if (backgroundIds.length > 0) {
        try {
          const fetchedData = await Promise.all(
            backgroundIds.map(async (backgroundId) => {
              const response = await axios.get(`http://localhost:8000/api/v1/backgrounds/${backgroundId}/`);
              return response.data as SimpleData;
            })
          );
          setBackgroundData(fetchedData);
        } catch (error) {
          console.error('Error fetching background data:', error);
          // 에러 처리 로직 추가
        }
      } else {
        console.error('No backgroundIds provided in query parameters');
        // Handle the case where backgroundIds are missing
      }
    };

    fetchBackgroundData();
  }, [backgroundIds]);

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
      <header className="flex items-center justify-center text-4xl text-white font-PR_BL my-14">{getResultTitle()}</header>
      <div className="flex flex-row items-start justify-center w-full shrink-0">
        <div className="grid grid-cols-2 gap-10 shrink-0">
          {backgroundData.map((data) => (
            <div className="flex flex-wrap items-center justify-center shrink-0" key={data.background_id}>
              <ResultImage 
                src={data.image_url}
                onClick={() => setSelectedPhoto(data.image_url)}
                isSelected={selectedPhoto === data.image_url}
                width="64"
                height="64" maintext={''} servetext={''}              />
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center shrink-0">
          {selectedPhoto && 
          <div className="ml-24">
            <img src={selectedPhoto || ''} alt="selected" className="w-64 h-64 mb-5 border border-gray-300" />
            <div className="flex flex-col gap-10 space-y-2 mt-14">
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