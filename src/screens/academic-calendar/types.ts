/**
 * Academic Calendar Module Type Definitions
 */

export type EventType = 'REGISTRATION' | 'EXAM' | 'HOLIDAY' | 'ACADEMIC' | 'GRADUATION';

export interface AcademicEvent {
    id: string;
    title: string;
    description?: string;
    startDate: string; // ISO format or display string
    endDate?: string;
    type: EventType;
}

export interface AcademicSemester {
    id: string;
    name: string; // e.g., "2024-2025 Güz"
    events: AcademicEvent[];
}
