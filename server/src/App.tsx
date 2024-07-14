import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Onboarding2 from './components/Onboarding2';

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
        <Onboarding2/>
    </Router>
  );
}
export default App;