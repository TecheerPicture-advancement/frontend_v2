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
import { useAnimation } from "framer-motion";
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

  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

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
    <section>
      <header className="flex justify-center items-center">
        <h1 className="text-5xl font-PR_BL text-gray-400 dark:text-white">제품 배경은 이렇게 생성돼요</h1>
      </header>

      <section ref={sliderRef} className="logo-slider mt-10">
        <div>
          {images.concat(images).map((image, i) => (
            <figure key={i} className="slide-container">
              <img src={image.src} alt={image.alt} className="slide" />
            </figure>
          ))}
        </div>
      </section>
    </section>
  );
};

export default Onboarding3;
