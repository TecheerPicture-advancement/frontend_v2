import React from 'react';


interface AspectRatioButtonProps {
  buttons: { label: string, width: number, height: number}[];
  selectedRatio: string;
  onClick: (width: number, height: number, label: string) => void;
}

const AspectRatioButtons: React.FC<AspectRatioButtonProps> = ({ buttons, selectedRatio, onClick }) => {
  return (
    <div className="flex flex-wrap gap-5 pt-6 pl-1">
      {buttons.map((button) => (
        <div key={button.label} className="flex flex-col items-center w-1/2 md:w-auto">
          <button
            onClick={() => onClick(button.width, button.height, button.label)}
            className={`px-4 py-2 rounded-md ${
              selectedRatio === button.label ? 'bg-green-Normal text-black font-PR_BO' : ' text-green-Light font-PR_L border border-green-Light'
            }`}
          >
            {button.label}
          </button>
        </div>
      ))}
    </div>
  );
};

export default AspectRatioButtons;
