import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons as Icon } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { useTranslation } from 'react-i18next';
import Animated, {
    useAnimatedStyle,
    interpolate,
    Extrapolate
} from 'react-native-reanimated';
import { Theme } from '@/core/theme/theme';
import { moderateScale } from '@/shared/utils/responsive';
import { SharedValue } from 'react-native-reanimated';

interface TranscriptHeaderProps {
    scrollOffset: SharedValue<number>;
}

export const TranscriptHeader: React.FC<TranscriptHeaderProps> = ({ scrollOffset }) => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const { theme, isDarkMode } = useAppTheme();
    const { t } = useTranslation();
    const s = styles(theme, isDarkMode);

    const animatedStyles = useAnimatedStyle(() => {
        const opacity = interpolate(
            scrollOffset.value,
            [0, 100],
            [1, 0.9],
            Extrapolate.CLAMP
        );
        return { opacity };
    });

    return (
        <Animated.View style={[s.headerContainer, animatedStyles]}>
            <LinearGradient
                colors={isDarkMode ? ['#0F172A', '#020617'] : ['#182958', '#101D42']}
                style={[s.headerGradient, { paddingTop: insets.top + 10 }]}
            >
                <View style={s.headerContent}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={s.backButton}
                        activeOpacity={0.7}
                    >
                        <Icon name="chevron-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>

                    <Text style={s.headerTitle}>{t('transcript.title')}</Text>

                    <TouchableOpacity style={s.headerRight} activeOpacity={0.7}>
                        <Icon name="download-outline" size={22} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </Animated.View>
    );
};

const styles = (_theme: Theme, _isDarkMode: boolean) => StyleSheet.create({
    headerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
    },
    headerGradient: {
        borderBottomLeftRadius: moderateScale(25),
        borderBottomRightRadius: moderateScale(25),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 8,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 15,
    },
    headerTitle: {
        fontSize: moderateScale(14),
        fontWeight: '900',
        color: '#FFFFFF',
        letterSpacing: 2,
        textTransform: 'uppercase',
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    headerRight: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
