import React from 'react';
import { Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons as Icon } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { useTranslation } from 'react-i18next';
import { Theme } from '@/core/theme/theme';
import { moderateScale } from '@/shared/utils/responsive';

export const CalendarHeader: React.FC = () => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const { theme } = useAppTheme();
    const { t } = useTranslation();
    const s = styles(theme);

    return (
        <LinearGradient
            colors={['#182958', '#101D42', '#080F26']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[s.header, { paddingTop: insets.top + (Platform.OS === 'ios' ? 0 : 10) }]}
        >
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={s.backButton}
                activeOpacity={0.7}
            >
                <Icon name="chevron-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>

            <Text style={s.headerTitle}>{t('academic.calendarTitle')}</Text>

            <TouchableOpacity style={s.headerRight} activeOpacity={0.7}>
                <Icon name="share-outline" size={22} color="#FFFFFF" />
            </TouchableOpacity>
        </LinearGradient>
    );
};

const styles = (_theme: Theme) => StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 15,
        elevation: 8,
    },
    headerTitle: {
        fontSize: moderateScale(18),
        fontWeight: '900',
        color: '#FFFFFF',
        letterSpacing: -0.5,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerRight: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
