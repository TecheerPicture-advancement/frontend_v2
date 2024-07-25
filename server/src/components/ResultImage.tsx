import React from 'react';
import classNames from 'classnames';

interface ResultImageProps {
  src: string;
  onClick?: () => void;
  isSelected: boolean;
  width: string;
  height: string;
  maintext: string;
  servetext:string;
}

const ResultImage: React.FC<ResultImageProps> = ({ src, onClick, isSelected, width, height, maintext,servetext }) => {
  const widthClass = `w-${width}`;
  const heightClass = `h-${height}`;

  return (
    <div className="w-64 h-64 relative object-cover" onClick={onClick}>
    <img
      src={src}
      alt="ResultImage"
      className={classNames(
        'cursor-pointer border',
        { 'border-green-Normal border-4': isSelected, 'border-gray-300': !isSelected },
        widthClass,
        heightClass
      )}
    />
    <div>
    <p className="bottom-[36px] absolute w-full text-xs font-PR_BO text-center text-white">
    {maintext}
    </p>
    <p className="bottom-[16px] absolute w-full text-xs font-PR_BO text-center text-white">
    {servetext}
    </p>
    </div>
    </div>
  );
};

export default ResultImage;
