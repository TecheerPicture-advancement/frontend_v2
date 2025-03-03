import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import useImageStore from '../store/useImageStore';
import NavBar from '../components/NavBar';
import ResultButton from '../components/ResultButton3';
import ResultImage from '../components/ResultImage';
import Loading from '../components/Loading';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface ImageResponse {
  imageUrl: string;
}

const STResult: React.FC = () => {
  const { imageId } = useImageStore();
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [optimizedPhoto, setOptimizedPhoto] = useState<string | null>(null);
  const location = useLocation();
  const { imageUrls } = (location.state as { imageUrls?: string[] }) || {};
  const [generatedImages, setGeneratedImages] = useState<string[]>(imageUrls || []);


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
  
  // WEBP 변환 후 이미지 설정
  useEffect(() => {
    if (selectedPhoto) {
      loadImage(selectedPhoto).then((img) => {
        const webpDataUrl = resizeAndConvertToWebp(img);
        setOptimizedPhoto(webpDataUrl);
      });
    }
  }, [selectedPhoto]);
  
  const downloadImage = async (imageUrl: string, format: "png" | "jpg" = "png") => {
    try {
      const img = await loadImage(imageUrl);
      const dataUrl = format === "png" ? resizeAndConvertToPng(img) : resizeAndConvertToJpeg(img);
      
      const link = document.createElement("a");
      link.href = dataUrl;
      link.setAttribute("download", `result.${format}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };
  
  const copyImage = async (imageUrl: string) => {
    try {
      const img = await loadImage(imageUrl);
      const dataUrl = resizeAndConvertToJpeg(img);
  
      const blob = dataURLtoBlob(dataUrl);
      const clipboardItem = new ClipboardItem({ [blob.type]: blob });
      await navigator.clipboard.write([clipboardItem]);
  
      alert("이미지가 클립보드에 복사되었습니다.");
    } catch (error) {
      console.error("Error copying image:", error);
    }
  };
  
  const loadImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  };
  
  const resizeAndConvertToWebp = (img: HTMLImageElement): string => {
    return resizeAndConvert(img, "image/webp", 0.8);
  };
  
  const resizeAndConvertToPng = (img: HTMLImageElement): string => {
    return resizeAndConvert(img, "image/png");
  };
  
  const resizeAndConvertToJpeg = (img: HTMLImageElement): string => {
    return resizeAndConvert(img, "image/jpeg", 0.8);
  };
  
  const resizeAndConvert = (img: HTMLImageElement, format: string, quality = 1): string => {
    const maxWidth = 1080;
    const scale = maxWidth / img.width;
    const newWidth = img.width * scale;
    const newHeight = img.height * scale;
  
    const canvas = document.createElement("canvas");
    canvas.width = newWidth;
    canvas.height = newHeight;
  
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(img, 0, 0, newWidth, newHeight);
  
    return canvas.toDataURL(format, quality);
  };
  
  const dataURLtoBlob = (dataUrl: string): Blob => {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1] || "image/jpeg";
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };  
  

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col justify-start min-h-screen">
          <NavBar />
          <header className="flex items-center justify-center text-4xl text-white dark:text-black font-PR_BL my-14">
            심플결과 이미지
          </header>
          <div className="flex flex-row items-start justify-center w-full shrink-0">
            <div className="grid grid-cols-2 gap-10 shrink-0">
              {originalImage && (
                <div className="flex flex-wrap items-center justify-center shrink-0">
                  <ResultImage
                    src={originalImage}
                    onClick={() => setSelectedPhoto(originalImage)}
                    isSelected={selectedPhoto === originalImage}
                    width="64"
                    height="64"
                    maintext=""
                    servetext="원본 이미지"
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
            <div className="flex flex-col items-center shrink-0">
              {selectedPhoto && (
                <div className="ml-24">
                  <img src={optimizedPhoto || selectedPhoto} alt="selected img" className="w-64 h-64 mb-5 border border-gray-300 object-cover" />

                  <div className="flex flex-col gap-10 mt-10">
                    <ResultButton value="인스타그램 피드 올리기" />
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
      )}
    </>
  );
};

export default STResult;