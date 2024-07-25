import React from 'react';

interface RadioButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  hovered?: boolean;
  onToggle?: () => void;
  onResetHover?: () => void;
  onMouseEnter?: () => void;
  text?: string;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  checked,
  hovered,
  onToggle,
  onResetHover,
  onMouseEnter,
  text,
  ...props
}) => {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <div
        className={`flex justify-start items-center w-full h-full gap-[14px] p-[10px_14px] rounded-[6px] bg-[#111] border-[1.5px] cursor-pointer 
          ${checked ? 'border-green-Normal' : hovered ? 'border-green-Normal' : 'border-white'}
        `}
        onClick={onToggle}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onResetHover}
      >
        <input
          type="radio"
          className={`appearance-none w-[18px] h-[18px] border-2 rounded-full outline-none cursor-pointer
            ${checked ? 'bg-black border-[5px] border-green-Normal' : hovered ? 'bg-black border-[5px] border-green-Normal' : 'bg-black'}
          `}
          checked={checked}
          onChange={() => {}} // No need to handle onChange for input
          {...props}
        />
        {text && <span className="text-white text-[14px] font-PR_BO">{text}</span>}
      </div>
    </div>
  );
};

export default RadioButton;
