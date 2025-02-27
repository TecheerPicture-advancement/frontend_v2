import { create } from 'zustand';

interface LanguageState {
  language: 'KOR' | 'ENG';
  setLanguage: (lang: 'KOR' | 'ENG') => void;
  initializeLanguage: () => void;
}

export const useLanguageStore = create<LanguageState>((set) => {
  const getSystemLanguage = () => {
    return window.navigator.language.startsWith('ko') ? 'KOR' : 'ENG';
  };

  return {
    language: getSystemLanguage(),

    initializeLanguage: () => {
      set(() => {
        const storedLang = localStorage.getItem('language');
        const systemLang = getSystemLanguage();
        const lang = storedLang ? (storedLang as 'KOR' | 'ENG') : systemLang;

        localStorage.setItem('language', lang);
        return { language: lang };
      });
    },

    setLanguage: (lang) => {
      localStorage.setItem('language', lang);
      set({ language: lang });
    },
  };
});
