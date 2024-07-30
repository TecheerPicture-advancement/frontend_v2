import React, { useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import MainButton from './MainButton';
import ImageUploadModal from './UploadImageModal1';

interface ImageResponse {
  data: {
    id: number;
    image_url: string;
  };
}

const TexttoVideo: React.FC = () => {
  const [isUploaded, setIsUploaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = () => {
    setShowModal(true);
  };

  const handleModalClose = async (uploadedImageId: number | null) => {
    console.log(uploadedImageId);
    setShowModal(false);
    if (uploadedImageId) {
      setIsUploading(true);
      // 5초 지연 후 GET 요청 실행
      setTimeout(async () => {
        try {
          const response = await axios.get<ImageResponse>(`http://localhost:8000/api/v1/images/${uploadedImageId}/`);
          console.log(response.data.data.image_url);
          setImage(response.data.data.image_url);
          setIsUploaded(true);
        } catch (error) {
          console.error('Error fetching image data:', error);
        } finally {
          setIsUploading(false);
        }
      }, 3000); // 5초 지연
    }
  };

  return (
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
            <div className="w-[300px] h-[44px] mt-7">
              <MainButton value={isUploading ? "업로드 중..." : "이미지 업로드"} onClick={isUploading ? undefined : handleUpload} disabled={isUploading} />
            </div>
          </div>
        )}
        {showModal && (
          <ImageUploadModal onClose={handleModalClose} />
        )}


        {/*하단 레이아웃 */}
        {isUploaded && (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl leading-tight font-PR_BL text-center text-white mb-7">
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
                  <textarea placeholder="텍스트 입력" className="w-full h-full p-2 text-sm text-white bg-black font-PR_M" />
                </div>
                <div className="w-full h-[44px] mt-16">
                  <MainButton value="생성하러 가기" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TexttoVideo;
