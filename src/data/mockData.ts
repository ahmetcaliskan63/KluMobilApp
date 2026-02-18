/**
 * KLU Mobil Merkezi Mock Veri Servisi
 */

export interface Announcement {
    id: string;
    title: string;
    date: string;
    category: string;
    snippet: string;
    content: string;
    views?: string;
    image?: string;
}

export interface News {
    id: string;
    title: string;
    date: string;
    image: string;
    location: string;
    views: string;
    content: string;
}

export interface Event {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    organizer: string;
    image: string;
    type: 'Kulüp' | 'Üniversite' | 'Konferans';
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

export const MOCK_NEWS: News[] = [
    {
        id: '1',
        title: 'Meslek Yüksekokulları Koordinatörlüğü (Meyok) 2026/01 Nolu Toplantısı Gerçekleştirildi',
        date: '22/01/2026',
        location: 'Meslek Yüksekokulları Koordinatörlüğü',
        views: '193',
        image: 'https://images.unsplash.com/photo-1544531585-9847b68c8c86?q=80&w=2070&auto=format&fit=crop',
        content: 'Üniversitemiz bünyesindeki Meslek Yüksekokullarının koordinasyonunu sağlamak amacıyla 2026 yılının ilk toplantısı gerçekleştirildi.'
    },
    {
        id: '2',
        title: 'Rektörümüze Ziyaret',
        date: '21/01/2026',
        location: 'Kurumsal İletişim Koordinatörlüğü',
        views: '535',
        image: 'https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=2070&auto=format&fit=crop',
        content: 'Çeşitli kurum temsilcileri Rektörümüzü makamında ziyaret ederek projeler hakkında görüş alışverişinde bulundu.'
    },
    {
        id: '3',
        title: 'Turizm Fakültemizden Akreditasyon Başarısı: Teşekkür Belgesi Takdim Töreni Düzenlendi',
        date: '20/01/2026',
        location: 'Kurumsal İletişim Koordinatörlüğü',
        views: '412',
        image: 'https://images.unsplash.com/photo-1523050335456-c7e462590163?q=80&w=2070&auto=format&fit=crop',
        content: 'Turizm Fakültemizin elde ettiği akreditasyon başarısı düzenlenen törenle kutlandı.'
    }
];

export const MOCK_EVENTS: Event[] = [
    {
        id: '1',
        title: 'Yazılım Kulübü: React Native Atölyesi',
        date: '25 Mart 2026',
        time: '14:00',
        location: 'Mühendislik Fakültesi Konferans Salonu',
        organizer: 'Yazılım ve Bilişim Kulübü',
        image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop',
        type: 'Kulüp'
    },
    {
        id: '2',
        title: 'Bahar Şenliği Konserleri',
        date: '15 Mayıs 2026',
        time: '20:00',
        location: 'Merkez Kampüs Festival Alanı',
        organizer: 'Sağlık Kültür ve Spor Daire Başkanlığı',
        image: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?q=80&w=2070&auto=format&fit=crop',
        type: 'Üniversite'
    },
    {
        id: '3',
        title: 'Yapay Zeka Konferansı',
        date: '10 Nisan 2026',
        time: '10:00',
        location: 'Merkezi Konferans Salonu',
        organizer: 'Bilgisayar Mühendisliği Bölümü',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop',
        type: 'Konferans'
    }
];

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
    {
        id: '1',
        title: '31.12.2025 Tarihli ve 33124 Sayılı Resmi Gazete\'de Yayımlanan Öğretim Üyesi Dışındaki Öğretim Elemanı İlanı Giriş Sınavı Sonuçları',
        date: '30/01/2026',
        category: 'Akademik',
        views: '1082',
        snippet: 'Öğretim elemanı alımı sınav sonuçları açıklanmıştır.',
        content: 'İlgili ilana başvuran adayların sınav sonuçlarını personel daire başkanlığı sayfasından öğrenebilirler.',
        image: 'https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: '2',
        title: 'Üniversitemizde Döner Sermaye Süreçlerine İlişkin Bilgilendirme Toplantısı Düzenlenecektir',
        date: '30/01/2026',
        category: 'Kurumsal',
        views: '211',
        snippet: 'Döner sermaye süreçleri hakkında bilgilendirme.',
        content: 'Tüm birim yöneticilerinin katılımıyla döner sermaye süreçleri ele alınacaktır.',
        image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: '3',
        title: '2026 Tr-Yös/1 Sınavı Başvuru Tarihleri',
        date: '29/01/2026',
        category: 'Akademik',
        views: '1117',
        snippet: 'Yabancı uyruklu öğrenci sınavı başvuruları başlıyor.',
        content: 'Tr-Yös/1 sınavı için başvuru tarihleri ve detayları uluslararası öğrenci ofisi sayfasında yayınlanmıştır.',
        image: 'https://images.unsplash.com/photo-1523240318241-70e192ce93bd?q=80&w=2070&auto=format&fit=crop'
    }
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
    syllabus?: string[];
    attendance?: number;
}

export const MOCK_SCHEDULE: Course[] = [
    { id: '1', name: 'MAT101 Calculus', room: 'HB202', instructor: 'Prof. Dr. A. Yılmaz', startTime: '15:00', endTime: '17:50', day: 'Çarşamba', color: '#4A90E2', syllabus: ['Limit ve Süreklilik', 'Türev Kuralları', 'Türevin Uygulamaları', 'İntegral'], attendance: 85 },
    { id: '2', name: 'FIZ101 Physics I', room: 'HB105', instructor: 'Doç. Dr. M. Kaya', startTime: '09:00', endTime: '11:50', day: 'Pazartesi', color: '#50E3C2', syllabus: ['Vektörler', 'Tek Boyutta Hareket', 'Newton Kanunları', 'İş ve Enerji'], attendance: 92 },
    { id: '3', name: 'BIL101 Intro to Programming', room: 'Lab 1', instructor: 'Dr. Öğr. Üyesi S. Demir', startTime: '13:00', endTime: '15:50', day: 'Salı', color: '#F5A623', syllabus: ['Algoritma Kavramı', 'Değişkenler ve Veri Tipleri', 'Koşullu İfadeler', 'Diziler'], attendance: 100 },
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
    stats?: {
        average: number;
        high: number;
        low: number;
    };
}

export const MOCK_GRADES: Grade[] = [
    { id: '1', courseName: 'MAT101 Calculus', midterm: 85, final: 75, letterGrade: 'BA', credits: 6, status: 'Passed', stats: { average: 58, high: 95, low: 12 } },
    { id: '2', courseName: 'FIZ101 Physics I', midterm: 60, final: 70, letterGrade: 'CC', credits: 5, status: 'Passed', stats: { average: 45, high: 88, low: 0 } },
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

export const MOCK_ATTENDANCE = [
    { courseName: 'Calculus I', courseCode: 'MAT101', attended: 24, total: 28, limit: 8, risk: 'low' },
    { courseName: 'Physics I', courseCode: 'FIZ101', attended: 18, total: 28, limit: 8, risk: 'medium' },
    { courseName: 'Algorithms', courseCode: 'BIL201', attended: 26, total: 28, limit: 8, risk: 'low' },
    { courseName: 'Literature', courseCode: 'TUR101', attended: 20, total: 28, limit: 8, risk: 'high' },
];

export const MOCK_GRADUATION_PROGRESS = {
    completedCredits: 180,
    totalRequiredCredits: 240,
    completedCourses: 32,
    totalRequiredCourses: 40,
    gpaTarget: 3.50,
};

export const MOCK_GPA_HISTORY = [
    { semester: '1. Güz', gpa: 3.20 },
    { semester: '1. Bahar', gpa: 3.35 },
    { semester: '2. Güz', gpa: 3.28 },
    { semester: '2. Bahar', gpa: 3.45 },
    { semester: '3. Güz', gpa: 3.42 },
];
