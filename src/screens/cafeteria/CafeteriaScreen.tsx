import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Dimensions,
    Platform,
    Animated
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Theme } from '../../config/theme';
import { useAppTheme } from '../../hooks/useAppTheme';
import { MOCK_WEEKLY_MENU } from '../../data/mockData';
import { moderateScale } from '../../utils/responsive';
import LinearGradient from 'react-native-linear-gradient';

const SCREEN_WIDTH = Dimensions.get('window').width;

export const CafeteriaScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const { theme } = useAppTheme();
    const s = styles(theme);

    const [selectedIndex, setSelectedIndex] = useState(5);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const activeMenu = MOCK_WEEKLY_MENU[selectedIndex];
    const isToday = selectedIndex === 5;

    useEffect(() => {
        fadeAnim.setValue(0);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
        }).start();
    }, [selectedIndex]);

    const navigate = (direction: 'prev' | 'next') => {
        if (direction === 'prev' && selectedIndex > 0) {
            setSelectedIndex(selectedIndex - 1);
        } else if (direction === 'next' && selectedIndex < MOCK_WEEKLY_MENU.length - 1) {
            setSelectedIndex(selectedIndex + 1);
        }
    };

    const renderMealCard = () => {
        const icons = ['restaurant', 'pizza', 'nutrition', 'ice-cream'];

        const CardContainer = LinearGradient;
        const cardProps = isToday ? {
            colors: ['#182958', '#101D42', '#080F26'],
            start: { x: 0, y: 0 },
            end: { x: 1, y: 1 },
            style: s.todayCard
        } : {
            colors: ['#2A458F', '#1F346E', '#162857'],
            start: { x: 0, y: 0 },
            end: { x: 1, y: 1 },
            style: s.otherDayCard
        };

        return (
            <Animated.View style={[s.mealCardContainer, { opacity: fadeAnim }]}>
                <CardContainer {...(cardProps as any)}>
                    {/* Decorative hyper-premium mesh glows - consistent across all days */}
                    <View style={[s.glowCircle, { top: -50, right: -50, backgroundColor: isToday ? '#3B82F6' : '#60A5FA', opacity: isToday ? 0.2 : 0.15 }]} />
                    <View style={[s.glowCircle, { bottom: -20, left: -40, backgroundColor: isToday ? '#6366F1' : '#818CF8', opacity: isToday ? 0.15 : 0.1 }]} />

                    <View style={s.cardHeader}>
                        <View>
                            <Text style={isToday ? s.todayDayTitle : s.otherDayTitle}>{activeMenu.day}</Text>
                            <Text style={isToday ? s.todayDateSub : s.otherDateSub}>{activeMenu.date}</Text>
                        </View>
                        {isToday && (
                            <View style={s.premiumBadge}>
                                <Icon name="sparkles" size={14} color="#FFD700" />
                                <Text style={s.premiumBadgeText}>GÜNÜN MENÜSÜ</Text>
                            </View>
                        )}
                    </View>

                    <View style={isToday ? s.glassDivider : s.lightDivider} />

                    <View style={s.menuList}>
                        {activeMenu.items.map((item, idx) => (
                            <View key={idx} style={isToday ? s.glassPill : s.lightPill}>
                                <View style={isToday ? s.todayIconContainer : s.otherIconContainer}>
                                    <Icon
                                        name={(icons[idx % icons.length] || 'restaurant-outline') + '-outline'}
                                        size={20}
                                        color="#FFFFFF"
                                    />
                                </View>
                                <Text style={isToday ? s.todayItemText : s.otherItemText}>{item}</Text>
                                {isToday && <Icon name="chevron-forward" size={16} color="rgba(255,255,255,0.3)" />}
                            </View>
                        ))}
                    </View>

                    <View style={s.cardFooter}>
                        <View style={s.navButtons}>
                            <TouchableOpacity
                                disabled={(selectedIndex as number) === 0}
                                onPress={() => navigate('prev')}
                                style={[s.navBtn, isToday ? s.glassNavBtn : s.lightNavBtn, (selectedIndex as number) === 0 && s.navBtnDisabled]}
                            >
                                <Icon
                                    name="chevron-back"
                                    size={24}
                                    color={isToday
                                        ? ((selectedIndex as number) === 0 ? 'rgba(255,255,255,0.2)' : '#FFFFFF')
                                        : (selectedIndex === 0 ? 'rgba(255,255,255,0.2)' : '#FFFFFF')
                                    }
                                />
                                <Text style={[
                                    s.navBtnText,
                                    isToday ? s.glassNavBtnText : s.lightNavBtnText,
                                    (selectedIndex as number) === 0 && { opacity: 0.3 }
                                ]}>Önceki</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                disabled={selectedIndex === MOCK_WEEKLY_MENU.length - 1}
                                onPress={() => navigate('next')}
                                style={[s.navBtn, isToday ? s.glassNavBtn : s.lightNavBtn, selectedIndex === MOCK_WEEKLY_MENU.length - 1 && s.navBtnDisabled]}
                            >
                                <Text style={[
                                    s.navBtnText,
                                    isToday ? s.glassNavBtnText : s.lightNavBtnText,
                                    selectedIndex === MOCK_WEEKLY_MENU.length - 1 && { opacity: 0.3 }
                                ]}>Sonraki</Text>
                                <Icon
                                    name="chevron-forward"
                                    size={24}
                                    color={isToday
                                        ? (selectedIndex === MOCK_WEEKLY_MENU.length - 1 ? 'rgba(255,255,255,0.2)' : '#FFFFFF')
                                        : (selectedIndex === MOCK_WEEKLY_MENU.length - 1 ? 'rgba(255,255,255,0.2)' : '#FFFFFF')
                                    }
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </CardContainer>
            </Animated.View>
        );
    };

    return (
        <View style={s.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <View style={s.meshBackground}>
                <View style={[s.bgGlow, { top: '10%', right: '-10%', width: 300, height: 300, backgroundColor: 'rgba(59, 130, 246, 0.05)' }]} />
                <View style={[s.bgGlow, { bottom: '20%', left: '-20%', width: 400, height: 400, backgroundColor: 'rgba(99, 102, 241, 0.03)' }]} />
            </View>

            <View style={s.mainContent}>
                {renderMealCard()}

                <View style={s.bottomInfo}>
                    <Icon name="information-circle-outline" size={20} color="#64748B" />
                    <Text style={s.infoText}>
                        Menüler haftalık olarak güncellenmektedir. Kampüs yemekhanesi hafta içi 08:30 - 18:00 saatleri arasında hizmet vermektedir.
                    </Text>
                </View>
            </View>

            {!isToday && (
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={s.todayFab}
                    onPress={() => setSelectedIndex(5)}
                >
                    <LinearGradient
                        colors={['#182958', '#101D42']}
                        style={s.fabGradient}
                    >
                        {/* Standardized high-contrast white icons for state-of-the-art look */}
                        <Icon name="calendar-outline" size={24} color="#FFFFFF" />
                        <Text style={s.todayFabText}>Bugün</Text>
                    </LinearGradient>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    meshBackground: {
        ...StyleSheet.absoluteFillObject,
        zIndex: -1,
    },
    bgGlow: {
        position: 'absolute',
        borderRadius: 200,
    },
    content: {
        padding: 20,
    },
    mainContent: {
        flex: 1,
        padding: 20,
        paddingTop: 30,
        justifyContent: 'flex-start',
    },
    mealCardContainer: {
        width: '100%',
        marginBottom: 20,
    },
    todayCard: {
        borderRadius: 40,
        padding: 24,
        paddingBottom: 28,
        minHeight: 550,
        height: 550,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 20 },
                shadowOpacity: 0.2,
                shadowRadius: 30,
            },
            android: {
                elevation: 8,
            }
        }),
    },
    glowCircle: {
        position: 'absolute',
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        marginBottom: 20,
    },
    todayDayTitle: {
        fontSize: moderateScale(28),
        fontWeight: '900',
        color: '#FFFFFF',
        letterSpacing: -1,
    },
    todayDateSub: {
        fontSize: 15,
        color: 'rgba(255, 255, 255, 0.6)',
        fontWeight: '600',
        marginTop: 4,
    },
    premiumBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 14,
        gap: 6,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.15)',
    },
    premiumBadgeText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 1,
    },
    glassDivider: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginBottom: 20,
    },
    menuList: {
        gap: 12,
    },
    glassPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderRadius: 24,
        padding: 12,
        paddingRight: 18,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        gap: 16,
    },
    todayIconContainer: {
        width: 42,
        height: 42,
        borderRadius: 13,
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    todayItemText: {
        fontSize: moderateScale(16),
        fontWeight: '700',
        color: '#FFFFFF',
        flex: 1,
    },
    cardFooter: {
        marginTop: 'auto',
        paddingTop: 30,
    },
    navButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    navBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 20,
        gap: 8,
        borderWidth: 1,
    },
    navBtnDisabled: {
        opacity: 0.5,
    },
    navBtnText: {
        fontSize: 15,
        fontWeight: '800',
    },
    glassNavBtn: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderColor: 'rgba(255, 255, 255, 0.15)',
    },
    glassNavBtnText: {
        color: '#FFFFFF',
    },
    lightNavBtn: {
        backgroundColor: '#FFFFFF',
        borderColor: '#E2E8F0',
    },
    lightNavBtnText: {
        color: '#182958',
    },
    otherDayCard: {
        borderRadius: 40,
        padding: 24,
        paddingBottom: 28,
        minHeight: 550,
        height: 550,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 20 },
                shadowOpacity: 0.2,
                shadowRadius: 30,
            },
            android: {
                elevation: 10,
            }
        }),
    },
    otherDayTitle: {
        fontSize: moderateScale(28),
        fontWeight: '900',
        color: '#FFFFFF',
        letterSpacing: -1,
    },
    otherDateSub: {
        fontSize: 15,
        color: 'rgba(255, 255, 255, 0.6)',
        fontWeight: '600',
        marginTop: 4,
    },
    lightDivider: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginBottom: 20,
    },
    lightPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderRadius: 24,
        padding: 12,
        paddingRight: 18,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        gap: 16,
    },
    otherIconContainer: {
        width: 42,
        height: 42,
        borderRadius: 13,
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    otherItemText: {
        fontSize: moderateScale(16),
        fontWeight: '700',
        color: '#FFFFFF',
        flex: 1,
    },
    bottomInfo: {
        flexDirection: 'row',
        padding: 24,
        backgroundColor: '#F8FAFC',
        borderRadius: 28,
        gap: 14,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    infoText: {
        flex: 1,
        fontSize: 12,
        color: '#64748B',
        lineHeight: 20,
        fontWeight: '500',
    },
    todayFab: {
        position: 'absolute',
        bottom: 150,
        alignSelf: 'center',
    },
    fabGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 28,
        paddingVertical: 16,
        borderRadius: 32,
        gap: 10,
        ...Platform.select({
            ios: {
                shadowColor: '#182958',
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.4,
                shadowRadius: 15,
            },
            android: {
                elevation: 8,
            }
        }),
    },
    todayFabText: {
        color: '#FFFFFF',
        fontWeight: '900',
        fontSize: 15,
        letterSpacing: 0.5,
    },
});
