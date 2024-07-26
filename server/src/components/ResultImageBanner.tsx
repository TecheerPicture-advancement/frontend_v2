import React from 'react';
import classNames from 'classnames';

interface ResultImageProps {
  src: string;
  onClick?: () => void;
  isSelected: boolean;
  width: number;
  height: number;
  maintext: string;
  servetext: string;
}

const ResultImage: React.FC<ResultImageProps> = ({ src, onClick, isSelected, width, height, maintext, servetext }) => {
  // Calculate font size based on image dimensions
  const baseFontSize = Math.min(width, height) * 0.05; // 5% of the smaller dimension
  const mainTextStyle: React.CSSProperties = {
    fontSize: `${baseFontSize}px`,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: `${baseFontSize * 2}px`, // Ensure enough space for both texts
    width: '100%',
    textAlign: 'center',
    color: 'white',
  };
  const serveTextStyle: React.CSSProperties = {
    fontSize: `${baseFontSize * 0.8}px`,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: `${baseFontSize}px`, // Position higher than before
    width: '100%',
    textAlign: 'center',
    color: 'white',
  };

  return (
    <div className="relative object-cover" onClick={onClick} style={{ width, height }}>
      <img
        src={src}
        alt="ResultImage"
        className={classNames(
          'cursor-pointer border',
          { 'border-green-Normal border-4': isSelected, 'border-gray-300': !isSelected }
        )}
        style={{ width: '100%', height: '100%' }}
      />
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <p className="font-PR_BO" style={mainTextStyle}>{maintext}</p>
        <p className="font-PR_BO" style={serveTextStyle}>{servetext}</p>
      </div>
    </div>
  );
};

export default ResultImage;
