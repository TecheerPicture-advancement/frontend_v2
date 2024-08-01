import React, { useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import MainButton from './MainButton';
import ImageUploadModal from './UploadImageModal1';
import Loading from './Loading';
import { useUser } from '../api/Usercontext';
import { downloadFile } from './form/FileDownload'; // Adjust

interface ImageResponse {
  data: {
    id: number;
    image_url: string;
  };
}

interface VideoResponse {
  id: number;
  user: number;
  video_url: string;
}

interface VideoResponse2 {
  video_id: number;
}


const ImagetoVideo: React.FC = () => {
  const [isUploaded, setIsUploaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState<string>('');
  const [imageId, setImageId] = useState<number>(0);
  const [, setVideoId] = useState<number>(0);  
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { userid } = useUser();
  const [prompt, setPrompt] = useState<string>('');
  const [error, setError] = useState('');
  
  const handleUpload = () => {
    setShowModal(true);
  };

  const handleModalClose = async (uploadedImageId: number | null) => {
    setShowModal(false);
    if (uploadedImageId) {
      setIsUploading(true);
      try {
        const response = await axios.get<ImageResponse>(`/api/v1/images/${uploadedImageId}/`);
        setImage(response.data.data.image_url);
        setImageId(response.data.data.id);
        setIsUploaded(true);
      } catch (error) {
        console.error('Error fetching image data:', error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const Videohandleer = async () => {
    if (!prompt) {
      setError('Prompt cannot be empty');
      return;
    }
    setError('');
    console.log('user_id:', userid);
    console.log('prompt:', prompt);
    try {
      const response = await axios.post<VideoResponse2>(`/api/v1/videos/`, {
        user_id: userid,
        image_id: imageId,
        text_prompt: prompt,
      });
      const newVideoId = response.data.video_id;
      setVideoId(newVideoId);
      create(newVideoId);
    } catch (error) {
      setError('오류가 발생했습니다. 다시 한 번 시도해보세요.1');
      console.error('Error:', error);
    } 
  };
  
  const create = async (videoId: number, retries = 30, delay = 10000) => {
    if (!prompt) {
      setError('Prompt cannot be empty');
      return;
    }
    setError('');

    try {
      setIsLoading(true);
      for (let i = 0; i < retries; i++) {
        const response = await axios.get<VideoResponse>(`http://localhost:8000/api/v1/videos/${videoId}/`);
        if (response.data.video_url) {
          handleDownload(response.data.video_url);
          break; // 응답값을 받으면 루프 종료
        }
        console.log("비디오 아이디",videoId);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    } catch (error) {
      setError('오류가 발생했습니다. 다시 한 번 시도해보세요.2');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  

const handleDownload = (url: string) => {
    if (url) {
      downloadFile(url, 'video.mp4');
    }
};

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col min-h-screen bg-black">
          <NavBar />
          <div className="w-full flex-grow flex flex-col items-center justify-center mb-10">
            
            {/*상단 레이아웃*/}
            {!isUploaded && (
              <div className="flex flex-col items-center justify-center">
                <h1 className="text-3xl leading-tight font-PR_BL text-center text-white">
                  자유롭게 만드는<br />
                  <span className="text-green-Normal">광고 동영상</span>
                </h1>
                <div className="w-[300px] h-[44px] mt-6">
                  {isUploading ? (
                    <p className="font-PR_L text-center text-xl text-white">업로드 중...</p>
                  ) : (
                    <MainButton value="이미지 업로드" onClick={handleUpload} />
                  )}
                </div>
              </div>
            )}
            {showModal && (
              <ImageUploadModal onClose={handleModalClose} />
            )}

            {/*하단 레이아웃 */}
            {isUploaded && (
              <div className="flex flex-col items-center justify-center">
                <h1 className="text-3xl leading-tight font-PR_BL text-center text-white mb-6">
                  자유롭게 만드는<br />
                  <span className="text-green-Normal">광고 동영상</span>
                </h1>
                <div className="flex flex-row items-center justify-center gap-16">
                  <div className="w-[380px] h-[380px] relative overflow-hidden rounded-[30px] bg-[#e6ffef]">
                    <img src={image} className="w-full h-full object-cover rounded-[30px]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-white to-black opacity-50 mix-blend-multiply rounded-[30px]" />
                  </div>
                  <div className="flex flex-col items-center justify-between w-[300px]">
                    <div className="w-full">
                      <p className="text-sm text-left text-gray-200 font-PR_BO">동영상 생성을 위해 설명을 입력해주세요</p>
                    </div>
                    <div className="w-full mt-2 mb-8">
                      <p className="text-2xl text-white font-PR_BO">텍스트 입력</p>
                    </div>
                    <div className="w-full h-[150px] border-[1px] border-solid border-white rounded-[6px] overflow-hidden">
                      <textarea 
                        placeholder="텍스트 입력" 
                        className="w-full h-full p-2 text-sm text-white bg-black font-PR_M" 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                      />
                    </div>
                    {error && (
                      <p className="text-red mt-2">{error}</p>
                    )}
                    <div className="w-full h-[44px] mt-10">
                      <MainButton value="생성하러 가기" onClick={Videohandleer} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ImagetoVideo;
