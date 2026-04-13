import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Dimensions,
    Platform,
    FlatList,
    ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Theme } from '@/app/theme/theme';
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { useFetch } from '@/shared/hooks/useFetch';
import { DailyMenu } from '@/shared/types/models';
import { moderateScale } from '@/shared/utils/responsive';
import LinearGradient from 'react-native-linear-gradient';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export const CafeteriaScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const { theme } = useAppTheme();
    const s = styles(theme, insets);
    const dayOfWeek = new Date().getDay();

    // Using the professional useFetch hook instead of direct mock import
    // In a real app, this would be '/cafeteria/menu'
    const { data: menu, loading, error } = useFetch<DailyMenu[]>('/cafeteria/menu');

    const initialIndex = dayOfWeek === 0 || dayOfWeek === 6 ? 4 : dayOfWeek - 1;
    const [selectedIndex, setSelectedIndex] = useState(initialIndex);
    const flatListRef = useRef<FlatList>(null);

    // Sync selectedIndex when data loads
    useEffect(() => {
        if (menu) {
            setSelectedIndex(initialIndex);
        }
    }, [menu, initialIndex]);

    const transitionTo = (nextIndex: number) => {
        if (!menu || nextIndex < 0 || nextIndex >= menu.length) return;
        setSelectedIndex(nextIndex);
        flatListRef.current?.scrollToIndex({
            index: nextIndex,
            animated: true,
        });
    };


    const renderMealItem = ({ item, index }: { item: DailyMenu, index: number }) => {
        const icons = ['restaurant', 'pizza', 'nutrition', 'ice-cream'];
        const isItemToday = (dayOfWeek !== 0 && dayOfWeek !== 6) && (index === dayOfWeek - 1);

        const CardContainer = LinearGradient;
        const cardProps = isItemToday ? {
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
            <View style={s.mealCardContainer}>
                <CardContainer {...(cardProps as any)}>
                    {/* Decorative hyper-premium mesh glows */}
                    <View style={[s.glowCircle, { top: -50, right: -50, backgroundColor: isItemToday ? '#3B82F6' : '#60A5FA', opacity: isItemToday ? 0.2 : 0.15 }]} />
                    <View style={[s.glowCircle, { bottom: -20, left: -40, backgroundColor: isItemToday ? '#6366F1' : '#818CF8', opacity: isItemToday ? 0.15 : 0.1 }]} />

                    <View style={s.cardHeader}>
                        <View>
                            <Text style={isItemToday ? s.todayDayTitle : s.otherDayTitle}>{item.day}</Text>
                            <Text style={isItemToday ? s.todayDateSub : s.otherDayTitle}>{item.date}</Text>
                        </View>
                        {isItemToday && (
                            <View style={s.premiumBadge}>
                                <Icon name="sparkles" size={14} color="#FFD700" />
                                <Text style={s.premiumBadgeText}>GÜNÜN MENÜSÜ</Text>
                            </View>
                        )}
                    </View>

                    <View style={isItemToday ? s.glassDivider : s.lightDivider} />

                    <View style={s.menuList}>
                        {item.items.map((menuItem: string, idx: number) => (
                            <View key={idx} style={isItemToday ? s.glassPill : s.lightPill}>
                                <View style={isItemToday ? s.todayIconContainer : s.otherIconContainer}>
                                    <Icon
                                        name={(icons[idx % icons.length] || 'restaurant-outline') + '-outline'}
                                        size={20}
                                        color="#FFFFFF"
                                    />
                                </View>
                                <Text style={isItemToday ? s.todayItemText : s.otherItemText}>{menuItem}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={s.cardFooter}>
                        <View style={s.navButtons}>
                            <TouchableOpacity
                                disabled={index === 0}
                                onPress={() => transitionTo(index - 1)}
                                style={[s.navBtn, isItemToday ? s.glassNavBtn : s.lightNavBtn, index === 0 && s.navBtnDisabled]}
                            >
                                <Icon
                                    name="chevron-back"
                                    size={24}
                                    color={isItemToday
                                        ? (index === 0 ? 'rgba(255,255,255,0.2)' : '#FFFFFF')
                                        : (index === 0 ? 'rgba(24, 41, 88, 0.2)' : '#182958')
                                    }
                                />
                                <Text style={[
                                    s.navBtnText,
                                    isItemToday ? s.glassNavBtnText : s.lightNavBtnText,
                                    index === 0 && { opacity: 0.3 }
                                ]}>Önceki</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                disabled={index === (menu?.length || 0) - 1}
                                onPress={() => transitionTo(index + 1)}
                                style={[s.navBtn, isItemToday ? s.glassNavBtn : s.lightNavBtn, index === (menu?.length || 0) - 1 && s.navBtnDisabled]}
                            >
                                <Text style={[
                                    s.navBtnText,
                                    isItemToday ? s.glassNavBtnText : s.lightNavBtnText,
                                    index === (menu?.length || 0) - 1 && { opacity: 0.3 }
                                ]}>Sonraki</Text>
                                <Icon
                                    name="chevron-forward"
                                    size={24}
                                    color={isItemToday
                                        ? (index === (menu?.length || 0) - 1 ? 'rgba(255,255,255,0.2)' : '#FFFFFF')
                                        : (index === (menu?.length || 0) - 1 ? 'rgba(24, 41, 88, 0.2)' : '#182958')
                                    }
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </CardContainer>
            </View>
        );
    };

    if (loading && !menu) {
        return (
            <View style={[s.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ color: theme.colors.primary }}>Yükleniyor...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={[s.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ color: theme.colors.error }}>Hata: {error}</Text>
            </View>
        );
    }

    return (
        <View style={s.container}>
            <StatusBar barStyle="light-content" backgroundColor="#182958" />
            <View style={s.meshBackground}>
                <View style={[s.bgGlow, { top: '10%', right: '-10%', width: 300, height: 300, backgroundColor: 'rgba(59, 130, 246, 0.05)' }]} />
                <View style={[s.bgGlow, { bottom: '20%', left: '-20%', width: 400, height: 400, backgroundColor: 'rgba(99, 102, 241, 0.03)' }]} />
            </View>

                <View style={s.mainContent}>
                    <FlatList
                        ref={flatListRef}
                        data={menu}
                        renderItem={renderMealItem}
                        horizontal
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        initialScrollIndex={initialIndex}
                        getItemLayout={(_, index) => ({
                            length: SCREEN_WIDTH - 40,
                            offset: (SCREEN_WIDTH - 40) * index,
                            index,
                        })}
                        onMomentumScrollEnd={(event) => {
                            const newIndex = Math.round(event.nativeEvent.contentOffset.x / (SCREEN_WIDTH - 40));
                            setSelectedIndex(newIndex);
                        }}
                        scrollEventThrottle={16}
                        decelerationRate="normal"
                        snapToInterval={SCREEN_WIDTH - 40}
                        snapToAlignment="center"
                        keyExtractor={(item) => item.date}
                        style={s.flatList}
                    />

                    <View style={s.bottomInfo}>
                        <Icon name="alert-circle-outline" size={20} color={theme.colors.error} />
                        <Text style={s.infoText}>
                            Menüler haftalık olarak güncellenmektedir. Kampüs yemekhanesi hafta içi 08:30 - 18:00 saatleri arasında hizmet vermektedir.
                        </Text>
                    </View>
                </View>

            {selectedIndex !== initialIndex && (
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={s.todayFab}
                    onPress={() => transitionTo(initialIndex)}
                >
                    <LinearGradient
                        colors={['#182958', '#101D42']}
                        style={s.fabGradient}
                    >
                        <Icon name="calendar-outline" size={24} color="#FFFFFF" />
                        <Text style={s.todayFabText}>Bugün</Text>
                    </LinearGradient>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = (theme: Theme, insets: any) => StyleSheet.create({
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
        paddingTop: 5,
        paddingBottom: Math.max(insets.bottom, 20) + 80, // Slightly reduced to shift card down
        justifyContent: 'flex-start',
        gap: 10, // Bring card and info closer
    },
    flatList: {
        flexGrow: 1,
    },
    mealCardContainer: {
        width: SCREEN_WIDTH - 40,
        height: SCREEN_HEIGHT * 0.59,
        justifyContent: 'center',
    },
    todayCard: {
        borderRadius: 45,
        padding: 22,
        paddingBottom: 11,
        height: SCREEN_HEIGHT * 0.59,
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
        zIndex: -1,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        marginBottom: 10,
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
        marginBottom: 10,
    },
    menuList: {
        gap: 8,
    },
    glassPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderRadius: 24,
        padding: 10,
        paddingRight: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        gap: 14,
    },
    todayIconContainer: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    todayItemText: {
        fontSize: moderateScale(15.5),
        fontWeight: '700',
        color: '#FFFFFF',
        flex: 1,
    },
    cardFooter: {
        marginTop: 'auto',
        paddingTop: 10,
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
        borderRadius: 45,
        padding: 22,
        paddingBottom: 11,
        height: SCREEN_HEIGHT * 0.59,
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
        marginBottom: 10,
    },
    lightPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderRadius: 24,
        padding: 10,
        paddingRight: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        gap: 14,
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
        fontSize: moderateScale(15.5),
        fontWeight: '700',
        color: '#FFFFFF',
        flex: 1,
    },
    bottomInfo: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#F8FAFC',
        borderRadius: 24,
        gap: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F1F5F9',
        height: 75,
    },
    infoText: {
        flex: 1,
        fontSize: 13,
        color: '#64748B',
        lineHeight: 22,
        fontWeight: '500',
    },
    todayFab: {
        position: 'absolute',
        bottom: Math.max(insets.bottom, 20) + 100,
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

