import React, { useState, useMemo } from 'react';
import { View, ScrollView, StatusBar } from 'react-native';
import { styles } from './AcademicCalendarScreen.styles';
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { CalendarHeader } from './CalendarHeader';
import { SemesterToggle } from './SemesterToggle';
import { AcademicEventCard } from './AcademicEventCard';
import { MOCK_ACADEMIC_CALENDAR } from '@/shared/services/mockData';
import { useTranslation } from 'react-i18next';

const AcademicCalendarScreen: React.FC = () => {
    const { theme } = useAppTheme();
    const { t } = useTranslation();
    const s = styles(theme);

    const semesters = useMemo(() => MOCK_ACADEMIC_CALENDAR(t), [t]);

    const [activeSemesterId, setActiveSemesterId] = useState(semesters[1]?.id || semesters[0]?.id); // Default to Bahar (current)

    const activeSemester = useMemo(() =>
        semesters.find(sem => sem.id === activeSemesterId) || semesters[0],
        [semesters, activeSemesterId]);

    return (
        <View style={s.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            <View style={s.meshBackground}>
                <View style={[s.bgGlow, { top: '10%', right: '-10%', width: 300, height: 300, backgroundColor: 'rgba(59, 130, 246, 0.08)' }]} />
                <View style={[s.bgGlow, { bottom: '20%', left: '-20%', width: 400, height: 400, backgroundColor: 'rgba(99, 102, 241, 0.05)' }]} />
            </View>

            <CalendarHeader />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={s.scrollContent}
            >
                <SemesterToggle
                    semesters={semesters}
                    activeSemesterId={activeSemesterId}
                    onToggle={setActiveSemesterId}
                />

                {activeSemester.events.map((event) => (
                    <AcademicEventCard
                        key={event.id}
                        event={event}
                        isCurrent={new Date(event.startDate) <= new Date() && (!event.endDate || new Date(event.endDate) >= new Date())}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

export default AcademicCalendarScreen;
