import React from 'react';
import classNames from 'classnames';

interface ResultImageProps {
  src: string;
  onClick?: () => void;
  isSelected: boolean;
  width: string;
  height: string;
}

const ResultImage: React.FC<ResultImageProps> = ({ src, onClick, isSelected, width, height }) => {
  const widthClass = `w-${width}`;
  const heightClass = `h-${height}`;

  return (
    <img
      src={src}
      alt="ResultImage"
      onClick={onClick}
      className={classNames(
        'cursor-pointer border',
        { 'border-green-500 border-4': isSelected, 'border-green-Normal border-4': !isSelected },
        widthClass,
        heightClass
      )}
    />
  );
};

export default ResultImage;
