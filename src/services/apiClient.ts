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
    (error) => {
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

