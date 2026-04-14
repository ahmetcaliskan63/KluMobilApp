import { LoginCredentials, AuthResponse } from '@/shared/types/models';
import { MOCK_USER_IMAGE } from './mockData';

export const authService = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const isEmail = credentials.studentId.includes('@');
                const isStudentId = /^\d{10}$/.test(credentials.studentId);

                let firstName = 'Ahmet';
                let lastName = 'Çalışkan';
                let email = credentials.studentId;
                let role = 'student';
                let department = 'Yazılım Mühendisliği';

                if (isEmail) {
                    const [namePart] = credentials.studentId.split('@');
                    if (namePart.includes('.')) {
                        const [f, l] = namePart.split('.');
                        firstName = f.charAt(0).toUpperCase() + f.slice(1);
                        lastName = l.charAt(0).toUpperCase() + l.slice(1);
                        role = 'academic';
                        department = 'Bilgisayar Mühendisliği';
                    }
                } else if (isStudentId) {
                    email = `${credentials.studentId}@ogr.klu.edu.tr`;
                }

                resolve({
                    user: {
                        id: '1',
                        studentNumber: isStudentId ? credentials.studentId : '--------',
                        firstName,
                        lastName,
                        email,
                        department,
                        grade: role === 'student' ? 3 : 0,
                        role: role as 'student' | 'academic' | 'staff',
                        title: role === 'academic' ? 'Öğretim Görevlisi' : undefined,
                        profileImage: MOCK_USER_IMAGE,
                        faculty: role === 'academic' ? 'Rektörlük' : 'Mühendislik Fakültesi',
                        attendance: role === 'student' ? [
                            { courseName: 'Calculus I', courseCode: 'MAT101', attended: 24, total: 28, limit: 8, risk: 'low' },
                            { courseName: 'Physics I', courseCode: 'FIZ101', attended: 18, total: 28, limit: 8, risk: 'medium' },
                            { courseName: 'Literature', courseCode: 'TUR101', attended: 24, total: 28, limit: 8, risk: 'high' },
                        ] : [],
                        graduationProgress: role === 'student' ? {
                            completedCredits: 180,
                            totalRequiredCredits: 240,
                            completedCourses: 32,
                            totalRequiredCourses: 40,
                            gpaTarget: 3.50,
                        } : undefined,
                        gpaHistory: role === 'student' ? [
                            { semester: '1. Güz', gpa: 3.20 },
                        ] : [],
                        tcNo: role === 'academic' ? '21565349724' : 'XXXXXXXXXXX',
                        majorBranch: role === 'academic' ? '-' : department,
                        birthPlace: 'Kırklareli',
                        birthDate: '01.01.2000',
                        phone: role === 'academic' ? '(506) 270-7616' : '5XX XXX XX XX',
                        address: role === 'academic'
                            ? 'KARAKAŞ MAH. SELEN SK. İNCİ EVER B BLOK NO: 16B İÇ KAPI NO: 15 MERKEZ / KIRKLARELİ'
                            : 'Kırklareli Üniversitesi Merkez Kampüsü',
                        registrationDate: '01.01.2023',
                        gpa: role === 'student' ? '3.00' : undefined,
                        staffNumber: role === 'academic' ? '1187' : undefined,
                        workPhone: role === 'academic' ? '-' : undefined,
                        internalPhone: role === 'academic' ? '-' : undefined,
                        leaveBalances: role === 'academic' ? [
                            { type: 'Yıllık', total: 30, used: 10, remaining: 20, color: '#10B981' },
                            { type: 'Sağlık', total: 10, used: 2, remaining: 8, color: '#EF4444' },
                            { type: 'Mazeret', total: 5, used: 0, remaining: 5, color: '#3B82F6' },
                        ] : undefined,
                        leaveRequests: role === 'academic' ? [
                            { id: 'lr1', startDate: '01.07.2023', endDate: '15.07.2023', days: 14, type: 'Yıllık', status: 'Onaylandı', reason: 'Yaz Tatili' },
                            { id: 'lr2', startDate: '10.05.2024', endDate: '12.05.2024', days: 2, type: 'Mazeret', status: 'Onayland\u0131', reason: 'Ailevi Nedenler' },
                            { id: 'lr3', startDate: '01.09.2024', endDate: '05.09.2024', days: 4, type: 'Y\u0131ll\u0131k', status: 'Beklemede', reason: 'Kurum D\u0131\u015f\u0131 Toplant\u0131' },
                        ] : undefined,
                    },
                    token: 'mock-jwt-token-' + Date.now(),
                });
            }, 1500);
        });
    },

    logout: async (): Promise<void> => {
        return Promise.resolve();
    },

    forgotPassword: async (_email: string): Promise<void> => {
        return new Promise((resolve) => setTimeout(resolve, 2000));
    },
};
