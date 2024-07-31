import React, { useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import MainButton from './MainButton';
import VideoImage from '../../public/ThemeImage/video.png';
import { useUser } from '../api/Usercontext';
import { downloadFile } from './form/FileDownload'; // Adjust the path as needed
import Loading from './Loading';

interface TexttoVideoResponse {
  id: number;
  prompt: string;
  video_url: string;
}

const TexttoVideo: React.FC = () => {
  const { userid } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [, setVideoUrl] = useState('');
  const [error, setError] = useState('');

  const TexttoVideoHandler = async () => {
    if (!prompt) {
      setError('Prompt cannot be empty');
      return;
    }

    setIsLoading(true);
    setError('');

    // 추가된 콘솔 로그
    console.log('user_id:', userid);
    console.log('prompt:', prompt);

    try {
      const response = await axios.post<TexttoVideoResponse>('/api/v1/texttovideo/', {
        prompt: prompt,
        user_id: userid
      },)
      
      console.log('response data:', response.data); // 응답 데이터 확인

      setVideoUrl(response.data.video_url);
      handleDownload(response.data.video_url);
    } catch (error) {
      setError('오류가 발생했습니다. 다시 한 번 시도해보세요.');
      console.error('Error:', error); // 오류 로그
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
          <div className="flex flex-col items-center justify-center flex-grow mb-10">
            <header className="flex flex-col items-center justify-center">
              <h1 className="text-3xl leading-tight text-center text-white font-PR_BL">
                자유롭게 만드는<br />
                <span className="text-green-Normal">광고 동영상</span>
              </h1>
            </header>
            <div className="flex flex-row items-center justify-center gap-16 mt-12">
              <div className="w-[380px] h-[380px] relative overflow-hidden rounded-[30px] bg-[#e6ffef]">
                <img src={VideoImage} className="w-full h-full object-cover rounded-[30px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-white to-black opacity-50 mix-blend-multiply rounded-[30px]" />
              </div>
              <div className="flex flex-col items-center justify-between w-[300px]">
                <div className="w-full">
                  <p className="text-sm text-left text-gray-200 font-PR_BO">동영상 생성을 위해 설명을 입력해주세요</p>
                </div>
                <div className="w-full mt-2 mb-10">
                  <p className="text-2xl text-white font-PR_BO">텍스트 입력</p>
                </div>
                <div className="w-full h-[180px] border-[1px] border-solid border-white rounded-[6px] overflow-hidden">
                  <textarea
                    placeholder="예시) 폭포가 떨어지는 호수 앞 풍경을 자연스럽게 만들어줘"
                    className="w-full h-full p-2 text-sm text-white placeholder-gray-300 bg-black font-PR_M"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                </div>
                <div className="w-full h-[44px] mt-12">
                  <MainButton value="생성하러 가기" onClick={TexttoVideoHandler} />
                </div>
                {error && <p className="mt-4 text-green-Normal">{error}</p>}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TexttoVideo;
