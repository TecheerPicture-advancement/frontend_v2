import React from 'react';

interface PhotoProps {
  src: string;
  onClick: () => void;
  isSelected: boolean;
}

const Photo: React.FC<PhotoProps> = ({ src, onClick, isSelected }) => {
  return (
    <img
      src={src}
      alt="thumbnail"
      onClick={onClick}
        className={`cursor-pointer w-64 h-64 border  ${isSelected ? 'border-green-Normal border-4' : 'border-gray-300'}`}
    />
  );
};

export default Photo;