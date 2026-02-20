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

        return (
            <Animated.View style={[s.mealCardContainer, { opacity: fadeAnim }]}>
                {isToday ? (
                    <LinearGradient
                        colors={['#182958', '#101D42', '#080F26']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={s.todayCard}
                    >
                        {/* Decorative mesh glows */}
                        <View style={[s.glowCircle, { top: -50, right: -50, backgroundColor: '#3B82F6', opacity: 0.2 }]} />
                        <View style={[s.glowCircle, { bottom: -20, left: -40, backgroundColor: '#6366F1', opacity: 0.15 }]} />

                        <View style={s.cardHeader}>
                            <View>
                                <Text style={s.todayDayTitle}>{activeMenu.day}</Text>
                                <Text style={s.todayDateSub}>{activeMenu.date}</Text>
                            </View>
                            <View style={s.premiumBadge}>
                                <Icon name="sparkles" size={14} color="#FFD700" />
                                <Text style={s.premiumBadgeText}>GÜNÜN MENÜSÜ</Text>
                            </View>
                        </View>

                        <View style={s.glassDivider} />

                        <View style={s.menuList}>
                            {activeMenu.items.map((item, idx) => (
                                <View key={idx} style={s.glassPill}>
                                    <View style={s.todayIconContainer}>
                                        <Icon
                                            name={(icons[idx % icons.length] || 'restaurant-outline') + '-outline'}
                                            size={20}
                                            color="#FFFFFF"
                                        />
                                    </View>
                                    <Text style={s.todayItemText}>{item}</Text>
                                    <Icon name="chevron-forward" size={16} color="rgba(255,255,255,0.3)" />
                                </View>
                            ))}
                        </View>

                        <View style={s.cardFooter}>
                            <View style={s.navButtons}>
                                <TouchableOpacity
                                    disabled={(selectedIndex as number) === 0}
                                    onPress={() => navigate('prev')}
                                    style={[s.navBtn, s.glassNavBtn, (selectedIndex as number) === 0 && s.navBtnDisabled]}
                                >
                                    <Icon name="chevron-back" size={24} color={(selectedIndex as number) === 0 ? 'rgba(255,255,255,0.2)' : '#FFFFFF'} />
                                    <Text style={[s.navBtnText, s.glassNavBtnText, (selectedIndex as number) === 0 && { opacity: 0.3 }]}>Önceki</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    disabled={selectedIndex === MOCK_WEEKLY_MENU.length - 1}
                                    onPress={() => navigate('next')}
                                    style={[s.navBtn, s.glassNavBtn, selectedIndex === MOCK_WEEKLY_MENU.length - 1 && s.navBtnDisabled]}
                                >
                                    <Text style={[s.navBtnText, s.glassNavBtnText, selectedIndex === MOCK_WEEKLY_MENU.length - 1 && { opacity: 0.3 }]}>Sonraki</Text>
                                    <Icon name="chevron-forward" size={24} color={selectedIndex === MOCK_WEEKLY_MENU.length - 1 ? 'rgba(255,255,255,0.2)' : '#FFFFFF'} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </LinearGradient>
                ) : (
                    <View style={s.otherDayCard}>
                        <View style={s.cardHeader}>
                            <View>
                                <Text style={s.otherDayTitle}>{activeMenu.day}</Text>
                                <Text style={s.otherDateSub}>{activeMenu.date}</Text>
                            </View>
                        </View>

                        <View style={s.lightDivider} />

                        <View style={s.menuList}>
                            {activeMenu.items.map((item, idx) => (
                                <View key={idx} style={s.lightPill}>
                                    <View style={s.otherIconContainer}>
                                        <Icon
                                            name={(icons[idx % icons.length] || 'restaurant-outline') + '-outline'}
                                            size={20}
                                            color="#64748B"
                                        />
                                    </View>
                                    <Text style={s.otherItemText}>{item}</Text>
                                </View>
                            ))}
                        </View>

                        <View style={s.cardFooter}>
                            <View style={s.navButtons}>
                                <TouchableOpacity
                                    disabled={selectedIndex === 0}
                                    onPress={() => navigate('prev')}
                                    style={[s.navBtn, s.lightNavBtn, selectedIndex === 0 && s.navBtnDisabled]}
                                >
                                    <Icon name="chevron-back" size={24} color={selectedIndex === 0 ? '#CBD5E1' : '#182958'} />
                                    <Text style={[s.navBtnText, s.lightNavBtnText, selectedIndex === 0 && { color: '#CBD5E1' }]}>Önceki</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    disabled={selectedIndex === MOCK_WEEKLY_MENU.length - 1}
                                    onPress={() => navigate('next')}
                                    style={[s.navBtn, s.lightNavBtn, selectedIndex === MOCK_WEEKLY_MENU.length - 1 && s.navBtnDisabled]}
                                >
                                    <Text style={[s.navBtnText, s.lightNavBtnText, selectedIndex === MOCK_WEEKLY_MENU.length - 1 && { color: '#CBD5E1' }]}>Sonraki</Text>
                                    <Icon name="chevron-forward" size={24} color={selectedIndex === MOCK_WEEKLY_MENU.length - 1 ? '#CBD5E1' : '#182958'} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
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

            <ScrollView
                contentContainerStyle={[s.content, { paddingTop: 20 }]}
                showsVerticalScrollIndicator={false}
            >
                {renderMealCard()}

                <View style={s.bottomInfo}>
                    <Icon name="information-circle-outline" size={20} color="#64748B" />
                    <Text style={s.infoText}>
                        Menüler haftalık olarak güncellenmektedir. Kampüs yemekhanesi hafta içi 08:30 - 18:00 saatleri arasında hizmet vermektedir.
                    </Text>
                </View>

                <View style={{ height: 120 }} />
            </ScrollView>

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
                        <Icon name="calendar-outline" size={20} color="#FFFFFF" />
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
    mealCardContainer: {
        width: '100%',
        marginBottom: 20,
    },
    todayCard: {
        borderRadius: 40,
        padding: 28,
        minHeight: 520,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 20 },
                shadowOpacity: 0.4,
                shadowRadius: 30,
            },
            android: {
                elevation: 15,
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
        alignItems: 'flex-start',
        marginBottom: 30,
    },
    todayDayTitle: {
        fontSize: moderateScale(30),
        fontWeight: '900',
        color: '#FFFFFF',
        letterSpacing: -1,
    },
    todayDateSub: {
        fontSize: 16,
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
        marginBottom: 30,
    },
    menuList: {
        gap: 16,
    },
    glassPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderRadius: 24,
        padding: 14,
        paddingRight: 18,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        gap: 16,
    },
    todayIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 14,
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
        paddingTop: 40,
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
        backgroundColor: '#FFFFFF',
        borderRadius: 40,
        padding: 28,
        minHeight: 480,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.05,
                shadowRadius: 20,
            },
            android: {
                elevation: 4,
            }
        }),
    },
    otherDayTitle: {
        fontSize: moderateScale(28),
        fontWeight: '900',
        color: '#1E293B',
        letterSpacing: -1,
    },
    otherDateSub: {
        fontSize: 15,
        color: '#64748B',
        fontWeight: '600',
        marginTop: 4,
    },
    lightDivider: {
        height: 1,
        backgroundColor: '#F1F5F9',
        marginBottom: 30,
    },
    lightPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        borderRadius: 24,
        padding: 14,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        gap: 16,
    },
    otherIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    otherItemText: {
        fontSize: moderateScale(16),
        fontWeight: '700',
        color: '#334155',
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
        bottom: 110,
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
