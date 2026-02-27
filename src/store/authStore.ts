import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, LoginCredentials } from '@/types/models';
import { authService } from '@/services/authService';
import { saveToken, getToken, removeToken } from '@/utils/secureStorage';

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    initialize: () => Promise<void>;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
    setUser: (user: User) => void;
    clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            initialize: async () => {
                const token = await getToken();
                if (token && get().user) {
                    set({ token, isAuthenticated: true });
                }
            },

            login: async (credentials: LoginCredentials) => {
                set({ isLoading: true, error: null });

                try {
                    const response = await authService.login(credentials);

                    // Save sensitive token to Keychain
                    await saveToken(response.token);

                    set({
                        user: response.user,
                        token: response.token,
                        isAuthenticated: true,
                        isLoading: false,
                        error: null,
                    });
                } catch (error: any) {
                    set({
                        isLoading: false,
                        error: error.message || 'Giriş yapılamadı. Lütfen bilgilerinizi kontrol edin.'
                    });
                }
            },

            logout: () => {
                authService.logout();
                // Remove sensitive token from Keychain
                removeToken();

                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                    error: null,
                });
            },

            setUser: (user: User) => {
                set({ user });
            },

            clearError: () => {
                set({ error: null });
            },
        }),
        {
            name: 'klu-auth-storage',
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({
                user: state.user,
                // token is EXCLUDED from AsyncStorage for security
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);

