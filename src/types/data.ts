/**
 * KLU Mobil - Senior Type Definitions
 */

export interface Announcement {
    id: string;
    title: string;
    date: string;
    category: string;
    snippet: string;
    content: string;
    views?: string;
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

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    studentNumber: string;
    email: string;
    department: string;
    grade: string | number;
    profileImage?: string;
    avatar?: string;
    attendance?: Attendance[];
    graduationProgress?: GraduationProgress;
    gpaHistory?: GPATrend[];
}
