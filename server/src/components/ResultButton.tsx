import React from 'react';


interface ButtonProps {
  value: string;
}


const ResultButton:React.FC<ButtonProps> = (props) =>  {
  return (
  <button className="flex justify-center items-center min-text-xl-w px-[90px] py-[10px] rounded-[10px] border-2 border-green-Light hover:border-green-Normal active:border-green hover:bg-green-Normal :hover active:bg-green-Normal :active max-text-xl font-PR_M text-center text-green-Light hover:text-black active:text-black" >
  {props.value}</button>
);
};

export default ResultButton;
