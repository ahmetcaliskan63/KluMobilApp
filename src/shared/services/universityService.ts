import apiClient from './apiClient';
import { News } from '../types/models';

export interface UniversityInfo {
    history: string;
    rectorMessage: string;
    vision: string;
    mission: string;
}

class UniversityService {
    async getNews(): Promise<News[]> {
        const response = await apiClient.get<News[]>('/university/news');
        return response.data;
    }

    async getInfo(): Promise<UniversityInfo> {
        const response = await apiClient.get<UniversityInfo>('/university/info');
        return response.data;
    }
}

export const universityService = new UniversityService();
