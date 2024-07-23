import React, { useEffect, useRef } from 'react';
import Lipstick from '../../../public/assets/lipstick.jpg';
import Fan from '../../../public/assets/fan.jpg';
import Perfume from '../../../public/assets/perfume.jpg';
import Lotion from '../../../public/assets/lotion.jpg';
import Torretta from '../../../public/assets/torretta.jpg';
import Chicken from '../../../public/assets/chicken.png';
import Clothe from '../../../public/assets/clothes_spring.png';
import '../../styles/AutoSilde.css';

const Onboarding3: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const updateVariableDuration = () => {
    if (sliderRef.current) {
      const computedStyle = getComputedStyle(sliderRef.current);
      const minWidth = parseInt(computedStyle.minWidth || '320', 10);
      const maxWidth = parseInt(computedStyle.maxWidth || '1920', 10);
      const windowWidth = window.innerWidth;
      const normalized = Math.min(1, Math.max(0, parseFloat(((windowWidth - minWidth) / (maxWidth - minWidth)).toFixed(2))));
      sliderRef.current.style.setProperty('--variable-duration', `${normalized}s`);
    }
  };

  useEffect(() => {
    updateVariableDuration();
    window.addEventListener('resize', updateVariableDuration);
    return () => {
      window.removeEventListener('resize', updateVariableDuration);
    };
  }, []);

  const images = [
    { src: Lipstick, alt: '립스틱 사진' },
    { src: Fan, alt: '선풍기 사진' },
    { src: Perfume, alt: '향수 사진' },
    { src: Lotion, alt: '로션 사진' },
    { src: Torretta, alt: '토레타 사진' },
    { src: Clothe, alt: '민희진 옷 사진' },
    { src: Chicken, alt: '치킨 사진' },
  ];

  return (
    <div className='bg-black pb-32'>
      <div className="flex justify-center items-center">
        <span className="text-4xl font-PR_BO text-green-Normal">제품 배경은</span>
        <span className="text-4xl font-PR_BO text-white ml-2"> 이렇게 생성돼요</span>
      </div>
    <div ref={sliderRef} className="logo-slider bg-black mt-10">
      <div>
        {images.concat(images).map((image, i) => (
          <div key={i} className="slide-container">
            <img src={image.src} alt={image.alt} className="slide" />
            {/* <div className="overlay">
              <p>테마로 생성한 이미지</p>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default Onboarding3;
