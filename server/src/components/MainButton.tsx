import React from 'react';

{/*이 컴포넌트는 높이 너비를 최대로 해놨습니다. 
  따라서 페이지에서 사용하실때 태그에 알맞은 사이즈를 지정하시고 이 컴포넌트를 사용하시면 됩니다. */}


interface ButtonProps {
  value: string;
  next: string;
}

const MainButton:React.FC<ButtonProps> = (props) =>  {
  return (
    <button className="flex-shrink-0 flex text-center w-full h-full justify-center items-center rounded-[7px] bg-green-Normal hover:bg-green-Normal :hover hover:font-PR_BO active:font-PR_BO  active:bg-green-Normal :active text-max-xl font-PR_M text-black hover:text-black active:text-black" >
    {props.value}</button>
  );
};

export default MainButton;
