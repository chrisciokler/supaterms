import { type } from 'os';
import { create } from 'zustand';

type Theme = 'dark' | 'light';
type ThemeStore = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggle: () => Theme;
};

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: 'dark',

  setTheme: (theme: Theme) => set({ theme }),

  toggle: () => {
    const thm = get().theme;
    const theme = thm === 'dark' ? 'light' : 'dark';
    set((state) => ({ theme }));
    return theme;
  }
}));
