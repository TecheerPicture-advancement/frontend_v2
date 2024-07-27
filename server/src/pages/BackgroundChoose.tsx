import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BackgroundChooseCom from '../components/BackgroundChooseCom';
import BackgroundChooseComImage1 from '../../public/assets/BackgroundChooseComImage1.png';
import BackgroundChooseComImage2 from '../../public/assets/BackgroundChooseComImage2.png';
import BackgroundChooseComImage3 from '../../public/assets/BackgroundChooseComImage3.png';
import NavBar from '../components/NavBar';
import UploadImageModal from '../components/UploadImageModal1';

const BackgroundChoose: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [redirectPath, setRedirectPath] = useState('');

  const openModal = (path: string) => {
    setRedirectPath(path);
    setShowModal(true);
  };

  const handleUpload = (file: File) => {
    console.log('파일 업로드 중:', file);
    // 업로드 로직 구현 해야함
  };

  const handleCloseModal = () => {
    setShowModal(false);
    console.log('모달 닫힘');
  };
  

  return (
    <div className="flex flex-col w-full min-h-screen bg-black">
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
        <UploadImageModal
          onClose={handleCloseModal}
          onUpload={handleUpload}
          redirectPath={redirectPath} 
        />
      )}
    </div>
  );
};

export default BackgroundChoose;
