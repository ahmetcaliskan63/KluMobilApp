/**
 * KLU Mobil Merkezi Mock Veri Servisi
 */

import {
    Announcement,
    News,
    Event,
    DailyMenu as MenuItem,
    Book as BorrowedBook,
    Unit,
    AcademicSemesterCalendar,
    Grade,
    SemesterData as SemesterDataModel,
    ExamResult,
    Course as CourseModel,
    UnitDetail
} from '@/shared/types/models';

export type { Announcement, News, Event, MenuItem, BorrowedBook, Unit, AcademicSemesterCalendar, Grade, SemesterDataModel, ExamResult, CourseModel };

export const MOCK_USER_IMAGE = 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop'; // High quality male studio portrait

export const FALLBACK_IMAGES = {
    ACADEMIC: 'https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?q=80&w=2070&auto=format&fit=crop',
    SOCIAL: 'https://images.unsplash.com/photo-1523240318241-70e192ce93bd?q=80&w=2070&auto=format&fit=crop',
    EVENT: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2070&auto=format&fit=crop',
    CAMPUS: 'https://images.unsplash.com/photo-1523050335456-c7e462590163?q=80&w=2070&auto=format&fit=crop',
};

export const GRADE_COLORS = {
    'AA': '#059669',
    'BA': '#10B981',
    'BB': '#2563EB',
    'CB': '#3B82F6',
    'CC': '#D97706',
    'DC': '#F59E0B',
    'DD': '#DC2626', // Red 600
    'FF': '#EF4444', // Red 500
} as const;

export const MOCK_NEWS = (t: any): News[] => [
    {
        id: '1',
        title: t('dashboard.newsTitle1'),
        date: '22/01/2026',
        location: t('dashboard.newsLocation1'),
        views: '193',
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop',
        content: t('dashboard.newsContent1')
    },
    {
        id: '2',
        title: t('dashboard.newsTitle2'),
        date: '21/01/2026',
        location: t('dashboard.newsLocation2'),
        views: '535',
        image: 'https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=2070&auto=format&fit=crop',
        content: t('dashboard.newsContent2')
    },
    {
        id: '3',
        title: t('dashboard.newsTitle3'),
        date: '19/01/2026',
        location: t('dashboard.newsLocation3'),
        views: '1204',
        image: 'https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?q=80&w=2070&auto=format&fit=crop',
        content: t('dashboard.newsContent3')
    },
];

export const MOCK_EVENTS = (t: any): Event[] => [
    {
        id: '1',
        title: t('dashboard.eventTitle1'),
        date: '2026-03-25',
        time: '14:00',
        location: t('dashboard.eventLocation1'),
        organizer: t('dashboard.eventOrganizer1'),
        image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2070&auto=format&fit=crop',
        type: t('dashboard.categories.social')
    },
    {
        id: '2',
        title: t('dashboard.eventTitle2'),
        date: '2026-04-10',
        time: '19:00',
        location: t('dashboard.eventLocation2'),
        organizer: t('dashboard.eventOrganizer2'),
        image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop',
        type: t('dashboard.categories.social')
    },
    {
        id: '3',
        title: t('dashboard.eventTitle3'),
        date: '2026-05-15',
        time: '10:00',
        location: t('dashboard.eventLocation3'),
        organizer: t('dashboard.eventOrganizer3'),
        image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=2070&auto=format&fit=crop',
        type: t('dashboard.categories.academic')
    },
    {
        id: '4',
        title: t('dashboard.eventTitle4'),
        date: '2026-06-20',
        time: '12:30',
        location: t('dashboard.eventLocation4'),
        organizer: t('dashboard.eventOrganizer4'),
        image: 'https://images.unsplash.com/photo-1523580494863-6f30312248f5?q=80&w=2070&auto=format&fit=crop',
        type: t('dashboard.categories.social')
    },
];

export const MOCK_ANNOUNCEMENTS = (t: any): Announcement[] => [
    {
        id: '1',
        title: t('dashboard.announcementTitle1'),
        date: '30/01/2026',
        category: t('dashboard.categories.academic'),
        views: '1082',
        snippet: t('dashboard.announcementSnippet1'),
        content: t('dashboard.announcementContent1'),
        image: 'https://images.unsplash.com/photo-1523050335456-c7e462590163?q=80&w=2070&auto=format&fit=crop',
        isRead: false
    },
    {
        id: '2',
        title: t('dashboard.announcementTitle2'),
        date: '15/02/2026',
        category: t('dashboard.categories.academic'),
        views: '2451',
        snippet: t('dashboard.announcementSnippet2'),
        content: t('dashboard.announcementContent2'),
        image: 'https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?q=80&w=2070&auto=format&fit=crop',
        isRead: true
    },
    {
        id: '3',
        title: t('dashboard.announcementTitle3'),
        date: '20/02/2026',
        category: t('dashboard.categories.general'),
        views: '892',
        snippet: t('dashboard.announcementSnippet3'),
        content: t('dashboard.announcementContent3'),
        image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop',
        isRead: false
    },
    {
        id: '4',
        title: t('dashboard.announcementTitle4'),
        date: '22/02/2026',
        category: t('dashboard.categories.social'),
        views: '433',
        snippet: t('dashboard.announcementSnippet4'),
        content: t('dashboard.announcementContent4'),
        image: 'https://images.unsplash.com/photo-1523240318241-70e192ce93bd?q=80&w=2070&auto=format&fit=crop',
        isRead: false
    },
];

export const MOCK_WEEKLY_MENU = (t: any): MenuItem[] => [
    {
        day: t('common.days.monday'),
        date: `28 ${t('common.months.april')}`,
        items: [
            t('cafeteria.meals.lentilSoup'),
            t('cafeteria.meals.izmirMeatballs'),
            t('cafeteria.meals.ricePilaf'),
            t('cafeteria.meals.salad')
        ]
    },
    {
        day: t('common.days.tuesday'),
        date: `29 ${t('common.months.april')}`,
        items: [
            t('cafeteria.meals.ezogelinSoup'),
            t('cafeteria.meals.chickenSote'),
            t('cafeteria.meals.bulgurPilaf'),
            t('cafeteria.meals.ayran')
        ]
    },
    {
        day: t('common.days.wednesday'),
        date: `30 ${t('common.months.april')}`,
        items: [
            t('cafeteria.meals.tarhanaSoup'),
            t('cafeteria.meals.beanStew'),
            t('cafeteria.meals.pasta'),
            t('cafeteria.meals.fruit')
        ]
    },
    {
        day: t('common.days.thursday'),
        date: `1 ${t('common.months.may')}`,
        items: [
            t('cafeteria.meals.yaylaSoup'),
            t('cafeteria.meals.forestKebab'),
            t('cafeteria.meals.ricePilaf'),
            t('cafeteria.meals.cacik')
        ]
    },
    {
        day: t('common.days.friday'),
        date: `2 ${t('common.months.may')}`,
        items: [
            t('cafeteria.meals.tomatoSoup'),
            t('cafeteria.meals.ovenChicken'),
            t('cafeteria.meals.veggieRice'),
            t('cafeteria.meals.pudding')
        ]
    },
];

export const MOCK_BOOKS = (t: any): BorrowedBook[] => [
    { id: '1', title: t('courses.dataStructures'), author: 'Rifat Çölkesen', isbn: '978-605-123-123-4', dueDate: `20 ${t('common.months.march')} 2026`, status: t('library.onTime') },
    { id: '2', title: 'Clean Code', author: 'Robert C. Martin', isbn: '978-013-235-088-4', dueDate: `15 ${t('common.months.march')} 2026`, status: t('library.warning') },
];

export const MOCK_SCHEDULE = (t: any): CourseModel[] => [
    // Pazartesi
    { id: '2', code: 'FIZ101', name: t('courses.physics'), room: 'HB105', instructor: `${t('common.titles.assocProf')} M. Kaya`, startTime: '09:00', endTime: '11:50', day: t('common.days.monday'), color: '#50E3C2', syllabus: ['Vektörler', 'Tek Boyutta Hareket', 'Newton Kanunları', 'İş ve Enerji'], attendance: 92, location: t('common.campuses.kayali') },
    { id: '6', code: 'BIL201', name: t('courses.dataStructures'), room: 'Lab 2', instructor: `${t('common.titles.asstProf')} A. Demir`, startTime: '13:00', endTime: '15:50', day: t('common.days.monday'), color: '#3B82F6', location: t('common.campuses.kayali') },

    // Salı
    { id: '3', code: 'BIL101', name: t('courses.introProg'), room: 'Lab 1', instructor: `${t('common.titles.asstProf')} S. Demir`, startTime: '09:00', endTime: '11:50', day: t('common.days.tuesday'), color: '#F5A623', syllabus: ['Algoritma Kavramı', 'Değişkenler ve Veri Tipleri', 'Koşullu İfadeler', 'Diziler'], attendance: 100, location: t('common.campuses.kayali') },
    { id: '7', code: 'MAT201', name: 'Diferansiyel Denklemler', room: 'HB202', instructor: `${t('common.titles.prof')} L. Aksoy`, startTime: '13:00', endTime: '15:50', day: t('common.days.tuesday'), color: '#10B981', location: t('common.campuses.kayali') },
    { id: '8', code: 'ENG201', name: 'Teknik İngilizce', room: 'HB305', instructor: `${t('common.titles.inst')} M. Yılmaz`, startTime: '16:00', endTime: '17:50', day: t('common.days.tuesday'), color: '#6366F1', location: t('common.campuses.kayali') },

    // Çarşamba
    { id: '1', code: 'MAT101', name: t('courses.calculus'), room: 'HB202', instructor: `${t('common.titles.prof')} A. Yılmaz`, startTime: '10:00', endTime: '12:50', day: t('common.days.wednesday'), color: '#4A90E2', syllabus: ['Limit ve Süreklilik', 'Türev Kuralları', 'Türevin Uygulamaları', 'İntegral'], attendance: 85, location: t('common.campuses.kayali') },
    { id: '9', code: 'BIL203', name: 'Nesne Yönelimli Programlama', room: 'Lab 1', instructor: `${t('common.titles.asstProf')} C. Can`, startTime: '14:00', endTime: '16:50', day: t('common.days.wednesday'), color: '#F43F5E', location: t('common.campuses.kayali') },

    // Perşembe
    { id: '4', code: 'TUR101', name: t('courses.turkish'), room: 'HB301', instructor: `${t('common.titles.lecturer')} H. Arslan`, startTime: '10:00', endTime: '11:50', day: t('common.days.thursday'), color: '#D0021B', location: t('common.campuses.merkez') },
    { id: '10', code: 'BIL205', name: 'Ayrık Matematik', room: 'HB204', instructor: `${t('common.titles.assocProf')} V. Şahin`, startTime: '13:00', endTime: '15:50', day: t('common.days.thursday'), color: '#8B5CF6', location: t('common.campuses.kayali') },

    // Cuma
    { id: '5', code: 'ING101', name: t('courses.english'), room: 'HB202', instructor: `${t('common.titles.inst')} E. Aksoy`, startTime: '09:00', endTime: '10:50', day: t('common.days.friday'), color: '#9013FE', location: t('common.campuses.merkez') },
    { id: '11', code: 'AIT101', name: 'Atatürk İlkeleri ve İnkılap Tarihi I', room: 'Amfi 1', instructor: `${t('common.titles.lecturer')} T. Güneş`, startTime: '11:00', endTime: '12:50', day: t('common.days.friday'), color: '#EC4899', location: t('common.campuses.merkez') },
    { id: '12', code: 'ETK101', name: 'Müh. Etiği ve Sosyal Sorumluluk', room: 'HB202', instructor: `${t('common.titles.asstProf')} K. Özdemir`, startTime: '14:00', endTime: '15:50', day: t('common.days.friday'), color: '#F97316', location: t('common.campuses.kayali') },
];

// Grade interface removed as it's imported from models.ts

export const MOCK_GRADES = (t: any): Grade[] => [
    { id: '1', courseName: `MAT101 ${t('courses.calculus')}`, midterm: 85, final: 75, letterGrade: 'BA', credits: 6, status: t('academic.status.passed'), stats: { average: 58, high: 95, low: 12 } },
    { id: '2', courseName: `FIZ101 ${t('courses.physics')}`, midterm: 60, final: 70, letterGrade: 'CC', credits: 5, status: t('academic.status.passed'), stats: { average: 45, high: 88, low: 0 } },
    { id: '3', courseName: `BIL101 ${t('courses.introProg')}`, midterm: 95, final: null, letterGrade: '-', credits: 6, status: t('academic.status.pending') },
    { id: '4', courseName: `TUR101 ${t('courses.turkish')}`, midterm: 80, final: 85, letterGrade: 'AA', credits: 2, status: t('academic.status.passed') },
    { id: '5', courseName: `ING101 ${t('courses.english')}`, midterm: 70, final: 65, letterGrade: 'CB', credits: 2, status: t('academic.status.passed') },
];

export const MOCK_ACADEMIC_STATS = (t: any, role?: string) => {
    if (role === 'academic') {
        return {
            // Academic staff stats
            balance: `20 ${t('common.day')}`,       // Remaining leave days
            mealCredits: '1187',                      // Staff number
            libraryBooks: '12',                       // Publications count
            gpa: '20',
            overallGpa: '20',
            totalCredits: '1187',
            totalCompletedAkts: '12',
            activeSemester: '5',
            // Named keys for display
            stat1Label: t('profile.remainingLeave'),
            stat1Value: `20 ${t('common.day')}`,
            stat2Label: t('profile.staffNumber'),
            stat2Value: '1187',
            stat3Label: t('profile.publications'),
            stat3Value: '12',
        };
    }
    // Student stats (default)
    return {
        balance: `₺42.50`,
        mealCredits: '1',
        libraryBooks: `2 ${t('library.books')}`,
        gpa: '3.52',
        overallGpa: '3.52',
        totalCredits: '120',
        totalCompletedAkts: '120',
        activeSemester: '5',
        // Named keys for display
        stat1Label: t('profile.gpa'),
        stat1Value: '3.52',
        stat2Label: t('profile.ects'),
        stat2Value: '120',
        stat3Label: t('profile.activeSemester'),
        stat3Value: '5',
    };
};

export const MOCK_ATTENDANCE = (t: any) => [
    { courseName: t('courses.calculus'), courseCode: 'MAT101', attended: 24, total: 28, limit: 8, risk: 'low' },
    { courseName: t('courses.physics'), courseCode: 'FIZ101', attended: 18, total: 28, limit: 8, risk: 'medium' },
    { courseName: t('courses.dataStructures'), courseCode: 'BIL201', attended: 26, total: 28, limit: 8, risk: 'low' },
    { courseName: t('courses.turkish'), courseCode: 'TUR101', attended: 20, total: 28, limit: 8, risk: 'high' },
];

export const MOCK_GRADUATION_PROGRESS = {
    completedCredits: 180,
    totalRequiredCredits: 240,
    completedCourses: 32,
    totalRequiredCourses: 40,
    gpaTarget: 3.50,
};

export const MOCK_GPA_HISTORY = (t: any) => [
    { semester: `1. ${t('common.terms.fall')}`, gpa: 3.20 },
    { semester: `1. ${t('common.terms.spring')}`, gpa: 3.35 },
    { semester: `2. ${t('common.terms.fall')}`, gpa: 3.28 },
    { semester: `2. ${t('common.terms.spring')}`, gpa: 3.45 },
    { semester: `3. ${t('common.terms.fall')}`, gpa: 3.42 },
];

// Additional MOCK data for API Interceptor compatibility
export const MOCK_FACULTY_PROFILES = (t: any) => [
    {
        id: 'adv_1',
        name: `Prof. Dr. Ayşe Yılmaz`,
        title: t('faculty.titles.advisor'),
        role: t('faculty.titles.professor'),
        department: t('units.softwareEngineering'),
        email: 'ayse.yilmaz@klu.edu.tr',
        office: t('units.officeA312'),
        avatar: 'AY',
        color: ['#1E293B', '#0F172A'],
        accent: '#F59E0B',
    },
    {
        id: 'dept_1',
        name: `Prof. Dr. Ahmet Demir`,
        title: t('faculty.roles.head'),
        role: t('faculty.titles.professor'),
        department: t('units.softwareEngineering'),
        email: 'ahmet.demir@klu.edu.tr',
        office: t('units.officeB205'),
        avatar: 'AD',
        color: ['#334155', '#1E293B'],
        accent: '#94A3B8',
    }
];

export const MOCK_FACULTY_MEMBERS = (t: any) => [
    { id: '1', name: `${t('common.titles.assocProf')} M. Kaya`, dept: t('units.softwareEngineering'), email: 'm.kaya@klu.edu.tr', avatar: 'MK', color: '#3B82F6' },
    { id: '2', name: `${t('common.titles.asstProf')} A. Demir`, dept: t('units.softwareEngineering'), email: 'a.demir@klu.edu.tr', avatar: 'AD', color: '#10B981' },
    { id: '3', name: `${t('common.titles.asstProf')} S. Demir`, dept: t('units.softwareEngineering'), email: 's.demir@klu.edu.tr', avatar: 'SD', color: '#F59E0B' },
    { id: '4', name: `${t('common.titles.prof')} M. Uzun`, dept: t('units.softwareEngineering'), email: 'm.uzun@klu.edu.tr', avatar: 'MU', color: '#6366F1' },
    { id: '5', name: `${t('common.titles.lecturer')} E. Şahin`, dept: t('units.softwareEngineering'), email: 'e.sahin@klu.edu.tr', avatar: 'EŞ', color: '#EC4899' },
    { id: '6', name: `${t('common.titles.assocProf')} V. Şahin`, dept: t('units.softwareEngineering'), email: 'v.sahin@klu.edu.tr', avatar: 'VŞ', color: '#8B5CF6' },
];

export const MOCK_EXAM_SCHEDULE = (t: any) => [
    {
        id: '1',
        courseName: t('courses.softwareArch'),
        type: t('exams.midterm'),
        date: `14 ${t('common.months.april').substring(0, 3)}`,
        day: t('common.days.monday'),
        time: '10:00',
        location: 'Amfi 1',
        status: t('exams.upcoming'),
        color: '#2563EB',
    },
    {
        id: '2',
        courseName: t('courses.webProg'),
        type: t('exams.midterm'),
        date: `15 ${t('common.months.april').substring(0, 3)}`,
        day: t('common.days.tuesday'),
        time: '13:00',
        location: 'Lab 2',
        status: t('exams.upcoming'),
        color: '#D97706',
    },
    {
        id: '3',
        courseName: t('courses.database'),
        type: t('exams.midterm'),
        date: `17 ${t('common.months.april').substring(0, 3)}`,
        day: t('common.days.thursday'),
        time: '15:00',
        location: 'B-302',
        status: t('exams.upcoming'),
        color: '#059669',
    },
];

export const MOCK_EXAM_RESULTS = (t: any) => [
    { id: '1', courseName: t('courses.dataStructures'), type: t('exams.final'), grade: '72', letterGrade: 'BB', date: '12 Haz', status: t('exams.published'), color: '#3B82F6' },
    { id: '2', courseName: t('courses.microprocessors'), type: t('exams.final'), grade: '95', letterGrade: 'AA', date: '15 Haz', status: t('exams.published'), color: '#059669' },
    { id: '3', courseName: t('courses.os'), type: t('exams.final'), grade: '82', letterGrade: 'BA', date: '18 Haz', status: t('exams.published'), color: '#10B981' },
    { id: '4', courseName: t('courses.softwareEng'), type: t('exams.midterm'), grade: '-', letterGrade: '-', date: '22 Haz', status: t('exams.marking'), color: '#64748B' },
];

export const MOCK_TRANSCRIPT = (t: any) => [
    {
        semester: `2024-2025 ${t('common.terms.fall')}`,
        subTitle: `5. ${t('profile.semester')}`,
        gpa: '3.75',
        totalAkts: '30',
        courses: [
            { id: '1', code: 'YMH311', name: t('courses.softwareArch'), grade: 'AA', credit: '3', akts: '5' },
            { id: '2', code: 'YMH313', name: t('courses.webProg'), grade: 'BA', credit: '4', akts: '6' },
            { id: '3', code: 'YMH315', name: t('courses.database'), grade: 'BB', credit: '3', akts: '5' },
            { id: '4', code: 'MAT101', name: t('courses.calculus'), grade: 'AA', credit: '4', akts: '6' },
            { id: '5', code: 'YMH317', name: t('courses.algoDesign'), grade: 'BA', credit: '4', akts: '8' },
        ],
    },
    {
        semester: `2023-2024 ${t('common.terms.spring')}`,
        subTitle: `4. ${t('profile.semester')}`,
        gpa: '3.45',
        totalAkts: '30',
        courses: [
            { id: '6', code: 'MAT102', name: `${t('courses.calculus')} II`, grade: 'BA', credit: '4', akts: '6' },
            { id: '7', code: 'PHYS102', name: `${t('courses.physics')} II`, grade: 'BB', credit: '4', akts: '6' },
            { id: '8', code: 'ENG102', name: `${t('courses.english')} II`, grade: 'AA', credit: '2', akts: '4' },
            { id: '9', code: 'YMH212', name: t('courses.softwareEng'), grade: 'BA', credit: '4', akts: '7' },
            { id: '10', code: 'YMH214', name: t('courses.os'), grade: 'CB', credit: '4', akts: '7' },
        ],
    }
];

export const MOCK_SEMESTER_CALENDAR = (t: any) => [
    { id: '1', event: t('academic.calendar.registration'), startDate: '2026-02-09', endDate: '2026-02-13' },
    { id: '2', event: t('academic.calendar.start'), startDate: '2026-02-16', endDate: '2026-02-16' },
    { id: '3', event: t('academic.calendar.vizes'), startDate: '2026-04-06', endDate: '2026-04-12' },
    { id: '4', event: t('academic.calendar.finals'), startDate: '2026-06-08', endDate: '2026-06-19' },
];

export const MOCK_STATS = MOCK_ACADEMIC_STATS;
export const MOCK_SEMESTER_DATA = [];
export const MOCK_UNITS = (t: any): Unit[] => [
    { id: '1', name: t('units.facultyEngineering'), type: 'Fakülte' },
    { id: '2', name: t('units.facultyArts'), type: 'Fakülte' },
    { id: '3', name: t('units.facultyEconomics'), type: 'Fakülte' },
    { id: '4', name: t('units.facultyLaw'), type: 'Fakülte' },
    { id: '5', name: t('units.facultyMedicine'), type: 'Fakülte' },
    { id: '6', name: t('units.facultyArchitecture'), type: 'Fakülte' },
    { id: '7', name: t('units.facultyHealth'), type: 'Fakülte' },
    { id: '8', name: t('units.instituteScience'), type: 'Enstitü' },
    { id: '9', name: t('units.instituteSocial'), type: 'Enstitü' },
    { id: '10', name: t('units.collegeTechnical'), type: 'Meslek Yüksekokulu' },
    { id: '11', name: t('units.collegeSocial'), type: 'Meslek Yüksekokulu' },
    { id: '12', name: t('units.collegeHealth'), type: 'Meslek Yüksekokulu' },
    { id: '13', name: t('units.rectorate'), type: 'Birim' },
    { id: '14', name: t('units.studentAffairs'), type: 'Birim' },
    { id: '15', name: t('units.libraryUnit'), type: 'Birim' },
];

export const MOCK_UNIT_DETAIL = (t: any, unitId: string): UnitDetail | null => {
    const units = MOCK_UNITS(t);
    const unit = units.find(u => u.id === unitId);
    if (!unit) return null;

    // KLU Campus Coordinates (Realistic)
    const CAMPUS_LOCATIONS = {
        kayali: { latitude: 41.7892, longitude: 27.2345 },
        karahidir: { latitude: 41.7483, longitude: 27.2289 },
        city: { latitude: 41.7351, longitude: 27.2241 },
    };

    return {
        ...unit,
        description: `${unit.name} detaylı bilgi ve iletişim sayfası.`,
        email: `${unitId === '13' ? 'rektorluk' : 'bilgi'}@klu.edu.tr`,
        phones: ['+90 (288) 214 33 00', '+90 (288) 214 33 01'],
        fax: '+90 (288) 214 33 05',
        website: 'https://klu.edu.tr',
        address: unit.type === 'Birim' ? 'Karahıdır Yerleşkesi, Kırklareli' : 'Kayalı Yerleşkesi, Kırklareli',
        location: unit.type === 'Birim' ? CAMPUS_LOCATIONS.karahidir : CAMPUS_LOCATIONS.kayali,
    };
};
export const MOCK_CAFETERIA = MOCK_WEEKLY_MENU;
export const MOCK_UNIVERSITY_NEWS = (t: any): News[] => [
    {
        id: 'u1',
        title: t('university.news.guideTitle'),
        date: '02 Haz 2026',
        image: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=600',
        location: t('units.studentAffairs'),
        views: '1.2k',
        content: t('university.news.guideContent')
    },
    {
        id: 'u2',
        title: t('university.news.festivalTitle'),
        date: '15 May 2026',
        image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=600',
        location: t('units.culturalCenter'),
        views: '2.5k',
        content: t('university.news.festivalContent')
    }
];

export const MOCK_UNIVERSITY_INFO = (t: any) => ({
    history: t('university.info.history'),
    rectorMessage: t('university.info.rectorMessage'),
    vision: t('university.info.vision'),
    mission: t('university.info.mission')
});

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

export const MOCK_NOTIFICATIONS = (t: any) => [
    {
        id: '1',
        title: t('notifications.examTitle'),
        description: t('notifications.examDesc'),
        time: '09:30',
        date: '2026-04-24', // Today
        type: 'exam',
        isRead: false,
    },
    {
        id: '2',
        title: t('notifications.cafeteriaTitle'),
        description: t('notifications.cafeteriaDesc'),
        time: '11:15',
        date: '2026-04-24', // Today
        type: 'cafeteria',
        isRead: false,
    },
    {
        id: '3',
        title: 'Kariyer Günleri Başlıyor',
        description: 'Üniversitemiz tarafından düzenlenen Kariyer Günleri etkinliği yarın başlıyor. Katılım için kaydınızı yapmayı unutmayın.',
        time: 'Dün',
        date: '2026-04-23', // Yesterday
        type: 'event',
        isRead: true,
    },
    {
        id: '4',
        title: t('notifications.libraryTitle'),
        description: t('notifications.libraryDesc'),
        time: 'Dün',
        date: '2026-04-23', // Yesterday
        type: 'library',
        isRead: true,
    },
    {
        id: '5',
        title: 'Yeni Duyuru: Yaz Okulu',
        description: '2025-2026 Yaz Okulu kayıt takvimi ve ders listesi yayımlanmıştır.',
        time: '2 gün önce',
        date: '2026-04-22', // Older
        type: 'announcement',
        isRead: true,
    },
    {
        id: '6',
        title: 'Önemli Hatırlatma: Şifre Yenileme',
        description: 'E-posta şifrenizin süresi dolmak üzere. Güvenliğiniz için lütfen şifrenizi yenileyin.',
        time: '3 gün önce',
        date: '2026-04-21', // Older
        type: 'announcement',
        isRead: true,
    },
];
export const MOCK_ONBOARDING_SLIDES = (t: any) => [
    {
        id: '1',
        title: t('onboarding.welcomeTitle'),
        description: t('onboarding.welcomeDesc'),
        image: require('@/shared/assets/welcome.png'),
    },
    {
        id: '2',
        title: t('onboarding.academicTitle'),
        description: t('onboarding.academicDesc'),
        image: require('@/shared/assets/academic.png'),
    },
    {
        id: '3',
        title: t('onboarding.socialTitle'),
        description: t('onboarding.socialDesc'),
        image: require('@/shared/assets/services.png'),
    },
];

export const MOCK_ACADEMIC_CALENDAR = (t: any): AcademicSemesterCalendar[] => [
    {
        id: '2024-2025-GUZ',
        name: `2024-2025 ${t('common.terms.fall')}`,
        events: [
            {
                id: '1',
                title: t('academic.calendar.registration'),
                startDate: '16 Eylül 2024',
                endDate: '20 Eylül 2024',
                type: 'REGISTRATION'
            },
            {
                id: '2',
                title: t('academic.calendar.start'),
                startDate: '23 Eylül 2024',
                type: 'ACADEMIC'
            },
            {
                id: '3',
                title: t('academic.calendar.vizes'),
                startDate: '11 Kasım 2024',
                endDate: '22 Kasım 2024',
                type: 'EXAM'
            },
            {
                id: '4',
                title: t('academic.calendar.end'),
                startDate: '10 Ocak 2025',
                type: 'ACADEMIC'
            },
            {
                id: '5',
                title: t('academic.calendar.finals'),
                startDate: '13 Ocak 2025',
                endDate: '24 Ocak 2025',
                type: 'EXAM'
            },
            {
                id: '6',
                title: t('academic.calendar.butunleme'),
                startDate: '03 Şubat 2025',
                endDate: '07 Şubat 2025',
                type: 'EXAM'
            },
        ]
    },
    {
        id: '2024-2025-BAHAR',
        name: `2024-2025 ${t('common.terms.spring')}`,
        events: [
            {
                id: '7',
                title: t('academic.calendar.registration'),
                startDate: '17 Şubat 2025',
                endDate: '21 Şubat 2025',
                type: 'REGISTRATION'
            },
            {
                id: '8',
                title: t('academic.calendar.start'),
                startDate: '24 Şubat 2025',
                type: 'ACADEMIC'
            },
            {
                id: '9',
                title: t('academic.calendar.vizes'),
                startDate: '14 Nisan 2025',
                endDate: '25 Nisan 2025',
                type: 'EXAM'
            },
            {
                id: '10',
                title: t('academic.calendar.end'),
                startDate: '06 Haziran 2025',
                type: 'ACADEMIC'
            },
            {
                id: '11',
                title: t('academic.calendar.finals'),
                startDate: '09 Haziran 2025',
                endDate: '20 Haziran 2025',
                type: 'EXAM'
            },
        ]
    }
];

export const MOCK_CALENDAR_PDFS = (t: any) => [
    {
        id: '1',
        title: t('academic.calendar.undergrad'),
        subtitle: t('university.units.faculties'),
        colors: ['#0F172A', '#1E3A8A'],
        url: 'https://www.klu.edu.tr/dosyalar/birimler/ogrenci_isleri/dosyalar/dokumanlar/2024-2025_AKADEMIK_TAKVIM_ONLISANS-LISANS.pdf'
    },
    {
        id: '2',
        title: t('academic.calendar.vocational'),
        subtitle: t('university.units.vocational'),
        colors: ['#064E3B', '#059669'],
        url: 'https://www.klu.edu.tr/dosyalar/birimler/ogrenci_isleri/dosyalar/dokumanlar/2024-2025_AKADEMIK_TAKVIM_ONLISANS-LISANS.pdf'
    },
    {
        id: '3',
        title: t('academic.calendar.graduate'),
        subtitle: t('university.units.institutes'),
        colors: ['#312E81', '#4338CA'],
        url: 'https://www.klu.edu.tr/dosyalar/birimler/ogrenci_isleri/dosyalar/dokumanlar/2024-2025_LISANSUSTU_AKADEMIK_TAKVIMI.pdf'
    }
];

export const MOCK_LIBRARY_SERVICES = (t: any) => [
    { id: '1', title: t('library.loan'), icon: 'book', color: '#1976D2', url: 'https://kutuphane.klu.edu.tr/sayfalar/odunc-verme-kurallari' },
    { id: '2', title: t('library.remoteAccess'), icon: 'cloud-done', color: '#388E3C', url: 'https://kutuphane.klu.edu.tr/sayfalar/veritabanlari-uzaktan-erisim' },
    { id: '3', title: t('library.catalog'), icon: 'library', color: '#F57C00', url: 'https://katalog.klu.edu.tr/' },
    { id: '4', title: t('library.memberLogin'), icon: 'person', color: '#D32F2F', url: 'http://katalog.klu.edu.tr/yordambt/yordam.php?sayfa=uye_girisi' },
    { id: '5', title: t('library.forms'), icon: 'document-text', color: '#7B1FA2', url: 'https://kutuphane.klu.edu.tr/sayfalar/formlar' },
    { id: '6', title: t('library.archive'), icon: 'folder-open', color: '#0288D1', url: 'https://acikerisim.klu.edu.tr/xmlui/' },
    { id: '7', title: t('library.mobileApp'), icon: 'phone-portrait', color: '#00796B', url: 'https://kutuphane.klu.edu.tr/sayfalar/cep-kutuphanem' },
    { id: '8', title: t('library.announcements'), icon: 'megaphone', color: '#C2185B', url: 'https://kutuphane.klu.edu.tr/duyurular' },
    { id: '9', title: t('library.feedback'), icon: 'chatbubbles', color: '#455A64', url: 'https://kutuphane.klu.edu.tr/sayfalar/iletisim' },
];
