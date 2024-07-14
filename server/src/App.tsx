import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BannerEdit from './pages/BannerEdit';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<BannerEdit mainText1='1234' mainText2='4567' subText1='789' subText2='123456789'/>} />
        <Route path="/banner" element={<div>Banner Page</div>} />
        <Route path="/background" element={<div>Background Page</div>} />
        <Route path="/about" element={<div>About Page</div>} />
      </Routes>
    </Router>
  );
};

export default App;
