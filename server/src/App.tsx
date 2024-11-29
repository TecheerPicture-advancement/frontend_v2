import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InstagramUpload from './pages/Instagram_Upload';
import NavBar from './components/NavBar';
import { UserProvider } from './api/Usercontext';

const App: React.FC = () => {
  const [nickname] = useState('');

  return (
    <UserProvider> {/* UserProvider로 전체 애플리케이션을 감쌈 */}
      <Router> 
        <NavBar /> {/* NavBar가 Router 내에 위치 */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<InstagramUpload />} />
                {/* <Route path='/' element={<Onboarding />}/>
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
                  <Route path='/banner/result/edit' element={<BannerEdit/>}/> */}
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
