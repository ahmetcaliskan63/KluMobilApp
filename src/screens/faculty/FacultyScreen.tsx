import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Theme, spacing } from '../../config/theme';
import { useAppTheme } from '../../hooks/useAppTheme';
import { moderateScale } from '../../utils/responsive';

// Mock Data for Professors (In a real app, fetch from User's department API)
const MY_ADVISOR = {
    id: 'adv_1',
    name: 'Prof. Dr. Ayşe Yılmaz',
    title: 'Bölüm Başkanı / Akademik Danışman',
    department: 'Yazılım Mühendisliği',
    email: 'ayse.yilmaz@klu.edu.tr',
    office: 'A Blok, Kat 3, No: 312',
    avatarLetter: 'AY',
};

const FACULTY_MEMBERS = [
    { id: '1', name: 'Doç. Dr. Mehmet Demir', title: 'Öğretim Üyesi', dept: 'Yazılım Mühendisliği', email: 'mehmet.demir@klu.edu.tr', avatar: 'MD', color: '#3B82F6' },
    { id: '2', name: 'Dr. Öğr. Üyesi Zeynep Kaya', title: 'Öğretim Üyesi', dept: 'Yazılım Mühendisliği', email: 'zeynep.kaya@klu.edu.tr', avatar: 'ZK', color: '#8B5CF6' },
    { id: '3', name: 'Arş. Gör. Ali Veli', title: 'Araştırma Görevlisi', dept: 'Yazılım Mühendisliği', email: 'ali.veli@klu.edu.tr', avatar: 'AV', color: '#10B981' },
    { id: '4', name: 'Prof. Dr. Canan Çelik', title: 'Öğretim Üyesi', dept: 'Bilgisayar Mühendisliği', email: 'canan.celik@klu.edu.tr', avatar: 'CÇ', color: '#F59E0B' },
];

export const FacultyScreen: React.FC = () => {
    const navigation = useNavigation();
    const { theme } = useAppTheme();
    const insets = useSafeAreaInsets();
    const s = styles(theme);

    const handleEmailPress = async (email: string) => {
        const url = `mailto:${email}`;
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        }
    };

    return (
        <View style={s.container}>
            <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />
            
            {/* Custom Header */}
            <LinearGradient
                colors={[theme.colors.primary, theme.colors.primaryDark || '#0f172a']}
                style={[s.header, { paddingTop: insets.top + spacing.sm }]}
            >
                <TouchableOpacity 
                    style={s.backButton} 
                    onPress={() => navigation.goBack()}
                    activeOpacity={0.7}
                >
                    <Icon name="chevron-back" size={28} color="#FFF" />
                </TouchableOpacity>
                <Text style={s.headerTitle}>Hocalarımız</Text>
                <View style={{ width: 44 }} />
            </LinearGradient>

            <ScrollView 
                contentContainerStyle={[s.scrollContent, { paddingBottom: insets.bottom + 40 }]}
                showsVerticalScrollIndicator={false}
            >
                {/* 🌟 Premium Advisor Card SECTION 🌟 */}
                <Text style={s.sectionTitle}>Danışman Hoca</Text>
                <View style={s.advisorCardWrapper}>
                    <LinearGradient
                        colors={['#1E293B', '#0F172A']}
                        style={s.advisorCard}
                    >
                        <View style={s.goldGlow} />
                        <View style={s.advisorHeaderInfo}>
                            <View style={s.advisorAvatarContainer}>
                                <LinearGradient colors={['#F59E0B', '#FCD34D']} style={s.advisorAvatarBorder}>
                                    <View style={s.advisorAvatar}>
                                        <Text style={s.advisorAvatarText}>{MY_ADVISOR.avatarLetter}</Text>
                                    </View>
                                </LinearGradient>
                                <View style={s.starBadge}>
                                    <Icon name="star" size={12} color="#FFF" />
                                </View>
                            </View>
                            <View style={s.advisorTextInfo}>
                                <Text style={s.advisorName}>{MY_ADVISOR.name}</Text>
                                <Text style={s.advisorTitle}>{MY_ADVISOR.title}</Text>
                                <View style={s.advisorDeptBadge}>
                                    <Text style={s.advisorDeptText}>{MY_ADVISOR.department}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={s.advisorDivider} />
                        <View style={s.advisorContactSection}>
                            <View style={s.contactRow}>
                                <View style={s.contactIconCircle}>
                                    <Icon name="location" size={16} color="#FCD34D" />
                                </View>
                                <Text style={s.contactText}>{MY_ADVISOR.office}</Text>
                            </View>
                            <TouchableOpacity 
                                style={s.contactRowBtn}
                                activeOpacity={0.7}
                                onPress={() => handleEmailPress(MY_ADVISOR.email)}
                            >
                                <View style={s.contactIconCircle}>
                                    <Icon name="mail" size={16} color="#38BDF8" />
                                </View>
                                <Text style={[s.contactText, s.contactEmail]}>{MY_ADVISOR.email}</Text>
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                </View>

                {/* Other Faculty Members List */}
                <Text style={[s.sectionTitle, { marginTop: spacing.xl }]}>Akademik Kadro</Text>
                
                <View style={s.facultyList}>
                    {FACULTY_MEMBERS.map((member) => (
                        <View key={member.id} style={s.facultyCard}>
                            <View style={s.memberBasicInfo}>
                                <View style={[s.memberAvatar, { backgroundColor: member.color + '15', borderColor: member.color + '30' }]}>
                                    <Text style={[s.memberAvatarText, { color: member.color }]}>{member.avatar}</Text>
                                </View>
                                <View style={s.memberTextDetails}>
                                    <Text style={[s.memberName, { color: theme.colors.text }]}>{member.name}</Text>
                                    <Text style={[s.memberTitle, { color: theme.colors.textSecondary }]}>{member.title}</Text>
                                    <Text style={s.memberDept}>{member.dept}</Text>
                                </View>
                            </View>

                            <TouchableOpacity 
                                style={[s.emailActionBtn, { backgroundColor: theme.colors.primary + '10' }]}
                                onPress={() => handleEmailPress(member.email)}
                            >
                                <Icon name="mail-outline" size={20} color={theme.colors.primary} />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>

            </ScrollView>
        </View>
    );
};

const styles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.md,
        paddingBottom: spacing.md,
        ...theme.shadows.medium,
        zIndex: 10,
    },
    backButton: {
        padding: spacing.sm,
    },
    headerTitle: {
        fontSize: moderateScale(18),
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: 0.5,
    },
    scrollContent: {
        padding: spacing.lg,
    },
    sectionTitle: {
        fontSize: moderateScale(16),
        fontWeight: '800',
        color: theme.colors.text,
        marginBottom: spacing.md,
        marginLeft: spacing.xs,
        letterSpacing: 0.5,
    },
    
    // Premium Advisor Card Styles
    advisorCardWrapper: {
        shadowColor: '#F59E0B',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 15,
        elevation: 8,
    },
    advisorCard: {
        borderRadius: moderateScale(24),
        padding: spacing.xl,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        overflow: 'hidden',
    },
    goldGlow: {
        position: 'absolute',
        top: -50,
        right: -50,
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: '#F59E0B',
        opacity: 0.1,
    },
    advisorHeaderInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.lg,
    },
    advisorAvatarContainer: {
        position: 'relative',
    },
    advisorAvatarBorder: {
        padding: 3,
        borderRadius: moderateScale(40),
    },
    advisorAvatar: {
        width: moderateScale(60),
        height: moderateScale(60),
        borderRadius: moderateScale(30),
        backgroundColor: '#1E293B',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#0F172A',
    },
    advisorAvatarText: {
        fontSize: moderateScale(22),
        fontWeight: 'bold',
        color: '#FFF',
    },
    starBadge: {
        position: 'absolute',
        bottom: -2,
        right: -2,
        backgroundColor: '#F59E0B',
        width: moderateScale(22),
        height: moderateScale(22),
        borderRadius: moderateScale(11),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#1E293B',
    },
    advisorTextInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    advisorName: {
        fontSize: moderateScale(18),
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 2,
    },
    advisorTitle: {
        fontSize: moderateScale(13),
        color: '#CBD5E1',
        fontWeight: '500',
        marginBottom: 8,
    },
    advisorDeptBadge: {
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingHorizontal: spacing.sm,
        paddingVertical: 4,
        borderRadius: 8,
    },
    advisorDeptText: {
        color: '#F8FAFC',
        fontSize: moderateScale(10),
        fontWeight: '600',
    },
    advisorDivider: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginVertical: spacing.lg,
    },
    advisorContactSection: {
        gap: spacing.md,
    },
    contactRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    contactRowBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    contactIconCircle: {
        width: moderateScale(32),
        height: moderateScale(32),
        borderRadius: moderateScale(16),
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contactText: {
        fontSize: moderateScale(13),
        color: '#E2E8F0',
        fontWeight: '500',
    },
    contactEmail: {
        color: '#38BDF8', // Light blue for links
    },

    // Regular Faculty List Styles
    facultyList: {
        gap: spacing.md,
    },
    facultyCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.card,
        padding: spacing.md,
        borderRadius: moderateScale(20),
        borderWidth: 1.5,
        borderColor: 'rgba(0,0,0,0.04)',
        ...theme.shadows.small,
        elevation: 3,
    },
    memberBasicInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        flex: 1,
    },
    memberAvatar: {
        width: moderateScale(48),
        height: moderateScale(48),
        borderRadius: moderateScale(18),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    memberAvatarText: {
        fontSize: moderateScale(16),
        fontWeight: 'bold',
    },
    memberTextDetails: {
        flex: 1,
        gap: 2,
    },
    memberName: {
        fontSize: moderateScale(15),
        fontWeight: '700',
    },
    memberTitle: {
        fontSize: moderateScale(12),
        fontWeight: '500',
    },
    memberDept: {
        fontSize: moderateScale(11),
        color: theme.colors.primary,
        fontWeight: '600',
        marginTop: 2,
    },
    emailActionBtn: {
        width: moderateScale(40),
        height: moderateScale(40),
        borderRadius: moderateScale(20),
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: spacing.sm,
    },
});
