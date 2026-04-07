import { theme, colors, darkColors } from '@/app/theme/theme';
import { useThemeStore } from '../store/themeStore';

export const useAppTheme = () => {
    const { isDarkMode } = useThemeStore();

    const currentColors = isDarkMode ? darkColors : colors;

    const themedTheme = {
        ...theme,
        colors: currentColors,
    };

    return {
        theme: themedTheme,
        isDarkMode,
        colors: currentColors,
    };
};

