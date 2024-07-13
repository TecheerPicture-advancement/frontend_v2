import React from 'react';


interface ButtonProps {
  value: string;
}


const ResultButton:React.FC<ButtonProps> = (props) =>  {
  return (
  <button className="flex justify-center items-center px-[90px] py-[10px] rounded-[10px] border-2 border-green-Light hover:border-green-Normal :hover active:border-green-Normal :active hover:bg-green-Normal :hover hover:font-PR_BO active:font-PR_BO active:bg-green-Normal :active text-max-xl font-PR_M text-center text-green-Light hover:text-black active:text-black" >
  {props.value}</button>
);
};

export default ResultButton;