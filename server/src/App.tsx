import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import ResultButton from './components/ResultButton';

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
      <ResultButton value="(문자열을 넣어주세요)"/>
    </Router>
  );
};

export default App;
