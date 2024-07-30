import React from 'react';
import { useNavigate } from 'react-router-dom';

interface MoveChooseProps {
  src:string,
  maintext:string,
  servetext:string,
  servetext2:string,
  index:number,
}

const MoveChoose: React.FC<MoveChooseProps> = ({src,maintext,servetext,servetext2,index}) => {
  const navigate = useNavigate();
  const goToMp4 = () => {
      navigate('/mainchoose/explain', { state: {index}});
  };
  
 return (
<button className="w-[300px] h-[500px]" onClick={goToMp4}>
  <div className="flex flex-col justify-between items-center w-[300px] h-[500px] hover:border-green-Normal hover:border-2 active:border-green-Normal overflow-hidden rounded-xl border border-white">
    <img
      src={src}
      className="flex-grow-0 flex-shrink-0 w-[300px] h-[320px] object-cover"
    />
    <div className="flex flex-col mt-7 justify-start items-center self-stretch h-[200px]">
      <div className="mb-4 flex-grow-0 flex-shrink-0 text-[22px] font-PR_BL text-green-Normal">
        {maintext}
      </div>
      <p className="flex-grow-0 flex-shrink-0 w-[300px] text-[16px] font-PR_L text-center text-white">
        {servetext}
      </p>
      <p className="flex-grow-0 flex-shrink-0 w-300px] text-[16px] font-PR_L text-center text-white">
        {servetext2}
      </p>
    </div>
  </div>
</button>
  );
};

export default MoveChoose;

