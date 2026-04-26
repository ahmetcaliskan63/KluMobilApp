import apiClient from './apiClient';
import { 
    Course, 
    Exam, 
    ExamResult, 
    SemesterData, 
    AcademicStats 
} from '@/shared/types/models';

/**
 * Academic Service
 * Handles all OBS-related API calls
 */
export const academicService = {
    /**
     * Get weekly course schedule
     */
    getSchedule: async (): Promise<Course[]> => {
        const response = await apiClient.get<Course[]>('/academic/schedule');
        return response.data;
    },

    /**
     * Get upcoming exams
     */
    getExamSchedule: async (): Promise<Exam[]> => {
        const response = await apiClient.get<Exam[]>('/academic/exam-schedule');
        return response.data;
    },

    /**
     * Get released exam results
     */
    getExamResults: async (): Promise<ExamResult[]> => {
        const response = await apiClient.get<ExamResult[]>('/academic/exam-results');
        return response.data;
    },

    /**
     * Get transcript summary and stats
     */
    getAcademicStats: async (): Promise<AcademicStats> => {
        const response = await apiClient.get<AcademicStats>('/academic/transcript/summary');
        return response.data;
    },

    /**
     * Get full transcript history (semester based)
     */
    getTranscript: async (): Promise<SemesterData[]> => {
        const response = await apiClient.get<SemesterData[]>('/academic/transcript');
        return response.data;
    }
};
