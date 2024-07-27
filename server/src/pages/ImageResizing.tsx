import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SizeFields from '../components/form/SizeFields';
import axios from '../api/axios.config';
import { downloadFile } from '../components/form/FileDownload';

//post 보내기
interface ResizingResponse {
    background_id: number;
    width: number;
    height: number;
    resized_image_url:string;
}

//get 받기
interface BackgroundResponse{
    id: number,
    user: number,
    image_url: string,
    output_h: number,
    output_w: number
}

interface FormData {
  output_w: number;
  output_h: number;
}

const ImageResizing: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    output_h: 1000,
    output_w: 1000
  });

    


  const [col, setCol] = useState<number>(0);
  const [row, setRow] = useState<number>(0);
  const [image, setImage] = useState<string>('');
  
  const [message, setMessage] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  
  const location = useLocation();
  const { backgroundid } = location.state || {};

  const handleSubmit = async () => {
    setMessage("생성 중");
    try {
      const response = await axios.post<ResizingResponse>('http://localhost:8000/api/v1/resizings/', {
        background_id: backgroundid,
        width:formData.output_w ,
        height:formData.output_h ,
      });
      setMessage('이미지가 성공적으로 생성되었습니다.');
      setIsError(false);
      downloadFile(response.data.resized_image_url);
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setMessage('사진을 찾을 수 없습니다.');
      } else if (error.response && error.response.status === 500) {
        setMessage('인터넷 서버 오류');
      } else {
        setMessage('Bad request');
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
    setFormData({ ...formData, [name]: value === '' ? '' : value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (backgroundid) {
          const response = await axios.get<BackgroundResponse>(`http://localhost:8000/api/v1/backgrounds/${backgroundid}/`);
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
  }, [backgroundid]);



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
          
            <div className="relative w-72 h-72 bg-white place-items-end object-cover">
                <img src={image} alt="이미지" />
                <p className="absolute bottom-4 right-4 text-xl font-PR_BO text-black">
                  변경 전
                </p>
              </div>
      

              <div className="flex-grow-0 flex-shrink-0 h-16 my-8 overflow-hidden">
                <p className="w-full text-2xl font-PR_BO text-center text-white">
                  가로 X 세로 : {row} X {col}
                </p>
              </div>
            </div>
          </div>

          <div className="flex-grow-0 flex-shrink-0 w-1/2 h-full flex-col justify-start overflow-hidden">
            <div className="w-full overflow-hidden">
            <SizeFields
                  width={formData.output_w}
                  height={formData.output_h}
                  onChange={handleChange}
                  essential={true}
                  isDisabled={false}
                  onFocus={handleFocus}
                />
            </div>
            <div className="w-full h-[50px] place-content-center">
              {message && (
                <div className={`text-center text-sm ${isError ? 'text-red' : 'text-green-Normal'}`}>{message}</div>
              )}
            </div>
            <div className="flex justify-center items-center overflow-hidden gap-7">
              <button onClick={handleSubmit}
                className={`flex justify-center items-center w-50 h-14 rounded-[10px] text-xl font-PR_M text-center text-black ${
                  formData.output_w <= 0 || formData.output_h <= 0 ? 'bg-gray-100 border-gray-100 opacity-50 cursor-not-allowed' : 'bg-green-Normal border-green-Normal hover:font-PR_BO active:font-PR_BO'
                }`}
                disabled={formData.output_w <= 0 || formData.output_h <= 0}
              >
                다운로드
              </button>
              <button className="flex justify-center items-center w-50 h-14 rounded-[10px] border-2 border-green-Light hover:border-green-Light hover:font-PR_BO active:font-PR_BO bg-green-Light text-xl font-PR_M text-center text-black"
                onClick={handleClose}
                style={{ cursor: 'pointer' }}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageResizing;
