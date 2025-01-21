import React from 'react';
import Toggle from '../Toggle';

interface ToggleControlProps {
    isToggled: boolean;
    onToggleChange: (toggled: boolean) => void;
}

const ToggleControl: React.FC<ToggleControlProps> = ({ isToggled, onToggleChange }) => (
    <div className="flex items-center justify-between w-full">
        <h2 className="text-xl font-bold text-black font-PR_BO">
            {isToggled ? 'AI로 캡션 생성하기' : '직접 캡션 생성하기'}
        </h2>
        <Toggle onToggle={onToggleChange} />
    </div>
);

export default ToggleControl;
