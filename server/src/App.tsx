import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BannerResult from './pages/BannerResult';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<BannerResult />}/>
        <Route path="/banner" element={<div>Banner Page</div>} />
        <Route path="/background" element={<div>Background Page</div>} />
        <Route path="/about" element={<div>About Page</div>} />
      </Routes>
      <Onboarding3/>
    </Router>
  );
};

export default App;
