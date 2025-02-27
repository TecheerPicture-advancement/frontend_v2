import { create } from 'zustand';

interface ThemeState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  initializeTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => {
  const getSystemTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches;

  return {
    isDarkMode: getSystemTheme(), 

    // 초기 테마 설정 + OS 테마 변경 감지
    initializeTheme: () => {
      const storedTheme = localStorage.getItem('theme');
      const systemPrefersDark = getSystemTheme();
    
      const isDark = storedTheme ? storedTheme === 'dark' : systemPrefersDark;
    
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    
      set(() => ({ isDarkMode: isDark }));
    
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        const isDark = e.matches;
    
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
    
        set(() => ({ isDarkMode: isDark }));
      };
    
      mediaQuery.addEventListener('change', handleChange);
    
      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    },
    

    // 다크모드 토글
    toggleDarkMode: () => {
      set((state) => {
        const newMode = !state.isDarkMode;

        if (newMode) {
          document.documentElement.classList.add('dark');
          localStorage.setItem('theme', 'dark');
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('theme', 'light');
        }

        return { isDarkMode: newMode };
      });
    },
  };
});
