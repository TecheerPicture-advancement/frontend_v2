import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SizeFields from '../components/form/SizeFields';
import axios from '../api/axios.config';
import ResultImageBanner from '../components/ResultImageBanner';
import LastImage, { LastImageRef } from '../components/LastImage';

interface ResizingResponse {
  background_id: number;
  width: number;
  height: number;
  resized_image_url: string;
}

interface FormData {
  output_w: number;
  output_h: number;
}

interface BackgroundResponse {
  id: number;
  user: number;
  image_url: string;
  output_w: number;
  output_h: number;
}

const ImageResizingBanner: React.FC = () => {
    const location = useLocation();
  const { backgroundid, Maintext, Servetext } = location.state || {}; // BannerResult에서 전달된 state 구조 분해 할당

  // 폼 데이터 및 이미지 세부 정보에 대한 상태 변수
  const [formData, setFormData] = useState<FormData>({ output_h: 1000, output_w: 1000 });
  const [col, setCol] = useState<number>(0);
  const [row, setRow] = useState<number>(0);
  const [image, setImage] = useState<string>('');
  const [resizingImage, setResizingImage] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  const lastImageRef = useRef<LastImageRef>(null);
  const [isImageVisible, setIsImageVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (backgroundid) {
          const response = await axios.get<BackgroundResponse>(`http://localhost:8000/api/v1/backgrounds/${backgroundid}/`);
          if (response.data) {
            setImage(response.data.image_url);
            setCol(response.data.output_h);
            setRow(response.data.output_w);
            setFormData({
              output_w: response.data.output_w,
              output_h: response.data.output_h,
            });
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
  }, [backgroundid]);

  const handleSubmit = async () => {
    setMessage("생성 중");
    try {
      const response = await axios.post<ResizingResponse>('http://localhost:8000/api/v1/resizings/', {
        background_id: backgroundid,
        width: formData.output_w,
        height: formData.output_h,
      });
      setResizingImage(response.data.resized_image_url);
      setIsError(false);
      if (lastImageRef.current) {
        setIsImageVisible(true);
        setTimeout(async () => {
          if (lastImageRef.current) {
            await lastImageRef.current.downloadImage();
            setMessage('이미지가 성공적으로 생성되었습니다.'); // 메시지를 여기로 이동
          }
          setIsImageVisible(false);
        }, 500);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setMessage('사진을 찾을 수 없습니다.');
      } else if (error.response && error.response.status === 500) {
        setMessage('인터넷 서버 오류');
      } else {
        setMessage('Bad request 다시 실행하세요');
      }
      setIsError(true);
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
                src={image}
                isSelected={false}
                width={288}
                height={288}
                maintext={Maintext}
                servetext={Servetext}
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
                onClick={handleSubmit}
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
          src={resizingImage}
          width={formData.output_w}
          height={formData.output_h}
          maintext={Maintext}
          servetext={Servetext}
        />
      </div>
    </div>
  );
};

export default ImageResizingBanner;
