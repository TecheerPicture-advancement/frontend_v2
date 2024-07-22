import React from 'react';
interface SizeFieldsProps {
  width: number | string;
  height: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  essential: boolean;
  isDisabled: boolean;
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const SizeFields: React.FC<SizeFieldsProps> = ({ width, height, onChange, essential, isDisabled, onFocus }) => {
  return (
    <div className="flex flex-col w-auto gap-4">
      <div className="flex flex-col w-auto space-y-2">
        <label className="flex-grow-0 flex-shrink-0 text-lg font-PR_BO w-auto">
          <span className='text-green-Light w-auto'>가로</span>
          {essential && <span className="text-red">*</span>}
        </label>
        <input
          type="number"
          name="output_w"
          value={width}
          onChange={onChange}
          onFocus={onFocus}
          disabled={isDisabled}
          className={`flex justify-start items-center w-fill gap-1 mt-2 px-3 py-2.5 rounded-md bg-black font-PR_L text-gray-100 border border-green-Light w-[340px] ${isDisabled ? 'bg-gray-400' : 'bg-black'}`}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label className="text-green-Normal flex-grow-0 flex-shrink-0 text-lg font-PR_BO">
          <span className='text-green-Light w-auto'>세로</span>
          {essential && <span className="text-red">*</span>}
        </label>
        <input
          type="number"
          name="output_h"
          value={height}
          onChange={onChange}
          onFocus={onFocus}
          disabled={isDisabled}
          className={`flex justify-start items-center w-fill gap-1 mt-2 px-3 py-2.5 rounded-md bg-black font-PR_L text-gray-100 border border-green-Light w-[340px] ${isDisabled ? 'bg-gray-400' : 'bg-black'}`}
        />
      </div>
    </div>
  );
};

export default SizeFields;
