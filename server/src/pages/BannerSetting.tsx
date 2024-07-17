import React, { useState } from 'react';
import axios from 'axios';
import AspectRatioButtons from '../components/form/AspectRatioButtons'
import { FormData } from '../components/types/formTypes';
import InputField from '../components/form/InputField';
import NavBar from '../components/NavBar';
import SizeFields from '../components/form/SizeFields';
import UploadImageModal from '../components/UploadImageModal';

const BannerSetting: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    productName: '',
    productConcept: '',
    productCategory: '',
    additionalInfo: '',
    width: 0,
    height: 0,
    aspectRatio: 'other',
  });

  const [selectedRatio, setSelectedRatio] = useState<string>('other');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAspectRatioClick = (width: number, height: number, label: string) => {
    if (selectedRatio === label) {
      setSelectedRatio('other');
      setFormData({
        ...formData,
        aspectRatio: 'other',
        width: 0,
        height: 0,
      });
    } else {
      setSelectedRatio(label);
      setFormData({
        ...formData,
        aspectRatio: label,
        width,
        height,
      });
    }
  };

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const handleUpload = (file: File) => {
    console.log('파일 업로드 중:', file);
    // 업로드 로직 구현
  };

  const handleCloseModal = () => {
    setShowModal(false);
    console.log('모달 닫힘');
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log('Form submitted successfully');
      } else {
        console.error('Form submission error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const buttons = [
    { label: '스토리 광고', width: 1080, height: 1920 },
    { label: '피드 광고', width: 1080, height: 1080 },
    { label: '네이티브 광고', width: 600, height: 600 },
    { label: '앱 광고', width: 1200, height: 628 },
    { label: '프로모션 광고 1:1', width: 800, height: 800 },
    { label: '프로모션 광고 1.91:1', width: 800, height: 418 },
  ];

  return (
    <div className=" bg-black">
      <NavBar/>
      <div className='flex flex-col justify-center items-center'>
       <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative my-14 bg-black">
        <span className="text-4xl font-PR_BO text-center flex justify-center items-center text-white">
          내 마음대로 만드는
        </span>
        <span className="text-4xl font-PR_BO ml-2 text-center text-green-Normal">
          배너 이미지
        </span>
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-5xl p-5 bg-black space-y-4">
        <div className="flex flex-col justify-center gap-20">
          <div className='grid grid-cols-2 gap-24'>
            <div className="flex flex-col flex-grow w-full">
              <div className="mb-5 flex flex-col">
                <span className="px-3 text-2xl font-PR_BO text-left text-green-Normal">
                  배너 정보
                </span>
                <span className="px-3 text-base font-PR_L text-left text-green-Light">
                  내 마음대로 만드는 상품 이미지
                </span>
              </div>
              <div className="font-PR_L text-green-Light w-full">
                <InputField
                  label="상품 이름"
                  essential={true}
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  placeholder="예) 아이폰 15 프로"
                />
                <InputField
                  label="상품 컨셉"
                  name="productConcept"
                  essential={true}
                  value={formData.productConcept}
                  onChange={handleInputChange}
                  placeholder="예) 고급, 가벼움"
                />
                <InputField
                  label="상품 카테고리"
                  name="productCategory"
                  essential={true}
                  value={formData.productCategory}
                  onChange={handleInputChange}
                  placeholder="예) 전자기기"
                />
                <InputField
                  label="더 추가하고 싶은 내용이 있다면 적어주세요"
                  name="additionalInfo"
                  essential={false}
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  placeholder="예) 유명인과 셀럽들만 사용한다는걸 어필해주세요"
                />
              </div>
            </div>

            <div className="flex flex-col flex-grow w-full md:w-1/3 space-y-1">
              <div className="mb-5 flex flex-col">
                <span className="text-2xl font-PR_BO text-left text-green-Normal">
                  배너 사이즈
                </span>
                <span className="text-base font-PR_L text-left text-green-Light">
                  내 마음대로 만드는 상품 이미지
                </span>
              </div>
              <SizeFields 
              width={formData.width}
              height={formData.height}
              onChange={handleInputChange}
              essential={true}
              isDisabled={formData.aspectRatio !== 'other'}
              />
              <AspectRatioButtons buttons={buttons} selectedRatio={selectedRatio} onClick={handleAspectRatioClick} />
            </div>
          </div>
          <div className="flex justify-center items-center" onClick={openModal}>
            <button
              type="submit"
              className="px-20 py-4 bg-green-Normal text-black text-lg font-PR_BO rounded-xl flex justify-center items-center"
              >
              이미지 올리기
            </button>
          </div>
        </div>
      </form>
      {showModal && (
        <UploadImageModal
          onClose={handleCloseModal}
          onUpload={handleUpload}
          redirectPath="/banner/result"
        />
      )}
      </div>
    </div>
  );
};

export default BannerSetting;
