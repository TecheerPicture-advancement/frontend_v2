import React, { useRef } from "react";

interface CustomRadioButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  hovered?: boolean;
  onToggle?: () => void;
  onResetHover?: () => void;
  onMouseEnter?: () => void;
  value?: string;
  onValueChange?: (value: string) => void;
}
const CustomRadioButton: React.FC<CustomRadioButtonProps> = ({
  checked,
  onToggle,
  value,
  onValueChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={`flex items-center ps-4 pe-24 rounded-md border ${
        checked ? " border-green-Normal " : "  border-gray-400 dark:border-green-Light"
      }`}
      onClick={() => {
        if (onToggle) onToggle();
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }}
    >
      {/* 숨겨진 라디오 버튼 */}
      <input type="radio" className="hidden" checked={checked} readOnly />

      {/* 커스텀 라디오 버튼 UI */}
      <div
        className={`w-5 h-5 border-2 rounded-full bg-none cursor-pointer ${
          checked ? "border-[5px] border-green-Normal" : ""
        }`}
      />

      {/* 입력 필드 */}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onValueChange && onValueChange(e.target.value)}
        placeholder="직접 입력"
        className={`w-full py-3 ms-2 text-base font-PR_M outline-none placeholder:text-gray-300 ${
          checked ? " bg-black text-green-Normal bg-[rgba(199,255,199,0.05)]" : "bg-black text-green-Light"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          if (onToggle) onToggle();
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }}
      />
    </div>
  );
};


export default CustomRadioButton;

