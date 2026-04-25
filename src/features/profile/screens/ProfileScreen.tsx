import React, { useState, useMemo } from 'react';
import { View, ScrollView, StatusBar, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthStore } from '@/shared/store/authStore';
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { MOCK_ACADEMIC_STATS } from '@/shared/services/mockData';
import { useTranslation } from 'react-i18next';
import { styles } from './ProfileScreen.styles';

// Refactored Components
import { PersonaSection } from '../components/PersonaSection';
import { QuickAccessItem } from '../components/QuickAccessItem';
import { ProfileModals } from '../components/ProfileModals';
import { IDCardButton } from '../components/IDCardButton';

export const ProfileScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const { user } = useAuthStore();
    const { theme, isDarkMode } = useAppTheme();
    const { t, i18n } = useTranslation();
    const insets = useSafeAreaInsets();

    // Modal States
    const [showIdModal, setShowIdModal] = useState(false);
    const [showCalendarModal, setShowCalendarModal] = useState(false);
    const [isLandscape, setIsLandscape] = useState(false);

    const s = styles(theme);

    const stats = useMemo(() => MOCK_ACADEMIC_STATS(t, user?.role), [t, i18n.language, user?.role]);

    const quickAccessItems = useMemo(() => [
        { id: '1', title: t('profile.quickActions.schedule'), icon: 'calendar', color: '#3B82F6', action: () => navigation.navigate('HomeStack', { screen: 'Schedule' }) },
        { id: '2', title: t('profile.quickActions.transcript'), icon: 'document-text', color: '#8B5CF6', action: () => navigation.navigate('Transcript') },
        { id: '3', title: t('profile.quickActions.academicCalendar'), icon: 'time', color: '#10B981', action: () => setShowCalendarModal(true) },
        { id: '4', title: t('profile.quickActions.examSchedule'), icon: 'notifications', color: '#F59E0B', action: () => navigation.navigate('ExamSchedule') },
        { id: '5', title: t('profile.quickActions.examResults'), icon: 'ribbon', color: '#EF4444', action: () => navigation.navigate('ExamResults') },
        { id: '6', title: t('profile.quickActions.email'), icon: 'key', color: '#6366F1', action: () => Linking.openURL('https://kluposta.klu.edu.tr/') },
        { id: '7', title: t('profile.quickActions.wifi'), icon: 'wifi', color: '#06B6D4', action: () => { } },
        { id: '8', title: t('profile.quickActions.instructors'), icon: 'people', color: '#EC4899', action: () => navigation.navigate('Faculty') },
        { id: '9', title: t('profile.quickActions.units'), icon: 'business', color: '#F97316', action: () => navigation.navigate('Units') },
        ...(user?.role === 'academic' ? [{ id: '10', title: t('profile.quickActions.leaveManagement'), icon: 'calendar-outline', color: '#059669', action: () => navigation.navigate('LeaveStatus') }] : []),
    ], [t, i18n.language, user?.role, navigation]);

    return (
        <View style={s.container}>
            <StatusBar barStyle="light-content" backgroundColor="#182958" translucent={false} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[s.scrollContent, { paddingTop: insets.top }]}
            >
                {/* Decorative Background Element */}
                <View style={s.decorativeCircle} />

                {/* Persona Info & Stats Section */}
                <PersonaSection
                    user={user}
                    stats={stats}
                    theme={theme}
                    isDarkMode={isDarkMode}
                    onPress={() => navigation.navigate('ProfileDetail')}
                />

                {/* ID Verification Button */}
                <IDCardButton onPress={() => setShowIdModal(true)} />

                {/* Quick Access Section */}
                <View style={s.quickAccessSection}>
                    <View style={s.quickStack}>
                        {quickAccessItems.map((item) => (
                            <QuickAccessItem
                                key={item.id}
                                {...item}
                                theme={theme}
                                isDarkMode={isDarkMode}
                                onPress={item.action}
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>

            {/* Modals (Digital ID & Academic Calendar) */}
            <ProfileModals
                showIdModal={showIdModal}
                setShowIdModal={setShowIdModal}
                showCalendarModal={showCalendarModal}
                setShowCalendarModal={setShowCalendarModal}
                isLandscape={isLandscape}
                setIsLandscape={setIsLandscape}
                user={user}
                theme={theme}
                isDarkMode={isDarkMode}
                t={t}
            />
        </View>
    );
};

export default ProfileScreen;
