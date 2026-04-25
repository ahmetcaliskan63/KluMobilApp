import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { AcademicSemesterCalendar } from '@/shared/types/models';
import { Theme } from '@/core/theme/theme';
import { moderateScale } from '@/shared/utils/responsive';

interface SemesterToggleProps {
    semesters: AcademicSemesterCalendar[];
    activeSemesterId: string;
    onToggle: (id: string) => void;
}

export const SemesterToggle: React.FC<SemesterToggleProps> = ({ semesters, activeSemesterId, onToggle }) => {
    const { theme } = useAppTheme();
    const s = styles(theme);

    return (
        <View style={s.toggleContainer}>
            {semesters.map((semester) => {
                const pieces = semester.name.split(' ');
                const displayLabel = pieces.length > 1 ? pieces.slice(1).join(' ') : semester.name;
                
                return (
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
                            {displayLabel}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = (theme: Theme) => StyleSheet.create({
    toggleContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 16,
        padding: 4,
        marginBottom: 24,
    },
    toggleBtn: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 12,
    },
    toggleBtnActive: {
        backgroundColor: theme.colors.primary,
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    toggleText: {
        fontSize: moderateScale(13),
        fontWeight: '700',
        color: 'rgba(255, 255, 255, 0.6)',
    },
    toggleTextActive: {
        color: '#FFFFFF',
    },
});
