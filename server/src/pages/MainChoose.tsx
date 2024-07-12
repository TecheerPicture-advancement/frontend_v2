import React from 'react';
import NavBar from '../components/NavBar';
import MoveChoose from '../components/MoveChoose';
import MainButton from '../components/MainButton';

interface NameProps {
  name: string;

}


const MainChoose:React.FC <NameProps>= (props) =>  {
  return (
    <>
    <NavBar/>
  <div className=' bg-black min-h-screen w-full h-full '>
    <div className="place-items-center laptop:grid grid-cols-2">
   {/*left layout*/} 
   <div className="w-96 flex flex-col justify-center items-center overflow-hidden gap-14"> 
      <div className=" w-96 h-24 relative overflow-hidden">
        <p className="w-56 absolute left-0 text-3xl font-PR_BO text-left text-gray-200">
          안녕하세요!
        </p>
        <p className="w-60 absolute my-12 left-0 text-4xl font-PR_BO text-left text-white">
          {props.name}님
        </p>
      </div>
      <MainButton value="시작하기"/>
    </div>
    <div className="grid grid-cols-1 gap-10 justify-center items-center h-1/2 px-4 py-3">
      <MoveChoose value="상품 배경 생성" value2="AI가 사용자의 제품 이미지를 분석 후 적합한 배경을 생성합니다."></MoveChoose>
      <MoveChoose value="광고 배너 생성" value2="AI가 제품 이미지와 컨셉을 분석하여 적합한 광고 배너를 생성합니다."></MoveChoose>
    </div>
  </div>
    </div> 
    </>
 );
  };

  export default MainChoose;