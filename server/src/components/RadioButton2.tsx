import React from 'react';

interface RadioButton2Props extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  hovered?: boolean;
  onToggle?: () => void;
  onResetHover?: () => void;
  onMouseEnter?: () => void;
  value?: string;
  onValueChange?: (value: string) => void;
}

const RadioButton2: React.FC<RadioButton2Props> = ({
  checked,
  hovered,
  onToggle,
  onResetHover,
  onMouseEnter,
  value,
  onValueChange,
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
        <input
          type="text"
          value={value}
          onChange={(e) => onValueChange && onValueChange(e.target.value)}  
          placeholder="직접 입력"
          className="text-white bg-black text-[14px] font-bold outline-none"
        />
      </div>
    </div>
  );
};

export default RadioButton2;
