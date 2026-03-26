import { 
    Announcement, 
    FacultyMember, 
    FacultyProfile, 
    Course, 
    Exam, 
    ExamResult, 
    TranscriptCourse, 
    AcademicStats,
    DailyMenu,
    Book,
    News,
    SemesterData,
    Unit,
    UnitDetail,
    Event as EventType
} from '../types/models';

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
    {
        id: '1',
        title: '2023-2024 Bahar Yarıyılı Ders Kayıtları Hakkında',
        date: '15 Mart 2024',
        category: 'Akademik',
        isRead: false,
        snippet: 'Bahar yarıyılı ders kayıt işlemleri 18-22 Mart tarihleri arasında OBS üzerinden gerçekleştirilecektir.',
        content: 'Detaylı bilgi için öğrenci işleri sayfasını ziyaret ediniz.',
        views: '1.2k'
    },
    {
        id: '2',
        title: 'Kariyer Günleri Etkinliği - 25 Mart',
        date: '14 Mart 2024',
        category: 'Etkinlik',
        isRead: true,
        snippet: 'Üniversitemiz merkez yerleşkesinde düzenlenecek olan Kariyer Günleri etkinliğine tüm öğrencilerimiz davetlidir.',
        content: 'Birçok kurumsal firmanın katılacağı etkinlikte staj ve iş imkanları görüşülecektir.',
        views: '850'
    },
    {
        id: '3',
        title: 'Yemekhane Saatleri Güncellemesi',
        date: '12 Mart 2024',
        category: 'Genel',
        isRead: false,
        snippet: 'Ramazan ayı münasebetiyle yemekhane çalışma saatleri güncellenmiştir.',
        content: 'İftar ve sahur saatleri için duyurular sayfasını takip ediniz.',
        views: '2.4k'
    }
];

export const MOCK_FACULTY_PROFILES: Record<string, FacultyProfile> = {
    ADVISOR: {
        id: 'adv_1',
        name: 'Prof. Dr. Ayşe Yılmaz',
        title: 'Akademik Danışman',
        role: 'Profesör / Bölüm Bşk. Yrd.',
        department: 'Bilgisayar Mühendisliği',
        email: 'ayse.yilmaz@klu.edu.tr',
        office: 'Mühendislik Fakültesi - B304',
        avatar: 'AY',
        color: ['#4F46E5', '#3730A3'],
        accent: '#818CF8'
    },
    DEPT_HEAD: {
        id: 'dept_1',
        name: 'Doç. Dr. Mehmet Demir',
        title: 'Bölüm Başkanı',
        role: 'Doçent / Bilgisayar Müh.',
        department: 'Bilgisayar Mühendisliği',
        email: 'mehmet.demir@klu.edu.tr',
        office: 'Mühendislik Fakültesi - B301',
        avatar: 'MD',
        color: ['#0F172A', '#1E293B'],
        accent: '#94A3B8'
    }
};

export const MOCK_FACULTY_MEMBERS: FacultyMember[] = [
    { id: 'f1', name: 'Dr. Öğr. Üyesi Ahmet Kaya', email: 'ahmet.kaya@klu.edu.tr', office: 'B305', dept: 'Yazılım Tasarımı', avatar: 'AK', color: '#3B82F6' },
    { id: 'f2', name: 'Dr. Öğr. Üyesi Elif Şahin', email: 'elif.sahin@klu.edu.tr', office: 'B308', dept: 'Veri Yapıları', avatar: 'EŞ', color: '#10B981' },
    { id: 'f3', name: 'Öğr. Gör. Can Özkan', email: 'can.ozkan@klu.edu.tr', office: 'B310', dept: 'Web Teknolojileri', avatar: 'CÖ', color: '#F59E0B' }
];

export const MOCK_SCHEDULE: Course[] = [
    { id: 'c1', code: 'BM301', name: 'Mobil Uygulama Geliştirme', instructor: 'Dr. Öğr. Üyesi Ahmet Kaya', startTime: '09:00', endTime: '11:50', location: 'Lab 4', room: 'Lab 4', day: 'Pazartesi', color: '#3B82F6' },
    { id: 'c2', code: 'BM302', name: 'Yazılım Mühendisliği', instructor: 'Prof. Dr. Ayşe Yılmaz', startTime: '13:00', endTime: '15:50', location: 'D201', room: 'D201', day: 'Pazartesi', color: '#8B5CF6' },
    { id: 'c3', code: 'BM303', name: 'Veri Madenciliği', instructor: 'Dr. Öğr. Üyesi Elif Şahin', startTime: '10:00', endTime: '12:50', location: 'D204', room: 'D204', day: 'Salı', color: '#10B981' },
    { id: 'c4', code: 'BM304', name: 'Algoritma Analizi', instructor: 'Doç. Dr. Mehmet Demir', startTime: '14:00', endTime: '16:50', location: 'D201', room: 'D201', day: 'Salı', color: '#F59E0B' }
];

export const MOCK_EXAM_SCHEDULE: Exam[] = [
    { id: 'e1', courseCode: 'BM301', courseName: 'Mobil Uygulama Geliştirme', date: '15 Nisan 2024', time: '10:00', location: 'Lab 4', type: 'Vize', color: '#3B82F6' },
    { id: 'e2', courseCode: 'BM302', courseName: 'Yazılım Mühendisliği', date: '16 Nisan 2024', time: '14:00', location: 'D201', type: 'Vize', color: '#8B5CF6' },
    { id: 'e3', courseCode: 'BM304', courseName: 'Algoritma Analizi', date: '17 Nisan 2024', time: '11:00', location: 'D201', type: 'Vize', color: '#F59E0B' }
];

export const MOCK_EXAM_RESULTS: ExamResult[] = [
    { id: 'r1', courseName: 'Veri Yapıları', type: 'Vize', grade: '85', letterGrade: 'AA', status: 'Geçti', date: '10 Ocak 2024', color: '#10B981' },
    { id: 'r2', courseName: 'İşletim Sistemleri', type: 'Vize', grade: '70', letterGrade: 'BB', status: 'Geçti', date: '12 Ocak 2024', color: '#3B82F6' },
    { id: 'r3', courseName: 'Lineer Cebir', type: 'Vize', grade: '45', letterGrade: 'FF', status: 'Kaldı', date: '15 Ocak 2024', color: '#EF4444' }
];

export const MOCK_TRANSCRIPT: TranscriptCourse[] = [
    { id: 't1', code: 'BM101', name: 'Bilgisayar Müh. Giriş', grade: 'AA', credit: '5', akts: '5' },
    { id: 't2', code: 'BM102', name: 'Programlama I', grade: 'BA', credit: '6', akts: '6' },
    { id: 't3', code: 'MAT101', name: 'Matematik I', grade: 'CB', credit: '5', akts: '5' }
];

export const MOCK_SEMESTER_DATA: SemesterData[] = [
    {
        semester: '2023-2024 Güz',
        subTitle: '5. Yarıyıl',
        gpa: '3.50',
        totalAkts: '30',
        courses: [
            { id: 't1', code: 'BM301', name: 'Mobil Uygulama Geliştirme', grade: 'AA', credit: '3', akts: '6' },
            { id: 't2', code: 'BM302', name: 'Yazılım Mühendisliği', grade: 'BA', credit: '3', akts: '6' },
            { id: 't3', code: 'BM303', name: 'Veri Madenciliği', grade: 'BB', credit: '3', akts: '6' },
            { id: 't4', code: 'BM304', name: 'Algoritma Analizi', grade: 'AA', credit: '3', akts: '6' },
            { id: 't5', code: 'ISL101', name: 'İşletme Yönetimi', grade: 'AA', credit: '2', akts: '6' },
        ]
    },
    {
        semester: '2022-2023 Bahar',
        subTitle: '4. Yarıyıl',
        gpa: '3.25',
        totalAkts: '30',
        courses: [
            { id: 't6', code: 'BM202', name: 'Nesne Yönelimli Programlama', grade: 'BA', credit: '3', akts: '6' },
            { id: 't7', code: 'BM204', name: 'Veri Yapıları', grade: 'AA', credit: '3', akts: '6' },
            { id: 't8', code: 'BM206', name: 'Sinyaller ve Sistemler', grade: 'CB', credit: '3', akts: '6' },
            { id: 't9', code: 'BM208', name: 'Bilgisayar Mimarisi', grade: 'BA', credit: '3', akts: '6' },
            { id: 't10', code: 'MAT202', name: 'Olasılık ve İstatistik', grade: 'BB', credit: '3', akts: '6' },
        ]
    }
];

export const MOCK_ACADEMIC_STATS: AcademicStats = {
    gpa: '3.42',
    totalCredits: 124,
    completedCourses: 24,
    currentSemester: '6'
};

export const MOCK_CAFETERIA: DailyMenu[] = [
    { day: 'Pazartesi', date: '18 Mart', items: ['Mercimek Çorbası', 'Orman Kebabı', 'Pirinç Pilavı', 'Meyve'] },
    { day: 'Salı', date: '19 Mart', items: ['Tarhana Çorbası', 'Tavuk Sote', 'Bulgur Pilavı', 'Yoğurt'] },
    { day: 'Çarşamba', date: '20 Mart', items: ['Ezogelin Çorbası', 'İzmir Köfte', 'Makarna', 'Salata'] },
    { day: 'Perşembe', date: '21 Mart', items: ['Yayla Çorbası', 'Kıymalı Taze Fasulye', 'Pirinç Pilavı', 'Cacık'] },
    { day: 'Cuma', date: '22 Mart', items: ['Domates Çorbası', 'Etli Bezelye', 'Bulgur Pilavı', 'Kemalpaşa Tatlısı'] },
];

export const MOCK_BOOKS: Book[] = [
    { id: 'b1', title: 'Clean Code', author: 'Robert C. Martin', isbn: '978-0132350884', status: 'On Time' },
    { id: 'b2', title: 'The Pragmatic Programmer', author: 'Andrew Hunt', isbn: '978-0201616224', status: 'Warning' },
    { id: 'b3', title: 'Introduction to Algorithms', author: 'Cormen', isbn: '978-0262033848', status: 'On Time' }
];

export const MOCK_NEWS: News[] = [
    {
        id: 'n1',
        title: 'Teknofest 2024 Başvuruları Başladı',
        date: '20 Mart 2024',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
        location: 'Merkez Yerleşke',
        views: '3.5k',
        content: 'Üniversitemiz takımları bu yıl da Teknofest\'te iddialı.'
    },
    {
        id: 'n2',
        title: 'Erasmus+ Sınav Sonuçları Açıklandı',
        date: '18 Mart 2024',
        image: 'https://images.unsplash.com/photo-1523240318241-70e192ce93bd?q=80&w=2070&auto=format&fit=crop',
        location: 'Dış İlişkiler Ofisi',
        views: '5.2k',
        content: 'Yurtdışı eğitim imkanları için seçilen öğrenciler belli oldu.'
    }
];

export const MOCK_EVENTS: EventType[] = [
    {
        id: 'ev1',
        title: 'Yapay Zeka Konferansı',
        date: '25 Mart 2024',
        time: '14:00',
        location: 'Rektörlük Konferans Salonu',
        organizer: 'Bilişim Kulübü',
        image: 'https://images.unsplash.com/photo-1591115765373-520b7a217651?q=80&w=2070&auto=format&fit=crop',
        type: 'Konferans'
    },
    {
        id: 'ev2',
        title: 'Bahar Konseri',
        date: '30 Mart 2024',
        time: '20:00',
        location: 'Üniversite Stadyumu',
        organizer: 'Kültür ve Sanat Daire Bşk.',
        image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop',
        type: 'Üniversite'
    }
];

export const MOCK_UNITS: Unit[] = [
    { id: 'u1', name: 'İç Denetim Birimi', type: 'Birim' },
    { id: 'u2', name: 'Hukuk Müşavirliği', type: 'Birim' },
    { id: 'u3', name: 'Fen Bilimleri Enstitüsü', type: 'Enstitü' },
    { id: 'u4', name: 'Sosyal Bilimler Enstitüsü', type: 'Enstitü' },
    { id: 'u5', name: 'Sağlık Bilimleri Enstitüsü', type: 'Enstitü' },
    { id: 'u6', name: 'Tıp Fakültesi', type: 'Fakülte' },
    { id: 'u7', name: 'Mühendislik Fakültesi', type: 'Fakülte' },
    { id: 'u8', name: 'Teknoloji Fakültesi', type: 'Fakülte' },
    { id: 'u9', name: 'Hukuk Fakültesi', type: 'Fakülte' },
    { id: 'u10', name: 'İlahiyat Fakültesi', type: 'Fakülte' },
    { id: 'u11', name: 'Uygulamalı Bilimler Yüksekokulu', type: 'Yüksekokul' },
    { id: 'u12', name: 'Yabancı Diller Yüksekokulu', type: 'Yüksekokul' },
    { id: 'u13', name: 'Teknik Bilimler Meslek Yüksekokulu', type: 'Meslek Yüksekokulu' },
    { id: 'u14', name: 'Sosyal Bilimler Meslek Yüksekokulu', type: 'Meslek Yüksekokulu' },
    { id: 'u15', name: 'Sağlık Hizmetleri Meslek Yüksekokulu', type: 'Meslek Yüksekokulu' },
];

export const MOCK_UNIT_DETAILS: Record<string, UnitDetail> = {
    u1: {
        id: 'u1',
        name: 'İç Denetim Birimi',
        type: 'Birim',
        phones: ['0 (288) 214 05 10'],
        email: 'icdenetim@klu.edu.tr',
        website: 'https://icdenetim.klu.edu.tr/',
        address: 'Rektörlük Binası 1. Kat - Merkez / Kırklareli',
        location: { latitude: 41.735, longitude: 27.225 }
    },
    u2: {
        id: 'u2',
        name: 'Hukuk Müşavirliği',
        type: 'Birim',
        phones: ['0 (288) 214 05 11'],
        email: 'hukuk@klu.edu.tr',
        website: 'https://hukukmus.klu.edu.tr/',
        address: 'Rektörlük Binası 2. Kat - Merkez / Kırklareli',
        location: { latitude: 41.735, longitude: 27.225 }
    },
    u3: {
        id: 'u3',
        name: 'Fen Bilimleri Enstitüsü',
        type: 'Enstitü',
        phones: ['0 (288) 214 05 17'],
        email: 'fenbilimleri@klu.edu.tr',
        website: 'https://fenbilimleri.klu.edu.tr/',
        address: 'Kayalı Kampüsü Enstitüler Binası - Merkez / Kırklareli',
        location: { latitude: 41.7483, longitude: 27.2217 }
    },
    u4: {
        id: 'u4',
        name: 'Sosyal Bilimler Enstitüsü',
        type: 'Enstitü',
        phones: ['0 (288) 214 05 18'],
        email: 'sosyalbilimler@klu.edu.tr',
        website: 'https://sosyalbilimler.klu.edu.tr/',
        address: 'Kayalı Kampüsü Enstitüler Binası - Merkez / Kırklareli',
        location: { latitude: 41.7483, longitude: 27.2217 }
    },
    u5: {
        id: 'u5',
        name: 'Sağlık Bilimleri Enstitüsü',
        type: 'Enstitü',
        phones: ['0 (288) 214 05 19'],
        email: 'saglikbilimleri@klu.edu.tr',
        website: 'https://saglikbilimleri.klu.edu.tr/',
        address: 'Kayalı Kampüsü Enstitüler Binası - Merkez / Kırklareli',
        location: { latitude: 41.7483, longitude: 27.2217 }
    },
    u6: {
        id: 'u6',
        name: 'Tıp Fakültesi',
        type: 'Fakülte',
        phones: ['0 (288) 214 05 12'],
        email: 'tip@klu.edu.tr',
        website: 'https://tip.klu.edu.tr/',
        address: 'Kayalı Kampüsü Tıp Binası - Merkez / Kırklareli',
        location: { latitude: 41.7483, longitude: 27.2217 }
    },
    u7: {
        id: 'u7',
        name: 'Mühendislik Fakültesi',
        type: 'Fakülte',
        phones: ['0 (288) 214 05 14', '0 (288) 214 05 15'],
        fax: '0 (288) 214 05 16',
        email: 'muh@klu.edu.tr',
        website: 'https://muh.kirklareli.edu.tr/',
        address: 'Kayalı Kampüsü Merkezi Derslikler 2 No:39/L - Merkez / Kırklareli',
        location: { latitude: 41.7483, longitude: 27.2217 }
    },
    u8: {
        id: 'u8',
        name: 'Teknoloji Fakültesi',
        type: 'Fakülte',
        phones: ['0 (288) 214 05 20'],
        email: 'teknoloji@klu.edu.tr',
        website: 'https://teknoloji.klu.edu.tr/',
        address: 'Kayalı Kampüsü Teknoloji Binası - Merkez / Kırklareli',
        location: { latitude: 41.7483, longitude: 27.2217 }
    },
    u9: {
        id: 'u9',
        name: 'Hukuk Fakültesi',
        type: 'Fakülte',
        phones: ['0 (288) 214 05 21'],
        email: 'hukukfak@klu.edu.tr',
        website: 'https://hukuk.klu.edu.tr/',
        address: 'Kayalı Kampüsü Hukuk Binası - Merkez / Kırklareli',
        location: { latitude: 41.7483, longitude: 27.2217 }
    },
    u10: {
        id: 'u10',
        name: 'İlahiyat Fakültesi',
        type: 'Fakülte',
        phones: ['0 (288) 214 05 22'],
        email: 'ilahiyat@klu.edu.tr',
        website: 'https://ilahiyat.klu.edu.tr/',
        address: 'Kayalı Kampüsü İlahiyat Binası - Merkez / Kırklareli',
        location: { latitude: 41.7483, longitude: 27.2217 }
    },
    u11: {
        id: 'u11',
        name: 'Uygulamalı Bilimler Yüksekokulu',
        type: 'Yüksekokul',
        phones: ['0 (288) 246 17 34'],
        email: 'ubyo@klu.edu.tr',
        website: 'https://ubyo.klu.edu.tr/',
        address: 'Kayalı Kampüsü - Merkez / Kırklareli',
        location: { latitude: 41.7483, longitude: 27.2217 }
    },
    u12: {
        id: 'u12',
        name: 'Yabancı Diller Yüksekokulu',
        type: 'Yüksekokul',
        phones: ['0 (288) 214 05 25'],
        email: 'yabancidiller@klu.edu.tr',
        website: 'https://yabancidiller.klu.edu.tr/',
        address: 'Kayalı Kampüsü - Merkez / Kırklareli',
        location: { latitude: 41.7483, longitude: 27.2217 }
    },
    u13: {
        id: 'u13',
        name: 'Teknik Bilimler Meslek Yüksekokulu',
        type: 'Meslek Yüksekokulu',
        phones: ['0 (288) 214 05 28'],
        email: 'tbmyo@klu.edu.tr',
        website: 'https://tbmyo.klu.edu.tr/',
        address: 'Kavaklı Yerleşkesi - Kırklareli',
        location: { latitude: 41.6521, longitude: 27.1812 }
    },
    u14: {
        id: 'u14',
        name: 'Sosyal Bilimler Meslek Yüksekokulu',
        type: 'Meslek Yüksekokulu',
        phones: ['0 (288) 246 17 35'],
        email: 'sbmyo@klu.edu.tr',
        website: 'https://sbmyo.klu.edu.tr/',
        address: 'Kavaklı Yerleşkesi - Kırklareli',
        location: { latitude: 41.6521, longitude: 27.1812 }
    },
    u15: {
        id: 'u15',
        name: 'Sağlık Hizmetleri Meslek Yüksekokulu',
        type: 'Meslek Yüksekokulu',
        phones: ['0 (288) 214 05 29'],
        email: 'shmyo@klu.edu.tr',
        website: 'https://shmyo.klu.edu.tr/',
        address: 'Merkez Yerleşke - Kırklareli',
        location: { latitude: 41.735, longitude: 27.225 }
    }
};
