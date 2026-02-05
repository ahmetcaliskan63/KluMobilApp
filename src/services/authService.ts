import apiClient from './apiClient';
import { LoginCredentials, AuthResponse } from '../types/models';

export const authService = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        // In a real application, this would call the login endpoint
        // const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
        // return response.data;

        // For now, we simulate a successful login with a delay
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    user: {
                        id: '1',
                        studentNumber: credentials.studentId,
                        firstName: 'Ahmet',
                        lastName: 'Çalışkan',
                        email: credentials.studentId.includes('@') ? credentials.studentId : `${credentials.studentId}@ogr.klu.edu.tr`,
                        department: 'Yazılım Mühendisliği',
                        grade: 3,
                        profileImage: 'https://i.pravatar.cc/150?u=1',
                    },
                    token: 'mock-jwt-token-' + Date.now(),
                });
            }, 1500);
        });
    },

    logout: async (): Promise<void> => {
        // await apiClient.post('/auth/logout');
        return Promise.resolve();
    },

    forgotPassword: async (email: string): Promise<void> => {
        // await apiClient.post('/auth/forgot-password', { email });
        return new Promise((resolve) => setTimeout(resolve, 2000));
    },
};
