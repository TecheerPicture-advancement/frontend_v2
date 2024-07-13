import React from 'react';
{/*이 컴포넌트는 높이 너비를 최대로 해놨습니다. 
  따라서 페이지에서 사용하실때 태그에 알맞은 사이즈를 지정하시고 이 컴포넌트를 사용하시면 됩니다. */}

interface ButtonProps {
  value: string;
}


const ResultButton:React.FC<ButtonProps> = (props) =>  {
  return (
  <button className="flex justify-center items-center w-full h-full min-w-64 min-h-14 rounded-[10px] border-2 border-green-Light hover:border-green-Normal :hover active:border-green-Normal :active hover:bg-green-Normal :hover hover:font-PR_BO active:font-PR_BO active:bg-green-Normal :active text-max-xl font-PR_M text-center text-green-Light hover:text-black active:text-black" >
  {props.value}</button>
);
};

export default ResultButton;