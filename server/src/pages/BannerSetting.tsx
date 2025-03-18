import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Loading from '../components/Loading'; 
import InputField from '../components/form/InputField';
import useImageStore from '../store/useImageStore';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface BannerSettingProps {
  imageUrl: string;
}

const BannerSetting: React.FC<BannerSettingProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const imageUrl = location.state?.imageUrl;
  const { imageId } = useImageStore();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    itemName: '',
    itemConcept: '',
    itemCategory: '',
    addInformation: '',
  });

  // 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 썸네일 생성하기 버튼 클릭 핸들러
  const handleSubmit = async () => {
    // 필수 항목 체크
    if (!formData.itemName || !formData.itemConcept || !formData.itemCategory) {
      alert('필수 항목을 다 작성하지 않았습니다.');
      return;
    }

    const payload = {
      ...formData,
      imageId,
    };

    try {
      setLoading(true);
      const response = await axios.post<{ id: number }>(`${BASE_URL}/banners`, payload);
      const { id } = response.data;

      console.log('응답:', response.data);
      navigate('/banner/result', { state: { id } }); // 응답 받은 id 전달
    } catch (error) {
      console.error('에러 발생:', error);
      alert('썸네일 생성 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>      
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="flex flex-col items-center w-[980px] mx-auto justify-center">
            <div className="relative flex items-center justify-center flex-grow-0 flex-shrink-0 my-14">
              <span className="flex items-center justify-center text-4xl text-center text-white font-Jalnan">
                내 마음대로 만드는
              </span>
              <span className="ml-2 text-4xl text-center font-PR_BO text-green-Normal">
                광고 이미지
              </span>
            </div>
            <div className='flex flex-col items-center justify-center w-full gap-8'>
              <div className='grid grid-cols-[26.25rem_auto] gap-8'>
                <img src={imageUrl} alt="Selected Image" className="w-[420px] h-[420px] border border-gray-300 object-cover" />
                <div className="w-[420px]">
                  <div className="flex flex-col justify-center gap-8">
                    <div className="flex flex-col">
                      <span className="text-2xl text-left font-PR_BO text-green-Normal">
                        광고 정보
                      </span>
                      <span className="text-base text-left font-PR_L text-green-Light">
                        내 마음대로 만드는 광고 상품 이미지
                      </span>
                    </div>
                    <div className="flex flex-col gap-3 w-full font-PR_L text-green-Light">
                      <InputField
                        label="상품 이름"
                        essential={true}
                        name="itemName"
                        value={formData.itemName}
                        onChange={handleChange}
                        placeholder="예) 아이폰 15 프로"
                      />
                      <InputField
                        label="상품 컨셉"
                        name="itemConcept"
                        essential={true}
                        value={formData.itemConcept}
                        onChange={handleChange}
                        placeholder="예) 고급, 가벼움"
                      />
                      <InputField
                        label="상품 카테고리"
                        name="itemCategory"
                        essential={true}
                        value={formData.itemCategory}
                        onChange={handleChange}
                        placeholder="예) 전자기기"
                      />
                      <InputField
                        label="더 추가하고 싶은 내용이 있다면 적어주세요"
                        name="addInformation"
                        essential={false}
                        value={formData.addInformation}
                        onChange={handleChange}
                        placeholder="예) 유명인과 셀럽들만 사용한다는걸 어필해주세요"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  className="px-20 py-4 mt-4 text-lg text-black bg-green-Normal font-PR_BO rounded-xl"
                  onClick={handleSubmit} // 버튼 클릭 시 POST 요청 및 페이지 이동
                >
                  썸네일 생성하기
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BannerSetting;
