import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import BackgroundChoose from './pages/BackgroundChoose';

const App: React.FC = () => {
  return (

    <Router>
        <Routes>
          <Route path="/"/>
          <Route path="/banner" element={<div>Banner Page</div>} />
          <Route path="/background" element={<div>Background Page</div>} />
          <Route path="/about" element={<div>sAbout Page</div>} />
        </Routes>

        <BackgroundChoose />

    </Router>
  );
}

export default App;
