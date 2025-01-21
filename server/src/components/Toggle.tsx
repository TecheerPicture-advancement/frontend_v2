import { useState } from 'react';

function Toggle({ onToggle }: { onToggle: (toggled: boolean) => void }) {
  const [isToggled, setIsToggled] = useState(false);

  const toggleHandler = () => {
    const newState = !isToggled;
    setIsToggled(newState);
    onToggle(newState);
  };

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={toggleHandler}
        className={`relative px-1 inline-flex items-center w-20 h-8 rounded-full transition-colors duration-300 ${isToggled ? 'bg-green-Normal' : 'bg-gray-400'}`}
      >
        {/* ON/OFF 텍스트 */}
        <div className='flex space-between items-center justify-center w-full h-full'>
            <span
            className={`text-white font-PR_L text-sm ${isToggled ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
            >
            ON
            </span>
            <span
            className={` text-white font-PR_L text-sm ${isToggled ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
            >
            OFF
            </span>
        </div>
        {/* 이동하는 스위치 */}
        <span
          className={`absolute w-6 h-6 bg-white rounded-full transform transition-transform duration-300 ${
            isToggled ? 'translate-x-12' : 'translate-x-0'
          }`}></span>
      </button>
    </div>
  );
}

export default Toggle;
