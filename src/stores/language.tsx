// stores/language.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { translationSchema } from '@/locales/schemas';
import en from '@/locales/en/en-US.json';
import pt from '@/locales/pt/pt-BR.json';

// Validação (opcional em produção)
if (process.env.NODE_ENV === 'development') {
  translationSchema.parse(en);
  translationSchema.parse(pt);
}

type Language = 'en' | 'pt';

interface LanguageStore {
  lang: Language;
  t: typeof en;
  setLang: (lang: Language) => void;
  _hasHydrated: boolean;
}

export const useLangStore = create<LanguageStore>()(
  persist(
    (set) => ({
      lang: 'en',
      t: en,
      _hasHydrated: false,
      setLang: (lang) =>
        set({
          lang,
          t: lang === 'en' ? en : pt,
        }),
    }),
    {
      name: 'language-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ lang: state.lang }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state._hasHydrated = true;
          state.t = state.lang === 'en' ? en : pt;
        }
      },
    }
  )
);

export const useLanguageStore = () => {
  const store = useLangStore();
  if (!store._hasHydrated) {
    return {
      lang: 'en' as const,
      t: en,
      setLang: store.setLang,
    };
  }
  return store;
};
