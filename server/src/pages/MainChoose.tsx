import React from 'react';
import MoveChoose from '../components/MoveChoose';
import MoveChoose2 from '../components/MoveChoose2';
import MainButton from '../components/MainButton';

interface NameProps {
  name: string;
}


const MainChoose:React.FC <NameProps>= (props) =>  {
  return (

    <div className=' bg-black min-h-screen place-content-center'>
    <div className="flex flex-row w-full h-full place-content-evenly ">
   {/*left layout*/}
   <div className="flex flex-col w-1/3 justify-center flow-hidden gap-14">
      <div className=" w-96 h-24 relative overflow-hidden">
        <p className=" absolute left-0 text-3xl font-PR_BO text-left text-gray-200">
          안녕하세요!
        </p>
        <p className="absolute my-12 left-0 text-4xl font-PR_BO text-left text-white">
          {props.name}님
        </p>
      </div>
      <div className="w-full h-14">
      <MainButton value="시작하기"/>
      </div>
    </div>
    <div className="w-5/12 flex-col flex gap-10 justify-center items-center">
    
    <MoveChoose />
    <MoveChoose2 />
    </div>
  </div>
    </div> 
 );
  };

  export default MainChoose;