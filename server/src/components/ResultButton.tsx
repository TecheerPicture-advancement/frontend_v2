import React from 'react';

interface ButtonProps {
  value: string;
}

const ResultButton: React.FC<ButtonProps> = (props) => {
  return (
    <button className="flex justify-center items-center w-full h-full rounded-[10px] border-2 border-green-Light hover:border-green-Normal active:border-green-Normal hover:bg-green-Normal active:bg-green-Normal hover:font-PR_BO active:font-PR_BO text-max-xl font-PR_M text-center text-green-Light hover:text-black active:text-black">
      {props.value}
    </button>
  );
};

export default ResultButton;
