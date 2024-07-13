import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar'
import RadioButton from './components/RadioButton';

import BackgroundChoose from './pages/BackgroundChoose';

const App: React.FC = () => {
  const [checked, setChecked] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleToggle = () => {
    setChecked(prevChecked => !prevChecked);
  };

  const handleResetHover = () => {
    setHovered(false);
  };

  const handleHover = () => {
    setHovered(true);
  };

  return (
    <Router>
        <Routes>
          <Route path="/"/>
          <Route path="/banner" element={<div>Banner Page</div>} />
          <Route path="/background" element={<div>Background Page</div>} />
          <Route path="/about" element={<div>sAbout Page</div>} />
        </Routes>
    </Router>
  );
}
