import React, { useEffect, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ImageSlider from '../ImageSlider';
import ResultImage from '../../../public/assets/BannerResult.jpg';
import airpot from '../../../public/assets/airpot.png';
import airpot2 from '../../../public/assets/airpot2.jpg';
import Beauty from '../../../public/assets/Beauty.jpg';
import BannerVideo from '../../../public/videos/Banner_explain.mp4'; // Import video file

const Onboarding2: React.FC = () => {
  const controls1 = useAnimation();
  const controls2 = useAnimation();

  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.2 });

  const handleInView1 = useCallback(() => {
    if (inView1) {
      controls1.start("visible");
    }
  }, [controls1, inView1]);

  const handleInView2 = useCallback(() => {
    if (inView2) {
      controls2.start("visible");
    }
  }, [controls2, inView2]);

  useEffect(() => {
    handleInView1();
  }, [handleInView1]);

  useEffect(() => {
    handleInView2();
  }, [handleInView2]);

  const variants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 100 }
  };

  return (
    <div className='bg-black'>
      <div className="text-white flex justify-center font-PR_BO text-3xl pt-24 pb-10">
        어떤 사이트인가요?
      </div>
      <div className="flex justify-center items-center gap-32 -ml-20  pb-48">
        <motion.div
          ref={ref1}
          initial="hidden"
          animate={controls1}
          variants={variants}
          transition={{ duration: 1 }}
          className="bg-black flex flex-col justify-center items-center"
        >
          {inView1 && (
            <video
              autoPlay
              loop
              muted
              className="w-[400px]"
              style={{ objectFit: 'cover' }}
            >
              <source src={BannerVideo} type='video/mp4' />
            </video>
          )}
        </motion.div>
        <motion.div
          ref={ref2}
          initial="hidden"
          animate={controls2}
          variants={variants}
          transition={{ duration: 1 }}
          className="bg-black flex flex-col justify-center items-center"
        >
          <div className="flex flex-col gap-2">
            <span className="text-white font-PR_BL text-3xl"> 광고 이미지 생성</span>
            <span className="text-green-Normal font-PR_M text-lg">원하는 광고 문구와 이미지를 출력</span>
            <span className="text-green-Light font-PR_L text-base mt-9">
              광고를 생성하고 싶은 이미지 컨셉, 카테고리와 <br />
              맞춤형 사이즈를 선택해보세요<br />
              브랜드에 맞는 광고를 AI가 생성해줍니다.<br />
            </span>
          </div>
        </motion.div>
      </div>
      
      <div className="flex flex-col items-center justify-center gap-16 bg-black pb-48">
        <div>
          <span className="text-3xl text-green-Normal font-PR_BO">광고 이미지는</span>
          <span className="text-3xl text-white font-PR_BO"> 이렇게 생성돼요</span>
        </div>
        <div className="flex items-center justify-center gap-40">
          <ImageSlider beforeImage={airpot} afterImage={airpot2} beforeImageClass="scale-110" />
          <ImageSlider beforeImage={Beauty} afterImage={ResultImage} />
        </div>
      </div>
    </div>
  );
}

export default Onboarding2;
