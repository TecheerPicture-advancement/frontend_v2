import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import ResultButton from './components/ResultButton';
import MainButton from './components/MainButton';

const App: React.FC = () => {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" />
        <Route path="/banner" />
        <Route path="/background" />
        <Route path="/about" />
      </Routes>
    <MainButton value="시작하기"/>
    </Router>
  );
};

export default App;
