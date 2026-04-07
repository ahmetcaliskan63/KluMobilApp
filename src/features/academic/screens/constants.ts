import { AcademicSemester } from './types';

export const ACADEMIC_CALENDAR_DATA: AcademicSemester[] = [
    {
        id: '2024-2025-GUZ',
        name: '2024-2025 Güz Yarıyılı',
        events: [
            {
                id: '1',
                title: 'Ders Kayıtları ve Danışman Onayları',
                startDate: '16 Eylül 2024',
                endDate: '20 Eylül 2024',
                type: 'REGISTRATION'
            },
            {
                id: '2',
                title: 'Derslerin Başlaması',
                startDate: '23 Eylül 2024',
                type: 'ACADEMIC'
            },
            {
                id: '3',
                title: 'Ara Sınavlar (Vizeler)',
                startDate: '11 Kasım 2024',
                endDate: '22 Kasım 2024',
                type: 'EXAM'
            },
            {
                id: '4',
                title: 'Derslerin Sona Ermesi',
                startDate: '10 Ocak 2025',
                type: 'ACADEMIC'
            },
            {
                id: '5',
                title: 'Yıl Sonu Sınavları (Finaller)',
                startDate: '13 Ocak 2025',
                endDate: '24 Ocak 2025',
                type: 'EXAM'
            },
            {
                id: '6',
                title: 'Bütünleme Sınavları',
                startDate: '03 Şubat 2025',
                endDate: '07 Şubat 2025',
                type: 'EXAM'
            },
        ]
    },
    {
        id: '2024-2025-BAHAR',
        name: '2024-2025 Bahar Yarıyılı',
        events: [
            {
                id: '7',
                title: 'Ders Kayıtları ve Danışman Onayları',
                startDate: '17 Şubat 2025',
                endDate: '21 Şubat 2025',
                type: 'REGISTRATION'
            },
            {
                id: '8',
                title: 'Derslerin Başlaması',
                startDate: '24 Şubat 2025',
                type: 'ACADEMIC'
            },
            {
                id: '9',
                title: 'Ara Sınavlar (Vizeler)',
                startDate: '14 Nisan 2025',
                endDate: '25 Nisan 2025',
                type: 'EXAM'
            },
            {
                id: '10',
                title: 'Derslerin Sona Ermesi',
                startDate: '06 Haziran 2025',
                type: 'ACADEMIC'
            },
            {
                id: '11',
                title: 'Yıl Sonu Sınavları (Finaller)',
                startDate: '09 Haziran 2025',
                endDate: '20 Haziran 2025',
                type: 'EXAM'
            },
        ]
    }
];

export const EVENT_THEMES = {
    REGISTRATION: {
        color: '#3B82F6', // Blue
        icon: 'pencil-outline',
        label: 'Kayıt Dönemi'
    },
    EXAM: {
        color: '#F59E0B', // Amber
        icon: 'document-text-outline',
        label: 'Sınav Dönemi'
    },
    HOLIDAY: {
        color: '#EF4444', // Red
        icon: 'sunny-outline',
        label: 'Resmi Tatil'
    },
    ACADEMIC: {
        color: '#10B981', // Emerald
        icon: 'school-outline',
        label: 'Akademik Süreç'
    },
    GRADUATION: {
        color: '#8B5CF6', // Violet
        icon: 'ribbon-outline',
        label: 'Mezuniyet'
    }
} as const;

