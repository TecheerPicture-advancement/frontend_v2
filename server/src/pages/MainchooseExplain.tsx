import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ImageUploadModal from '../components/UploadImageModal';
import useImageStore from '../store/useImageStore';

const MainchooseExplain: React.FC = () => {
  const location = useLocation();
  const { index } = location.state || {};
  const navigate = useNavigate();
  const { setImageId } = useImageStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => {
    navigate(-1);
  };

  const handleUploadComplete = (uploadedImageId: number | null) => {
    if (uploadedImageId) {
      console.log('uploadedImageId:', uploadedImageId);
      setImageId(uploadedImageId);
      // 페이지 이동
      switch (index) {
        case 1:
          navigate('/banner/');
          break;
        case 2:
          navigate('/background/');
          break;
        case 3:
          navigate('/text-to-video/');
          break;
        case 4:
          navigate('/image-to-video/');
          break;
        default:
          navigate('/');
      }
      setIsModalOpen(false);
    } else {
      setIsModalOpen(false); 
    }
  };
  

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  let videoSource;
  let mainText;
  let serveText1;
  let serveText2;

  switch (index) {
    case 1:
      videoSource = '/videos/Background1.mp4';
      mainText = '광고 배너 생성';
      serveText1 = '사용자가 입력한 이미지와 상품 정보를 분석하여';
      serveText2 = 'AI가 적합한 광고 배너와 배경을 생성합니다.';
      break;
    case 2:
      videoSource = '/videos/Background2.mp4';
      mainText = '상품 배경 생성';
      serveText1 = '심플, 누끼, 테마 중 원하는 배경을 선택하면';
      serveText2 = 'AI가 적합한 광고 이미지를 생성합니다.';
      break;
    case 3:
      videoSource = '/videos/Background3.mp4';
      mainText = '텍스트 변환 영상 생성';
      serveText1 = '사용자가 입력한 텍스트를 분석 후 ';
      serveText2 = 'AI가 적합한 영상을 생성합니다.';
      break;
    case 4:
      videoSource = '/videos/Background4.mp4';
      mainText = '이미지 변환 영상 생성';
      serveText1 = '사용자가 입력한 텍스트와 이미지를 분석하여';
      serveText2 = 'AI가 적합한 광고 영상을 생성합니다.';
      break;
    default:
      videoSource = '/videos/Background1.mp4';
      mainText = '광고 배너 생성';
      serveText1 = '사용자가 입력한 이미지와 상품 정보를 분석하여';
      serveText2 = 'AI가 적합한 배경과 광고 배너를 생성합니다.';
  }

  return (
    <div className="fixed inset-0">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ objectFit: 'cover' }}
      >
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-gradient-to-bl from-black to-transparent"></div>
      <div className="w-[1180px] min-h-screen mx-auto z-10 relative flex flex-col justify-center items-end">
        <p className="text-5xl font-PR_BO mb-5 text-green-Normal">{mainText}</p>
        <p className="text-lg font-PR_L text-white">{serveText1}</p>
        <p className="text-lg font-PR_L text-white">{serveText2}</p>
        <button
          className="mt-8 flex flex-row place-items-center text-lg font-PR_M text-white gap-2 rounded-md border-white"
          onClick={handleOpenModal}
        >
          생성하러가기 →
        </button>
      </div>
      <button onClick={handleClose} className="absolute top-7 left-9 font-PR_L text-white px-2 py-1">
        Close
      </button>

      {/* 이미지 업로드 모달 */}
      {isModalOpen && <ImageUploadModal onClose={handleUploadComplete} />    }
    </div>
  );
};

export default MainchooseExplain;
