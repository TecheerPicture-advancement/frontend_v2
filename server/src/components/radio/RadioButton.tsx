import React from 'react';

type RadioButtonProps = {
  label: string; 
  checked: boolean; 
  onChange: () => void
};
const RadioButton: React.FC<RadioButtonProps> = ({ label, checked, onChange }) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div 
        className={`flex items-center ps-4 pe-24 rounded-md border  cursor-pointer ${
        checked ? "bg-green-Light bg-opacity-5 border-green-Normal" : "border-gray-400 dark:border-green-Light"
      }`}
      onClick={onChange}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <input
        type="radio"
        className={`appearance-none w-5 h-5 border-2 rounded-full outline-none cursor-pointer
          ${checked ? ' border-[5px] border-green-Normal' : hovered ? ' border-[5px] border-green-Normal' : ''}
        `}
        checked={checked}
        readOnly
      />
      <label 
        className={`w-full py-3 ms-2 text-base font-PR_M text-gray-900 dark:text-green-Light ${checked ? 'text-green-Normal dark:text-green-Normal' : ''}`}
      >
        {label}
      </label>
    </div>
  );
};



export default RadioButton;
