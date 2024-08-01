import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../api/Usercontext';
import logo from '../../public/assets/logo.png'; // Import logo image

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userid } = useUser();

  const navLinks = [
    { name: '홈', url: '/' },
    { name: '배너생성', url: '/banner' },
    { name: '배경생성', url: '/background' },
    { name: '텍스트 변환 영상', url: '/text-to-video' },
    { name: '이미지 변환 영상', url: '/image-to-video' }
  ];

  const handleLinkClick = (url: string) => {
    if (!userid && url !== '/') {
      navigate('/nickname');
    } else {
      navigate(url);
    }
  };

  return (
    <nav className="w-auto h-full py-4 bg-black">
      <div className="flex items-center justify-between w-full pl-32 pr-20">
        <Link to="/" className="flex items-center text-3xl text-white font-PR_BO hover:text-white">
          <img src={logo} alt="Logo" className="h-10 w-auto" /> {/* Use img tag for logo */}
        </Link>

        <ul className="relative flex items-center justify-start flex-grow-0 flex-shrink-0 gap-6 md:gap-10">
          {navLinks.map((link, index) => (
            <li key={index} className="text-max-lg">
              <button
                onClick={() => handleLinkClick(link.url)}
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
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
