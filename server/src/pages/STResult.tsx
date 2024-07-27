import React, { useState, useEffect } from 'react';
import ResultImage from '../components/ResultImage';
import ResultButton from '../components/ResultButton';
import { useLocation, Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import axios from 'axios';

interface SimpleData {
  background_id: number;
  image_url: string;
}
interface NukkiData {
  background_id: number;
  image_url: string;
}

interface ImageResponse {
  data: {
    id: number;
    image_url: string;
  };
}

const STResult: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [backgroundData, setBackgroundData] = useState<SimpleData[]>([]);
  const [removeBgData, setRemoveBgData] = useState<NukkiData | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);

  const location = useLocation();
  const state = location.state as { conceptBackgroundIds: number[]; removeBgBackgroundId: number; imageId: number };
  const { conceptBackgroundIds, removeBgBackgroundId, imageId } = state;

  useEffect(() => {
    const fetchBackgroundData = async () => {
      if (conceptBackgroundIds.length > 0) {
        try {
          const fetchedData = await Promise.all(
            conceptBackgroundIds.map(async (backgroundId) => {
              const response = await axios.get(`http://localhost:8000/api/v1/backgrounds/${backgroundId}/`);
              return response.data as SimpleData;
            })
          );
          setBackgroundData(fetchedData);
        } catch (error) {
          console.error('Error fetching background data:', error);
        }
      } else {
        console.error('No backgroundIds provided in state');
      }
    };

    const fetchRemoveBgData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/backgrounds/${removeBgBackgroundId}/`);
        setRemoveBgData(response.data as NukkiData);
      } catch (error) {
        console.error('Error fetching removeBg background data:', error);
      }
    };

    const fetchImageData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/images/${imageId}/`);
        const data = response.data as ImageResponse;
        setImageData(data.data.image_url);
      } catch (error) {
        console.error('Error fetching image data:', error);
      }
    };

    fetchBackgroundData();
    fetchRemoveBgData();
    fetchImageData();
  }, [conceptBackgroundIds, removeBgBackgroundId, imageId]);

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

  const downloadImage = async (url: string) => {
    try {
      const response = await axios.get(url, { responseType: 'blob' });
      const blob = new Blob([response.data as BlobPart], { type: response.headers['content-type'] });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', 'result.png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  return (
    <div className="flex flex-col justify-start min-h-screen bg-black">
      <NavBar />
      <header className="flex items-center justify-center text-4xl text-white font-PR_BL my-14">{getResultTitle()}</header>
      <div className="flex flex-row items-start justify-center w-full shrink-0">
        <div className="grid grid-cols-2 gap-10 shrink-0">
          {imageData && (
            <div className="flex flex-wrap items-center justify-center shrink-0">
              <ResultImage
                src={imageData}
                onClick={() => setSelectedPhoto(imageData)}
                isSelected={selectedPhoto === imageData}
                width="64"
                height="64"
              />
            </div>
          )}

          {removeBgData && (
            <div className="flex flex-wrap items-center justify-center shrink-0">
              <ResultImage
                src={removeBgData.image_url}
                onClick={() => setSelectedPhoto(removeBgData.image_url)}
                isSelected={selectedPhoto === removeBgData.image_url}
                width="64"
                height="64"
              />
            </div>
          )}

          {backgroundData.map((data) => (
            <div className="flex flex-wrap items-center justify-center shrink-0" key={data.background_id}>
              <ResultImage
                src={data.image_url}
                onClick={() => setSelectedPhoto(data.image_url)}
                isSelected={selectedPhoto === data.image_url}
                width="64"
                height="64"
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center shrink-0">
          {selectedPhoto && (
            <div className="ml-24">
              <img src={selectedPhoto || ''} alt="selected" className="w-64 h-64 mb-5 border border-gray-300" />
              <div className="flex flex-col gap-10 space-y-2 mt-14">
                <Link to={getResizingLink()}>
                  <ResultButton value="이미지 크기 조절" />
                </Link>
                <div onClick={() => downloadImage(selectedPhoto)}>
                  <ResultButton value="다운로드" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default STResult;
