import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

// KLU API Base URL - This would be updated with the actual production URL
const BASE_URL = 'https://api.klu.edu.tr/v1'; // Mock base URL

let getTokenCallback: (() => string | null) | null = null;
let logoutCallback: (() => void) | null = null;

export const setApiCallbacks = (
    getToken: () => string | null,
    logout: () => void
) => {
    getTokenCallback = getToken;
    logoutCallback = logout;
};

const apiClient: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    // Standard 10s timeout to balance UX and network reliability
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Request Interceptor: Add Auth Token to headers
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = getTokenCallback?.();
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor: Handle errors globally
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        // 🛠️ Professional Mock Interceptor for Development
        // Since BASE_URL isn't real, requests will fail. We intercept here to return mock data.
        const url = error.config?.url;
        
        if (__DEV__) {
            try {
                // Import mock data dynamically
                const MOCK = await import('./mockData');
                
                const routes: Record<string, any> = {
                    '/announcements': MOCK.MOCK_ANNOUNCEMENTS,
                    '/faculty/profiles': MOCK.MOCK_FACULTY_PROFILES,
                    '/faculty/members': MOCK.MOCK_FACULTY_MEMBERS,
                    '/schedule': MOCK.MOCK_SCHEDULE,
                    '/exams/schedule': MOCK.MOCK_EXAM_SCHEDULE,
                    '/exams/results': MOCK.MOCK_EXAM_RESULTS,
                    '/transcript': MOCK.MOCK_TRANSCRIPT,
                    '/transcript/summary': MOCK.MOCK_ACADEMIC_STATS,
                    '/transcript/details': MOCK.MOCK_SEMESTER_DATA,
                    '/faculty/units': MOCK.MOCK_UNITS,
                    '/profile/stats': MOCK.MOCK_ACADEMIC_STATS,
                    '/cafeteria/menu': MOCK.MOCK_CAFETERIA,
                    '/library/books': MOCK.MOCK_BOOKS,
                    '/news': MOCK.MOCK_NEWS,
                    '/events': MOCK.MOCK_EVENTS,
                    '/profile/setup-status': { completed: true },
                    '/obs/courses': MOCK.MOCK_SCHEDULE,
                };

                if (url && routes[url]) {
                    // Exact match routes
                    // Simulate network latency for professional UX feel
                    await new Promise<void>(resolve => setTimeout(() => resolve(), 800));
                    return {
                        data: routes[url],
                        status: 200,
                        statusText: 'OK',
                        headers: {},
                        config: error.config,
                    };
                }

                // 🔍 Dynamic Detail Route Handling (e.g., /announcements/1)
                if (url?.startsWith('/announcements/') || url?.startsWith('/news/') || url?.startsWith('/events/') || url?.startsWith('/faculty/units/')) {
                    const parts = url.split('/');
                    const id = parts[parts.length - 1];
                    let detailData = null;

                    if (url.startsWith('/announcements/')) {
                        detailData = MOCK.MOCK_ANNOUNCEMENTS.find(a => a.id === id);
                    } else if (url.startsWith('/news/')) {
                        detailData = MOCK.MOCK_NEWS.find(n => n.id === id);
                    } else if (url.startsWith('/events/')) {
                        detailData = MOCK.MOCK_EVENTS.find(e => e.id === id);
                    } else if (url.startsWith('/faculty/units/')) {
                        detailData = MOCK.MOCK_UNIT_DETAILS[id];
                    }

                    if (detailData) {
                        await new Promise<void>(resolve => setTimeout(() => resolve(), 800));
                        return {
                            data: detailData,
                            status: 200,
                            statusText: 'OK',
                            headers: {},
                            config: error.config,
                        };
                    }
                }
            } catch (mockErr) {
                console.error('Mock Interceptor Error:', mockErr);
            }
        }

        // Handle unauthorized errors (401)
        if (error.response && error.response.status === 401) {
            logoutCallback?.();
        }

        // Customize error messages based on response
        const errorMessage = error.response?.data?.message || 'Bir hata oluştu. Lütfen tekrar deneyin.';
        error.message = errorMessage;

        return Promise.reject(error);
    }
);

export default apiClient;


