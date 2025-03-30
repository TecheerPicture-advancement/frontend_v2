import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import useImageStore from '../store/useImageStore';
import ResultButton from '../components/ResultButton3';
import ResultImage from '../components/ResultImage';
import Loading from '../components/Loading';
import { loginToInstagram } from '../apis/instagram'
import { handleDownload } from '../utils/downloadImage'

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface ImageResponse {
  imageUrl: string;
}

const STResult: React.FC = () => {
  const { type } = useParams();
  const title = type === "theme" ? "테마결과 이미지" : "심플결과 이미지";
  const { imageId } = useImageStore();
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [optimizedPhoto] = useState<string | null>(null);
  const location = useLocation();
  const { imageUrls } = (location.state as { imageUrls?: string[] }) || {};
  const [generatedImages, setGeneratedImages] = useState<string[]>(imageUrls || []);  
  const navigate = useNavigate();

  useEffect(() => {
    if (originalImage) {
      setSelectedPhoto(originalImage);
    }
  }, [originalImage]);

  useEffect(() => {
    if (!imageId) {
      console.error("No imageId found in store");
      return;
    }
    if (!imageUrls || imageUrls.length === 0) {
      console.error("No imageUrls received");
      return;
    }

    setGeneratedImages(imageUrls);
  }, [imageId, imageUrls]);

  useEffect(() => {
    let isMounted = true;

    if (!imageId) {
      console.error("No imageId found in store");
      setIsLoading(false);
      return;
    }
    if (!imageUrls || imageUrls.length === 0) {
      console.error("No imageUrls received");
      return;
    }

    setGeneratedImages(imageUrls);

    const fetchOriginalImage = async () => {
      try {
        const response = await axios.get<ImageResponse>(`${BASE_URL}/images/${imageId}`);
        if (isMounted) {
          setOriginalImage(response.data.imageUrl);
          setSelectedPhoto(response.data.imageUrl);
        }
      } catch (error) {
        console.error("Error fetching original image:", error);
      }
    };

    const fetchData = async () => {
      await fetchOriginalImage();
      if (isMounted) setIsLoading(false);
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [imageId, imageUrls]);

  const handleNavigateToInstagram = async () => {
    if (selectedPhoto) {
      const authData = await loginToInstagram();

      if (authData) {
        navigate('/upload', {
          state: { 
            imageId 
          }
        });
      }
    }
  };

  const handleShowBannerSetting = () => {
    if (selectedPhoto) {
      navigate('/banner', { state: { imageUrl: selectedPhoto } });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-14">
          <header className="flex items-center justify-center text-4xl dark:text-white text-black font-PR_BL">
            {title}
          </header>
          <div className="flex flex-row items-start justify-center w-full shrink-0 gap-20">
            <div className="grid grid-cols-2 gap-10 shrink-0 w-full sm:w-auto">
              {originalImage && (
                <div className="relative flex flex-wrap items-center justify-center shrink-0 cursor-pointer"
                  onClick={() => setSelectedPhoto(originalImage)}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-300 to-white mix-blend-multiply z-10"/>
                  <ResultImage
                    src={originalImage}
                    isSelected={selectedPhoto === originalImage}
                    width="64"
                    height="64"
                    maintext="원본 이미지"
                    servetext=""
                  />
                </div>
              )}

              {generatedImages.map((url, index) => (
                <div className="flex flex-wrap items-center justify-center shrink-0" key={index}>
                  <ResultImage
                    src={url}
                    onClick={() => setSelectedPhoto(url)}
                    isSelected={selectedPhoto === url}
                    width="64"
                    height="64"
                    maintext=""
                    servetext=""
                  />
                </div>
              ))}
            </div>
            {selectedPhoto && (
              <div className="flex flex-col items-center gap-10 w-full sm:w-auto">
                <img 
                  src={optimizedPhoto || selectedPhoto} 
                  alt="selected img" 
                  className="w-64 h-64 border border-gray-300 object-cover" 
                  onContextMenu={(e) => e.preventDefault()} 
                />
                <div className="w-full flex flex-col gap-10">
                  <ResultButton value="인스타그램 썸네일 제작" onClick={handleShowBannerSetting} />
                  <ResultButton value="인스타그램 피드 올리기" onClick={handleNavigateToInstagram} />
                  <ResultButton value="선택된 사진 다운로드" onClick={() => handleDownload(selectedPhoto)} /> {/* New button for downloading selected photo */}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default STResult;
