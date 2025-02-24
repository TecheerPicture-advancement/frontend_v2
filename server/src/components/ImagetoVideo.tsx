import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MainButton from './MainButton';
import useImageStore from '../store/useImageStore';
import Loading from './Loading';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface ImageResponse {
  imageUrl: string;
}

interface VideoResponse {
  video: {
    url: string;
    content_type: string | null;
    file_name: string | null;
    file_size: number;
  };
  finalPrompt: string;
}

const ImagetoVideo: React.FC = () => {
  const { imageId } = useImageStore();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (imageId) {
      const fetchImageUrl = async () => {
        try {
          const response = await axios.get<ImageResponse>(`${BASE_URL}/images/${imageId}`);
          if (response.data && response.data.imageUrl) {
            setImageUrl(response.data.imageUrl);
          }
        } catch (error) {
          console.error("Error fetching image URL:", error);
        }
      };

      fetchImageUrl();
    }
  }, [imageId]);

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const handleGenerateVideo = async () => {
    if (!prompt) {
      alert('프롬프트를 입력해주세요!');
      return;
    }

    setLoading(true);

    try {
      // 이미지 ID와 프롬프트를 함께 전송
      const response = await axios.post<VideoResponse>(`${BASE_URL}/imagetovideo`, {
        imageId,
        prompt,
      });

      if (response.data.video && response.data.video.url) {
        // 비디오 URL을 다운로드 링크로 생성하여 자동 다운로드
        const link = document.createElement('a');
        link.href = response.data.video.url;
        link.download = 'video.mp4';
        link.click();

        // 다운로드 완료 후 홈으로 돌아가기
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        console.error('Video URL not found in response');
      }
    } catch (error) {
      console.error('Error generating video:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    {loading && <Loading />}
    <div className="min-h-screen flex justify-center items-center gap-2.5 w-[1180px] mx-auto my-auto bg-black">
      <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 w-[1171px] overflow-hidden gap-5">
        <div
          className="w-[480px] h-[640px]"
          style={{
            backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        />
        <div className="flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 h-[640px] w-[671px] gap-10 p-[30px] bg-white">
          <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 h-[490px] w-[611px] relative gap-[30px]">
            <p className="text-xl font-PR_BO text-left text-black">
              이미지를 비디오로 생성하기
            </p>
            <textarea
              className="flex flex-col justify-start items-start resize-none focus:outline-none self-stretch flex-grow relative gap-5 p-6 rounded-lg font-PR_M text-base text-black bg-gray-50 placeholder-gray-300"
              placeholder="비디오를 생성하기 전 원하는 내용을 적어주세요 
              ex) 향수에서 느껴지는 상큼함과 달콤함을 표현하고 싶어요"
              value={prompt}
              onChange={handlePromptChange}
            />
          </div>
          <MainButton value="생성하기" onClick={handleGenerateVideo} />
        </div>
      </div>
    </div>
    </>
  );
};

export default ImagetoVideo;
