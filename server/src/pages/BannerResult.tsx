/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ResultImageBanner from '../components/ResultImageBanner';
import ResultButton3 from '../components/ResultButton3';
import LastImage, { LastImageRef } from '../components/LastImage';
import NavBar from '../components/NavBar';

interface BannerResponse {
  code: number;
  message: string;
  data: {
    maintext: string;
    servetext: string;
    maintext2: string;
    servetext2: string;
  };
}

interface BackgroundResponse {
  id: number;
  user: number;
  image_url: string;
  output_h: number;
  output_w: number;  
}

const BannerResult: React.FC = () => {
  const location = useLocation(); 
  const { bannerId, backgroundids = [] } = location.state || {}; 
  const { takeMaintext, takeServetext, Index } = location.state || {};
  const { MaintextArr = [] } = location.state || {}; 
  const { ServetextArr = [] } = location.state || {}; 
  if (!bannerId || backgroundids.length === 0) {
    console.error('Missing data: bannerId or backgroundids');
    return <div>Required data is missing. Please try again.</div>;
  }
  
  // 배너 텍스트 배열 상태 변수
  const [MainText, setMainText] = useState<string[]>([]);
  const [ServeText, setServeText] = useState<string[]>([]);

  // 사진 배열 상태 변수
  const [photos, setPhotos] = useState<string[]>([]);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  const [selectedBackgroundId, setSelectedBackgroundId] = useState<number | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [selectedMainText, setSelectedMainText] = useState<string>('');
  const [selectedserveText, setSelecedtServeText] = useState<string>('');
  const [index, setindex] = useState<number>(0);

  const lastImageRef = useRef<LastImageRef>(null);
  const [isImageVisible, setIsImageVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  const goToResizingBanner = () => {
    if (selectedBackgroundId !== null) {
      navigate('/banner/result/resizing', { state: { backgroundid: selectedBackgroundId, Maintext: selectedMainText, Servetext: selectedserveText } });
    }
  };
  
  const goToBannerEdit = () => {
    if (selectedBackgroundId !== null) {
      navigate('/banner/result/edit', { state: { 
        backgroundids: backgroundids, 
        MaintextArr: MainText, 
        ServetextArr: ServeText, 
        banner_id: bannerId, 
        Photo: selectedPhoto, 
        selectMaintext: selectedMainText, 
        selectServetext: selectedserveText, 
        index: index } });
    }
  };

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await axios.get<BannerResponse>(`/api/v1/banners/${bannerId}/`);
        if (response.data && response.data.data) {
          const mainTextArray = new Array(backgroundids.length).fill(response.data.data.maintext);
          const serveTextArray = new Array(backgroundids.length).fill(response.data.data.servetext);
          
          if (MaintextArr.length > 0) {
            setMainText(MaintextArr);
          } else {
            setMainText(mainTextArray);
          }

          if (ServetextArr.length > 0) {
            setServeText(ServetextArr);
          } else {
            setServeText(serveTextArray);
          }

          if (Index !== undefined) {
            setMainText(prevMainText => {
              const newMainText = [...prevMainText];
              newMainText[Index] = takeMaintext || prevMainText[Index];
              return newMainText;
            });
          
            setServeText(prevServeText => {
              const newServeText = [...prevServeText];
              newServeText[Index] = takeServetext || prevServeText[Index];
              return newServeText;
            });
          }

        } else {
          console.log('유효한 데이터를 가져오지 못했습니다.');
        }
      } catch (error) {
        console.error('배너 데이터를 가져오는 중 오류가 발생했습니다.');
      }
    };

    fetchBanner();
  }, [bannerId, backgroundids, Index, MaintextArr, ServetextArr, takeMaintext, takeServetext]);

  useEffect(() => {
    const fetchBackgroundWithRetry = async (id: number, retries = 30, delay = 3000): Promise<string> => {
      for (let i = 0; i < retries; i++) {
        try {
          const response = await axios.get<BackgroundResponse>(`/api/v1/backgrounds/${id}/`);
          if (response.data && response.data.image_url) {
            return response.data.image_url;
          }
        } catch (error) {
          console.log(`Retry ${i + 1} failed for ID ${id}`);
        }
        await new Promise(res => setTimeout(res, delay));
      }
      throw new Error(`Failed to fetch image URL for ID ${id} after ${retries} retries`);
    };

    const fetchBackgrounds = async () => {
      try {
        const responses = await Promise.all(
          backgroundids.map((id: number) => fetchBackgroundWithRetry(id))
        );

        setPhotos(responses);
        if (responses.length > 0) {
          const firstBackground = await axios.get<BackgroundResponse>(`/api/v1/backgrounds/${backgroundids[0]}/`);
          if (firstBackground.data) {
            setWidth(firstBackground.data.output_w);
            setHeight(firstBackground.data.output_h);
          }
        }
      } catch (error: any) {
        console.error('Failed to fetch background images:', error.message);
      }
    };

    fetchBackgrounds();
  }, [backgroundids]);

  const handleDownloadClick = async () => {
    if (lastImageRef.current) {
      setIsImageVisible(true); // Show the image component
      // Allow time for the component to render before capturing
      setTimeout(async () => {
        if (lastImageRef.current) { // Double-check if the ref is still non-null
          await lastImageRef.current.downloadImage();
        }
        setIsImageVisible(false); // Hide the image component
      }, 500); // Small delay to ensure the component is visible
    }
  };

  return (
    <div className="flex flex-col w-full h-full min-h-screen px-10 pb-12 bg-black">
      <NavBar />
      <header className="flex items-center justify-center my-6 text-4xl font-PR_BL">
        <span className="text-white">배너 </span>
        <span className="ml-2 text-green-Normal">결과 이미지</span>
      </header>
      <div className="flex flex-row items-start justify-center w-full h-full">
        <div className="grid h-full grid-cols-2 gap-10">
          {photos.map((photo, index) => (
            <div key={index} className="flex flex-wrap items-center justify-center h-full">
              <ResultImageBanner 
                src={photo} 
                onClick={() => {
                  setSelectedPhoto(photo);
                  setSelectedBackgroundId(backgroundids[index]); // Update selected background id
                  setSelectedMainText(MainText[index]);
                  setSelecedtServeText(ServeText[index]);
                  setindex(index);
                }}
                isSelected={selectedPhoto === photo}
                width={256}
                height={256}
                maintext={MainText[index]}
                servetext={ServeText[index]}
              />
            </div>
          ))}
        </div>
       
        {selectedPhoto && 
          <div className="flex flex-col gap-10 ml-24 minHeight">
            <ResultImageBanner
              src={selectedPhoto}
              isSelected={false}
              width={256}
              height={256}
              maintext={selectedMainText}
              servetext={selectedserveText} />
            
            <div className="flex flex-col gap-10 mt-[4px]">
              <div onClick={goToBannerEdit}>
                <ResultButton3 value='문구 편집' />
              </div>
              <div onClick={handleDownloadClick}>
                <ResultButton3 value='다운로드' />
              </div>
              <div onClick={goToResizingBanner}>
                <ResultButton3 value='이미지 크기 조절' />
              </div>
            </div>
          </div>
        }
      </div>
      {/* The component for invisible rendering */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', visibility: isImageVisible ? 'visible' : 'hidden', pointerEvents: 'none' }}>
        <LastImage
          ref={lastImageRef}
          src={selectedPhoto || ''} // Ensure src is always provided
          width={width}
          height={height}
          maintext={selectedMainText}
          servetext={selectedserveText}
          />
      </div>
    </div>
  );
};

export default BannerResult;


