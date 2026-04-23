import React from 'react';
import { View, Text, Modal, Pressable, TouchableOpacity, Animated, Linking, StyleSheet } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '@/core/theme/theme';
import { moderateScale, verticalScale, viewport } from '@/shared/utils/responsive';
import { DigitalPassportCard } from '@/shared/components/profile/DigitalPassportCard';
import { User } from '@/shared/types/models';

import { MOCK_CALENDAR_PDFS } from '@/shared/services/mockData';

interface ProfileModalsProps {
    showIdModal: boolean;
    setShowIdModal: (show: boolean) => void;
    showCalendarModal: boolean;
    setShowCalendarModal: (show: boolean) => void;
    isLandscape: boolean;
    setIsLandscape: (landscape: boolean) => void;
    user: User | null;
    theme: Theme;
    isDarkMode: boolean;
    t: any;
}

export const ProfileModals: React.FC<ProfileModalsProps> = ({
    showIdModal,
    setShowIdModal,
    showCalendarModal,
    setShowCalendarModal,
    isLandscape,
    setIsLandscape,
    user,
    theme,
    isDarkMode,
    t
}) => {
    const s = styles(theme, isDarkMode);
    const calendarOptions = React.useMemo(() => MOCK_CALENDAR_PDFS(t), [t]);

    return (
        <>
            {/* Digital ID Modal */}
            <Modal
                visible={showIdModal}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowIdModal(false)}
            >
                <Pressable style={s.modalOverlay}>
                    <View style={s.modalControls}>
                        <TouchableOpacity
                            onPress={() => setIsLandscape(!isLandscape)}
                            style={s.controlBtn}
                        >
                            <Icon name={isLandscape ? "contract" : "expand"} size={26} color="#FFFFFF" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                setShowIdModal(false);
                                setIsLandscape(false);
                            }}
                            style={s.controlBtn}
                        >
                            <Icon name="close" size={28} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>

                    <View style={s.modalContainer}>
                        <View style={[
                            s.cardScaleWrapper,
                            isLandscape && s.landscapeCard
                        ]}>
                            <DigitalPassportCard user={user} />
                        </View>
                    </View>
                </Pressable>
            </Modal>

            {/* Academic Calendar Modal */}
            <Modal
                visible={showCalendarModal}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowCalendarModal(false)}
            >
                <Pressable
                    style={s.modalOverlay}
                    onPress={() => setShowCalendarModal(false)}
                >
                    <Animated.View style={s.calendarModalCard}>
                        <View style={s.calendarModalHeader}>
                            <Text style={[s.calendarModalTitle, { color: theme.colors.text }]}>{t('academic.calendar.title')}</Text>
                            <Text style={s.calendarModalSubtitle}>{t('academic.calendar.selectionDesc') || 'Eğitim Yılı Program Seçimi'}</Text>
                        </View>

                        <View style={s.calendarBtnStack}>
                            {calendarOptions.map((option) => (
                                <CalendarOption
                                    key={option.id}
                                    title={option.title}
                                    subtitle={option.subtitle}
                                    colors={option.colors}
                                    url={option.url}
                                    onComplete={() => setShowCalendarModal(false)}
                                />
                            ))}
                        </View>

                        <TouchableOpacity
                            style={s.calendarCloseBtn}
                            onPress={() => setShowCalendarModal(false)}
                        >
                            <Text style={s.calendarCloseBtnText}>{t('common.close')}</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </Pressable>
            </Modal>
        </>
    );
};

const CalendarOption = ({ title, subtitle, colors, url, onComplete }: any) => (
    <TouchableOpacity
        style={modalStyles.calendarOptionBtn}
        onPress={() => {
            Linking.openURL(url);
            onComplete();
        }}
    >
        <LinearGradient
            colors={colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={modalStyles.calendarBtnGradient}
        >
            <View style={modalStyles.calendarBtnMain}>
                <Text style={modalStyles.calendarBtnText}>{title}</Text>
                <Text style={modalStyles.calendarBtnSubtext}>{subtitle}</Text>
            </View>
            <Icon name="chevron-forward" size={18} color="rgba(255,255,255,0.6)" />
        </LinearGradient>
    </TouchableOpacity>
);

const modalStyles = StyleSheet.create({
    calendarOptionBtn: {
        width: '100%',
        borderRadius: moderateScale(20),
        overflow: 'hidden',
        borderWidth: 1.5,
        borderColor: 'rgba(255, 255, 255, 0.15)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 6,
    },
    calendarBtnGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24, // spacing.xl
        paddingVertical: verticalScale(16),
    },
    calendarBtnMain: {
        gap: 2,
    },
    calendarBtnText: {
        color: '#FFFFFF',
        fontSize: moderateScale(15),
        fontWeight: '800',
        letterSpacing: -0.3,
    },
    calendarBtnSubtext: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: moderateScale(11),
        fontWeight: '500',
    },
});

const styles = (theme: Theme, isDarkMode: boolean) => StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(2, 6, 23, 0.92)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '100%',
        alignItems: 'center',
    },
    modalControls: {
        position: 'absolute',
        top: verticalScale(60),
        width: '85%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
    },
    controlBtn: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        padding: moderateScale(10),
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    cardScaleWrapper: {
        transform: [{ scale: 1.07 }],
        width: viewport.width,
        alignItems: 'center',
    },
    landscapeCard: {
        transform: [
            { rotate: '90deg' },
            { scale: 1.4 }
        ],
        marginTop: verticalScale(40),
    },
    calendarModalCard: {
        width: '92%',
        backgroundColor: theme.colors.card,
        borderRadius: moderateScale(30),
        paddingVertical: verticalScale(30),
        paddingHorizontal: 24,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 25 },
        shadowOpacity: 0.25,
        shadowRadius: 35,
        elevation: 25,
        borderWidth: 2,
        borderColor: isDarkMode ? theme.colors.primary : '#991B1B',
    },
    calendarModalHeader: {
        alignItems: 'center',
        marginBottom: verticalScale(28),
    },
    calendarModalTitle: {
        fontSize: moderateScale(24),
        fontWeight: '900',
        marginBottom: 6,
        letterSpacing: -0.8,
    },
    calendarModalSubtitle: {
        fontSize: moderateScale(14),
        color: '#64748B',
        textAlign: 'center',
        fontWeight: '600',
        letterSpacing: -0.2,
    },
    calendarBtnStack: {
        width: '100%',
        gap: verticalScale(14),
    },
    calendarCloseBtn: {
        marginTop: verticalScale(24),
        paddingVertical: verticalScale(12),
        paddingHorizontal: 32,
        borderRadius: 16,
        backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
    },
    calendarCloseBtnText: {
        fontSize: moderateScale(15),
        fontWeight: '700',
        color: theme.colors.textSecondary,
    },
});
