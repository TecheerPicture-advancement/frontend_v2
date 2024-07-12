import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';

import BackgroundTheme from './pages/ThemeSelcetPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="w-full h-full">
        <NavBar />
        <Routes>
          <Route path="/" element={<BackgroundTheme />} />
          <Route path="/banner" element={<div>Banner Page</div>} />
          <Route path="/background" element={<div>Background Page</div>} />
          <Route path="/about" element={<div>sAbout Page</div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
