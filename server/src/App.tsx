import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nickname from './pages/NicknamePage';
import ResultButton from './components/ResultButton'; // Ensure you have this component created

const App: React.FC = () => {
  const [nickname, setNickname] = useState('');

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Nickname nickname={nickname} onChange={handleNicknameChange} />} />
        <Route path="/banner" element={<div>Banner Page</div>} />
        <Route path="/background" element={<div>Background Page</div>} />
        <Route path="/about" element={<div>About Page</div>} />
      </Routes>
      {/*<ResultButton value="시작하기" /> {/* Ensure ResultButton is correctly implemented */}
    </Router>
  );
};

export default App;
