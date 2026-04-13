import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'auth_token';

export const saveToken = async (token: string): Promise<boolean> => {
    try {
        await SecureStore.setItemAsync(TOKEN_KEY, token);
        return true;
    } catch (error) {
        console.error('SecureStorage Error (Save):', error);
        return false;
    }
};

export const getToken = async (): Promise<string | null> => {
    try {
        return await SecureStore.getItemAsync(TOKEN_KEY);
    } catch (error) {
        console.error('SecureStorage Error (Get):', error);
        return null;
    }
};

export const removeToken = async (): Promise<boolean> => {
    try {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        return true;
    } catch (error) {
        console.error('SecureStorage Error (Remove):', error);
        return false;
    }
};

