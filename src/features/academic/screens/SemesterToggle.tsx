import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '@/features/academic/screens/AcademicCalendarScreen.styles';
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { AcademicSemester } from '@/features/academic/screens/types';

interface Props {
    semesters: AcademicSemester[];
    activeSemesterId: string;
    onToggle: (id: string) => void;
}

export const SemesterToggle: React.FC<Props> = ({ semesters, activeSemesterId, onToggle }) => {
    const { theme } = useAppTheme();
    const s = styles(theme);

    return (
        <View style={s.toggleContainer}>
            {semesters.map((semester) => (
                <TouchableOpacity
                    key={semester.id}
                    style={[
                        s.toggleBtn,
                        activeSemesterId === semester.id && s.toggleBtnActive
                    ]}
                    onPress={() => onToggle(semester.id)}
                    activeOpacity={0.8}
                >
                    <Text style={[
                        s.toggleText,
                        activeSemesterId === semester.id && s.toggleTextActive
                    ]}>
                        {semester.name.split(' ')[1]} {semester.name.split(' ')[2]}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

