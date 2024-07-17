import React from "react";
import example from "../../../public/assets/example.gif"

const Onboarding4: React.FC = () => {
  return (
    <div className="bg-black flex flex-col min-h-screen mb-44">

      {/* 섹션 0번 */}
      <div className="w-full h-28 flex justify-center items-center mb-44">
        <p className="text-5xl font-PR_BO text-white">
          이렇게 사용해 보세요!
        </p>
      </div>

      {/* 섹션 1번 */}
      <div className="w-full h-96 grid grid-cols-2 place-items-center mb-96">
        
        {/* 왼쪽 */}
        <div className="text-right">
          <p className="text-4xl font-PR_BO text-white">
            <span className="text-4xl font-PR_BO text-white">배경생성은 </span>
            <span className="text-4xl font-PR_BO text-green-Normal">심플, 누끼, 테마</span>
            <span className="text-4xl font-PR_BO text-white">를 선택하여</span>
            <br />
            <span className="text-4xl font-PR_BO text-white">이미지를 생성할 수 있습니다.</span>
          </p>
        </div>

        {/* 오른쪽 */}
        <div className="relative flex-justify-center">

          <div className="absolute z-10 place-content-center w-72 h-72 rounded-full bg-green-Light overflow-hidden transform -translate-x-72 -translate-y-44">
            <div className="flex flex-col place-items-center">
              <div className="w-24 h-8 overflow-hidden rounded-[33px] bg-[#A4EFBE] mb-3">
                <p className="h-full flex items-center justify-center text-lg font-PR_M text-center text-black">
                  심플
                </p>
              </div>
              <span className="text-3xl font-PR_BO text-center text-black">
                때로는
              </span>
              <span className="text-3xl font-PR_BO text-center text-black">
                단순하게
              </span>
            </div>
          </div>

          <div className="absolute z-20 place-content-center w-72 h-72 rounded-full bg-green-Normal overflow-hidden transform -translate-x-28">
            <div className="flex flex-col place-items-center">
              <div className="w-24 h-8 overflow-hidden rounded-[33px] bg-white mb-3">
                <p className="h-full flex items-center justify-center text-lg font-PR_M text-center text-black">
                  컨셉
                </p>
              </div>
              <span className="text-3xl font-PR_BO text-center text-white">
                창의적인
              </span>
              <span className="text-3xl font-PR_BO text-center text-white">
                아이디어 
              </span>
            </div>
          </div>

          <div className="absolute z-30 place-content-center w-72 h-72 rounded-full bg-[#A4EFBE] overflow-hidden transform -translate-x-12 -translate-y-60">
            <div className="flex flex-col place-items-center">
              <div className="w-24 h-8 overflow-hidden rounded-[33px] bg-green-Light mb-3">
                <p className="h-full flex items-center justify-center text-lg font-PR_M text-center text-black">
                  누끼
                </p>
              </div>
              <span className="text-3xl font-PR_BO text-center text-black">
                나에게
              </span>
              <span className="text-3xl font-PR_BO text-center text-black">
                필요한 것만 
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* 섹션 2번 */}
      <div className="w-full h-full grid grid-cols-2 place-items-center mb-96">
        <div className="w-1/3 h-96 flex justify-center items-center">
          <img src={example} className="object-center" />
        </div>
        <div className="place-content-center text-center justify-center text-4xl font-PR_BO">
          <span className="text-4xl font-PR_BO text-white">배너생성은 간단한 정보만 입력하면</span>
          <p>
            <span className="text-4xl font-PR_BO text-white">AI가 </span>
            <span className="text-4xl font-PR_BO text-green-Normal">문구와 배경</span>
            <span className="text-4xl font-PR_BO text-white">을 생성해줍니다.</span>
          </p>
        </div>
      </div>


      {/* 섹션 3번 */}

    </div>
  );
};

export default Onboarding4;