import React, { useMemo, ComponentProps } from 'react';
import { View, Text, SectionList, StatusBar } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { MOCK_UNITS } from '@/shared/services/mockData';
import { Unit } from '@/shared/types/models';
import { useTranslation } from 'react-i18next';
import { Ionicons as Icon } from '@expo/vector-icons';
import { styles } from './UnitsScreen.styles';

// Modular Components
import { UnitCard } from '../components/UnitCard';
import { UnitsHeader } from '../components/UnitsHeader';

const CATEGORY_STYLES: Record<string, { color: string; icon: ComponentProps<typeof Icon>['name']; bg: string }> = {
    'Birim': { color: '#6366F1', icon: 'layers-outline', bg: '#EEF2FF' },
    'Enstitü': { color: '#F59E0B', icon: 'school-outline', bg: '#FFFBEB' },
    'Fakülte': { color: '#10B981', icon: 'business-outline', bg: '#ECFDF5' },
    'Yüksekokul': { color: '#EC4899', icon: 'ribbon-outline', bg: '#FDF2F8' },
    'Meslek Yüksekokulu': { color: '#8B5CF6', icon: 'construct-outline', bg: '#F5F3FF' },
};

export const UnitsScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const { theme, isDarkMode } = useAppTheme();
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();
    const s = styles(theme, isDarkMode);
    const isFocused = useIsFocused();

    // Memoize the unit data and grouping logic
    const units = useMemo(() => MOCK_UNITS(t), [t]);

    const CATEGORY_TITLES: Record<string, string> = useMemo(() => ({
        'Birim': t('university.units.administrative'),
        'Enstitü': t('university.units.institutes'),
        'Fakülte': t('university.units.faculties'),
        'Yüksekokul': t('university.units.colleges'),
        'Meslek Yüksekokulu': t('university.units.vocational'),
    }), [t]);

    const filteredSections = useMemo(() => {
        if (!units) return [];

        const order = ['Birim', 'Enstitü', 'Fakülte', 'Yüksekokul', 'Meslek Yüksekokulu'];
        const sections: { title: string; data: Unit[] }[] = [];

        order.forEach(type => {
            const items = units.filter(u => u.type === type);

            if (items.length > 0) {
                sections.push({
                    title: CATEGORY_TITLES[type],
                    data: items,
                });
            }
        });

        return sections;
    }, [units, CATEGORY_TITLES]);

    return (
        <View style={s.container}>
            {isFocused && (
                <StatusBar 
                    barStyle="light-content" 
                    backgroundColor={isDarkMode ? "#0F172A" : "#182958"} 
                    translucent={false} 
                />
            )}

            <UnitsHeader
                title={t('university.units.faculties')}
                isDarkMode={isDarkMode}
            />

            <SectionList
                sections={filteredSections}
                keyExtractor={(item) => item.id}
                stickySectionHeadersEnabled={false}
                renderItem={({ item, index }) => (
                    <UnitCard
                        item={item}
                        index={index}
                        theme={theme}
                        isDarkMode={isDarkMode}
                        categoryStyle={CATEGORY_STYLES[item.type] || CATEGORY_STYLES['Birim']}
                        onPress={() => navigation.navigate('UnitDetail', { unitId: item.id })}
                    />
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <View style={s.sectionHeader}>
                        <Text style={s.sectionTitleText}>{title}</Text>
                        <View style={s.sectionDivider} />
                    </View>
                )}
                ListEmptyComponent={() => (
                    <View style={s.emptyContainer}>
                        <Icon name="search-outline" size={48} color={theme.colors.textSecondary + '40'} />
                        <Text style={s.emptyText}>{t('common.noData')}</Text>
                    </View>
                )}
                contentContainerStyle={[s.listContent, { paddingBottom: insets.bottom + 20 }]}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default UnitsScreen;
