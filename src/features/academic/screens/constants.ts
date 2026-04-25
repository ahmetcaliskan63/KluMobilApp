export const EVENT_THEMES = (t: any) => ({
    REGISTRATION: {
        color: '#3B82F6', // Blue
        icon: 'pencil-outline',
        label: t('academic.registration')
    },
    EXAM: {
        color: '#F59E0B', // Amber
        icon: 'document-text-outline',
        label: t('academic.examPeriod')
    },
    HOLIDAY: {
        color: '#EF4444', // Red
        icon: 'sunny-outline',
        label: t('academic.holiday')
    },
    ACADEMIC: {
        color: '#10B981', // Emerald
        icon: 'school-outline',
        label: t('academic.academicCycle')
    },
    GRADUATION: {
        color: '#8B5CF6', // Violet
        icon: 'ribbon-outline',
        label: t('academic.graduation')
    }
} as const);
