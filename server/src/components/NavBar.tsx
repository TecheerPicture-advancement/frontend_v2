import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../../public/assets/logo.png';
import Moon from '../assets/dark/moon.svg?react';
import Sun from '../assets/dark/sun.svg?react';
import { useThemeStore } from '../store/useThemeStore';
import { useLanguageStore } from '../store/useLanguageStore';



const NavBar: React.FC = () => {
    const { isDarkMode, toggleDarkMode } = useThemeStore();
    const { language, setLanguage } = useLanguageStore();
    const location = useLocation();
    const navigate = useNavigate();
  
    const [hasBg, setHasBg] = useState<boolean>(false);
  
    useEffect(() => {
      const handleScroll = () => {
        setHasBg(window.scrollY > 760);
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLanguageChange = () => {
      setLanguage(language === 'KOR' ? 'ENG' : 'KOR');
    };    
  

  const navLinks = [
    { name: language === 'KOR' ? '배너생성' : 'Banner', url: '/banner' },
    { name: language === 'KOR' ? '배경생성' : 'Background', url: '/background' },
    { name: language === 'KOR' ? '이미지 변환 영상' : 'Image to Video', url: '/image-to-video' }
  ];

  return (
    <nav className={`z-10 w-full py-4 transition-colors duration-300 ${hasBg ? 'bg-white dark:bg-black' : 'bg-transparent'}`}>
      <div className="flex items-center justify-between w-full pl-32 pr-20">
        {/* 로고 */}
        <Link to="/" className="flex items-center text-3xl text-white font-PR_BO hover:text-white">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
        </Link>

        {/* 내비게이션 링크 */}
        <ul className="relative flex items-center justify-start flex-grow-0 flex-shrink-0 gap-6 md:gap-10">
          {navLinks.map((link, index) => (
            <li key={index} className="text-max-lg">
              <button
                onClick={() => navigate(link.url)}
                className={`${
                  location.pathname === link.url
                    ? 'font-PR_BO text-green-Normal hover:text-green-Normal'
                    : 'font-PR_L text-gray-200 hover:text-green-Normal active:text-green-Normal'
                }`}
              >
                {link.name}
              </button>
            </li>
          ))}

          {/* 다크모드 토글 버튼 */}
          <li>
            <button onClick={toggleDarkMode} className="p-2 hover:scale-110 ">
              {isDarkMode ? <Sun /> : <Moon />}
            </button>
          </li>

          {/* 언어 변경 버튼 */}
          <li>
            <button onClick={handleLanguageChange} className=" text-gray-200 font-PR_L hover:text-green-Normal">
              {language}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
