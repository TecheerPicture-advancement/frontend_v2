import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../../public/assets/logo.png';
import Moon from '../assets/dark/moon.svg?react';
import Sun from '../assets/dark/sun.svg?react';

const NavBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate(); 

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const [language, setLanguage] = useState<'KOR' | 'ENG'>('KOR');

  const [hasBg, setHasBg] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasBg(window.scrollY > window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'KOR' ? 'ENG' : 'KOR'));
  };

  const handleNavigation = (url: string) => {
    navigate(url);
  };

  const navLinks = [
    { name: language === 'KOR' ? '배너생성' : 'Banner', url: '/banner' },
    { name: language === 'KOR' ? '배경생성' : 'Background', url: '/background' },
    { name: language === 'KOR' ? '이미지 변환 영상' : 'Image to Video', url: '/image-to-video' }
  ];

  return (
    <nav className={`z-10 fixed top-0 left-0 w-full py-4 transition-colors duration-300 ${hasBg ? 'bg-black' : 'bg-transparent'}`}>
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
                onClick={() => handleNavigation(link.url)}
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
            <button onClick={toggleDarkMode} className="p-2 transition-transform duration-200 hover:scale-110">
              {isDarkMode ? <Sun /> : <Moon />}
            </button>
          </li>

          {/* 언어 변경 버튼 */}
          <li>
            <button onClick={toggleLanguage} className="text-white font-PR_L hover:text-green-Normal">
              {language}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
