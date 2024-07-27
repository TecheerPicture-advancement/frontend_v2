import React from 'react';
import classNames from 'classnames';

interface ResultImageProps {
  src?: string; // Make src optional
  onClick?: () => void;
  isSelected: boolean;
  width: string;
  height: string;
}

const ResultImage: React.FC<ResultImageProps> = ({ src, onClick, isSelected, width, height }) => {
  const widthClass = `w-${width}`;
  const heightClass = `h-${height}`;
  const defaultSrc = 'path/to/default/image.jpg'; // Provide a default image path

  return (
    <img
      src={src || defaultSrc} // Use defaultSrc if src is undefined
      alt="ResultImage"
      onClick={onClick}
      className={classNames(
        'cursor-pointer border',
        { 'border-green-Normal border-4': isSelected, 'border-gray-300': !isSelected },
        widthClass,
        heightClass
      )}
    />
  );
};

export default ResultImage;
