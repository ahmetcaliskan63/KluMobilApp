import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppState {
    hasCompletedOnboarding: boolean;
    setCompletedOnboarding: (value: boolean) => void;
}

export const useAppStore = create<AppState>()(
    persist(
        (set) => ({
            hasCompletedOnboarding: false,
            setCompletedOnboarding: (value: boolean) => set({ hasCompletedOnboarding: value }),
        }),
        {
            name: 'klu-app-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
