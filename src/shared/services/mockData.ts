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
    type: 'Kul├╝p' | '├£niversite' | 'Konferans';
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

export const FALLBACK_IMAGES = {
    ACADEMIC: 'https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?q=80&w=2070&auto=format&fit=crop',
    SOCIAL: 'https://images.unsplash.com/photo-1523240318241-70e192ce93bd?q=80&w=2070&auto=format&fit=crop',
    EVENT: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2070&auto=format&fit=crop',
    CAMPUS: 'https://images.unsplash.com/photo-1523050335456-c7e462590163?q=80&w=2070&auto=format&fit=crop',
};

export const MOCK_NEWS: News[] = [
    {
        id: '1',
        title: 'Meslek Y├╝ksekokullar─▒ Koordinat├Ârl├╝─ş├╝ (Meyok) 2026/01 Nolu Toplant─▒s─▒ Ger├ğekle┼ştirildi',
        date: '22/01/2026',
        location: 'Meslek Y├╝ksekokullar─▒ Koordinat├Ârl├╝─ş├╝',
        views: '193',
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop',
        content: '├£niversitemiz b├╝nyesindeki Meslek Y├╝ksekokullar─▒n─▒n koordinasyonunu sa─şlamak amac─▒yla 2026 y─▒l─▒n─▒n ilk toplant─▒s─▒ ger├ğekle┼ştirildi.'
    },
    {
        id: '2',
        title: 'Rekt├Âr├╝m├╝ze Ziyaret',
        date: '21/01/2026',
        location: 'Kurumsal ─░leti┼şim Koordinat├Ârl├╝─ş├╝',
        views: '535',
        image: 'https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=2070&auto=format&fit=crop',
        content: '├çe┼şitli kurum temsilcileri Rekt├Âr├╝m├╝z├╝ makam─▒nda ziyaret ederek projeler hakk─▒nda g├Âr├╝┼ş al─▒┼şveri┼şinde bulundu.'
    },
    {
        id: '3',
        title: 'Turizm Fak├╝ltemizden Akreditasyon Ba┼şar─▒s─▒: Te┼şekk├╝r Belgesi Takdim T├Âreni D├╝zenlendi',
        date: '20/01/2026',
        location: 'Kurumsal ─░leti┼şim Koordinat├Ârl├╝─ş├╝',
        views: '412',
        image: FALLBACK_IMAGES.CAMPUS,
        content: 'Turizm Fak├╝ltemizin elde etti─şi akreditasyon ba┼şar─▒s─▒ d├╝zenlenen t├Ârenle kutland─▒.'
    }
];

export const MOCK_EVENTS: Event[] = [
    {
        id: '1',
        title: 'Yaz─▒l─▒m Kul├╝b├╝: React Native At├Âlyesi',
        date: '25 Mart 2026',
        time: '14:00',
        location: 'M├╝hendislik Fak├╝ltesi Konferans Salonu',
        organizer: 'Yaz─▒l─▒m ve Bili┼şim Kul├╝b├╝',
        image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2070&auto=format&fit=crop',
        type: 'Kul├╝p'
    },
    {
        id: '2',
        title: 'Bahar ┼Şenli─şi Konserleri',
        date: '15 May─▒s 2026',
        time: '20:00',
        location: 'Merkez Kamp├╝s Festival Alan─▒',
        organizer: 'Sa─şl─▒k K├╝lt├╝r ve Spor Daire Ba┼şkanl─▒─ş─▒',
        image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2070&auto=format&fit=crop',
        type: '├£niversite'
    },
    {
        id: '3',
        title: 'Yapay Zeka Konferans─▒',
        date: '10 Nisan 2026',
        time: '10:00',
        location: 'Merkezi Konferans Salonu',
        organizer: 'Bilgisayar M├╝hendisli─şi B├Âl├╝m├╝',
        image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2070&auto=format&fit=crop',
        type: 'Konferans'
    },
    {
        id: '4',
        title: 'Kariyer G├╝nleri 2026',
        date: '10 Ocak 2026',
        time: '09:00',
        location: 'Rekt├Ârl├╝k Konferans Salonu',
        organizer: 'Kariyer Uygulama ve Ara┼şt─▒rma Merkezi',
        image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2070&auto=format&fit=crop',
        type: '├£niversite'
    }
];

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
    {
        id: '1',
        title: '31.12.2025 Tarihli ve 33124 Say─▒l─▒ Resmi Gazete\'de Yay─▒mlanan ├û─şretim ├£yesi D─▒┼ş─▒ndaki ├û─şretim Eleman─▒ ─░lan─▒ Giri┼ş S─▒nav─▒ Sonu├ğlar─▒',
        date: '30/01/2026',
        category: 'Akademik',
        views: '1082',
        snippet: '├û─şretim eleman─▒ al─▒m─▒ s─▒nav sonu├ğlar─▒ a├ğ─▒klanm─▒┼şt─▒r.',
        content: '─░lgili ilana ba┼şvuran adaylar─▒n s─▒nav sonu├ğlar─▒n─▒ personel daire ba┼şkanl─▒─ş─▒ sayfas─▒ndan ├Â─şrenebilirler.',
        image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: '2',
        title: '├£niversitemizde D├Âner Sermaye S├╝re├ğlerine ─░li┼şkin Bilgilendirme Toplant─▒s─▒ D├╝zenlenecektir',
        date: '30/01/2026',
        category: 'Kurumsal',
        views: '211',
        snippet: 'D├Âner sermaye s├╝re├ğleri hakk─▒nda bilgilendirme.',
        content: 'T├╝m birim y├Âneticilerinin kat─▒l─▒m─▒yla d├Âner sermaye s├╝re├ğleri ele al─▒nacakt─▒r.',
        image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: '3',
        title: '2026 Tr-Y├Âs/1 S─▒nav─▒ Ba┼şvuru Tarihleri',
        date: '29/01/2026',
        category: 'Akademik',
        views: '1117',
        snippet: 'Yabanc─▒ uyruklu ├Â─şrenci s─▒nav─▒ ba┼şvurular─▒ ba┼şl─▒yor.',
        content: 'Tr-Y├Âs/1 s─▒nav─▒ i├ğin ba┼şvuru tarihleri ve detaylar─▒ uluslararas─▒ ├Â─şrenci ofisi sayfas─▒nda yay─▒nlanm─▒┼şt─▒r.',
        image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2070&auto=format&fit=crop'
    }
];

export const MOCK_WEEKLY_MENU: MenuItem[] = [
    { day: 'Pazartesi', date: '23 ┼Şubat', items: ['Mercimek ├çorbas─▒', 'Tavuk Sote', 'Bulgur Pilav─▒', 'Elma'] },
    { day: 'Sal─▒', date: '24 ┼Şubat', items: ['Yayla ├çorbas─▒', 'Orman Kebab─▒', 'Pirin├ğ Pilav─▒', 'Yo─şurt'] },
    { day: '├çar┼şamba', date: '25 ┼Şubat', items: ['Tarhana ├çorbas─▒', 'K─▒ymal─▒ Taze Fasulye', 'Makarna', 'Salata'] },
    { day: 'Per┼şembe', date: '26 ┼Şubat', items: ['Ezogelin ├çorbas─▒', '─░zmir K├Âfte', 'Pirin├ğ Pilav─▒', 'Mevsim Salata'] },
    { day: 'Cuma', date: '27 ┼Şubat', items: ['Domates ├çorbas─▒', 'F─▒r─▒n Tavuk', 'Sebzeli Pilav', 'Kemalpa┼şa Tatl─▒s─▒'] },
];

export const MOCK_BORROWED_BOOKS: BorrowedBook[] = [
    { id: '1', title: 'Veri Yap─▒lar─▒ ve Algoritmalar', author: 'Rifat ├ç├Âlkesen', dueDate: '20 Mart 2026', status: 'On Time' },
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
    { id: '2', name: 'FIZ101 Physics I', room: 'HB105', instructor: 'Do├ğ. Dr. M. Kaya', startTime: '09:00', endTime: '11:50', day: 'Pazartesi', color: '#50E3C2', syllabus: ['Vekt├Ârler', 'Tek Boyutta Hareket', 'Newton Kanunlar─▒', '─░┼ş ve Enerji'], attendance: 92 },
    { id: '6', name: 'BIL201 Veri Yap─▒lar─▒', room: 'Lab 2', instructor: 'Dr. ├û─şr. ├£yesi A. Demir', startTime: '13:00', endTime: '15:50', day: 'Pazartesi', color: '#3B82F6' },

    // Sal─▒
    { id: '3', name: 'BIL101 Intro to Programming', room: 'Lab 1', instructor: 'Dr. ├û─şr. ├£yesi S. Demir', startTime: '09:00', endTime: '11:50', day: 'Sal─▒', color: '#F5A623', syllabus: ['Algoritma Kavram─▒', 'De─şi┼şkenler ve Veri Tipleri', 'Ko┼şullu ─░fadeler', 'Diziler'], attendance: 100 },
    { id: '7', name: 'MAT201 Diferansiyel Denklemler', room: 'HB202', instructor: 'Prof. Dr. L. Aksoy', startTime: '13:00', endTime: '15:50', day: 'Sal─▒', color: '#10B981' },
    { id: '8', name: 'ENG201 Teknik ─░ngilizce', room: 'HB305', instructor: 'Okutman M. Y─▒lmaz', startTime: '16:00', endTime: '17:50', day: 'Sal─▒', color: '#6366F1' },

    // ├çar┼şamba
    { id: '1', name: 'MAT101 Calculus', room: 'HB202', instructor: 'Prof. Dr. A. Y─▒lmaz', startTime: '10:00', endTime: '12:50', day: '├çar┼şamba', color: '#4A90E2', syllabus: ['Limit ve S├╝reklilik', 'T├╝rev Kurallar─▒', 'T├╝revin Uygulamalar─▒', '─░ntegral'], attendance: 85 },
    { id: '9', name: 'BIL203 Nesne Y├Ânelimli Programlama', room: 'Lab 1', instructor: 'Dr. ├û─şr. ├£yesi C. Can', startTime: '14:00', endTime: '16:50', day: '├çar┼şamba', color: '#F43F5E' },

    // Per┼şembe
    { id: '4', name: 'TUR101 T├╝rk Dili I', room: 'HB301', instructor: '├û─şr. G├Âr. H. Arslan', startTime: '10:00', endTime: '11:50', day: 'Per┼şembe', color: '#D0021B' },
    { id: '10', name: 'BIL205 Ayr─▒k Matematik', room: 'HB204', instructor: 'Do├ğ. Dr. V. ┼Şahin', startTime: '13:00', endTime: '15:50', day: 'Per┼şembe', color: '#8B5CF6' },

    // Cuma
    { id: '5', name: 'ING101 English I', room: 'HB202', instructor: 'Okutman E. Aksoy', startTime: '09:00', endTime: '10:50', day: 'Cuma', color: '#9013FE' },
    { id: '11', name: 'AIT101 Atat├╝rk ─░lkeleri ve ─░nk─▒lap Tarihi I', room: 'Amfi 1', instructor: '├û─şr. G├Âr. T. G├╝ne┼ş', startTime: '11:00', endTime: '12:50', day: 'Cuma', color: '#EC4899' },
    { id: '12', name: 'M├╝h. Eti─şi ve Sosyal Sorumluluk', room: 'HB202', instructor: 'Dr. K. ├ûzdemir', startTime: '14:00', endTime: '15:50', day: 'Cuma', color: '#F97316' },
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
    { id: '4', courseName: 'TUR101 T├╝rk Dili I', midterm: 80, final: 85, letterGrade: 'AA', credits: 2, status: 'Passed' },
    { id: '5', courseName: 'ING101 English I', midterm: 70, final: 65, letterGrade: 'CB', credits: 2, status: 'Passed' },
];

export const MOCK_STATS = {
    balance: 'Ôé║42.50',
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
    { semester: '1. G├╝z', gpa: 3.20 },
    { semester: '1. Bahar', gpa: 3.35 },
    { semester: '2. G├╝z', gpa: 3.28 },
    { semester: '2. Bahar', gpa: 3.45 },
    { semester: '3. G├╝z', gpa: 3.42 },
];

