import React from 'react';

{/*이 컴포넌트는 높이 너비를 최대로 해놨습니다. 
  따라서 페이지에서 사용하실때 태그에 알맞은 사이즈를 지정하시고 이 컴포넌트를 사용하시면 됩니다. */}


interface ButtonProps {
  value: string;

}

const MainButton:React.FC<ButtonProps> = (props) =>  {
  return (
    <button className="flex text-center w-full h-full min-w-96 min-h-9 text-xl font-PR_M justify-center items-center rounded-[10px] bg-green-Normal hover:bg-green-Normal :hover hover:font-PR_BO active:font-PR_BO  active:bg-green-Normal :active text-black hover:text-black active:text-black" >
  {props.value}</button>
);
};

export default MainButton;
