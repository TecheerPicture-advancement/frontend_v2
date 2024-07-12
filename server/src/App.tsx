import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
<<<<<<< Updated upstream
import NavBar from './components/NavBar'
import BannerSetting from './pages/BannerSetting';
=======
import NavBar from './components/NavBar';
import BackgroundChoose from './pages/BackgroundChoose';
>>>>>>> Stashed changes

const App: React.FC = () => {
  return (

    <Router>
<<<<<<< Updated upstream
        <NavBar />
        <Routes>
          <Route path="/"  />
          <Route path="/banner" />
          <Route path="/background"  />
          <Route path="/about"  />
        </Routes>
        <BannerSetting />
=======
      <NavBar />
      <Routes>
        <Route path="/" />
        <Route path="/banner" element={<div>Banner Page</div>} />
        <Route path="/background" element={<div>Background Page</div>} />
        <Route path="/about" element={<div>About Page</div>} />
      </Routes>
      <BackgroundChoose />
>>>>>>> Stashed changes
    </Router>
  );
}

export default App;
