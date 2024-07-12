import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar'
import BannerSetting from './pages/BannerSetting';

const App: React.FC = () => {
  const [nickname, setNickname] = useState('');

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  return (
    <Router>
        <NavBar />
        <Routes>
          <Route path="/"  />
          <Route path="/banner" />
          <Route path="/background"  />
          <Route path="/about"  />
        </Routes>
        <BannerSetting />
    </Router>
  );
}

export default App;
