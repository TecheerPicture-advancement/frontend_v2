import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import ResultButton from '../components/ResultButton';

interface BackgroundData {
  image_url: string;
  background_id: string;
}

const NukkiResult: React.FC = () => {
  const [backgroundData, setBackgroundData] = useState<BackgroundData | null>(null);
  const queryParams = new URLSearchParams(window.location.search);
  const backgroundIds = queryParams.getAll('backgroundIds');

  useEffect(() => {
    const fetchBackgroundData = async () => {
      if (backgroundIds.length > 0) {
        try {
          const promises = backgroundIds.map(async (id) => {
            const response = await axios.get(`http://localhost:8000/api/v1/backgrounds/${id}/`);
            return response.data as BackgroundData;
          });
          const results = await Promise.all(promises);
          setBackgroundData(results[0]);
        } catch (error) {
          console.error('Error fetching background data:', error);
          // 에러 처리 로직 추가
        }
      } else {
        console.error('No backgroundIds provided in query parameters');
        // backgroundIds가 없는 경우 처리
      }
    };

    fetchBackgroundData();
  }, [backgroundIds]);

  const downloadImage = async () => {
    if (backgroundData?.image_url) {
      try {
        const response = await axios.get(backgroundData.image_url, {
          responseType: 'blob'
        });
        const blob = new Blob([response.data], { type: 'image/png' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'Nukki_image.png';
        link.click();
      } catch (error) {
        console.error('Error downloading file:', error);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen bg-black">
        <NavBar />
        <div className="flex items-center justify-center flex-grow">
          <div className="w-auto h-auto border border-green-Light shadow-md py-20 px-32 flex flex-col gap-12">
            <div className="flex justify-center text-white text-3xl font-PR_BL">
              누끼 결과 이미지
            </div>
            <div className="grid grid-cols-2">
              <div className="flex justify-center items-center m-18">
                <img src={backgroundData?.image_url} alt="누끼 결과 이미지" className="w-80 h-80" />
              </div>
              <div className="flex flex-col space-y-2 gap-10 px-10 py-20">
                <ResultButton value='테마 이미지 생성' />
                <Link to='/simple/result'>
                  <ResultButton value='심플 이미지 생성' />
                </Link>
                <div onClick={downloadImage}>
                  <ResultButton value='다운로드' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NukkiResult;
