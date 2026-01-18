/**
 * KLU Mobil Merkezi Mock Veri Servisi
 */

export interface Announcement {
    id: string;
    title: string;
    date: string;
    category: 'Genel' | 'Akademik' | 'Etkinlik';
    snippet: string;
}

export interface MenuItem {
    day: string;
    date: string;
    items: string[];
}

export interface BorrowedBook {
    id: string;
    title: string;
    author: string;
    dueDate: string;
    status: 'On Time' | 'Warning' | 'Overdue';
}

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
    {
        id: '1',
        title: '2025-2026 Bahar Yarıyılı Kayıt Yenileme İşlemleri',
        date: '12 Mart 2026',
        category: 'Akademik',
        snippet: 'Bahar yarıyılı kayıt yenileme ve derse yazılma işlemleri 15-20 Mart tarihleri arasında OBS üzerinden yapılacaktır.',
    },
    {
        id: '2',
        title: 'Kariyer Günleri Etkinliği Yaklaşıyor',
        date: '10 Mart 2026',
        category: 'Etkinlik',
        snippet: 'Üniversitemiz bünyesinde düzenlenecek olan Kariyer Günleri, 25 Mart tarihinde Merkezi Konferans Salonu\'nda gerçekleşecektir.',
    },
    {
        id: '3',
        title: 'Kütüphane Çalışma Saatleri Güncellemesi',
        date: '08 Mart 2026',
        category: 'Genel',
        snippet: 'Sınav dönemi nedeniyle kütüphanemiz 24 saat açık kalacaktır. Tüm öğrencilerimize başarılar dileriz.',
    },
];

export const MOCK_WEEKLY_MENU: MenuItem[] = [
    { day: 'Pazartesi', date: '9 Mart', items: ['Mercimek Çorbası', 'Tavuk Sote', 'Bulgur Pilavı', 'Elma'] },
    { day: 'Salı', date: '10 Mart', items: ['Yayla Çorbası', 'Orman Kebabı', 'Pirinç Pilavı', 'Yoğurt'] },
    { day: 'Çarşamba', date: '11 Mart', items: ['Tarhana Çorbası', 'Kıymalı Taze Fasulye', 'Mantar Soslu Makarna', 'Salata'] },
    { day: 'Perşembe', date: '12 Mart', items: ['Ezogelin Çorbası', 'İzmir Köfte', 'Pirinç Pilavı', 'Mevsim Salata'] },
    { day: 'Cuma', date: '13 Mart', items: ['Domates Çorbası', 'Balık Buğulama', 'Fırın Patates', 'Tahin Helvası'] },
];

export const MOCK_BORROWED_BOOKS: BorrowedBook[] = [
    { id: '1', title: 'Veri Yapıları ve Algoritmalar', author: 'Rifat Çölkesen', dueDate: '20 Mart 2026', status: 'On Time' },
    { id: '2', title: 'Clean Code', author: 'Robert C. Martin', dueDate: '15 Mart 2026', status: 'Warning' },
];

export interface Course {
    id: string;
    name: string;
    room: string;
    instructor: string;
    startTime: string;
    endTime: string;
    day: string;
    color: string;
}

export const MOCK_SCHEDULE: Course[] = [
    { id: '1', name: 'MAT101 Calculus', room: 'HB202', instructor: 'Prof. Dr. A. Yılmaz', startTime: '15:00', endTime: '17:50', day: 'Çarşamba', color: '#4A90E2' },
    { id: '2', name: 'FIZ101 Physics I', room: 'HB105', instructor: 'Doç. Dr. M. Kaya', startTime: '09:00', endTime: '11:50', day: 'Pazartesi', color: '#50E3C2' },
    { id: '3', name: 'BIL101 Intro to Programming', room: 'Lab 1', instructor: 'Dr. Öğr. Üyesi S. Demir', startTime: '13:00', endTime: '15:50', day: 'Salı', color: '#F5A623' },
    { id: '4', name: 'TUR101 Türk Dili I', room: 'HB301', instructor: 'Öğr. Gör. H. Arslan', startTime: '10:00', endTime: '11:50', day: 'Perşembe', color: '#D0021B' },
    { id: '5', name: 'ING101 English I', room: 'HB202', instructor: 'Okutman E. Aksoy', startTime: '14:00', endTime: '15:50', day: 'Cuma', color: '#9013FE' },
];

export interface Grade {
    id: string;
    courseName: string;
    midterm: number | null;
    final: number | null;
    letterGrade: string;
    credits: number;
    status: 'Passed' | 'Failed' | 'Pending';
}

export const MOCK_GRADES: Grade[] = [
    { id: '1', courseName: 'MAT101 Calculus', midterm: 85, final: 75, letterGrade: 'BA', credits: 6, status: 'Passed' },
    { id: '2', courseName: 'FIZ101 Physics I', midterm: 60, final: 70, letterGrade: 'CC', credits: 5, status: 'Passed' },
    { id: '3', courseName: 'BIL101 Intro to Programming', midterm: 95, final: null, letterGrade: '-', credits: 6, status: 'Pending' },
    { id: '4', courseName: 'TUR101 Türk Dili I', midterm: 80, final: 85, letterGrade: 'AA', credits: 2, status: 'Passed' },
    { id: '5', courseName: 'ING101 English I', midterm: 70, final: 65, letterGrade: 'CB', credits: 2, status: 'Passed' },
];

export const MOCK_STATS = {
    balance: '₺42.50',
    mealCredits: '1',
    libraryBooks: '2 Kitap',
    gpa: '3.42',
    totalCredits: '180',
};
