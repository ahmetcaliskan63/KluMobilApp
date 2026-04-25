import React, { useEffect, useMemo, useRef } from 'react';
import { View, Text, Animated, ScrollView, Linking, StatusBar } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MOCK_SCHEDULE, MOCK_FACULTY_MEMBERS, MOCK_FACULTY_PROFILES } from '@/shared/services/mockData';
import { styles } from './FacultyScreen.styles';

// Modular Components
import { FacultyHeader } from '../components/FacultyHeader';
import { InstructorCard } from '../components/InstructorCard';
import { FeaturedInstructorCard } from '../components/FeaturedInstructorCard';

export const FacultyScreen: React.FC = () => {
    const { theme } = useAppTheme();
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();
    const s = styles(theme);

    // Animations
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
            Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
        ]).start();
    }, [fadeAnim, slideAnim]);

    // Memoize Data
    const facultyProfiles = useMemo(() => MOCK_FACULTY_PROFILES(t), [t]);
    const facultyMembers = useMemo(() => MOCK_FACULTY_MEMBERS(t), [t]);
    
    // Logic to find current term instructors from schedule
    const termInstructors = useMemo(() => {
        const scheduleNames = [...new Set(MOCK_SCHEDULE(t).map(course => course.instructor))];
        return facultyMembers.filter(f => scheduleNames.includes(f.name));
    }, [t, facultyMembers]);

    const handleEmailPress = async (email: string) => {
        const url = `mailto:${email}`;
        try {
            const canOpen = await Linking.canOpenURL(url);
            if (canOpen) await Linking.openURL(url);
        } catch (error) {
            console.error('Email linking error:', error);
        }
    };

    return (
        <View style={s.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            <FacultyHeader title={t('faculty.title')} />

            <Animated.ScrollView
                style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
                contentContainerStyle={[s.scrollContent, { paddingBottom: insets.bottom + 40 }]}
                showsVerticalScrollIndicator={false}
            >
                {/* 1. Academic Advisor */}
                <Text style={[s.sectionHeader, { marginTop: 0 }]}>{t('faculty.advisor')}</Text>
                <FeaturedInstructorCard 
                    profile={facultyProfiles.find(p => p.id === 'adv_1')} 
                    label={t('faculty.advisor').toUpperCase()}
                    onEmailPress={handleEmailPress}
                />

                {/* 2. Department Head */}
                <Text style={[s.sectionHeader]}>{t('faculty.management')}</Text>
                <FeaturedInstructorCard 
                    profile={facultyProfiles.find(p => p.id === 'dept_1')} 
                    label={t('faculty.departmentHead').toUpperCase()}
                    onEmailPress={handleEmailPress}
                />

                {/* 3. My Instructors List */}
                <View style={s.sectionTitleRow}>
                    <Text style={s.sectionHeader}>{t('faculty.myInstructors')}</Text>
                    <View style={s.termBadge}>
                        <Text style={s.termBadgeText}>{t('exams.term')}</Text>
                    </View>
                </View>

                <View style={s.termList}>
                    {termInstructors.map(instructor => (
                        <InstructorCard 
                            key={instructor.id} 
                            item={instructor} 
                            onEmailPress={handleEmailPress} 
                        />
                    ))}
                </View>
            </Animated.ScrollView>
        </View>
    );
};

export default FacultyScreen;
