import { SemesterData, AcademicSummary } from './types';

export const ACADEMIC_SUMMARY: AcademicSummary = {
    overallGpa: '3.52',
    totalCompletedAkts: '120',
    activeSemester: '5',
};

export const TRANSCRIPT_DATA: SemesterData[] = [
    {
        semester: '2024-2025 Güz',
        subTitle: '5. Yarıyıl',
        gpa: '3.75',
        totalAkts: '30',
        courses: [
            { id: '1', code: 'YMH311', name: 'Yazılım Tasarımı ve Mimarisi', grade: 'AA', credit: '3', akts: '5' },
            { id: '2', code: 'YMH313', name: 'Web Programlama', grade: 'BA', credit: '4', akts: '6' },
            { id: '3', code: 'YMH315', name: 'Veritabanı Yönetim Sistemleri', grade: 'AA', credit: '3', akts: '5' },
            { id: '4', code: 'YMH317', name: 'İşletim Sistemleri', grade: 'BB', credit: '3', akts: '5' },
            { id: '5', code: 'YMH319', name: 'Yazılım Kalite Güvencesi', grade: 'AA', credit: '2', akts: '4' },
            { id: '6', code: 'YMH321', name: 'Yapay Zeka Temelleri', grade: 'BA', credit: '3', akts: '5' },
        ],
    },
    {
        semester: '2023-2024 Bahar',
        subTitle: '4. Yarıyıl',
        gpa: '3.42',
        totalAkts: '30',
        courses: [
            { id: '7', code: 'YMH212', name: 'Algoritma Analizi', grade: 'BA', credit: '4', akts: '6' },
            { id: '8', code: 'YMH214', name: 'Nesne Yönelimli Analiz', grade: 'CB', credit: '3', akts: '5' },
            { id: '9', code: 'YMH216', name: 'Veri Yapıları', grade: 'AA', credit: '4', akts: '6' },
            { id: '10', code: 'YMH218', name: 'Sistem Programlama', grade: 'BA', credit: '3', akts: '5' },
            { id: '11', code: 'YMH220', name: 'Ayrık Matematik', grade: 'BB', credit: '3', akts: '4' },
            { id: '12', code: 'YMH222', name: 'Elektrik Devreleri', grade: 'AA', credit: '3', akts: '4' },
        ],
    },
];

export const GRADE_COLORS = {
    'AA': '#059669', // Emerald 600
    'BA': '#10B981', // Emerald 500
    'BB': '#2563EB', // Blue 600
    'CB': '#3B82F6', // Blue 500
    'CC': '#D97706', // Amber 600
    'DC': '#F59E0B', // Amber 500
    'DD': '#DC2626', // Red 600
    'FF': '#EF4444', // Red 500
} as const;

