import React from 'react';
import Instagram from '../../assets/instagram.svg?react';
import GoogleAd from '../../assets/googleAd.svg?react';
import X from '../../assets/x.svg?react';

interface AspectRatioButtonProps {
  buttons: { label: string, width: number, height: number}[];
  selectedRatio: string;
  onClick: (width: number, height: number, label: string) => void;
}

const AspectRatioButtons: React.FC<AspectRatioButtonProps> = ({ buttons, selectedRatio, onClick }) => {
  return (
    <div className="flex flex-wrap pt-6 pl-1">
        <div className="flex items-center w-full">
          <Instagram />
          <div className="flex items-center ml-4 flex-grow gap-4">
            <button
              onClick={() => onClick(buttons[0].width, buttons[0].height, buttons[0].label)}
              className={`px-8 py-2 rounded-md ${
                selectedRatio === buttons[0].label ? 'bg-green-Normal text-black font-PR_BO' : 'text-green-Light font-PR_L border border-green-Light'
              }`}
            >
              {buttons[0].label}
            </button>
            <button
              onClick={() => onClick(buttons[1].width, buttons[1].height, buttons[1].label)}
              className={`px-8 py-2 rounded-md ${
                selectedRatio === buttons[1].label ? 'bg-green-Normal text-black font-PR_BO' : 'text-green-Light font-PR_L border border-green-Light'
              }`}
            >
              {buttons[1].label}
            </button>
          </div>
        </div>

      <div className="flex items-center w-full mt-4">
        <GoogleAd />
        <div className="flex items-center ml-4 gap-4">
          <button
            onClick={() => onClick(buttons[2].width, buttons[2].height, buttons[2].label)}
            className={`px-6 py-2 rounded-md ${
              selectedRatio === buttons[2].label ? 'bg-green-Normal text-black font-PR_BO' : 'text-green-Light font-PR_L border border-green-Light'
            }`}
          >
            {buttons[2].label}
          </button>
          <button
            onClick={() => onClick(buttons[3].width, buttons[3].height, buttons[3].label)}
            className={`px-8 py-2 rounded-md ${
              selectedRatio === buttons[3].label ? 'bg-green-Normal text-black font-PR_BO' : 'text-green-Light font-PR_L border border-green-Light'
            }`}
          >
            {buttons[3].label}
          </button>
        </div>
      </div>
      <div className="flex items-center w-full mt-4">
        <X />
        <div className="flex items-center ml-4 gap-4">
          <button
            onClick={() => onClick(buttons[4].width, buttons[4].height, buttons[4].label)}
            className={`px-4 py-2 rounded-md ${
              selectedRatio === buttons[4].label ? 'bg-green-Normal text-black font-PR_BO' : 'text-green-Light font-PR_L border border-green-Light'
            }`}
          >
            {buttons[4].label}
          </button>
          <button
            onClick={() => onClick(buttons[5].width, buttons[5].height, buttons[5].label)}
            className={`px-4 py-2 rounded-md ${
              selectedRatio === buttons[5].label ? 'bg-green-Normal text-black font-PR_BO' : 'text-green-Light font-PR_L border border-green-Light'
            }`}
          >
            {buttons[5].label}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AspectRatioButtons;
