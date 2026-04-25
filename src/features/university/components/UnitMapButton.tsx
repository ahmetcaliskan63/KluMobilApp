import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { moderateScale } from '@/shared/utils/responsive';
import { useTranslation } from 'react-i18next';

interface UnitMapButtonProps {
    onPress: () => void;
    theme: any;
    isDarkMode: boolean;
}

export const UnitMapButton: React.FC<UnitMapButtonProps> = ({ onPress, theme, isDarkMode }) => {
    const { t } = useTranslation();

    return (
        <TouchableOpacity
            style={[styles.mapBtnShadow, { shadowColor: isDarkMode ? theme.colors.primary : '#182958' }]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <LinearGradient
                colors={isDarkMode ? [theme.colors.primary, '#4F46E5'] : ['#182958', '#3B82F6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.mapBtnStyle}
            >
                <Icon name="map" size={22} color="#FFF" />
                <Text style={styles.mapBtnTextStyle}>{t('university.units.viewOnMap')}</Text>
                <Icon name="chevron-forward" size={18} color="rgba(255,255,255,0.5)" />
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    mapBtnShadow: {
        marginTop: 24,
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 8,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
    },
    mapBtnStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 18,
        paddingHorizontal: 24,
    },
    mapBtnTextStyle: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: moderateScale(15),
        fontWeight: '800',
        marginLeft: 12,
    },
});
