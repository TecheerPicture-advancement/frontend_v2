import React, { useState, useRef, useEffect } from 'react';

interface ImageSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeImageClass?: string; // New prop to handle different styles for before image
}

const ImageSlider: React.FC<ImageSliderProps> = ({ beforeImage, afterImage, beforeImageClass }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && containerRef.current) {
      const { left, width } = containerRef.current.getBoundingClientRect();
      const newPosition = ((e.clientX - left) / width) * 100;
      if (newPosition >= 0 && newPosition <= 100) {
        setSliderPosition(newPosition);
      }
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging && containerRef.current) {
      const { left, width } = containerRef.current.getBoundingClientRect();
      const newPosition = ((e.touches[0].clientX - left) / width) * 100;
      if (newPosition >= 0 && newPosition <= 100) {
        setSliderPosition(newPosition);
      }
    }
  };

  useEffect(() => {
    const handleMouseUpGlobal = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUpGlobal);
    window.addEventListener('touchend', handleMouseUpGlobal);
    return () => {
      window.removeEventListener('mouseup', handleMouseUpGlobal);
      window.removeEventListener('touchend', handleMouseUpGlobal);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('touchmove', handleTouchMove);
    }
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, [handleMouseMove, handleTouchMove, isDragging]);

  return (
    <div className="relative flex flex-col items-center">
      <div
        ref={containerRef}
        className="relative w-[300px] h-[300px] overflow-hidden"
        onMouseDown={handleMouseDown}
        onTouchStart={() => setIsDragging(true)}
      >
        <img
          src={beforeImage}
          alt="Before"
          className={`absolute object-cover w-full h-full ${beforeImageClass}`}
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`, userSelect: 'none' }}
          draggable="false"
          onContextMenu={(e) => e.preventDefault()}
        />
        <img
          src={afterImage}
          alt="After"
          className="absolute object-cover w-full h-full"
          style={{ clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)`, userSelect: 'none' }}
          draggable="false"
          onContextMenu={(e) => e.preventDefault()}
        />
        <div
          className="absolute w-0.5 h-full bg-white transform -translate-x-1/2 cursor-ew-resize"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="flex flex-col items-center justify-center h-full pointer-events-none">
            <div className="flex-grow w-0.5 bg-white"></div>
            <div className="flex items-center justify-center border-2 border-white border-solid rounded-full shadow-lg w-14 h-14 backdrop-filter">
              <div className="w-0 h-0 border-t-8 border-b-8 border-transparent border-r-10 border-l-10 border-r-white"></div>
              <div className="w-0 h-0 transform rotate-180 border-t-8 border-b-8 border-transparent border-r-10 border-l-10 border-l-white"></div>
            </div>
            <div className="flex-grow w-0.5 bg-white"></div>
          </div>
        </div>
      </div>
      <span className="px-6 py-2 ml-24 text-white transform -translate-x-1/2 border border-white rounded-md mt-7 font-PR_L">
        {sliderPosition < 50 ? 'After' : 'Before'}
      </span>
    </div>
  );
};

export default ImageSlider;
