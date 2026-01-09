/**
 * Authentication Store (Zustand)
 */

import { create } from 'zustand';
import { User } from '../types/models';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>(set => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,

    login: async (email: string, password: string) => {
        set({ isLoading: true });

        try {
            // Mock login - gerçek API entegrasyonu için burası değiştirilecek
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock user data
            const mockUser: User = {
                id: '1',
                email: email,
                studentNumber: '20210001',
                firstName: 'Ahmet',
                lastName: 'Yılmaz',
                department: 'Bilgisayar Mühendisliği',
                grade: 3,
            };

            set({
                user: mockUser,
                isAuthenticated: true,
                isLoading: false,
            });
        } catch (error) {
            set({ isLoading: false });
            throw error;
        }
    },

    logout: () => {
        set({
            user: null,
            isAuthenticated: false,
        });
    },

    setUser: (user: User) => {
        set({ user });
    },
}));
