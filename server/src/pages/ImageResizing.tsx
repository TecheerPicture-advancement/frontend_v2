import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import SizeFields from '../components/form/SizeFields';
import ResultImageBanner from '../components/ResultImageBanner';
import LastImage, { LastImageRef } from '../components/LastImage';


interface FormData {
  output_w: number,
  output_h: number,
}

interface BackgroundResponse {
  id: number,
  user: number,
  image_url: string,
  output_h: number,
  output_w: number
}

interface ImageResponse {
  success: string,
  data: {
    id: number,
    image_url: string,
  }
}

const ImageResizing: React.FC = () => {
  const location = useLocation();
  const { selectedPhotoId, selectedPhotoIndex, imageWidth, imageHeight } = location.state || {}; // Destructure state from location

  const [formData, setFormData] = useState<FormData>({ output_h: 1000, output_w: 1000 });
  const [col, setCol] = useState<number>(imageWidth || 1000);
  const [row, setRow] = useState<number>(imageHeight || 1000);
  const [image, setImage] = useState<string>();
  const [message, setMessage] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  const lastImageRef = useRef<LastImageRef>(null);
  const [isImageVisible, setIsImageVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedPhotoId) {
        console.error('유효한 backgroundId가 제공되지 않았습니다.');
        return;
      }
  
      try {
        if (selectedPhotoIndex === 0) {
          const response = await axios.get<ImageResponse>(`/api/v1/images/${selectedPhotoId}/`);
          setImage(response.data.data.image_url);
        } else {
          const response = await axios.get<BackgroundResponse>(`/api/v1/backgrounds/${selectedPhotoId}/`);
          if (response.data) {
            setImage(response.data.image_url);
            setCol(response.data.output_h);
            setRow(response.data.output_w);
          } else {
            setMessage('유효한 데이터를 가져오지 못했습니다.');
            setIsError(true);
          }
        }
      } catch (error) {
        console.error('Error fetching backgroundid:', error);
        setMessage('백그라운드 데이터를 가져오는 중 오류가 발생했습니다.');
        setIsError(true);
      }
    };
    fetchData();
  }, [selectedPhotoId, selectedPhotoIndex]);

  const handleDownloadClick = async () => {
    if (lastImageRef.current) {
      setIsImageVisible(true);
      setTimeout(async () => {
        if (lastImageRef.current) { 
          await lastImageRef.current.downloadImage();
          setMessage("이미지가 성공적으로 생성되었습니다.")
        }
        setIsImageVisible(false); 
      }, 500); 
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: ''
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: Number(value) });
  };

  const navigate = useNavigate();
  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className="bg-black min-h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center w-[1000px] relative gap-5 border-4 flex-grow-0 flex-shrink-0 border-white">
        <div className="place-content-center w-full h-28 my-6 overflow-hidden">
          <p className="w-full text-4xl font-black text-center">
            <span className="w-full text-4xl font-PR_BL text-center text-white">이미지</span>
            <span className="w-full text-4xl font-PR_BL text-center text-green-Normal"> 크기 조절</span>
          </p>
        </div>

        <div className="flex justify-center flex-row flex-grow-0 flex-shrink-0 w-10/12">
          <div className="flex-col w-1/2 h-full">
            <div className="flex-col flex items-center justify-center">
              <ResultImageBanner
                src={image || ''}
                isSelected={false}
                width={288}
                height={288}
                maintext={''}
                servetext={''}
              />
              <div className="flex-grow-0 flex-shrink-0 h-16 my-8 overflow-hidden">
                <p className="w-full text-2xl font-PR_BO text-center text-white">
                  가로 X 세로 : {row} X {col}
                </p>
              </div>
            </div>
          </div>
          <div className="flex-grow-0 flex-shrink-0 w-1/2 h-full flex-col justify-start overflow-hidden">
            <div className="w-full">
              <SizeFields
                width={formData.output_w}
                height={formData.output_h}
                onChange={handleChange}
                essential={true}
                isDisabled={false}
                onFocus={handleFocus} />
            </div>
            <div className="w-full h-[50px] place-content-center">
              {message && (
                <div className={`text-center text-sm ${isError ? 'text-red' : 'text-green-Normal'}`}>{message}</div>
              )}
            </div>
            <div className="flex justify-center items-center overflow-hidden gap-7">
              <button
                onClick={handleDownloadClick}
                className={`flex justify-center items-center w-50 h-14 rounded-[10px] text-xl font-PR_M text-center text-black ${
                  formData.output_w <= 0 || formData.output_h <= 0 ? 'bg-gray-100 border-gray-100 opacity-50 cursor-not-allowed' : 'bg-green-Normal border-green-Normal hover:font-PR_BO active:font-PR_BO'
                }`}
                disabled={formData.output_w <= 0 || formData.output_h <= 0}
              >
                다운로드
              </button>
              <button
                className="flex justify-center items-center w-50 h-14 rounded-[10px] border-2 border-green-Light hover:border-green-Light hover:font-PR_BO active:font-PR_BO bg-green-Light text-xl font-PR_M text-center text-black"
                onClick={handleClose}
                style={{ cursor: 'pointer' }}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      </div>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', visibility: isImageVisible ? 'visible' : 'hidden', pointerEvents: 'none' }}>
        <LastImage
          ref={lastImageRef}
          src={image || ''}
          width={formData.output_w}
          height={formData.output_h}
          maintext={''}
          servetext={''}
        />
      </div>
    </div>
  );
};

export default ImageResizing;