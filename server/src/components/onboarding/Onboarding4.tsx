import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ImagetoVideo from "../../../public/videos/imagetovideo_explain.mp4";
import TexttoVideo from "../../../public/videos/texttovideo_explain.mp4";

const Onboarding4: React.FC = () => {
  const controls1 = useAnimation();
  const controls2 = useAnimation();

  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView1) {
      controls1.start("visible");
    }
  }, [controls1, inView1]);

  useEffect(() => {
    if (inView2) {
      controls2.start("visible");
    }
  }, [controls2, inView2]);

  const variants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 100 }
  };

  return (
    <>
      <div className="flex flex-col bg-black">
        <motion.div
          ref={ref1}
          initial="hidden"
          animate={controls1}
          variants={variants}
          transition={{ duration: 1 }}
          className="bg-black flex flex-col justify-center items-center py-36"
        >
          <div className="flex justify-center items-center gap-40">
            <div className="flex flex-col gap-2">
              <span className="text-white font-PR_BL text-3xl"> 텍스트 변환 영상</span>
              <span className="text-green-Normal font-PR_M text-lg">원하는 광고 문구와 이미지를 출력해줘요</span>
              <span className="text-green-Light font-PR_L text-base mt-9">
                브랜드 제품이 어떻게 나와야 할지 감이 안 잡히시나요?<br />
                텍스트로 제품 정보를 상세하게 입력하고<br />
                영상으로 확인해 보세요
              </span>
            </div>
            <video
              autoPlay
              loop
              muted
              className="w-[400px]"
              style={{ objectFit: 'cover' }}
            >
              <source src={TexttoVideo} type='video/mp4' />
            </video>
          </div>
        </motion.div>
      </div>
      <div className="flex flex-col bg-black pb-44">
        <motion.div
          ref={ref2}
          initial="hidden"
          animate={controls2}
          variants={variants}
          transition={{ duration: 1 }}
          className="bg-black flex flex-col justify-center items-center py-36"
        >
          <div className="flex justify-center items-center gap-40">
            <video
              autoPlay
              loop
              muted
              className="w-[400px]"
              style={{ objectFit: 'cover' }}
            >
              <source src={ImagetoVideo} type='video/mp4' />
            </video>
            <div className="flex flex-col gap-2">
              <span className="text-white font-PR_BL text-3xl"> 이미지 변환 영상</span>
              <span className="text-green-Normal font-PR_M text-lg">원하는 광고 문구와 이미지를 출력해줘요</span>
              <span className="text-green-Light font-PR_L text-base mt-9">
                제품 이미지는 있는데 영상으로 제작하기는 힘드신가요?<br />
                이미지 업로드 후 AI가 생성한 이미지로 <br />
                광고 영상 제작 완료
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Onboarding4;
