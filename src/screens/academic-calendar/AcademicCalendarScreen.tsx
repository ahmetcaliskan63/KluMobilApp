import React, { useState } from 'react';
import { View, ScrollView, StatusBar } from 'react-native';
import { styles } from './AcademicCalendarScreen.styles';
import { useAppTheme } from '../../hooks/useAppTheme';
import { CalendarHeader } from './components/CalendarHeader';
import { SemesterToggle } from './components/SemesterToggle';
import { AcademicEventCard } from './components/AcademicEventCard';
import { ACADEMIC_CALENDAR_DATA } from './constants';

const AcademicCalendarScreen: React.FC = () => {
    const { theme } = useAppTheme();
    const s = styles(theme);
    const [activeSemesterId, setActiveSemesterId] = useState(ACADEMIC_CALENDAR_DATA[1].id); // Default to Bahar (current)

    const activeSemester = ACADEMIC_CALENDAR_DATA.find(s => s.id === activeSemesterId)
        || ACADEMIC_CALENDAR_DATA[0];

    return (
        <View style={s.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
            <CalendarHeader />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={s.scrollContent}
            >
                <SemesterToggle
                    semesters={ACADEMIC_CALENDAR_DATA}
                    activeSemesterId={activeSemesterId}
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
