import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { useThemeStore } from './store/useThemeStore';
import { useLanguageStore } from './store/useLanguageStore';
import NavBar from './components/NavBar';
import Loading from './components/Loading';

import Onboarding from './pages/Onboarding';
import BannerSetting from './pages/BannerSetting';
import BackgroundChoose from './pages/BackgroundChoose';
import MainChoose from './pages/MainChoose';
import MainchooseExplain from './pages/MainchooseExplain';
import ImagetoVideo from './components/ImagetoVideo';
import Theme from './pages/ThemeSelect';
import STResult from './pages/STResult';
import BannerResult from './pages/BannerResult';
import NukkiResult from './pages/NukkiResult';
import BannerEdit from './pages/BannerEdit';

const InstagramUpload = lazy(() => import('./pages/Instagram_Upload'));

const App: React.FC = () => {
  const initializeTheme = useThemeStore((state) => state.initializeTheme);
  const { initializeLanguage } = useLanguageStore();

  useEffect(() => {
    initializeTheme();
    initializeLanguage();
  }, []);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/banner" element={<BannerSetting />} />
        <Route path="/background" element={<BackgroundChoose />} />
        <Route path="/mainchoose" element={<MainChoose />} />
        <Route path="/mainchoose/explain" element={<MainchooseExplain />} />
        <Route path="/image-to-video" element={<ImagetoVideo />} />
        <Route path="/theme" element={<Theme />} />
        <Route path="/:type/result" element={<STResult />} />
        <Route path="/banner/result" element={<BannerResult />} />
        <Route path="/nukki/result" element={<NukkiResult />} />
        <Route path="/banner/result/edit" element={<BannerEdit />} />
        <Route
          path="/upload"
          element={
            <Suspense fallback={<Loading/>}>
              <InstagramUpload />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
