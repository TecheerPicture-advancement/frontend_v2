import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackgroundChooseCom from '../components/BackgroundChooseCom';
import ImageUploadModal from '../components/UploadImageModal';
import useImageStore from '../store/useImageStore';
import axios from 'axios';
import BackgroundChooseComImage1 from '../../public/assets/BackgroundChooseComImage1.png';
import BackgroundChooseComImage2 from '../../public/assets/BackgroundChooseComImage2.png';
import BackgroundChooseComImage3 from '../../public/assets/BackgroundChooseComImage3.png';
import Loading from '../components/Loading';

const BackgroundChoose: React.FC = () => {
  const navigate = useNavigate();
  const { setImageId } = useImageStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const openModal = (index: number) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  const handleUploadComplete = async (uploadedImageId: number | null) => {
    setIsModalOpen(false);
    
    if (!uploadedImageId) return;
  
    setImageId(uploadedImageId);
    setIsLoading(true);
  
    if (selectedIndex === 1) {
      try {
        const postData = {
          imageId: uploadedImageId,
          imageTransform: { scale: 0.5, xcenter: 0.5, ycenter: 0.5 },
          scene: "",
          prompt: "Simple plain background",
          negativePrompt: "",
        };
  
        const responses = await Promise.all([
          axios.post<{ imageUrl: string }>(`${BASE_URL}/background`, postData),
          axios.post<{ imageUrl: string }>(`${BASE_URL}/background`, postData),
          axios.post<{ imageUrl: string }>(`${BASE_URL}/background`, postData),
        ]);
  
        const generatedImageUrls = responses.map((res) => res.data.imageUrl);
  
        navigate('/simple/result', {
          state: { imageUrls: generatedImageUrls }, 
        });
      } catch (error) {
        console.error("Error generating background:", error);
      } finally {
        setIsLoading(false);
      }
    } else if (selectedIndex === 2) {
      navigate('/nukki/result');
      setIsLoading(false);
    } else {
      navigate('/');
      setIsLoading(false);
    }
  };

  return (
    <>
    {isModalOpen && <ImageUploadModal onClose={handleUploadComplete} />}
    {isLoading && <Loading/>}
    <div className="flex flex-col w-full min-h-screen justify-center items-center">
      <div className="flex flex-col items-center justify-center h-3/6">
        <div className="items-center w-full h-full px-20 py-10">
          <p className="text-center text-3xl dark:text-white text-black font-PR_BO">
            내 마음대로 만드는 상품 이미지
          </p>
        </div>
        <div className="grid w-7/12 h-full grid-cols-3 gap-5">
          <div onClick={() => openModal(1)}>
            <BackgroundChooseCom
              value="심플"
              value2="상품에 어울리는"
              value3="단순한 배경"
              image={BackgroundChooseComImage1}
            />
          </div>
          <Link to="/theme">
            <BackgroundChooseCom
              value="테마"
              value2="테마 선택 후 맞춤형"
              value3="맞춤형 이미지 생성"
              image={BackgroundChooseComImage2}
            />
          </Link>
          <div onClick={() => openModal(2)}>
            <BackgroundChooseCom
              value="누끼"
              value2="배경을 제거한"
              value3="아이템 이미지 생성"
              image={BackgroundChooseComImage3}
            />
          </div>
        </div>
      </div>
    </div>
</>
  );
};

export default BackgroundChoose;
