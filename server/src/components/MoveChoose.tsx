import React from 'react';
import img1 from "../../public/assets/BackgroundImage1.png";

interface ChooseProps {
  value: string;
  value2:string;
}

const MoveChoose:React.FC<ChooseProps> = (props) =>  {
    return(
<button className="flex shrink-0 display-flex gap-8 justify-center items-center px-3 py-5 rounded-md border-2 border-white hover:border-green-Normal :hover active:border-green-Normal :active">
        <img
          src={img1}
          className="flex shrink-0 w-52 h-52 object-cover"
        />
        <div className="flex shrink-0 flex-col justify-start items-start h-[120px] w-80 gap-5">
          <p className="text-3xl font-PR_BO text-left text-[#00d54b]">
           {props.value}
          </p>
          <p className="text-lg font-PR_L text-left text-white">
            {props.value2}
          </p>
        </div>
      </button>
);
};

export default MoveChoose;
