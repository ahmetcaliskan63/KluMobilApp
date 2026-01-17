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

export const MOCK_STATS = {
    balance: '₺42.50',
    mealCredits: '1',
    libraryBooks: '2 Kitap',
    gpa: '3.42',
    totalCredits: '180',
};
