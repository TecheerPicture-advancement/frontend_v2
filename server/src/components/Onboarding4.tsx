import React from "react";
import example from "../../public/assets/example.gif"

const Onboarding4 : React.FC = () => {
    return(
        <div className="bg-black flex flex-col min-h-screen justify-center items-center">
            <div className="w-full h-full grid grid-cols-2 place-items-center overflow-hidden">
                <div className="w-1/3 h-96 flex justify-center items-center">
                    <img src={example} className="object-center" alt="" />
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
        </div>
    );
};

export default Onboarding4;
