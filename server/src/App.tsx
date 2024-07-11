import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar'
import RadioButton from './components/RadioButton';

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
    <div>
      <RadioButton 
        checked={checked} 
        hovered={hovered}
        onToggle={handleToggle} 
        onResetHover={handleResetHover}
        onMouseEnter={handleHover}
      />
    </div>
  );
};

export default App;

  // return (
  //   <Router>
  //     <div>
  //       <RadioButton />
  //     </div>
  //       {/* <NavBar />
  //       <Routes>
  //         <Route path="/"  />
  //         <Route path="/banner" />
  //         <Route path="/background"  />
  //         <Route path="/about"  />
  //       </Routes> */}
  //   </Router>