import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SizeFields from '../components/form/SizeFields';
import { FormData } from '../components/types/formTypes';

interface sizeProps {
  row: string;
  col: string;
}

const ImageResizing: React.FC<sizeProps> = (props) => {
  const [formData, setFormData] = useState<FormData>({
    productName: '',
    productConcept: '',
    productCategory: '',
    additionalInfo: '',
    width: 0,
    height: 0,
    aspectRatio: 'other',
  });


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const navigate = useNavigate(); 
  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className="bg-black min-h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center w-[1000px] relative gap-5 border-4 flex-grow-0 flex-shrink-0 border-white">
        <div className="place-content-center w-full h-28 my-6 overflow-hidden">
          <p className="w-full text-4xl font-black text-center">
            <span className="w-full text-4xl font-PR_BL text-center text-white">이미지</span>
            <span className="w-full text-4xl font-PR_BL text-center text-green-Normal"> 크기 조절</span>
          </p>
        </div>

        <div className="flex justify-center flex-row flex-grow-0 flex-shrink-0 w-10/12">
          <div className="flex-col w-1/2 h-full">
            <div className="flex-col flex items-center justify-center">
              <div className="relative w-72 h-72 bg-white place-items-end object-cover">
                <div>사진 받아오기</div>
                <p className="absolute bottom-4 right-4 text-xl font-PR_BO text-black">
                  변경 전
                </p>
              </div>

              <div className="flex-grow-0 flex-shrink-0 h-16 my-8 overflow-hidden">
                <p className="w-full text-2xl font-PR_BO text-center text-white">
                  가로 X 세로 : {props.row} X {props.col}
                </p>
              </div>
            </div>
          </div>

          <div className="flex-grow-0 flex-shrink-0 w-1/2 h-full flex-col justify-start overflow-hidden">
            <div className="w-full mt-6 mb-16 overflow-hidden">
              <SizeFields
                width={formData.width}
                height={formData.height}
                onChange={handleInputChange}
                essential={true}
                isDisabled={formData.aspectRatio !== 'other'}
              />
            </div>

            <div className="flex justify-center items-center overflow-hidden gap-7">
              <button className="flex justify-center items-center w-50 h-14 rounded-[10px] border-2 bg-gray-200 border-gray-200 text-xl font-PR_M text-center text-black">
                다운로드
              </button>
              <button className="flex justify-center items-center w-50 h-14 rounded-[10px] border-2 border-green-Light hover:border-green-Light bg-green-Light text-xl font-PR_M text-center text-black"
                      onClick={handleClose} 
                      style={{ cursor: 'pointer' }}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageResizing;
