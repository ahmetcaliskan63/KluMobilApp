import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import { moderateScale, verticalScale } from '@/shared/utils/responsive';
import { spacing } from '@/core/theme/theme';

interface IDCardButtonProps {
    onPress: () => void;
}

export const IDCardButton: React.FC<IDCardButtonProps> = ({ onPress }) => {
    const { t } = useTranslation();

    return (
        <View style={styles.actionStack}>
            <TouchableOpacity
                style={styles.idCardBtn}
                activeOpacity={0.8}
                onPress={onPress}
            >
                <LinearGradient
                    colors={['#1E293B', '#0F172A']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.idBtnGradient}
                >
                    <View style={styles.idBtnContent}>
                        <View style={styles.idIconWrapper}>
                            <Icon name="card-outline" size={18} color="#FFFFFF" />
                        </View>
                        <View style={styles.idBtnTextWrapper}>
                            <Text style={styles.idBtnText}>{t('profile.idVerification')}</Text>
                            <Text style={styles.idBtnSubtitle}>{t('profile.idVerificationDesc')}</Text>
                        </View>
                    </View>
                    <Icon name="chevron-forward" size={18} color="rgba(255,255,255,0.4)" />
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    actionStack: {
        width: '100%',
        gap: spacing.md,
        alignItems: 'center',
        marginTop: verticalScale(5),
    },
    idCardBtn: {
        width: '100%',
        borderRadius: moderateScale(16),
        overflow: 'hidden',
        borderWidth: 1.5,
        borderColor: 'rgba(255, 255, 255, 0.08)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    idBtnGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
        paddingVertical: verticalScale(16),
        justifyContent: 'space-between',
    },
    idBtnContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },
    idIconWrapper: {
        width: moderateScale(36),
        height: moderateScale(36),
        borderRadius: moderateScale(10),
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    idBtnTextWrapper: {
        gap: 1,
    },
    idBtnText: {
        color: '#FFFFFF',
        fontSize: moderateScale(15),
        fontWeight: '700',
        letterSpacing: 0.3,
    },
    idBtnSubtitle: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: moderateScale(11),
        fontWeight: '500',
        letterSpacing: 0.1,
    },
});
