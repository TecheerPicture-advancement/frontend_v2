import React, { useEffect, useRef } from 'react';
import Lipstick from '../../../public/assets/lipstick.jpg';
import Fan from '../../../public/assets/fan.jpg';
import Perfume from '../../../public/assets/perfume.jpg';
import Lotion from '../../../public/assets/lotion.jpg';
import Torretta from '../../../public/assets/torretta.jpg';
import '../../styles/AutoSilde.css';
import diffuser from '../../../public/assets/diffuser.jpg';
import cosmetics from '../../../public/assets/cosmetics.png';
import bottle from '../../../public/assets/bottle.jpg';
import Perfume1 from '../../../public/assets/perfume1.png';
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Onboarding3: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const updateVariableDuration = () => {
    if (sliderRef.current) {
      const computedStyle = getComputedStyle(sliderRef.current);
      const minWidth = parseInt(computedStyle.minWidth || '300', 10);
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
   // 애니메이션 제어를 위한 훅
   const controls = useAnimation();
   // 요소가 보이는지 확인하기 위한 훅
   const [ref, inView] = useInView({
     triggerOnce: false, // 여러 번 트리거
     threshold: 0.2, // 요소의 40%가 보이면 트리거
   });
 
   // 요소가 보이면 애니메이션 시작, 사라지면 애니메이션 숨김
   React.useEffect(() => {
     if (inView) {
       controls.start("visible");
     } else {
       controls.start("hidden");
     }
   }, [controls, inView]);

  const images = [
    { src: Lipstick, alt: '립스틱 사진' },
    { src: Fan, alt: '선풍기 사진' },
    { src: Perfume, alt: '향수 사진' },
    { src: Lotion, alt: '로션 사진' },
    { src: Torretta, alt: '토레타 사진' },
    { src: diffuser, alt: '디퓨저 사진' },
    { src: cosmetics, alt: '화장품 사진' },
    { src: bottle, alt: '물병 사진' },
    { src: Perfume1, alt: '향수 사진' },

  ];

  return (
    <div className='bg-black pb-24'>

      {/* 섹션 1번 */}
      <div className="grid w-auto grid-cols-2 h-96 place-items-center mb-64 mx-[140px]" ref={ref}>
        
        {/* 왼쪽 */}
        <motion.div
          className="text-left"
          initial="hidden"
          animate={controls}
          variants={{
            visible: { opacity: 1, x: 0 },
            hidden: { opacity: 0, x: -100 }
          }}
          transition={{ duration: 1 }}
        >
          <div className="flex flex-col gap-2">
                <span className="text-white font-PR_BL text-3xl"> 배경생성</span>
                <span className="text-green-Normal font-PR_M text-lg">심플, 누끼, 컨셉 </span>
                <span className="text-green-Light font-PR_L text-base mt-9">
                심플 - 깔끔한 사진 배경을 생성하는 서비스<br/>
                누끼 - 사진 배경을 없애는 서비스<br/>
                컨셉 - 원하는 컨셉 배경을 생성하는 서비스<br/>

                </span>
            </div>
        </motion.div>

        {/* 오른쪽 */}
        <motion.div
          className="relative flex-justify-center"
          initial="hidden"
          animate={controls}
          variants={{
            visible: { opacity: 1, x: 0 },
            hidden: { opacity: 0, x: 100 }
          }}
          transition={{ duration: 1 }}
        >

          <div className="absolute z-10 overflow-hidden transform rounded-full place-content-center w-64 h-64 bg-green-Light -translate-x-72 -translate-y-44">
            <div className="flex flex-col place-items-center">
              <div className="w-20 h-8 overflow-hidden rounded-[33px] bg-[#A4EFBE] mb-3">
                <p className="flex items-center justify-center h-full text-base text-center text-black font-PR_M">
                  심플
                </p>
              </div>
              <span className="text-2xl text-center text-black font-PR_BO">
                때로는
              </span>
              <span className="text-2xl text-center text-black font-PR_BO">
                단순하게
              </span>
            </div>
          </div>

          <div className="absolute z-20 overflow-hidden transform rounded-full place-content-center w-64 h-64 bg-green-Normal -translate-x-40">
            <div className="flex flex-col place-items-center">
              <div className="w-20 h-8 overflow-hidden rounded-[33px] bg-white mb-3">
                <p className="flex items-center justify-center h-full text-base text-center text-black font-PR_M">
                  컨셉
                </p>
              </div>
              <span className="text-2xl text-center text-white font-PR_BO">
                창의적인
              </span>
              <span className="text-2xl text-center text-white font-PR_BO">
                아이디어 
              </span>
            </div>
          </div>

          <div className="absolute z-30 place-content-center w-64 h-64 rounded-full bg-[#A4EFBE] overflow-hidden transform -translate-x-20 -translate-y-52">
            <div className="flex flex-col place-items-center">
              <div className="w-24 h-8 overflow-hidden rounded-[33px] bg-green-Light mb-3">
                <p className="flex items-center justify-center h-full text-base text-center text-black font-PR_M">
                  누끼
                </p>
              </div>
              <span className="text-2xl text-center text-black font-PR_BO">
                나에게
              </span>
              <span className="text-2xl text-center text-black font-PR_BO">
                필요한 것만 
              </span>
            </div>
          </div>

        </motion.div>

      </div>
      <div className="flex justify-center items-center">
        <span className="text-3xl font-PR_BO text-green-Normal">제품 배경은</span>
        <span className="text-3xl font-PR_BO text-white ml-2"> 이렇게 생성돼요</span>
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
