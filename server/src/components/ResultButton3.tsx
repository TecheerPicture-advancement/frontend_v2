import React from 'react';

interface ButtonProps {
  value: string;
  onClick?: () => void; 
}

const ResultButton: React.FC<ButtonProps> = ({ value, onClick }) => {
  return (
    <button onClick={onClick} className="flex justify-center items-center w-full h-full min-h-[58px] rounded-[10px] border-2 border-gray-400 dark:border-green-Light hover:border-green-Normal active:border-green-Normal hover:bg-green-Normal active:bg-green-Normal hover:font-PR_BO active:font-PR_BO text-max-xl font-PR_M text-center dark:text-green-Light text-black hover:text-black active:text-black">
      {value}
    </button>
  );
};

export default ResultButton;
