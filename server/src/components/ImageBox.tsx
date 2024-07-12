import React from 'react';

interface ImageBoxProps {
    imageSource: string;
    detail: string;
    theme: string;
}

const ImageBox: React.FC<ImageBoxProps> = ({imageSource, detail, theme}) => {
    // 이미지 파일을 동적으로 import

    return (
        <div className="w-[200px] h-[200px] relative overflow-hidden rounded-[30px]">
          <div className="w-[200px] h-[200px] absolute left-0 top-0 rounded-[30px] bg-[#e6ffef]"></div>
          <img
            src={imageSource}
            className="w-[200px] h-[200px] absolute left-0 top-0 object-cover rounded-[30px]"
          />
          <div className="w-[200px] h-[200px] absolute left-0 top-0 opacity-50 bg-gradient-to-b from-white to-black mix-blend-multiply rounded-[30px]"></div>
          <div className="absolute px-4 py-2 bottom-2 left-2 right-2">
            <p className="text-xxs font-medium text-right text-[#d9d9d9]">
              {detail}
            </p>
            <p className="text-xs font-bold text-right text-[#e6fbed]">
              {theme}
            </p>
          </div>
        </div>
      );
}

export default ImageBox;
