import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Platform, TouchableWithoutFeedback } from 'react-native';
import Animated, { 
    useAnimatedStyle, 
    withSpring, 
    withTiming, 
    useSharedValue, 
    interpolate, 
    Extrapolate, 
    runOnJS 
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


const MENU_ITEMS = [
    { id: 'obs', icon: 'school', label: 'Öğrenci Bilgi Sistemi', screen: 'OBS', type: 'HomeStack', color: '#4CAF50' },
    { id: 'announcements', icon: 'megaphone', label: 'Duyurular', screen: 'Announcements', type: 'Root', color: '#FF9800' },
    { id: 'calendar', icon: 'calendar', label: 'Akademik Takvim', screen: 'AcademicCalendar', type: 'Root', color: '#2196F3' },
    { id: 'notifications', icon: 'notifications', label: 'Bildirimler', screen: 'Notifications', type: 'Root', color: '#E91E63' },
];

export const FloatingMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const animation = useSharedValue(0);
    const navigation = useNavigation<any>();

    const toggleMenu = () => {
        const toValue = isOpen ? 0 : 1;
        animation.value = withSpring(toValue, { damping: 15, stiffness: 100 });
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        if (!isOpen) return;
        animation.value = withTiming(0, { duration: 300 }, (finished) => {
            if (finished) {
                runOnJS(setIsOpen)(false);
            }
        });
    };

    const handlePress = (item: typeof MENU_ITEMS[0]) => {
        closeMenu();
        if (item.type === 'HomeStack') {
            navigation.navigate('HomeStack', { screen: item.screen });
        } else {
             navigation.navigate(item.screen);
        }
    };

    const overlayStyle = useAnimatedStyle(() => {
        return {
            opacity: animation.value,
            // Reanimated 3 supports pointerEvents mapped to style, but typical RN needs state.
            // Using pointerEvents directly on View depending on isOpen state.
        };
    });

    const fabStyle = useAnimatedStyle(() => {
        const rotate = interpolate(animation.value, [0, 1], [0, 135]) + 'deg';
        return {
            transform: [{ rotate }],
        };
    });

    return (
        <View style={styles.container} pointerEvents="box-none">
            {isOpen && (
                <TouchableWithoutFeedback onPress={closeMenu}>
                    <Animated.View style={[styles.overlay, overlayStyle]} pointerEvents="auto">
                        <View style={styles.overlayBackground} />
                        
                        <View style={styles.menuItemsContainer} pointerEvents="box-none">
                            <Text style={styles.menuTitle}>Hızlı Erişim</Text>
                            
                            {MENU_ITEMS.map((item, index) => {
                                const animatedItemStyle = useAnimatedStyle(() => {
                                    const translateY = interpolate(
                                        animation.value,
                                        [0, 1],
                                        [20 + Number(index) * 10, 0],
                                        Extrapolate.CLAMP
                                    );
                                    return {
                                        opacity: animation.value,
                                        transform: [{ translateY }],
                                    };
                                });

                                return (
                                    <Animated.View key={item.id} style={[styles.menuItemWrapper, animatedItemStyle]}>
                                        <TouchableOpacity 
                                            style={styles.menuItem} 
                                            activeOpacity={0.8}
                                            onPress={() => handlePress(item)}
                                        >
                                            <View style={[styles.iconContainer, { backgroundColor: `${item.color}30` }]}>
                                                <Icon name={item.icon} size={24} color={item.color} />
                                            </View>
                                            <Text style={styles.menuItemLabel}>{item.label}</Text>
                                        </TouchableOpacity>
                                    </Animated.View>
                                );
                            })}
                        </View>
                    </Animated.View>
                </TouchableWithoutFeedback>
            )}

            <Animated.View style={[styles.mainFabContainer]}>
                <TouchableOpacity 
                    style={styles.mainFab} 
                    activeOpacity={0.9} 
                    onPress={toggleMenu}
                >
                    <Animated.View style={fabStyle}>
                        <Icon name="add" size={32} color="#FFFFFF" />
                    </Animated.View>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        pointerEvents: 'box-none',
        zIndex: 1000,
        elevation: 10,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1000,
        elevation: 10,
    },
    overlayBackground: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(16, 29, 66, 0.85)',
    },
    menuItemsContainer: {
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 140 : 120,
        left: 20,
        right: 90,
    },
    menuTitle: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 16,
        marginLeft: 8,
        letterSpacing: 0.5,
    },
    menuItemWrapper: {
        marginBottom: 16,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
        padding: 12,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    menuItemLabel: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    mainFabContainer: {
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 110 : 85,
        right: 20,
        zIndex: 1001,
        elevation: 11,
    },
    mainFab: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#182958',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.35,
        shadowRadius: 5,
        borderWidth: 1.5,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
});
