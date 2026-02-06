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

export interface User {
    id: string;
    email: string;
    studentNumber: string;
    firstName: string;
    lastName: string;
    department: string;
    grade: number;
    profileImage?: string;
    attendance?: Attendance[];
    graduationProgress?: GraduationProgress;
    gpaHistory?: GPATrend[];
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
    color?: string;
}

export interface Exam {
    id: string;
    courseCode: string;
    courseName: string;
    date: string;
    time: string;
    location: string;
    type: 'midterm' | 'final' | 'quiz';
}

export interface Announcement {
    id: string;
    title: string;
    content: string;
    category: 'academic' | 'administrative' | 'social' | 'event';
    date: string;
    isRead: boolean;
}

export interface MenuItem {
    id: string;
    date: string;
    soup: string;
    mainCourse: string;
    sideDish: string;
    dessert: string;
    calories?: number;
}

export interface Book {
    id: string;
    title: string;
    author: string;
    isbn: string;
    dueDate?: string;
    coverImage?: string;
}

export interface DashboardModule {
    id: string;
    title: string;
    icon: string;
    route: string;
    color: string;
}
