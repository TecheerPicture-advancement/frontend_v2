import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar: React.FC = () => {
  const navLinks = [
    { name: '홈', url: '/' },
    { name: '배너생성', url: '/banner' },
    { name: '배경생성', url: '/background' },
    { name: '도움말', url: '/about' },
  ];

  const location = useLocation();

  return (
    <nav className="flex justify-center items-center bg-black py-4">
      <div className="flex justify-between items-center w-full max-w-screen-2xl px-32">
        <Link to="/" className="text-3xl font-PR_BO text-white hover:text-white">
          Logo
        </Link>

        <ul className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-4 md:gap-10">
          {navLinks.map((link, index) => (
            <li key={index} className="text-max-lg">
              <Link
                to={link.url}
                className={`${
                  location.pathname === link.url
                    ? 'font-PR_BO text-green-Normal hover:text-green-Normal'
                    : 'font-PR_L  text-gray-200 hover:text-green-Normal active:text-green-Normal'
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;