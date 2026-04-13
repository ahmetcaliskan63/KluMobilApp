import React, { useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SectionList,
    TouchableOpacity,
    StatusBar,
    Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { moderateScale } from '@/shared/utils/responsive';
import { useFetch } from '@/shared/hooks/useFetch';
import { Unit } from '@/shared/types/models';
import { Theme, spacing } from '@/core/theme/theme';

const CATEGORY_STYLES: Record<string, { color: string; icon: string; bg: string }> = {
    'Birim': { color: '#6366F1', icon: 'layers-outline', bg: '#EEF2FF' },
    'Enstit': { color: '#F59E0B', icon: 'school-outline', bg: '#FFFBEB' },
    'Faklte': { color: '#10B981', icon: 'business-outline', bg: '#ECFDF5' },
    'Yksekokul': { color: '#EC4899', icon: 'ribbon-outline', bg: '#FDF2F8' },
    'Meslek Yksekokulu': { color: '#8B5CF6', icon: 'construct-outline', bg: '#F5F3FF' },
};

const CATEGORY_TITLES: Record<string, string> = {
    'Birim': 'DAR BRMLER',
    'Enstit': 'ENSTTLER',
    'Faklte': 'FAKLTELER',
    'Yksekokul': 'YKSEKOKULLAR',
    'Meslek Yksekokulu': 'MESLEK YKSEKOKULLARI',
};

const UnitCard: React.FC<{ item: Unit; index: number; onPress: () => void; theme: Theme }> = ({ item, index, onPress, theme }) => {
    const style = CATEGORY_STYLES[item.type] || CATEGORY_STYLES['Birim'];
    const s = styles(theme);
    
    const translateY = useRef(new Animated.Value(20)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: 0,
                duration: 400,
                delay: index * 30,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 400,
                delay: index * 30,
                useNativeDriver: true,
            })
        ]).start();
    }, []);

    return (
        <Animated.View style={{ transform: [{ translateY }], opacity }}>
            <TouchableOpacity
                style={s.cardContainer}
                activeOpacity={0.9}
                onPress={onPress}
            >
                <View style={[s.typeIndicator, { backgroundColor: style.color }]} />
                
                <View style={s.cardInner}>
                    <View style={[s.iconBox, { backgroundColor: style.bg }]}>
                        <Icon name={style.icon} size={20} color={style.color} />
                    </View>
                    
                    <View style={s.textContainer}>
                        <Text style={s.unitNameText} numberOfLines={2}>{item.name}</Text>
                    </View>

                    <View style={s.chevronBox}>
                        <Icon name="chevron-forward" size={16} color="#475569" />
                    </View>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

export const UnitsScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const { theme } = useAppTheme();
    const insets = useSafeAreaInsets();
    const { data: units, loading } = useFetch<Unit[]>('/faculty/units');
    const s = styles(theme);

    if (loading) {
        return (
            <View style={[s.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ color: '#64748B', fontWeight: '600' }}>Birimler listeleniyor...</Text>
            </View>
        );
    }

    // ?? Data Grouping Logic
    const groupUnitsBySection = () => {
        if (!units) return [];
        const sections: { title: string; data: Unit[] }[] = [];
        const order = ['Birim', 'Enstit', 'Faklte', 'Yksekokul', 'Meslek Yksekokulu'];

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
    };

    const sections = groupUnitsBySection();

    return (
        <View style={s.container}>
            <StatusBar barStyle="light-content" backgroundColor="#182958" />

            {/* ?? Premium Minimal Header */}
            <View style={[s.header, { paddingTop: insets.top + spacing.sm }]}>
                <LinearGradient
                    colors={['#182958', '#2A3F7A']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={StyleSheet.absoluteFill}
                />
                <View style={s.headerWatermark}>
                    <Icon name="business" size={moderateScale(100)} color="rgba(255,255,255,0.04)" />
                </View>
                <View style={s.headerContent}>
                    <View style={s.headerTopRow}>
                        <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
                            <Icon name="chevron-back" size={24} color="#FFF" />
                        </TouchableOpacity>
                        <Text style={s.headerTitle}>Birimler</Text>
                        <View style={{ width: 40 }} />
                    </View>
                </View>
            </View>

            <SectionList
                sections={sections}
                keyExtractor={(item) => item.id}
                stickySectionHeadersEnabled={false}
                renderItem={({ item, index }) => (
                    <UnitCard 
                        item={item} 
                        index={index} 
                        theme={theme}
                        onPress={() => navigation.navigate('UnitDetail', { unitId: item.id })}
                    />
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <View style={s.sectionHeader}>
                        <Text style={s.sectionTitleText}>{title}</Text>
                        <View style={s.sectionDivider} />
                    </View>
                )}
                contentContainerStyle={[s.listContent, { paddingBottom: insets.bottom + 20 }]}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = (_theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    header: {
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        overflow: 'hidden',
        elevation: 8,
    },
    headerWatermark: {
        position: 'absolute',
        right: -10,
        bottom: -10,
        opacity: 0.5,
    },
    headerContent: {
        paddingHorizontal: spacing.lg,
        paddingBottom: moderateScale(15),
    },
    headerTopRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: moderateScale(10),
    },
    backBtn: {
        padding: 5,
    },
    headerTitle: {
        fontSize: moderateScale(20),
        fontWeight: '800',
        color: '#FFFFFF',
        letterSpacing: -0.5,
    },
    listContent: {
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.lg,
    },
    sectionHeader: {
        marginTop: moderateScale(24),
        marginBottom: moderateScale(12),
        paddingHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    sectionTitleText: {
        fontSize: moderateScale(12),
        fontWeight: '900',
        color: '#182958',
        letterSpacing: 2,
    },
    sectionDivider: {
        flex: 1,
        height: 1.2,
        backgroundColor: '#CBD5E1',
    },
    cardContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        marginBottom: moderateScale(10),
        flexDirection: 'row',
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#182958',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
        borderWidth: 1.2,
        borderColor: '#94A3B8', 
    },
    typeIndicator: {
        width: 4,
        height: '100%',
    },
    cardInner: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.md,
    },
    iconBox: {
        width: moderateScale(40),
        height: moderateScale(40),
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    textContainer: {
        flex: 1,
    },
    unitNameText: {
        fontSize: moderateScale(14),
        fontWeight: '800',
        color: '#0F172A',
        lineHeight: 18,
    },
    chevronBox: {
        width: 28,
        height: 28,
        borderRadius: 8,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

