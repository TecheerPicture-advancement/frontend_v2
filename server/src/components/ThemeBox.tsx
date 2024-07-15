import React from 'react';
import MainButton from './MainButton';

interface ThemeBoxProps {
    imageSource: string;
    prompt: string;
    detail: string;
    theme: string;
}

const ThemeBox: React.FC<ThemeBoxProps> = ({ imageSource, detail, prompt, theme }) => {
  return (
    <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 w-[600px] relative overflow-hidden gap-[35px] px-2.5">
      <div className="flex-grow-0 flex-shrink-0 w-[250px] h-[250px] relative overflow-hidden rounded-[30px]">
        <div
          className="w-[250px] h-[250px] absolute left-0 top-[-0.5px] rounded-[15px] bg-[#e6ffef] rounded-[30px]"
          style={{
            boxShadow:
              "10.5px 123.5px 34.5px 0 rgba(255,255,255,0), 6.5px 79px 31.5px 0 rgba(255,255,255,0.01), 4px 44.5px 27px 0 rgba(255,255,255,0.05), 1.5px 19.5px 20px 0 rgba(255,255,255,0.09), 0.5px 5px 11px 0 rgba(255,255,255,0.1)",
          }}
        />
        <img
          src={imageSource}
          className="w-[250px] h-[250px] absolute left-[0px] top-[0px] object-cover rounded-[30px]"
        />
        <div className="w-[250px] h-[250px] absolute left-0 top-[0px] opacity-50 bg-gradient-to-b from-white to-black mix-blend-multiply" />
      </div>
      <div className="flex flex-col justify-between items-start flex-grow-0 flex-shrink-0 h-[232px] w-[220px] relative">
        <div className="flex-grow-0 flex-shrink-0 w-[191.5px] h-[121px] relative overflow-hidden">
          <p className="w-[170px] h-[36px] absolute left-[-0.25px] top-[75px] text-xxs font-medium text-left text-white">
            {prompt}
          </p>
          <div className="w-[130px] h-[50px] absolute left-0 top-0 overflow-hidden">
            <p className="w-[130px] h-[45px] absolute left-0 top-[19.5px] text-2xl font-bold text-left text-[#e6fbed]">
              {theme}
            </p>
            <p className="absolute left-0 top-0 text-xxs font-medium text-left text-[#d9d9d9]">
              {detail}
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 w-[240px] h-[32px] relative rounded-[10px]">
          <MainButton value='생성하러 가기' />
          </div>
      </div>
    </div>
  );
};

export default ThemeBox;
