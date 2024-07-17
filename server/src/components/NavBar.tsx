import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const NavBar: React.FC = () => {
  /*
  //NavBar 어떤 Link를 클릭해도 URL / 빼고 닉네임 설졍이 안되어있을 시 /nikname 창으로 가도록 설정

  const [nickname, setNickname] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const Nickname = async () => {
      try {
        // 로컬 스토리지에서 닉네임을 가져옴
        const storedNickname = localStorage.getItem('nickname');

        if (storedNickname) {
          setNickname(storedNickname);
        } else {
          // 백엔드에서 닉네임을 가져오는 부분
          const response = await axios.get('/api/user/nickname');
          const data = response.data;
          if (data.nickname) {
            setNickname(data.nickname);
            localStorage.setItem('nickname', data.nickname); // 닉네임을 로컬 스토리지에 저장
          } else {
            setNickname(null);
            if (location.pathname !== '/nikname' && location.pathname !== '/') {
              navigate('/nikname');
            }
          }
        }
      } catch (error) {
        console.error('Failed to fetch nickname:', error);
        setNickname(null);
        if (location.pathname !== '/nikname' && location.pathname !== '/') {
          navigate('/nikname');
        }
      }
    };

    Nickname();
  }, [location, navigate]);

  useEffect(() => {
    if (!nickname && location.pathname !== '/nikname' && location.pathname !== '/') {
      navigate('/nikname');
    }
  }, [nickname, location, navigate]);
*/
  const navLinks = [
    { name: '홈', url: '/' },
    { name: '배너생성', url: '/banner' },
    { name: '배경생성', url: '/background' },
    { name: '닉네임', url: '/nikname' },
  ];

  return (
    <nav className="w-auto h-full py-4 bg-black">
      <div className="flex items-center justify-between w-full px-32">
        <Link to="/" className="text-3xl text-white font-PR_BO hover:text-white">
          Logo
        </Link>

        <ul className="relative flex items-center justify-start flex-grow-0 flex-shrink-0 gap-6 md:gap-10">
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
