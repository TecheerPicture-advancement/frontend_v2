import React from 'react';
import ArrowRight from '../assets/arrow_right.svg?react';

interface GenerateButtonProps {
    onClick: () => void;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({ onClick }) => (
    <button
        onClick={onClick}
        className="absolute right-4 top-1/3 cursor-pointer flex items-center gap-2 rounded-full bg-white p-3 hover:shadow-lg"
    >
        <ArrowRight />
    </button>
);

export default GenerateButton;
