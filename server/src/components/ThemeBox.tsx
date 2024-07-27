import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../api/Usercontext';
import Loading from './Loading';
import ImageUploadModal from './UploadImageModal1';
import MainButton from './MainButton';

interface ThemeBoxProps {
  imageSource: string;
  prompt: string;
  detail: string;
  theme: string;
}

interface PostData {
  user_id: string;
  image_id: number;
  gen_type?: string;
  concept_option?: {
    category: string;
    theme: string;
    num_results: number;
  };
}

interface ResponseData {
  background_id: number;
}

const ThemeBox: React.FC<ThemeBoxProps> = ({ imageSource, detail, prompt, theme }) => {
  const { userid } = useUser();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const handleModalClose = async (uploadedImageId: number | null) => {
    setShowModal(false);

    if (uploadedImageId && userid) {
      const conceptPostData: PostData = {
        user_id: userid,
        image_id: uploadedImageId,
        gen_type: 'concept',
        concept_option: {
          category: 'others',
          theme: theme,
          num_results: 1,
        },
      };

      const removeBgPostData: PostData = {
        user_id: userid,
        image_id: uploadedImageId,
        gen_type: 'remove_bg',
      };

      try {
        setIsLoading(true);

        const [conceptResponses, removeBgResponse] = await Promise.all([
          Promise.all(
            Array.from({ length: 2 }, () =>
              axios.post<ResponseData>('http://localhost:8000/api/v1/backgrounds/', conceptPostData, {
                headers: { 'Content-Type': 'application/json' },
              })
            )
          ),
          axios.post<ResponseData>('http://localhost:8000/api/v1/backgrounds/', removeBgPostData, {
            headers: { 'Content-Type': 'application/json' },
          }),
        ]);

        const conceptBackgroundIds = conceptResponses.map(response => response.data.background_id);
        const removeBgBackgroundId = removeBgResponse.data.background_id;

        setIsLoading(false);
        alert('데이터를 성공적으로 전송했습니다.');

        navigate(`/theme/result`, {
          state: {
            conceptBackgroundIds,
            removeBgBackgroundId,
            imageId: uploadedImageId,
          },
        });
      } catch (error: any) {
        console.error('Error submitting data:', error.response ? error.response.data : error.message);
        alert('데이터를 전송하지 못했습니다.');
        setIsLoading(false);
      }
    }
  };

  const isDirectInput = theme === '직접입력';

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative overflow-hidden gap-[35px] px-2.5 h-full">
          <div className="flex-grow-0 flex-shrink-0 w-[250px] h-[250px] relative overflow-hidden rounded-[30px]">
            <div
              className="w-[250px] h-[250px] absolute left-0 top-[-0.5px] bg-[#e6ffef] rounded-[30px]"
              style={{
                boxShadow:
                  '10.5px 123.5px 34.5px 0 rgba(255,255,255,0), 6.5px 79px 31.5px 0 rgba(255,255,255,0.01), 4px 44.5px 27px 0 rgba(255,255,255,0.05), 1.5px 19.5px 20px 0 rgba(255,255,255,0.09), 0.5px 5px 11px 0 rgba(255,255,255,0.1)',
              }}
            />
            <img
              src={imageSource}
              className="w-[250px] h-[250px] absolute left-[0px] top-[0px] object-cover rounded-[30px]"
            />
            <div className="w-[250px] h-[250px] absolute left-0 top-[0px] opacity-50 bg-gradient-to-b from-white to-black mix-blend-multiply" />
          </div>
          <div className="relative flex flex-col items-start justify-between flex-grow-0 flex-shrink-0 gap-20">
            <div className="flex-grow-0 flex-shrink-0 w-[191.5px] h-[121px] relative overflow-hidden"></div>
            {isDirectInput ? (
              <div className="w-full h-[100px] absolute left-[-0.25px] top-[75px] border-[1px] border-solid border-white rounded-[6px] overflow-hidden ">
                <textarea
                  placeholder=" 입력하세요"
                  className="w-full h-full p-2 text-sm text-white bg-black font-PR_M"
                />
              </div>
            ) : (
              <p className="w-[191.5px] h-[36px] absolute left-[-0.25px] top-[75px] text-sm font-PR_M text-left text-white">
                {prompt}
              </p>
            )}
            <div className="w-full h-[50px] absolute left-0 top-0 overflow-hidden">
              <p className="w-full h-[45px] absolute left-0 top-[19.5px] text-2xl font-PR_BO text-left text-[#e6fbed]">
                {theme}
              </p>
              <p className="w-full absolute left-0 top-0 text-sm font-PR_M text-left text-[#d9d9d9]">
                {detail}
              </p>
            </div>
            <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 w-[240px] h-[32px] relative rounded-xl">
              <div onClick={openModal} className="w-[430px] h-[44px] rounded-lg">
                <MainButton value="생성하러 가기" />
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

export default ThemeBox;
