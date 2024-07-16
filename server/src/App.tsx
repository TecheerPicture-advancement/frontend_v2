import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ThemeResult from './pages/ThemeResultPage';
import Nickname from './pages/NicknamePage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Nickname />}/>
        <Route path="/banner" element={<div>Banner Page</div>} />
        <Route path="/background" element={<div>Background Page</div>} />
        <Route path="/about" element={<div>About Page</div>} />
      </Routes>
    </Router>
  );
};

export default App;
