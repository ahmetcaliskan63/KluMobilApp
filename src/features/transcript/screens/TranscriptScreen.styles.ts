import { StyleSheet } from 'react-native';
import { Theme } from '@/core/theme/theme';
export const styles = (theme: Theme, _isDarkMode: boolean) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 60,
    },
});
