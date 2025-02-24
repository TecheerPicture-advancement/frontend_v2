import React from 'react';

interface ButtonProps {
  value: string;
  onClick?: () => void;
  width?: string; 
  height?: string; 
  textSize?: string;
}

const MainButton: React.FC<ButtonProps> = (props) => {
  const width = props.width || 'full';
  const height = props.height || '60px';
  const textSize = props.textSize || 'text-xl';

  return (
    <button
      className={`flex-shrink-0 flex text-center w-${width} h-${height} justify-center items-center rounded-[7px] 
        bg-green-Normal hover:bg-green-Dark :hover hover:font-PR_BO active:font-PR_BO 
        hover:scale-[1.03] translate-transform ease-in-out hover duration-200
        active:bg-green-Normal :active text-max-xl font-PR_M
        text-black hover:text-black active:text-black ${textSize}`}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
};

export default MainButton;
