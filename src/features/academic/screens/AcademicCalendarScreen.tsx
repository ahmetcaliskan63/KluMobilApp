import React, { useState } from 'react';
import { View, Text, ScrollView, StatusBar } from 'react-native';
import { styles } from './AcademicCalendarScreen.styles';
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { CalendarHeader } from './CalendarHeader';
import { SemesterToggle } from './SemesterToggle';
import { AcademicEventCard } from './AcademicEventCard';
import { AcademicSemester } from './types';
import { useFetch } from '@/shared/hooks/useFetch';

const AcademicCalendarScreen: React.FC = () => {
    const { theme } = useAppTheme();
    const s = styles(theme);
    const { data: calendarData, loading, error } = useFetch<AcademicSemester[]>('/academic-calendar');
    const [activeSemesterId, setActiveSemesterId] = useState<string | null>(null);

    // Update activeSemesterId once data is loaded if not already set
    React.useEffect(() => {
        if (calendarData && calendarData.length > 0 && !activeSemesterId) {
            setActiveSemesterId(calendarData[1]?.id || calendarData[0]?.id);
        }
    }, [calendarData]);

    if (loading && !calendarData) {
        return (
            <View style={[s.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
                <CalendarHeader />
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{ color: theme.colors.primary }}>Yükleniyor...</Text>
                </View>
            </View>
        );
    }

    if (error || !calendarData) {
        return (
            <View style={[s.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
                <CalendarHeader />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                    <Text style={{ color: theme.colors.error, textAlign: 'center' }}>
                        Akademik takvim yüklenirken bir hata oluştu.
                    </Text>
                </View>
            </View>
        );
    }

    const activeSemester = calendarData.find(sem => sem.id === activeSemesterId)
        || calendarData[0];

    return (
        <View style={s.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
            <CalendarHeader />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={s.scrollContent}
            >
                <SemesterToggle
                    semesters={calendarData}
                    activeSemesterId={activeSemesterId || ''}
                    onToggle={setActiveSemesterId}
                />

                {activeSemester.events.map((event) => (
                    <AcademicEventCard
                        key={event.id}
                        event={event}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

export default AcademicCalendarScreen;

