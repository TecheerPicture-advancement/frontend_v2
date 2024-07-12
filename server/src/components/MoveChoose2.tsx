import React from 'react';
import img2 from "../../public/assets/BackgroundImage2.png";

interface ChooseProps {
  value: string;
  value2:string;
}

const MoveChoose:React.FC<ChooseProps> = (props) =>  {
    return(
<button className="flex justify-center items-center w-full h-full overflow-hidden gap-[60px] px-20 py-[50px] rounded-[10px] border-2 border-white hover:border-green-Normal :hover active:border-green-Normal :active">
  <div className="flex-grow-0 flex-shrink-0 w-80 h-[120px] relative">
    <p className="w-[360px] absolute left-[-41px] top-0 text-3xl font-PR_BO text-right text-green-Normal">
      {props.value}
    </p>
    <p className="w-full h-full absolute left-[8px] top-[60px] text-lg font-PR_L text-right text-white">
    {props.value2}
    </p>
  </div>
  <div className="flex-grow-0 flex-shrink-0 w-[300px] h-[300px] relative overflow-hidden">
    <div className="w-[300px] h-[300px] absolute left-[-1px] top-[-1px]" />
    <img
          src={img2}
          className="w-full object-cover"
        />
  </div>
</button>

);
};



export default MoveChoose;
