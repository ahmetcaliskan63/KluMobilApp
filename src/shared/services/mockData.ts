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
    isRead: boolean;
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

export interface Unit {
    id: string;
    name: string;
    type: 'Birim' | 'Enstitü' | 'Fakülte' | 'Yüksekokul' | 'Meslek Yüksekokulu';
}

export const MOCK_USER_IMAGE = 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop'; // High quality male studio portrait

export const FALLBACK_IMAGES = {
    ACADEMIC: 'https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?q=80&w=2070&auto=format&fit=crop',
    SOCIAL: 'https://images.unsplash.com/photo-1523240318241-70e192ce93bd?q=80&w=2070&auto=format&fit=crop',
    EVENT: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2070&auto=format&fit=crop',
    CAMPUS: 'https://images.unsplash.com/photo-1523050335456-c7e462590163?q=80&w=2070&auto=format&fit=crop',
};

export const MOCK_NEWS: News[] = [
    {
        id: '1',
        title: 'Meslek Yüksekokulları Koordinatörlüğü (Meyok) 2026/01 Nolu Toplantısı Gerçekleştirildi',
        date: '22/01/2026',
        location: 'Meslek Yüksekokulları Koordinatörlüğü',
        views: '193',
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop',
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
        image: FALLBACK_IMAGES.CAMPUS,
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
        image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2070&auto=format&fit=crop',
        type: 'Kulüp'
    },
    {
        id: '2',
        title: 'Bahar Şenliği Konserleri',
        date: '15 Mayıs 2026',
        time: '20:00',
        location: 'Merkez Kampüs Festival Alanı',
        organizer: 'Sağlık Kültür ve Spor Daire Başkanlığı',
        image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2070&auto=format&fit=crop',
        type: 'Üniversite'
    },
    {
        id: '3',
        title: 'Yapay Zeka Konferansı',
        date: '10 Nisan 2026',
        time: '10:00',
        location: 'Merkezi Konferans Salonu',
        organizer: 'Bilgisayar Mühendisliği Bölümü',
        image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2070&auto=format&fit=crop',
        type: 'Konferans'
    },
    {
        id: '4',
        title: 'Kariyer Günleri 2026',
        date: '10 Ocak 2026',
        time: '09:00',
        location: 'Rektörlük Konferans Salonu',
        organizer: 'Kariyer Uygulama ve Araştırma Merkezi',
        image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2070&auto=format&fit=crop',
        type: 'Üniversite'
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
        image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2070&auto=format&fit=crop',
        isRead: false
    },
    {
        id: '2',
        title: 'Üniversitemizde Döner Sermaye Süreçlerine İlişkin Bilgilendirme Toplantısı Düzenlenecektir',
        date: '30/01/2026',
        category: 'Kurumsal',
        views: '211',
        snippet: 'Döner sermaye süreçleri hakkında bilgilendirme.',
        content: 'Tüm birim yöneticilerinin katılımıyla döner sermaye süreçleri ele alınacaktır.',
        image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2070&auto=format&fit=crop',
        isRead: false
    },
    {
        id: '3',
        title: '2026 Tr-Yös/1 Sınavı Başvuru Tarihleri',
        date: '29/01/2026',
        category: 'Akademik',
        views: '1117',
        snippet: 'Yabancı uyruklu öğrenci sınavı başvuruları başlıyor.',
        content: 'Tr-Yös/1 sınavı için başvuru tarihleri ve detayları uluslararası öğrenci ofisi sayfasında yayınlanmıştır.',
        image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2070&auto=format&fit=crop',
        isRead: true
    }
];

export const MOCK_WEEKLY_MENU: MenuItem[] = [
    { day: 'Pazartesi', date: '23 Şubat', items: ['Mercimek Çorbası', 'Tavuk Sote', 'Bulgur Pilavı', 'Elma'] },
    { day: 'Salı', date: '24 Şubat', items: ['Yayla Çorbası', 'Orman Kebabı', 'Pirinç Pilavı', 'Yoğurt'] },
    { day: 'Çarşamba', date: '25 Şubat', items: ['Tarhana Çorbası', 'Kıymalı Taze Fasulye', 'Makarna', 'Salata'] },
    { day: 'Perşembe', date: '26 Şubat', items: ['Ezogelin Çorbası', 'İzmir Köfte', 'Pirinç Pilavı', 'Mevsim Salata'] },
    { day: 'Cuma', date: '27 Şubat', items: ['Domates Çorbası', 'Fırın Tavuk', 'Sebzeli Pilav', 'Kemalpaşa Tatlısı'] },
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
    // Pazartesi
    { id: '2', name: 'FIZ101 Physics I', room: 'HB105', instructor: 'Doç. Dr. M. Kaya', startTime: '09:00', endTime: '11:50', day: 'Pazartesi', color: '#50E3C2', syllabus: ['Vektörler', 'Tek Boyutta Hareket', 'Newton Kanunları', 'İş ve Enerji'], attendance: 92 },
    { id: '6', name: 'BIL201 Veri Yapıları', room: 'Lab 2', instructor: 'Dr. Öğr. Üyesi A. Demir', startTime: '13:00', endTime: '15:50', day: 'Pazartesi', color: '#3B82F6' },

    // Salı
    { id: '3', name: 'BIL101 Intro to Programming', room: 'Lab 1', instructor: 'Dr. Öğr. Üyesi S. Demir', startTime: '09:00', endTime: '11:50', day: 'Salı', color: '#F5A623', syllabus: ['Algoritma Kavramı', 'Değişkenler ve Veri Tipleri', 'Koşullu İfadeler', 'Diziler'], attendance: 100 },
    { id: '7', name: 'MAT201 Diferansiyel Denklemler', room: 'HB202', instructor: 'Prof. Dr. L. Aksoy', startTime: '13:00', endTime: '15:50', day: 'Salı', color: '#10B981' },
    { id: '8', name: 'ENG201 Teknik İngilizce', room: 'HB305', instructor: 'Okutman M. Yılmaz', startTime: '16:00', endTime: '17:50', day: 'Salı', color: '#6366F1' },

    // Çarşamba
    { id: '1', name: 'MAT101 Calculus', room: 'HB202', instructor: 'Prof. Dr. A. Yılmaz', startTime: '10:00', endTime: '12:50', day: 'Çarşamba', color: '#4A90E2', syllabus: ['Limit ve Süreklilik', 'Türev Kuralları', 'Türevin Uygulamaları', 'İntegral'], attendance: 85 },
    { id: '9', name: 'BIL203 Nesne Yönelimli Programlama', room: 'Lab 1', instructor: 'Dr. Öğr. Üyesi C. Can', startTime: '14:00', endTime: '16:50', day: 'Çarşamba', color: '#F43F5E' },

    // Perşembe
    { id: '4', name: 'TUR101 Türk Dili I', room: 'HB301', instructor: 'Öğr. Gör. H. Arslan', startTime: '10:00', endTime: '11:50', day: 'Perşembe', color: '#D0021B' },
    { id: '10', name: 'BIL205 Ayrık Matematik', room: 'HB204', instructor: 'Doç. Dr. V. Şahin', startTime: '13:00', endTime: '15:50', day: 'Perşembe', color: '#8B5CF6' },

    // Cuma
    { id: '5', name: 'ING101 English I', room: 'HB202', instructor: 'Okutman E. Aksoy', startTime: '09:00', endTime: '10:50', day: 'Cuma', color: '#9013FE' },
    { id: '11', name: 'AIT101 Atatürk İlkeleri ve İnkılap Tarihi I', room: 'Amfi 1', instructor: 'Öğr. Gör. T. Güneş', startTime: '11:00', endTime: '12:50', day: 'Cuma', color: '#EC4899' },
    { id: '12', name: 'Müh. Etiği ve Sosyal Sorumluluk', room: 'HB202', instructor: 'Dr. K. Özdemir', startTime: '14:00', endTime: '15:50', day: 'Cuma', color: '#F97316' },
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

// Additional MOCK data for API Interceptor compatibility
export const MOCK_FACULTY_PROFILES = [];
export const MOCK_FACULTY_MEMBERS = [];
export const MOCK_EXAM_SCHEDULE = [];
export const MOCK_EXAM_RESULTS = [];
export const MOCK_TRANSCRIPT = [];
export const MOCK_ACADEMIC_STATS = MOCK_STATS;
export const MOCK_SEMESTER_DATA = [];
export const MOCK_UNITS: Unit[] = [
    { id: '1', name: 'Mühendislik Fakültesi', type: 'Fakülte' },
    { id: '2', name: 'Fen Edebiyat Fakültesi', type: 'Fakülte' },
    { id: '3', name: 'İktisadi ve İdari Bilimler Fakültesi', type: 'Fakülte' },
    { id: '4', name: 'Hukuk Fakültesi', type: 'Fakülte' },
    { id: '5', name: 'Fen Bilimleri Enstitüsü', type: 'Enstitü' },
    { id: '6', name: 'Sosyal Bilimler Enstitüsü', type: 'Enstitü' },
    { id: '7', name: 'Teknik Bilimler Meslek Yüksekokulu', type: 'Meslek Yüksekokulu' },
    { id: '8', name: 'Sosyal Bilimler Meslek Yüksekokulu', type: 'Meslek Yüksekokulu' },
    { id: '9', name: 'Sağlık Hizmetleri Meslek Yüksekokulu', type: 'Meslek Yüksekokulu' },
    { id: '10', name: 'Rektörlük', type: 'Birim' },
    { id: '11', name: 'Öğrenci İşleri Daire Başkanlığı', type: 'Birim' },
];
export const MOCK_CAFETERIA = MOCK_WEEKLY_MENU;
export const MOCK_BOOKS = MOCK_BORROWED_BOOKS;
export const MOCK_UNIVERSITY_NEWS: News[] = [
    {
        id: 'u1',
        title: 'Kırklareli Üniversitesi Yeni Kayıt Kılavuzu Yayınlandı',
        date: '02 Haz 2026',
        image: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=600',
        location: 'Öğrenci İşleri',
        views: '1.2k',
        content: 'Üniversitemize yeni yerleşen öğrencilerimiz için hazırlanan kayıt kılavuzu yayınlanmıştır. Ayrıntılı bilgi için tıklayınız.'
    },
    {
        id: 'u2',
        title: 'Bahar Şenlikleri Programı Açıklandı',
        date: '15 May 2026',
        image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=600',
        location: 'Kültür Merkezi',
        views: '2.5k',
        content: 'Bu yıl düzenlenecek olan Bahar Şenlikleri programı kapsamında birçok sanatçı ve grup üniversitemizde sahne alacak.'
    }
];

export const MOCK_UNIVERSITY_INFO = {
    history: 'Kırklareli Üniversitesi, 2007 yılında kurulmuş olup, Trakya\'nın parlayan yıldızı olma vizyonuyla eğitim hayatına devam etmektedir.',
    rectorMessage: 'Değerli öğrencilerimiz, modern ve yenilikçi eğitim anlayışımızla sizleri geleceğe hazırlıyoruz.',
    vision: 'Evrensel değerlere sahip, yenilikçi ve girişimci bireyler yetiştirmek.',
    mission: 'Bilimsel araştırmalarla topluma katkı sağlamak ve kaliteli eğitim sunmak.'
};

export const MOCK_UNIT_DETAILS: Record<string, any> = {
    '1': {
        id: '1',
        name: 'Mühendislik Fakültesi',
        type: 'Fakülte',
        phones: ['+90 288 246 17 34', '+90 288 246 17 35'],
        fax: '+90 288 246 17 33',
        email: 'muhendislik@klu.edu.tr',
        website: 'https://mf.klu.edu.tr',
        address: 'Kayalı Kampüsü, Mühendislik Fakültesi Binası, 39100 Kırklareli',
        location: { latitude: 41.7891, longitude: 27.2421 }
    },
    '10': {
        id: '10',
        name: 'Rektörlük',
        type: 'Birim',
        phones: ['+90 288 212 96 70'],
        fax: '+90 288 212 96 71',
        email: 'rektorluk@klu.edu.tr',
        website: 'https://www.klu.edu.tr',
        address: 'Rektörlük Kültür Merkezi Yanı, 39000 Kırklareli',
        location: { latitude: 41.7408, longitude: 27.2215 }
    },
    '11': {
        id: '11',
        name: 'Öğrenci İşleri Daire Başkanlığı',
        type: 'Birim',
        phones: ['+90 288 246 17 01', '+90 288 246 17 02'],
        email: 'oidb@klu.edu.tr',
        website: 'https://oidb.klu.edu.tr',
        address: 'Kayalı Kampüsü, Merkezi Birimler Binası, 39100 Kırklareli',
        location: { latitude: 41.7895, longitude: 27.2430 }
    }
};


