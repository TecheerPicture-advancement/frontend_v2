import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BackgroundChoose from './pages/BackgroundChoose';
import BannerSetting from './pages/BannerSetting';
import Nickname from './pages/Nickname';
import Onboarding from './pages/Onboarding';
import MainChoose from './pages/MainChoose';
import Theme from './pages/ThemeResult';
import STResult from './pages/STResult';
import BannerResult from './pages/BannerResult';
import NukkiResult from './pages/NukkiResult';
import ImageResizing from './pages/ImageResizing';
import ImageResizingBanner from './pages/ImageResizingBanner';
import BannerEdit from './pages/BannerEdit';
import { UserProvider } from './api/Usercontext';
import MainchooseExplain from './pages/MainchooseExplain';
import TexttoVideo from './components/TexttoVideo';
import ImagetoVideo from './components/ImagetoVideo';

const App: React.FC = () => {
  const [nickname] = useState('');

  return (
    <UserProvider>
    <Router>
      <Routes>
        <Route path='/' element={<Onboarding />}/>
        <Route path="/banner" element={<BannerSetting/>} />
        <Route path="/background" element={<BackgroundChoose/>} />
        <Route path="/nickname" element={<Nickname />} />
        <Route path='/backgroundchoose' element={<BackgroundChoose/>}/>
        <Route path='/mainchoose' element={<MainChoose name={nickname}/>}/>
        <Route path='/mainchoose/explain' element={<MainchooseExplain />}/>
        <Route path='/text-to-video' element={<TexttoVideo/>}/>
        <Route path='/image-to-video' element={<ImagetoVideo/>}/>
        <Route path='/theme' element={<Theme/>}/>
        <Route path='/theme/result' element={<STResult/>}/>
        <Route path='/simple/result' element={<STResult/>}/>
        <Route path='/banner/result' element={<BannerResult/>}/>
        <Route path='/nukki/result' element={<NukkiResult/>}/>
        <Route path='/banner/result/resizing' element={<ImageResizingBanner/>}/>
        <Route path='/theme/result/resizing' element={<ImageResizing/>}/>
        <Route path='/simple/result/resizing' element={<ImageResizing/>}/>
        <Route path='/banner/result/edit' element={<BannerEdit/>}/>
      </Routes>
    </Router>
    </UserProvider>
  );
};

export default App;
