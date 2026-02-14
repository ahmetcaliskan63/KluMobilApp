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
                        attendance: [
                            { courseName: 'Calculus I', courseCode: 'MAT101', attended: 24, total: 28, limit: 8, risk: 'low' },
                            { courseName: 'Physics I', courseCode: 'FIZ101', attended: 18, total: 28, limit: 8, risk: 'medium' },
                            { courseName: 'Literature', courseCode: 'TUR101', attended: 24, total: 28, limit: 8, risk: 'high' },
                        ],
                        graduationProgress: {
                            completedCredits: 180,
                            totalRequiredCredits: 240,
                            completedCourses: 32,
                            totalRequiredCourses: 40,
                            gpaTarget: 3.50,
                        },
                        gpaHistory: [
                            { semester: '1. Güz', gpa: 3.20 },
                            { semester: '1. Bahar', gpa: 3.35 },
                            { semester: '2. Güz', gpa: 3.28 },
                            { semester: '2. Bahar', gpa: 3.45 },
                            { semester: '3. Güz', gpa: 3.42 },
                        ],
                        tcNo: '25253574856',
                        faculty: 'Mühendislik Fakültesi',
                        majorBranch: 'Yazılım Mühendisliği',
                        birthPlace: 'Harran',
                        birthDate: '27.11.2002',
                        phone: '543 482 2635',
                        address: 'Fevzi Çakmak Mah. Samsun Sk. No: 8 İç Kapı No: 1 Şanlıurfa / Akçakale',
                        registrationDate: '23.08.2022',
                        gpa: '2,85',
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
