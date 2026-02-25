/**
 * Transcript Module Type Definitions
 * Explicit typing for clear data contracts and senior-level code quality.
 */

export interface Course {
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
    courses: Course[];
}

export interface AcademicSummary {
    overallGpa: string;
    totalCompletedAkts: string;
    activeSemester: string;
}
