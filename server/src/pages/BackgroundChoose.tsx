import React from 'react';
import BackgroundChooseCom from '../components/BackgroundChooseCom';
import BackgroundChooseComImage1 from '../../public/assets/BackgroundChooseComImage1.png';
import BackgroundChooseComImage2 from '../../public/assets/BackgroundChooseComImage2.png';
import BackgroundChooseComImage3 from '../../public/assets/BackgroundChooseComImage3.png';

const BackgroundChoose: React.FC = () => {
  return (
    <div className="flex justify-center min-h-screen items-center w-full bg-black">
        <div className="w-4/5 h-4/5 grid grid-flow-row">
<div className="flex-grow-0 flex-shrink-0 w-1/2 h-1/6 overflow-hidden">
  <p className="text-4xl font-black text-center">
    <span className=" font-black text-center text-white">
      내 마음대로 만드는
    </span>
    <span className=" font-black text-center text-[#00d54b]">
      상품 이미지
    </span>
  </p>
</div>
<div className="grid grid-cols-3 gap-3">
  <BackgroundChooseCom value="심플" value2="상품에 어울리는 단순한 배경" image={BackgroundChooseComImage1}></BackgroundChooseCom>
  <BackgroundChooseCom value="테마" value2="테마 선택 후 맞춤형 이미지 생성" image={BackgroundChooseComImage2}></BackgroundChooseCom>
  <BackgroundChooseCom value="심플" value2="배경을 제거한 아이템 이미지 생성" image={BackgroundChooseComImage3}></BackgroundChooseCom>
  </div>
  </div>
  </div>
  );
}

export default BackgroundChoose;
