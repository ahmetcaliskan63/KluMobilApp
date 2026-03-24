import { LoginCredentials, AuthResponse } from '@/shared/types/models';

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

                // Profile Image Selection
                const avatarId = Math.floor(Math.random() * 70) + 1;
                const profileImage = `https://i.pravatar.cc/150?u=${avatarId}`;

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
                        title: role === 'academic' ? 'Prof. Dr.' : undefined,
                        profileImage,
                        faculty: role === 'academic' ? 'Rektörlük' : 'Mühendislik Fakültesi',
                        attendance: role === 'student' ? [
                            { courseName: 'Calculus I', courseCode: 'MAT101', attended: 24, total: 28, limit: 8, risk: 'low' },
                            { courseName: 'Physics I', courseCode: 'FIZ101', attended: 18, total: 28, limit: 8, risk: 'medium' },
                            { courseName: 'Algorithms', courseCode: 'BIL201', attended: 26, total: 28, limit: 8, risk: 'low' },
                        ] : [],
                        graduationProgress: role === 'student' ? {
                            completedCredits: 185,
                            totalRequiredCredits: 240,
                            completedCourses: 34,
                            totalRequiredCourses: 40,
                            gpaTarget: 3.50,
                        } : undefined,
                        gpaHistory: role === 'student' ? [
                            { semester: '1. Güz', gpa: 3.20 },
                            { semester: '1. Bahar', gpa: 3.35 },
                            { semester: '2. Güz', gpa: 3.28 },
                            { semester: '2. Bahar', gpa: 3.45 },
                            { semester: '3. Güz', gpa: 3.42 },
                        ] : [],
                        tcNo: 'XXXXXXXXXXX',
                        majorBranch: department,
                        birthPlace: 'Kırklareli',
                        birthDate: '01.01.2000',
                        phone: '0 (5XX) XXX XX XX',
                        address: 'Kırklareli Üniversitesi Kayalı Kampüsü, Mühendislik Fakültesi Binası, Merkez / KIRKLARELİ',
                        registrationDate: '15.08.2023',
                        gpa: role === 'student' ? '3.52' : undefined,
                        staffNumber: role === 'academic' ? '1187' : undefined,
                        leaveBalances: role === 'academic' ? [
                            { type: 'annual', total: 30, used: 10, remaining: 20, color: '#10B981' },
                            { type: 'sick', total: 10, used: 2, remaining: 8, color: '#EF4444' },
                            { type: 'excuse', total: 5, used: 0, remaining: 5, color: '#3B82F6' },
                        ] : undefined,
                        leaveRequests: role === 'academic' ? [
                            { id: 'lr1', startDate: '2023-07-01', endDate: '2023-07-15', days: 14, type: 'annual', status: 'approved', reason: 'Yaz Tatili' },
                            { id: 'lr2', startDate: '2024-05-10', endDate: '2024-05-12', days: 2, type: 'excuse', status: 'approved', reason: 'Ailevi Nedenler' },
                            { id: 'lr3', startDate: '2024-09-01', endDate: '2024-09-05', days: 4, type: 'annual', status: 'pending', reason: 'Kurum Dışı Toplantı' },
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
