import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackgroundChooseCom from '../components/BackgroundChooseCom';
import ImageUploadModal from '../components/UploadImageModal1';
import Loading from '../components/Loading';
import NavBar from '../components/NavBar';
import { useUser } from '../api/Usercontext';
import BackgroundChooseComImage1 from '../../public/assets/BackgroundChooseComImage1.png';
import BackgroundChooseComImage2 from '../../public/assets/BackgroundChooseComImage2.png';
import BackgroundChooseComImage3 from '../../public/assets/BackgroundChooseComImage3.png';


interface PostData {
  user_id: string;
  image_id: number;
  output_w: number;
  output_h: number;
  gen_type?: string;
  concept_option: {
    category: string;
    theme: string;
    num_results: number;
  };
}

interface ResponseData {
  background_id: number;
}

const BackgroundChoose: React.FC = () => {
  const { userid } = useUser();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalSource, setModalSource] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = (source: string) => {
    setShowModal(true);
    setModalSource(source);
  };

  const handleModalClose = async (uploadedImageId: number | null) => {
    setShowModal(false);

    if (uploadedImageId && userid) {
      const postDataBase: PostData = {
        user_id: userid,
        image_id: uploadedImageId,
        output_w: 1000,
        output_h: 1000,
        concept_option: {
          category: 'others',
          theme: 'clean',
          num_results: 1,
        },
      };

      const genTypes = modalSource === 'simple' ? ['remove_bg', 'color_bg', 'simple'] : ['remove_bg'];
      const conceptBackgroundIds: number[] = [];

      try {
        setIsLoading(true);

        for (const genType of genTypes) {
          const postData = { ...postDataBase, gen_type: genType };
          console.log("post데이터", postData);

          const response = await axios.post<ResponseData>('http://localhost:8000/api/v1/backgrounds/', postData, {
            headers: { 'Content-Type': 'application/json' },
          });

          conceptBackgroundIds.push(response.data.background_id);
        }

        setIsLoading(false);
        alert('데이터를 성공적으로 전송했습니다.');

        const state = modalSource === 'simple'
          ? {
              conceptBackgroundIds: [conceptBackgroundIds[1], conceptBackgroundIds[2]],
              removeBgBackgroundId: conceptBackgroundIds[0],
              imageId: uploadedImageId
            }
          : {
              removeBgBackgroundId: [conceptBackgroundIds[0]],
              imageId: uploadedImageId
            };

        const targetPath = modalSource === 'simple' ? '/simple/result' : '/nukki/result';
        navigate(targetPath, { state });
      } catch (error) {
        console.error('Error submitting data:', error);
        alert('데이터를 전송하지 못했습니다.');
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col w-full min-h-screen bg-black">
          <NavBar />
          <div className="flex flex-col justify-center items-center h-3/6">
            <div className="items-center w-full h-full px-20 py-14 overflow-clip">
              <p className="text-center desktop:text-4xl laptop:text-3xl tablet:text-2xl font-PR_BL">
                <span className="font-PR_BO text-center mr-2 text-white">
                  내 마음대로 만드는
                </span>
                <span className="font-PR_BO text-center text-green-Normal">
                  상품 이미지
                </span>
              </p>
            </div>
            <div className="grid flex-shrink-0 w-4/6 h-full grid-cols-3 gap-5 overflow-clip">
              <div onClick={() => openModal('simple')}>
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
              <div onClick={() => openModal('nukki')}>
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
            <ImageUploadModal onClose={handleModalClose} />
          )}
        </div>
      )}
    </>
  );
};

export default BackgroundChoose;
