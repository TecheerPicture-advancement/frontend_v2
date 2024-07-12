import React from 'react';

interface SizeFieldsProps {
  width: number;
  height: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled: boolean;
  essential: boolean;
  
}
// TypeScript로 스핀 버튼을 제거하는 함수
function removeNumberInputSpinButton() {
  const numberInput = document.getElementById('myNumberInput') as HTMLInputElement | null;
  if (numberInput) {
      // mousedown 이벤트 리스너 등록
      numberInput.addEventListener('mousedown', (event) => {
          // input 요소가 number 타입이고, mousedown 이벤트의 타겟이 input이라면
          if (numberInput.type === 'number' && event.target === numberInput) {
              // 이벤트 기본 동작을 막음 (스핀 버튼 클릭 시 동작하지 않음)
              event.preventDefault();
          }
      });
  }
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', () => {
  removeNumberInputSpinButton();
});


const SizeFields: React.FC<SizeFieldsProps> = ({ width, height, onChange, isDisabled, essential }) => (
  <div className="flex py-1 px-1 flex-wrap gap-6">
    <div>
        <label className="block text-lg font-PR_BO text-green-Light">
          가로 사이즈
          {essential && <span className="text-red">*</span>}
          </label>
      <input 
        type="number" 
        name="width" 
        value={width} 
        onChange={onChange} 
        placeholder="예) 1920"
        disabled={isDisabled}
        id="myNumberInput"
        className={`flex justify-start items-center w-fill gap-1 mt-2 px-3 py-2.5 rounded-md bg-black font-PR_L text-gray-100 border border-green-Light w-[340px] ${isDisabled ? 'bg-gray-400' : 'bg-black'}`}
        style={{
          WebkitAppearance: 'none',
          MozAppearance: 'textfield',
          appearance: 'none',
        }}
      />
    </div>
    <div>
        <label className="block text-lg font-PR_BO text-green-Light">
          세로 사이즈
          {essential && <span className="text-red">*</span>}
          </label>
          <input 
            type="number" 
            name="height" 
            value={height} 
            onChange={onChange} 
            disabled={isDisabled}
            placeholder="예) 1080"
            id="myNumberInput"
            className={`flex justify-start items-center gap-1 mt-2 px-3 py-2.5 rounded-md bg-black font-PR_L text-gray-100 border border-green-Light w-[340px] ${isDisabled ? 'bg-gray-400' : 'bg-black'}`}
          />
    </div>
  </div>
);

export default SizeFields;
