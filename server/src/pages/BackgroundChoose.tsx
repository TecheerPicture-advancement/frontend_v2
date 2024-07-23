import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackgroundChooseCom from '../components/BackgroundChooseCom';
import BackgroundChooseComImage1 from '../../public/assets/BackgroundChooseComImage1.png';
import BackgroundChooseComImage2 from '../../public/assets/BackgroundChooseComImage2.png';
import BackgroundChooseComImage3 from '../../public/assets/BackgroundChooseComImage3.png';
import NavBar from '../components/NavBar';
import Loading from '../components/Loading';
import { useUser } from '../api/Usercontext';
import ImageUploadModal from '../components/UploadImageModal1';

interface SimpleData {
  user_id: string;
  image_id: number;
  gen_type: string;
  output_w?: number;
  output_h?: number;
  concept_option?: {
    category?: string;
    theme?: string;
    num_results?: number;
  };
}

const BackgroundChoose: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [redirectPath, setRedirectPath] = useState('');
  const [loading, setLoading] = useState(false);
  const { userid } = useUser();
  const navigate = useNavigate();

  const openModal = (path: string) => {
    setRedirectPath(path);
    setShowModal(true);
  };

  const handleModalClose = async (uploadedImageId: number | null) => {
    setShowModal(false);
    if (uploadedImageId && userid) {
      setLoading(true); // 로딩 화면 표시
      try {
        const backgroundData: SimpleData = {
          user_id: userid,
          image_id: uploadedImageId,
          gen_type: 'simple', // 필수 값 설정
        };

        // Log the data being sent to the API
        console.log('Sending backgroundData:', backgroundData);

        // Send POST request to API
        const response = await axios.post('http://localhost:8000/api/v1/backgrounds/', backgroundData, {
          headers: { 'Content-Type': 'application/json' }
        });

        // Log the API response
        console.log('API response:', response.data);

        // Log the returned backgroundId
        const backgroundId = response.data.background_id; // Adjust this line according to your API response structure
        console.log('Background ID:', backgroundId);

        setTimeout(() => {
          navigate(`${redirectPath}?backgroundId=${backgroundId}`); // Navigate to the selected result page after loading with backgroundId as a query parameter
        }, 3000); // Set delay to 3 seconds
      } catch (error) {
        // Log error details
        if (error.response) {
          console.error('Error response data:', error.response.data);
          console.error('Error response status:', error.response.status);
          console.error('Error response headers:', error.response.headers);
        } else {
          console.error('Error message:', error.message);
        }
        alert('데이터를 전송하지 못했습니다.');
        setLoading(false); // Hide loading screen if there was an error
      }
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-black">
      {loading ? ( // 로딩 화면 표시
        <Loading />
      ) : (
        <>
          <NavBar />
          <div className="flex flex-col items-center justify-center h-3/6">
            <div className="items-center w-full h-full px-20 py-14 overflow-clip">
              <p className="text-center desktop:text-4xl laptop:text-3xl tablet:text-2xl font-PR_BL">
                <span className="mr-2 text-center text-white font-PR_BO">
                  내 마음대로 만드는
                </span>
                <span className="text-center font-PR_BO text-green-Normal">
                  상품 이미지
                </span>
              </p>
            </div>
            <div className="grid flex-shrink-0 w-4/6 h-full grid-cols-3 gap-5 overflow-clip">
              <div onClick={() => openModal('/simple/result')}>
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
              <div onClick={() => openModal('/nukki/result')}>
                <BackgroundChooseCom
                  value="누끼"
                  value2="배경을 제거한"
                  value3="아이템 이미지 생성"
                  image={BackgroundChooseComImage3}
                />
              </div>
            </div>
          </div>
          {showModal && (
            <ImageUploadModal
              onClose={handleModalClose} // handleModalClose를 onClose prop으로 전달
            />
          )}
        </>
      )}
    </div>
  );
};

export default BackgroundChoose;
