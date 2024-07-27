import React, { useState, useRef, useEffect } from "react";
import ResultImage from "../../../public/assets/BannerResult.jpg";
import airpot from '../../../public/assets/airpot.png';
import airpot2 from '../../../public/assets/airpot2.jpg';
import Arrow from '../../assets/arrow.svg?react';

const Onboarding2: React.FC = () => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = () => {
        setIsDragging(true);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging && containerRef.current) {
            const { left, width } = containerRef.current.getBoundingClientRect();
            const newPosition = ((e.clientX - left) / width) * 100;
            if (newPosition >= 0 && newPosition <= 100) {
                setSliderPosition(newPosition);
            }
        }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <div className="flex flex-col items-center justify-center min-h-screen gap-16 bg-black">
            <div>
                <span className="text-4xl text-green-Normal font-PR_BO">광고 배너는</span>
                <span className="text-4xl text-white font-PR_BO"> 이렇게 생성돼요</span>
            </div>
            <div className="flex items-center justify-center gap-16">
                <div className="relative flex flex-col items-center">
                    <div 
                        ref={containerRef} 
                        className="relative w-[300px] h-[300px] overflow-hidden"
                        onMouseDown={handleMouseDown}
                        onTouchStart={() => setIsDragging(true)}
                    >
                        <img 
                            src={airpot} 
                            alt="처음 이미지" 
                            className="absolute object-cover w-[250px] h-[250px] ml-6 mt-7"
                            style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`, userSelect: 'none' }}
                            draggable="false"
                            onContextMenu={(e) => e.preventDefault()}
                        />
                        <img 
                            src={airpot2} 
                            alt="처음 이미지2" 
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
                    <span className="px-6 py-2 ml-24 text-white transform -translate-x-1/2 border border-white rounded-md mt-7 font-PR_L">{sliderPosition < 50 ? 'Before' : 'After'}</span>
                </div>
                <Arrow className="w-7 h-7" />
                <div className="relative flex flex-col items-center">
                    <div className="flex flex-col items-center justify-center w-[300px] h-[300px]">
                        <img 
                            src={ResultImage} 
                            alt="결과 이미지" 
                            className="w-full h-full"
                            style={{ userSelect: 'none' }}
                            draggable="false"
                            onContextMenu={(e) => e.preventDefault()}
                        />
                    </div>
                    <span className="px-8 py-2 text-white border border-white rounded-md mt-7 font-PR_L">After</span>
                </div>
            </div>
        </div>
    );
}

export default Onboarding2;
