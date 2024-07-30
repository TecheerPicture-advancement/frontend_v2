import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/NavBar';
import ResultButton from '../components/ResultButton3';
import ResultImage from '../components/ResultImage';

interface SimpleData {
  background_id: number;
  image_url: string | null;
}

interface NukkiData {
  background_id: number;
  image_url: string | null;
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
  const [imageWidth, setImageWidth] = useState<number | null>(null);
  const [imageHeight, setImageHeight] = useState<number | null>(null);

  const location = useLocation();
  const state = location.state as { conceptBackgroundIds: number[]; removeBgBackgroundId: number; imageId: number };
  const { conceptBackgroundIds, removeBgBackgroundId, imageId } = state;

  const fetchWithRetry = async (url: string, retries = 30, delay = 3000): Promise<SimpleData | NukkiData> => {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await axios.get(url);
        const data = response.data as SimpleData | NukkiData;
        if (data.image_url) {
          console.log(data.image_url)
          return data;
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
    throw new Error(`Failed to fetch valid data from ${url} after ${retries} attempts`);
  };

  useEffect(() => {
    const fetchBackgroundData = async () => {
      if (conceptBackgroundIds.length > 0) {
        try {
          const fetchedData = await Promise.all(
            conceptBackgroundIds.map(async (backgroundId) => {
              const url = `http://localhost:8000/api/v1/backgrounds/${backgroundId}/`;
              return await fetchWithRetry(url);
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
        const url = `http://localhost:8000/api/v1/backgrounds/${removeBgBackgroundId}/`;
        const data = await fetchWithRetry(url);
        setRemoveBgData(data as NukkiData);
      } catch (error) {
        console.error('Error fetching removeBg background data:', error);
      }
    };

    const fetchImageData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/images/${imageId}/`);
        const data = response.data as ImageResponse;
        setImageData(data.data.image_url);

        const img = new Image();
        img.src = data.data.image_url;
        img.onload = () => {
          console.log(`Image dimensions: ${img.width}x${img.height}`);
          setImageWidth(img.width);
          setImageHeight(img.height);
        };
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

  const copyImage = async (url: string) => {
    try {
      const response = await axios.get(url, { responseType: 'blob' });
      const blob = new Blob([response.data as BlobPart], { type: response.headers['content-type'] });
      const data = [new ClipboardItem({ [blob.type]: blob })];
      await navigator.clipboard.write(data);
      alert('이미지가 클립보드에 복사되었습니다.');
      console.log('Image copied to clipboard');
    } catch (error) {
      console.error('Error copying image:', error);
    }
  };

  const getSelectedPhotoIndex = (): number | null => {
    if (selectedPhoto === imageData) {
      return 0;
    }
    if (selectedPhoto === removeBgData?.image_url) {
      return 1;
    }
    const bgData = backgroundData.find((data) => data.image_url === selectedPhoto);
    return bgData ? 1 : null;
  };
  
  const selectedPhotoId = (() => {
    if (selectedPhoto === imageData) {
      return imageId;
    }
    if (selectedPhoto === removeBgData?.image_url) {
      return removeBgBackgroundId;
    }
    const bgData = backgroundData.find((data) => data.image_url === selectedPhoto);
    return bgData ? bgData.background_id : null;
  })();
  

  const selectedPhotoWidthHeight = selectedPhoto === imageData ? { imageWidth, imageHeight } : null;

  return (
    <div className="flex flex-col justify-start min-h-screen bg-black">
      <NavBar />
      <header className="flex items-center justify-center text-4xl text-white font-PR_BL my-14">{getResultTitle()}</header>
      <div className="flex flex-row items-start justify-center w-full shrink-0">
        <div className="grid grid-cols-2 gap-10 shrink-0">
          {imageData && (
            <div className="flex flex-wrap items-center justify-center shrink-0 overflow-hidden">
              <ResultImage
                src={imageData}
                onClick={() => setSelectedPhoto(imageData)}
                isSelected={selectedPhoto === imageData}
                width="64"
                height="64"
                maintext={''}
                servetext={'변경 전'}
              />
            </div>
          )}

          {removeBgData?.image_url && (
            <div className="flex flex-wrap items-center justify-center shrink-0">
              <ResultImage
                src={removeBgData.image_url}
                onClick={() => setSelectedPhoto(removeBgData.image_url)}
                isSelected={selectedPhoto === removeBgData.image_url}
                width="64"
                height="64"
                maintext={''}
                servetext={''}
              />
            </div>
          )}

          {backgroundData.map((data) => (
            data.image_url && (
              <div className="flex flex-wrap items-center justify-center shrink-0" key={data.background_id}>
                <ResultImage
                  src={data.image_url}
                  onClick={() => setSelectedPhoto(data.image_url)}
                  isSelected={selectedPhoto === data.image_url}
                  width="64"
                  height="64"
                  maintext={''}
                  servetext={''}
                />
              </div>
            )
          ))}
        </div>
        <div className="flex flex-col items-center shrink-0">
          {selectedPhoto && (
            <div className="ml-24">
              <img src={selectedPhoto || ''} alt="selected" className="w-64 h-64 mb-5 border border-gray-300" />
              <div className="flex flex-col gap-10 space-y-2 mt-14">
                <Link
                  to={getResizingLink()}
                  state={{
                    selectedPhotoId,
                    selectedPhotoIndex: getSelectedPhotoIndex(),
                    ...selectedPhotoWidthHeight
                  }}
                >
                  <ResultButton value="이미지 크기 조절" />
                </Link>
                <div onClick={() => downloadImage(selectedPhoto)}>
                  <ResultButton value="다운로드" />
                </div>
                <div onClick={() => copyImage(selectedPhoto)}>
                  <ResultButton value="복사하기" />
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