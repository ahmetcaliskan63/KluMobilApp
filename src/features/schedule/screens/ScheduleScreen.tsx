import React, { useState, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Theme } from '@/core/theme/theme';
import { MOCK_SCHEDULE } from '@/shared/services/mockData';
import { useNavigation, NavigationProp, useIsFocused } from '@react-navigation/native';
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { moderateScale, scale, verticalScale } from '@/shared/utils/responsive';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import { EdgeInsets } from 'react-native-safe-area-context';

// Refactored Components
import { DayPicker } from '../components/DayPicker';
import { ScheduleItem } from '../components/ScheduleItem';
import { EmptySchedule } from '../components/EmptySchedule';

export const ScheduleScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<NavigationProp<any>>();
    const { theme, isDarkMode } = useAppTheme();
    const { t } = useTranslation();
    const s = styles(theme, insets);
    const isFocused = useIsFocused();

    const DAYS = useMemo(() => [
        t('common.days.monday'),
        t('common.days.tuesday'),
        t('common.days.wednesday'),
        t('common.days.thursday'),
        t('common.days.friday'),
    ], [t]);

    const [selectedDay, setSelectedDay] = useState(DAYS[0]);

    const schedule = useMemo(() => MOCK_SCHEDULE(t), [t]);
    const filteredSchedule = useMemo(() =>
        schedule.filter(course => course.day === selectedDay),
        [schedule, selectedDay]);

    return (
        <View style={s.container}>
            {isFocused && (
                <StatusBar 
                    barStyle="light-content" 
                    backgroundColor={isDarkMode ? "#0F172A" : "#182958"} 
                    translucent={false} 
                />
            )}

            <LinearGradient
                colors={isDarkMode ? ['#0F172A', '#020617'] : ['#182958', '#101D42']}
                style={[s.header, { paddingTop: verticalScale(35) }]}
            >
                <View style={s.headerTop}>
                    <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={s.backButton}>
                        <Icon name="chevron-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text style={s.headerTitle}>{t('navigation.schedule')}</Text>
                    <View style={{ width: 40 }} />
                </View>

                <DayPicker
                    days={DAYS}
                    selectedDay={selectedDay}
                    onDaySelect={setSelectedDay}
                    theme={theme}
                    isDarkMode={isDarkMode}
                />
            </LinearGradient>

            <ScrollView
                contentContainerStyle={s.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {filteredSchedule.length > 0 ? (
                    filteredSchedule.map((course) => (
                        <ScheduleItem
                            key={course.id}
                            course={course}
                            theme={theme}
                            isDarkMode={isDarkMode}
                            onPress={() => navigation.navigate('CourseDetail', { courseId: course.id })}
                        />
                    ))
                ) : (
                    <EmptySchedule
                        message={t('schedule.noClasses')}
                        theme={theme}
                        isDarkMode={isDarkMode}
                    />
                )}
            </ScrollView>
        </View>
    );
};

const styles = (theme: Theme, insets: EdgeInsets) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        paddingBottom: verticalScale(24),
        borderBottomLeftRadius: moderateScale(32),
        borderBottomRightRadius: moderateScale(32),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: scale(16),
        marginBottom: verticalScale(20),
    },
    backButton: {
        width: moderateScale(40),
        height: moderateScale(40),
        borderRadius: moderateScale(20),
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: moderateScale(20),
        fontWeight: '900',
        color: '#FFFFFF',
        letterSpacing: -0.5,
    },
    scrollContent: {
        paddingHorizontal: scale(20),
        paddingTop: verticalScale(30),
        paddingBottom: insets.bottom + verticalScale(30),
    },
});
