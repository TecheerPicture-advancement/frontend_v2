import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../api/Usercontext';

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userid } = useUser();

  const navLinks = [
    { name: '홈', url: '/' },
    { name: '배너생성', url: '/banner' },
    { name: '배경생성', url: '/background' },
    { name: '닉네임', url: '/nickname' },
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
      <div className="flex items-center justify-between w-full px-32">
        <Link to="/" className="text-3xl text-white font-PR_BO hover:text-white">
          Logo
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
