import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const MainchooseExplain: React.FC = () => {
  const location = useLocation();
  const { index } = location.state || {};

  const navigate = useNavigate();
  const handleClose = () => {
    navigate(-1);
  };

  const nextPage = () => {
    if (index === 1) navigate('/banner/');
    else if (index === 2) navigate('/background/');
    else if (index === 3) navigate('/text-to-video/');
    else if (index === 4) navigate('/image-to-video/');
  };

  let videoSource;
  let mainText;
  let serveText1;
  let serveText2;

  switch(index) {
    case 1:
      videoSource = '/assets/Background1.mp4';
      mainText = "광고 배너 생성";
      serveText1 = "사용자가 입력한 이미지와 상품 정보를 분석하여";
      serveText2 = "AI가 적합한 광고 배너와 배경을 생성합니다.";
      break;
    case 2:
      videoSource = '/assets/Background2.mp4';
      mainText = "상품 배경 생성";
      serveText1 = "심플, 누끼, 테마 중 원하는 배경을 선택하면";
      serveText2 = "AI가 적합한 광고 이미지를 생성합니다.";
      break;
    case 3:
      videoSource = '/assets/Background3.mp4';
      mainText = "텍스트 변환 영상 생성";
      serveText1 = "사용자가 입력한 텍스트를 분석 후 ";
      serveText2 = "AI가 적합한 영상을 생성합니다.";
      break;
    case 4:
      videoSource = '/assets/Background4.mp4';
      mainText = "이미지 변환 영상 생성";
      serveText1 = "사용자가 입력한 텍스트와 이미지를 분석하여";
      serveText2 = "AI가 적합한 광고 영상을 생성합니다.";
      break;
    default:
      videoSource = '/assets/Background1.mp4';
      mainText = "광고 배너 생성";
      serveText1 = "사용자가 입력한 이미지와 상품 정보를 분석하여";
      serveText2 = "AI가 적합한 배경과 광고 배너를 생성합니다.";
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
      <div className="absolute inset-0 flex flex-col justify-center items-end pl-16 pr-48">
        <p className="text-5xl font-PR_BO mb-5 text-green-Normal">{mainText}</p>
        <p className="text-lg font-PR_L text-white">{serveText1}</p>
        <p className="text-lg font-PR_L text-white">{serveText2}</p>
        <button className="mt-8 flex flex-row place-items-center text-2xl font-PR_M text-white gap-2 hover:underline" onClick={nextPage}>
         <p className="whitespace-pre-wrap">생성하러가기  →</p>
        </button>
      </div>
      <button onClick={handleClose} className="absolute top-7 left-9 font-PR_L text-white px-2 py-1">
        Close
      </button>
    </div>
  );
};

export default MainchooseExplain;
