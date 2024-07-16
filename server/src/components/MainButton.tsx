import React from 'react';

interface ButtonProps {
  value: string;
  onClick?: () => void; // 'onClick'으로 변경
}

const MainButton: React.FC<ButtonProps> = (props) => {
  return (
    <button
      className="flex-shrink-0 flex text-center w-full h-full justify-center items-center rounded-[7px] bg-green-Normal hover:bg-green-Normal :hover hover:font-PR_BO active:font-PR_BO active:bg-green-Normal :active text-max-xl font-PR_M text-black hover:text-black active:text-black"
      onClick={props.onClick} // onClick 속성을 추가
    >
      {props.value}
    </button>
  );
};

export default MainButton;
