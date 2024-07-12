import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import NukkiResult from './pages/NukkiResult';
import BackgroundTheme from './pages/ThemeSelcetPage';

const App: React.FC = () => {
  const [nickname, setNickname] = useState('');

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  return (
    <Router>
        <NavBar />
        <Routes>
          <Route path="/"/>
          <Route path="/banner" element={<div>Banner Page</div>} />
          <Route path="/background" element={<div>Background Page</div>} />
          <Route path="/about" element={<div>sAbout Page</div>} />
        </Routes>
        <NukkiResult/>
    </Router>
  );
}

export default App;
