import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InstagramUpload from './pages/Instagram_Upload';
import NavBar from './components/NavBar';
import Onboarding from './pages/Onboarding';
import BannerSetting from './pages/BannerSetting';
import BackgroundChoose from './pages/BackgroundChoose';
import MainChoose from './pages/MainChoose';
import MainchooseExplain from './pages/MainchooseExplain';
import ImagetoVideo from './components/ImagetoVideo';
import Theme from './pages/ThemeResult';
import STResult from './pages/STResult';
import BannerResult from './pages/BannerResult';
import NukkiResult from './pages/NukkiResult';
import BannerEdit from './pages/BannerEdit';
import './App.css';

const App: React.FC = () => {

  return (
      <Router> 
        <NavBar /> {/* NavBar가 Router 내에 위치 */}
        <div className="main-content">
          <Routes>
          {/* <Route path='/' element={<Onboarding />}/> */}
            <Route path="/" element={<Onboarding />} />            
                  <Route path="/banner" element={<BannerSetting/>} />
                  <Route path="/background" element={<BackgroundChoose/>} />
                  {/* <Route path="/nickname" element={<Nickname />} /> */}
                  <Route path='/backgroundchoose' element={<BackgroundChoose/>}/>
                  <Route path='/mainchoose' element={<MainChoose/>}/>
                  <Route path='/mainchoose/explain' element={<MainchooseExplain />}/>
                  {/* <Route path='/text-to-video' element={<TexttoVideo/>}/> */}
                  <Route path='/image-to-video' element={<ImagetoVideo/>}/>
                  <Route path='/theme' element={<Theme/>}/>
                  <Route path='/theme/result' element={<STResult/>}/>
                  <Route path='/simple/result' element={<STResult/>}/>
                  <Route path='/banner/result' element={<BannerResult/>}/>
                  <Route path='/nukki/result' element={<NukkiResult/>}/>
                  {/* <Route path='/banner/result/resizing' element={<ImageResizingBanner/>}/>
                  <Route path='/theme/result/resizing' element={<ImageResizing/>}/>
                  <Route path='/simple/result/resizing' element={<ImageResizing/>}/> */}
                  <Route path='/banner/result/edit' element={<BannerEdit/>}/>
                  {/* <Route path='/theme/result/edit' element={<ImageEdit/>}/>
                  <Route path='/simple/result/edit' element={<ImageEdit/>}/> */} 
                  <Route path='/instagram-upload' element={<InstagramUpload/>}/>
          </Routes>
        </div>
      </Router>
  );
};

export default App;
