import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppSettingsState {
    language: 'tr' | 'en';
    isBiometricEnabled: boolean;
    setLanguage: (lang: 'tr' | 'en') => void;
    toggleBiometric: () => void;
}

export const useAppSettingsStore = create<AppSettingsState>()(
    persist(
        (set) => ({
            language: 'tr',
            isBiometricEnabled: false,
            setLanguage: (lang) => set({ language: lang }),
            toggleBiometric: () => set((state) => ({ isBiometricEnabled: !state.isBiometricEnabled })),
        }),
        {
            name: 'klu-app-settings-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
