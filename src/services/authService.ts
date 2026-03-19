// import apiClient from '@/services/apiClient';
import { LoginCredentials, AuthResponse } from '@/types/models';

export const authService = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        // In a real application, this would call the login endpoint
        // For development, we simulate a successful login with a delay
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
                        ],
                        tcNo: 'XXXXXXXXXXX',
                        faculty: 'Mühendislik Fakültesi',
                        majorBranch: 'Yazılım Mühendisliği',
                        birthPlace: 'Kırklareli',
                        birthDate: '01.01.2000',
                        phone: '5XX XXX XX XX',
                        address: 'Kırklareli Üniversitesi Merkez Kampüsü',
                        registrationDate: '01.01.2023',
                        gpa: '3.00',
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

    forgotPassword: async (_email: string): Promise<void> => {
        // await apiClient.post('/auth/forgot-password', { email });
        return new Promise((resolve) => setTimeout(resolve, 2000));
    },
};
