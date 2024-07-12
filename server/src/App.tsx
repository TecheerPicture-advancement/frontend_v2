import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BackgroundChoose from './pages/BackgroundChoose';

const App: React.FC = () => {
  return (

    <Router>
        <Routes>
          <Route path="/"  />
          <Route path="/banner" />
          <Route path="/background"  />
          <Route path="/about"  />
        </Routes>
        <BackgroundChoose />
    </Router>
  );
}

export default App;
