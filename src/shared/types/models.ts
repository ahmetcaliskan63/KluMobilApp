/**
 * Data Model Type Definitions
 */

export interface Attendance {
    courseName: string;
    courseCode: string;
    attended: number;
    total: number;
    limit: number;
    risk: 'low' | 'medium' | 'high';
}

export interface GraduationProgress {
    completedCredits: number;
    totalRequiredCredits: number;
    completedCourses: number;
    totalRequiredCourses: number;
    gpaTarget: number;
}

export interface GPATrend {
    semester: string;
    gpa: number;
}

export interface LeaveBalance {
    type: 'annual' | 'sick' | 'excuse' | 'administrative' | string;
    total: number;
    used: number;
    remaining: number;
    color: string;
}

export interface LeaveRequest {
    id: string;
    startDate: string;
    endDate: string;
    days: number;
    type: string;
    status: 'approved' | 'pending' | 'rejected';
    reason: string;
}

export interface User {
    id: string;
    email: string;
    studentNumber: string;
    firstName: string;
    lastName: string;
    department: string;
    grade: number;
    role?: 'student' | 'academic' | 'staff';
    title?: string;
    profileImage?: string;
    tcNo?: string;
    faculty?: string;
    majorBranch?: string;
    birthPlace?: string;
    birthDate?: string;
    phone?: string;
    address?: string;
    registrationDate?: string;
    gpa?: string;
    staffNumber?: string;
    workPhone?: string;
    internalPhone?: string;
    attendance?: Attendance[];
    graduationProgress?: GraduationProgress;
    gpaHistory?: GPATrend[];
    leaveBalances?: LeaveBalance[];
    leaveRequests?: LeaveRequest[];
}

export interface LoginCredentials {
    studentId: string;
    password: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}

export interface Course {
    id: string;
    code: string;
    name: string;
    instructor: string;
    day: string;
    startTime: string;
    endTime: string;
    location: string;
    room?: string;
    color?: string;
    syllabus?: string[];
    attendance?: number;
}

export interface Exam {
    id: string;
    courseCode: string;
    courseName: string;
    date: string;
    time: string;
    location: string;
    type: 'midterm' | 'final' | 'quiz' | string;
    day?: string;
    status?: string;
    color?: string;
}

export interface Announcement {
    id: string;
    title: string;
    content: string;
    category: 'academic' | 'administrative' | 'social' | 'event' | string;
    date: string;
    isRead: boolean;
    snippet?: string;
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
    type: 'Kulüp' | 'Üniversite' | 'Konferans' | string;
}

export interface DailyMenu {
    day: string;
    date: string;
    totalCalories?: string;
    items: string[];
}

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

export interface AcademicStats {
    gpa: string;
    totalCredits: number;
    completedCourses: number;
    currentSemester: string;
    activeSemester?: string;
}

export interface TranscriptCourse {
    id: string;
    code: string;
    name: string;
    grade: string;
    credit: string;
    akts: string;
}

export interface SemesterData {
    semester: string;
    subTitle: string;
    gpa: string;
    totalAkts: string;
    courses: TranscriptCourse[];
}

export interface Book {
    id: string;
    title: string;
    author: string;
    isbn: string;
    dueDate?: string;
    coverImage?: string;
    status?: 'On Time' | 'Warning' | 'Overdue';
}

export interface DashboardModule {
    id: string;
    title: string;
    icon: string;
    route: string;
    color: string;
}

export interface FacultyMember {
    id: string;
    name: string;
    email: string;
    office: string;
    dept: string;
    avatar: string;
    color: string;
}

export interface FacultyProfile {
    id: string;
    name: string;
    title: string;
    role: string;
    department: string;
    email: string;
    office: string;
    avatar: string;
    color: string[];
    accent: string;
}

export interface ExamResult {
    id: string;
    courseName: string;
    type: string;
    grade: string;
    letterGrade: string;
    date: string;
    status: string;
    color?: string;
}

export interface Unit {
    id: string;
    name: string;
    type: 'Birim' | 'Enstitü' | 'Fakülte' | 'Yüksekokul' | 'Meslek Yüksekokulu';
}

export interface UnitDetail extends Unit {
    description?: string;
    phones: string[];
    fax?: string;
    email: string;
    website: string;
    address: string;
    location: {
        latitude: number;
        longitude: number;
    };
}

export interface AcademicCalendarEvent {
    id: string;
    title: string;
    description?: string;
    startDate: string;
    endDate?: string;
    type: 'REGISTRATION' | 'EXAM' | 'HOLIDAY' | 'ACADEMIC' | 'GRADUATION';
}

export interface AcademicSemesterCalendar {
    id: string;
    name: string;
    events: AcademicCalendarEvent[];
}
