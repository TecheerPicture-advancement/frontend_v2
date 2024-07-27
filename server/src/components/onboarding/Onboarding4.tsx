import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import example from "../../../public/assets/example.gif"

const Onboarding4: React.FC = () => {
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

  return (
    <div className="flex flex-col min-h-screen bg-black mb-44">

      {/* 섹션 0번 */}
      <div className="flex items-center justify-center w-full h-28 mb-44">
        <p className="text-5xl text-white font-PR_BO">
          이렇게 사용해 보세요!
        </p>
      </div>

      {/* 섹션 1번 */}
      <div className="grid w-full grid-cols-2 h-96 place-items-center mb-96" ref={ref}>
        
        {/* 왼쪽 */}
        <motion.div
          className="text-right"
          initial="hidden"
          animate={controls}
          variants={{
            visible: { opacity: 1, x: 0 },
            hidden: { opacity: 0, x: -100 }
          }}
          transition={{ duration: 1 }}
        >
          <p className="text-4xl text-white font-PR_BO">
            <span className="text-4xl text-white font-PR_BO">배경생성은 </span>
            <span className="text-4xl font-PR_BO text-green-Normal">심플, 누끼, 테마</span>
            <span className="text-4xl text-white font-PR_BO">를 선택하여</span>
            <br />
            <span className="text-4xl text-white font-PR_BO">이미지를 생성할 수 있습니다.</span>
          </p>
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

          <div className="absolute z-10 overflow-hidden transform rounded-full place-content-center w-72 h-72 bg-green-Light -translate-x-72 -translate-y-44">
            <div className="flex flex-col place-items-center">
              <div className="w-24 h-8 overflow-hidden rounded-[33px] bg-[#A4EFBE] mb-3">
                <p className="flex items-center justify-center h-full text-lg text-center text-black font-PR_M">
                  심플
                </p>
              </div>
              <span className="text-3xl text-center text-black font-PR_BO">
                때로는
              </span>
              <span className="text-3xl text-center text-black font-PR_BO">
                단순하게
              </span>
            </div>
          </div>

          <div className="absolute z-20 overflow-hidden transform rounded-full place-content-center w-72 h-72 bg-green-Normal -translate-x-28">
            <div className="flex flex-col place-items-center">
              <div className="w-24 h-8 overflow-hidden rounded-[33px] bg-white mb-3">
                <p className="flex items-center justify-center h-full text-lg text-center text-black font-PR_M">
                  컨셉
                </p>
              </div>
              <span className="text-3xl text-center text-white font-PR_BO">
                창의적인
              </span>
              <span className="text-3xl text-center text-white font-PR_BO">
                아이디어 
              </span>
            </div>
          </div>

          <div className="absolute z-30 place-content-center w-72 h-72 rounded-full bg-[#A4EFBE] overflow-hidden transform -translate-x-12 -translate-y-60">
            <div className="flex flex-col place-items-center">
              <div className="w-24 h-8 overflow-hidden rounded-[33px] bg-green-Light mb-3">
                <p className="flex items-center justify-center h-full text-lg text-center text-black font-PR_M">
                  누끼
                </p>
              </div>
              <span className="text-3xl text-center text-black font-PR_BO">
                나에게
              </span>
              <span className="text-3xl text-center text-black font-PR_BO">
                필요한 것만 
              </span>
            </div>
          </div>

        </motion.div>

      </div>

      {/* 섹션 2번 */}
      <div className="grid w-full h-full grid-cols-2 place-items-center mb-96" >
        <div className="flex items-center justify-center w-1/3 h-96" >
          <img src={example} className="object-center" />
        </div>
        <div className="justify-center text-4xl text-center place-content-center font-PR_BO">
          <span className="text-4xl text-white font-PR_BO">배너생성은 간단한 정보만 입력하면</span>
          <p>
            <span className="text-4xl text-white font-PR_BO">AI가 </span>
            <span className="text-4xl font-PR_BO text-green-Normal">문구와 배경</span>
            <span className="text-4xl text-white font-PR_BO">을 생성해줍니다.</span>
          </p>
        </div>
      </div>

      {/* 섹션 3번 */}

    </div>
  );
};

export default Onboarding4;
