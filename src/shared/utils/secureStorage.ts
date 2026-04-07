import * as Keychain from 'react-native-keychain';

const SERVICE_NAME = 'klu_mobile_auth';

export const saveToken = async (token: string): Promise<boolean> => {
    try {
        await Keychain.setGenericPassword('auth_token', token, {
            service: SERVICE_NAME,
            accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
        });
        return true;
    } catch (error) {
        console.error('SecureStorage Error (Save):', error);
        return false;
    }
};

export const getToken = async (): Promise<string | null> => {
    try {
        const credentials = await Keychain.getGenericPassword({
            service: SERVICE_NAME,
        });
        if (credentials) {
            return credentials.password;
        }
        return null;
    } catch (error) {
        console.error('SecureStorage Error (Get):', error);
        return null;
    }
};

export const removeToken = async (): Promise<boolean> => {
    try {
        await Keychain.resetGenericPassword({
            service: SERVICE_NAME,
        });
        return true;
    } catch (error) {
        console.error('SecureStorage Error (Remove):', error);
        return false;
    }
};

