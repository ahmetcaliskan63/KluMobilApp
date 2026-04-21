import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons as Icon } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { styles } from './AcademicCalendarScreen.styles';
import { useAppTheme } from '@/shared/hooks/useAppTheme';

export const CalendarHeader: React.FC = () => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const { theme } = useAppTheme();
    const s = styles(theme);

    return (
        <LinearGradient
            colors={['#182958', '#101D42']}
            style={[s.header, { paddingTop: insets.top + 10 }]}
        >
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={s.backButton}
                activeOpacity={0.7}
            >
                <Icon name="chevron-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>

            <Text style={s.headerTitle}>Akademik Takvim</Text>

            <TouchableOpacity style={s.headerRight} activeOpacity={0.7}>
                <Icon name="share-outline" size={22} color="#FFFFFF" />
            </TouchableOpacity>
        </LinearGradient>
    );
};

