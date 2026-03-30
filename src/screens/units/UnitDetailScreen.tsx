import React, { useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Animated,
    Linking,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppTheme } from '../../hooks/useAppTheme';
import { moderateScale, verticalScale } from '../../utils/responsive';
import { useFetch } from '../../hooks/useFetch';
import { UnitDetail } from '../../types/models';
import { Theme, spacing } from '../../config/theme';



const ROW_CONFIG: Record<string, { icon: string; label: string; color: string; bg: string }> = {
    phone: { icon: 'call', label: 'TELEFON HATTI', color: '#6366F1', bg: '#EEF2FF' },
    fax: { icon: 'print', label: 'FAKS NUMARASI', color: '#64748B', bg: '#F1F5F9' },
    mail: { icon: 'mail', label: 'E-POSTA ADRESİ', color: '#10B981', bg: '#ECFDF5' },
    staff: { icon: 'people', label: 'AKADEMİK & İDARİ KADRO', color: '#8B5CF6', bg: '#F5F3FF' },
    web: { icon: 'globe', label: 'RESMİ WEB SİTESİ', color: '#06B6D4', bg: '#ECFEFF' },
    address: { icon: 'location', label: 'YERLEŞKE BİLGİSİ', color: '#F43F5E', bg: '#FFF1F2' },
};

export const UnitDetailScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { unitId } = route.params;
    const { theme } = useAppTheme();
    const insets = useSafeAreaInsets();
    
    const { data: unit, loading } = useFetch<UnitDetail>(`/faculty/units/${unitId}`);
    
    const s = styles(theme);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(40)).current;
    
    useEffect(() => {
        if (!loading && unit) {
            Animated.parallel([
                Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
                Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true })
            ]).start();
        }
    }, [loading, unit]);

    const handleLink = async (url: string) => {
        if (await Linking.canOpenURL(url)) await Linking.openURL(url);
    };

    if (loading) {
        return (
            <View style={[s.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ color: '#182958', fontSize: 16, fontWeight: '700' }}>Bilgiler Hazırlanıyor...</Text>
            </View>
        );
    }

    if (!unit) return null;

    const renderActionRow = (type: keyof typeof ROW_CONFIG, value: string, isLink = false, onPress?: () => void) => {
        const config = ROW_CONFIG[type];
        return (
            <TouchableOpacity 
                style={s.infoRow} 
                onPress={onPress}
                activeOpacity={onPress ? 0.7 : 1}
            >
                <View style={[s.rowIconContainer, { backgroundColor: config.bg }]}>
                    <Icon name={config.icon} size={20} color={config.color} />
                </View>
                <View style={s.rowTextContent}>
                    <Text style={s.rowLabelText}>{config.label}</Text>
                    <Text style={[s.rowValueText, isLink && s.linkTextDecoration]} numberOfLines={2}>
                        {value}
                    </Text>
                </View>
                {onPress && <Icon name="chevron-forward" size={18} color="#CBD5E1" />}
            </TouchableOpacity>
        );
    };

    return (
        <View style={s.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            {/* 🌌 High-Impact Header */}
            <View style={s.headerContainer}>
                <LinearGradient
                    colors={['#182958', '#4F46E5']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[s.headerGradient, { paddingTop: insets.top + spacing.sm }]}
                >
                    <View style={s.headerTopRow}>
                        <TouchableOpacity style={s.backCircle} onPress={() => navigation.goBack()}>
                            <Icon name="arrow-back" size={24} color="#FFF" />
                        </TouchableOpacity>
                        <Text style={s.headerMainTitle}>{unit.type}</Text>
                        <View style={{ width: 44 }} />
                    </View>
                </LinearGradient>
            </View>

            <Animated.ScrollView
                style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
                contentContainerStyle={[s.scrollContent, { paddingBottom: insets.bottom + 40 }]}
                showsVerticalScrollIndicator={false}
            >
                {/* 🛡️ Branded Identity Card */}
                <View style={s.identityCard}>
                    <View style={s.unitIconHousing}>
                        <LinearGradient colors={['#F8FAFC', '#E2E8F0']} style={s.iconInner}>
                            <Icon name="business" size={moderateScale(40)} color="#182958" />
                        </LinearGradient>
                    </View>
                    
                    <View style={s.identityInfo}>
                        <Text style={s.unitFullName}>{unit.name}</Text>
                    </View>
                </View>

                {/* 📊 Data Grid */}
                <View style={s.dataBox}>
                    {renderActionRow('phone', unit.phones.join(' / '), false, () => handleLink(`tel:${unit.phones[0]}`))}
                    {unit.fax && renderActionRow('fax', unit.fax)}
                    {renderActionRow('staff', 'Personel ve Akademik Kadro', false, () => navigation.navigate('Faculty'))}
                    {renderActionRow('mail', unit.email, true, () => handleLink(`mailto:${unit.email}`))}
                    {renderActionRow('web', unit.website, true, () => handleLink(unit.website))}
                    {renderActionRow('address', unit.address)}
                </View>

                {/* 🗺️ High-Contrast Map Action */}
                <TouchableOpacity 
                    style={s.mapBtnShadow}
                    onPress={() => handleLink(`https://www.google.com/maps/search/?api=1&query=${unit.location.latitude},${unit.location.longitude}`)}
                >
                    <LinearGradient
                        colors={['#182958', '#3B82F6']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={s.mapBtnStyle}
                    >
                        <Icon name="map" size={22} color="#FFF" />
                        <Text style={s.mapBtnTextStyle}>Haritada Konumu Görüntüle</Text>
                        <Icon name="chevron-forward" size={18} color="rgba(255,255,255,0.5)" />
                    </LinearGradient>
                </TouchableOpacity>
            </Animated.ScrollView>
        </View>
    );
};

const styles = (_theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    headerContainer: {
        height: verticalScale(110),
    },
    headerGradient: {
        flex: 1,
        borderBottomLeftRadius: 36,
        borderBottomRightRadius: 36,
        paddingHorizontal: spacing.lg,
    },
    headerTopRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    backCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.15)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerMainTitle: {
        fontSize: moderateScale(18),
        fontWeight: '800',
        color: '#FFFFFF',
        letterSpacing: -0.5,
    },
    scrollContent: {
        marginTop: verticalScale(15),
        paddingHorizontal: spacing.lg,
    },
    identityCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: spacing.lg,
        alignItems: 'center',
        elevation: 12,
        shadowColor: '#182958',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 15,
        marginBottom: spacing.md,
        borderWidth: 1.2,
        borderColor: '#94A3B8',
    },
    unitIconHousing: {
        width: moderateScale(70),
        height: moderateScale(70),
        borderRadius: 24,
        padding: 3,
        backgroundColor: '#FFFFFF',
        marginTop: verticalScale(-30),
        elevation: 8,
        borderWidth: 1.5,
        borderColor: '#94A3B8',
    },
    iconInner: {
        flex: 1,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    identityInfo: {
        alignItems: 'center',
        marginTop: 10,
    },
    unitFullName: {
        fontSize: moderateScale(19),
        fontWeight: '900',
        color: '#0F172A',
        textAlign: 'center',
        lineHeight: 24,
    },
    dataBox: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: spacing.sm,
        elevation: 6,
        shadowColor: '#64748B',
        shadowOpacity: 0.1,
        shadowRadius: 12,
        borderWidth: 1.2,
        borderColor: '#94A3B8',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.sm,
        borderBottomWidth: 1.5,
        borderBottomColor: '#CBD5E1',
    },
    rowIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.lg,
    },
    rowTextContent: {
        flex: 1,
        gap: 2,
    },
    rowLabelText: {
        fontSize: moderateScale(8),
        fontWeight: '800',
        color: '#64748B',
        letterSpacing: 0.8,
    },
    rowValueText: {
        fontSize: moderateScale(14),
        fontWeight: '700',
        color: '#334155',
        lineHeight: 20,
    },
    linkTextDecoration: {
        color: '#182958',
        textDecorationLine: 'underline',
    },
    mapBtnShadow: {
        marginTop: spacing.md,
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 8,
        shadowColor: '#182958',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
    },
    mapBtnStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: verticalScale(18),
        paddingHorizontal: spacing.xl,
    },
    mapBtnTextStyle: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: moderateScale(15),
        fontWeight: '800',
        marginLeft: 12,
    },
});
