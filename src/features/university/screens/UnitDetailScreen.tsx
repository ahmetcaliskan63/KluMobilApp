import React, { useRef, useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Animated, Linking, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { moderateScale } from '@/shared/utils/responsive';
import { MOCK_UNIT_DETAIL } from '@/shared/services/mockData';
import { useTranslation } from 'react-i18next';
import { styles } from './UnitDetailScreen.styles';

// Modular Components
import { UnitInfoRow } from '../components/UnitInfoRow';
import { UnitMapButton } from '../components/UnitMapButton';

export const UnitDetailScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { unitId } = route.params;
    const { theme, isDarkMode } = useAppTheme();
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();
    const s = styles(theme, isDarkMode);

    // Using MOCK_UNIT_DETAIL for realistic integration
    const unit = useMemo(() => MOCK_UNIT_DETAIL(t, unitId), [t, unitId]);
    const loading = false; // Mock data is instant

    const ROW_CONFIG = useMemo(() => ({
        phone: { icon: 'call' as const, label: t('profile.phone').toUpperCase(), color: '#6366F1', bg: '#EEF2FF' },
        fax: { icon: 'print' as const, label: t('university.units.fax').toUpperCase(), color: '#64748B', bg: '#F1F5F9' },
        mail: { icon: 'mail' as const, label: t('profile.email').toUpperCase(), color: '#10B981', bg: '#ECFDF5' },
        staff: { icon: 'people' as const, label: t('faculty.title').toUpperCase(), color: '#8B5CF6', bg: '#F5F3FF' },
        web: { icon: 'globe' as const, label: t('university.units.website').toUpperCase(), color: '#06B6D4', bg: '#ECFEFF' },
        address: { icon: 'location' as const, label: t('profile.address').toUpperCase(), color: '#F43F5E', bg: '#FFF1F2' },
    }), [t]);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(40)).current;

    useEffect(() => {
        if (!loading && unit) {
            Animated.parallel([
                Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
                Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true })
            ]).start();
        }
    }, [loading, unit, fadeAnim, slideAnim]);

    const handleLink = async (url: string) => {
        try {
            const canOpen = await Linking.canOpenURL(url);
            if (canOpen) await Linking.openURL(url);
        } catch (error) {
            console.error('Linking error:', error);
        }
    };

    if (loading) {
        return (
            <View style={s.loaderContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <Text style={s.loaderText}>{t('common.loading')}...</Text>
            </View>
        );
    }

    if (!unit) return null;

    return (
        <View style={s.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            <View style={s.headerContainer}>
                <LinearGradient
                    colors={isDarkMode ? ['#0F172A', '#020617'] : ['#182958', '#4F46E5']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[s.headerGradient, { paddingTop: insets.top + 20 }]}
                >
                    <View style={s.headerTopRow}>
                        <TouchableOpacity style={s.backCircle} onPress={() => navigation.goBack()}>
                            <Icon name="arrow-back" size={24} color="#FFF" />
                        </TouchableOpacity>
                        <Text style={s.headerMainTitle}>{unit?.type || ''}</Text>
                        <View style={{ width: 44 }} />
                    </View>
                </LinearGradient>
            </View>

            <Animated.ScrollView
                style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
                contentContainerStyle={[s.scrollContent, { paddingBottom: insets.bottom + 40 }]}
                showsVerticalScrollIndicator={false}
            >
                <View style={s.identityCard}>
                    <View style={s.unitIconHousing}>
                        <LinearGradient
                            colors={isDarkMode ? ['#1e293b', '#0f172a'] : ['#F8FAFC', '#E2E8F0']}
                            style={s.iconInner}
                        >
                            <Icon name="business" size={moderateScale(40)} color={isDarkMode ? theme.colors.primary : '#182958'} />
                        </LinearGradient>
                    </View>

                    <View style={s.identityInfo}>
                        <Text style={s.unitFullName}>{unit?.name || ''}</Text>
                    </View>
                </View>

                <View style={s.dataBox}>
                    <UnitInfoRow
                        config={ROW_CONFIG.phone}
                        value={unit?.phones?.join(' / ') || ''}
                        onPress={() => unit?.phones?.[0] && handleLink(`tel:${unit.phones[0]}`)}
                        theme={theme}
                        isDarkMode={isDarkMode}
                    />
                    {unit?.fax && (
                        <UnitInfoRow
                            config={ROW_CONFIG.fax}
                            value={unit.fax}
                            theme={theme}
                            isDarkMode={isDarkMode}
                        />
                    )}
                    <UnitInfoRow
                        config={ROW_CONFIG.staff}
                        value={t('faculty.myInstructors')}
                        onPress={() => navigation.navigate('Faculty')}
                        theme={theme}
                        isDarkMode={isDarkMode}
                    />
                    <UnitInfoRow
                        config={ROW_CONFIG.mail}
                        value={unit?.email || ''}
                        isLink
                        onPress={() => unit?.email && handleLink(`mailto:${unit.email}`)}
                        theme={theme}
                        isDarkMode={isDarkMode}
                    />
                    <UnitInfoRow
                        config={ROW_CONFIG.web}
                        value={unit?.website || ''}
                        isLink
                        onPress={() => unit?.website && handleLink(unit.website)}
                        theme={theme}
                        isDarkMode={isDarkMode}
                    />
                    <UnitInfoRow
                        config={ROW_CONFIG.address}
                        value={unit?.address || ''}
                        theme={theme}
                        isDarkMode={isDarkMode}
                    />
                </View>

                {unit?.location && (
                    <UnitMapButton
                        onPress={() => handleLink(`https://www.google.com/maps/search/?api=1&query=${unit.location.latitude},${unit.location.longitude}`)}
                        theme={theme}
                        isDarkMode={isDarkMode}
                    />
                )}
            </Animated.ScrollView>
        </View>
    );
};

export default UnitDetailScreen;

