import React from 'react';
import BackgroundChooseCom from '../components/BackgroundChooseCom';
import BackgroundChooseComImage1 from '../../public/assets/BackgroundChooseComImage1.png';
import BackgroundChooseComImage2 from '../../public/assets/BackgroundChooseComImage2.png';
import BackgroundChooseComImage3 from '../../public/assets/BackgroundChooseComImage3.png';

const BackgroundChoose: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-black">
        <div className="grid w-10/12 grid-cols-1 place-items-center">
<div className="items-center w-full h-full px-20 py-14 overflow-clip">
  <p className="text-center desktop:text-5xl laptop:text-3xl tablet:text-2xl font-PR_BL">
    <span className="font-black text-center text-white">
      내 마음대로 만드는{" "}
    </span>   
    <span className="font-black text-center  text-green-Normal">
      상품 이미지
    </span>
  </p>
</div>
<div className="grid flex-shrink-0 w-4/6 h-full grid-cols-3 gap-5 overflow-clip">
  <BackgroundChooseCom value="심플" value2="상품에 어울리는" value3="단순한 배경" image={BackgroundChooseComImage1}></BackgroundChooseCom>
  <BackgroundChooseCom value="테마" value2="테마 선택 후 맞춤형" value3="맞춤형 이미지 생성" image={BackgroundChooseComImage2}></BackgroundChooseCom>
  <BackgroundChooseCom value="심플" value2="배경을 제거한" value3="아이템 이미지 생성" image={BackgroundChooseComImage3}></BackgroundChooseCom>
  </div>
  </div>
  </div>
  );
}

export default BackgroundChoose;
