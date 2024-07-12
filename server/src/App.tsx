import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainChoose from './pages/MainChoose';
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" />
        <Route path="/banner" />
        <Route path="/background" />
        <Route path="/about" />
      </Routes>
      <MainChoose name="할 수 있다"></MainChoose>
    </Router>
  );
};

export default App;
