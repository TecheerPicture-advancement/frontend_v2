import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { useThemeStore } from './store/useThemeStore';
import { useLanguageStore } from './store/useLanguageStore';
import NavBar from './components/NavBar';
import Loading from './components/Loading';

const InstagramUpload = lazy(() => import('./pages/Instagram_Upload'));
const Onboarding = lazy(() => import('./pages/Onboarding'));
const BannerSetting = lazy(() => import('./pages/BannerSetting'));
const BackgroundChoose = lazy(() => import('./pages/BackgroundChoose'));
const MainChoose = lazy(() => import('./pages/MainChoose'));
const MainchooseExplain = lazy(() => import('./pages/MainchooseExplain'));
const ImagetoVideo = lazy(() => import('./components/ImagetoVideo'));
const Theme = lazy(() => import('./pages/ThemeSelect'));
const STResult = lazy(() => import('./pages/STResult'));
const BannerResult = lazy(() => import('./pages/BannerResult'));
const NukkiResult = lazy(() => import('./pages/NukkiResult'));
const BannerEdit = lazy(() => import('./pages/BannerEdit'));

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
      <Suspense fallback={<Loading />}>
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
          <Route path="/instagram-upload" element={<InstagramUpload />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
