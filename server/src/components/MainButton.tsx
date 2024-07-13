import React from 'react';

interface ButtonProps {
  value: string;

}

const MainButton:React.FC<ButtonProps> = (props) =>  {
  return (
    <button className="flex text-center justify-center items-center px-[60px] py-[6px] rounded-[7px] bg-green-Normal hover:bg-green-Normal :hover hover:font-PR_BO active:font-PR_BO  active:bg-green-Normal :active text-max-xl font-PR_M text-center text-black hover:text-black active:text-black" >
  {props.value}</button>
);
};

export default MainButton;
