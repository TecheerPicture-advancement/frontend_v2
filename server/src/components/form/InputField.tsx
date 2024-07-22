import React, { useState } from 'react';

interface InputFieldProps {
  label: string;
  essential: boolean;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  essential,
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  // Ensure value is a valid input value
  const displayValue = type === 'number' && (value === '' || isNaN(value as number)) ? '' : value;

  return (
    <div className={`relative ${isFocused ? 'border-green-Normal focus:border-green-Normal' : 'border-green-Light'} rounded-lg px-3 py-2 flex flex-col justify-start items-start w-full`}>
      <div>
        <label className="flex-grow-0 flex-shrink-0 text-lg font-PR_BO text-left text-green-Light">
          {label}
          {essential && <span className="text-red">*</span>}
        </label>
      </div>
      <input
        type={type}
        name={name}
        value={displayValue}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        className="mt-2 flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 gap-1 px-3 py-2.5 rounded-md border-[1.5px] bg-transparent border-green-Light bg-black text-gray-100 font-PR_L placeholder-gray-100"
      />
      <style>{`
        input[type='number']::-webkit-outer-spin-button,
        input[type='number']::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input[type='number'] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
};

export default InputField;
