import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Platform, TouchableWithoutFeedback } from 'react-native';
import Animated, { 
    useAnimatedStyle, 
    withSpring, 
    withTiming, 
    useSharedValue, 
    interpolate, 
    Extrapolate, 
    runOnJS,
    SharedValue
} from 'react-native-reanimated';
import { Ionicons as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';




interface MenuItemComponentProps {
    item: typeof MENU_ITEMS[0];
    index: number;
    animation: SharedValue<number>;
    onPress: (item: typeof MENU_ITEMS[0]) => void;
}

const MenuItemComponent: React.FC<MenuItemComponentProps> = ({ item, index, animation, onPress }) => {
    const animatedItemStyle = useAnimatedStyle(() => {
        const translateY = interpolate(
            animation.value,
            [0, 1],
            [30 + Number(index) * 15, 0],
            Extrapolate.CLAMP
        );
        const scale = interpolate(
            animation.value,
            [0, 1],
            [0.6, 1],
            Extrapolate.CLAMP
        );
        return {
            opacity: animation.value,
            transform: [{ translateY }, { scale }],
        };
    });

    return (
        <Animated.View style={[styles.menuItemWrapper, animatedItemStyle]}>
            <TouchableOpacity 
                style={styles.menuItem} 
                activeOpacity={0.8}
                onPress={() => onPress(item)}
            >
                <Text style={styles.menuItemLabel}>{item.label}</Text>
                <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                    <Icon name={item.icon as any} size={20} color="#FFFFFF" />
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

export const FloatingMenu: React.FC = () => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const animation = useSharedValue(0);
    const navigation = useNavigation<any>();

    const MENU_ITEMS = [
        { id: 'calendar', icon: 'calendar', label: t('profile.quickActions.academicCalendar'), screen: 'AcademicCalendar', type: 'Root', color: '#2196F3' },
        { id: 'email', icon: 'mail', label: t('profile.quickActions.email'), screen: 'EmailSettings', type: 'Root', color: '#E91E63' },
        { id: 'wifi', icon: 'wifi', label: t('profile.quickActions.wifi'), screen: 'WifiSettings', type: 'Root', color: '#4CAF50' },
    ];

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
        const rotate = interpolate(animation.value, [0, 1], [0, 90]) + 'deg';
        const scale = interpolate(animation.value, [0, 1], [1, 1.1]);
        return {
            transform: [{ rotate }, { scale }],
        };
    });

    return (
        <View style={styles.container} pointerEvents="box-none">
            {isOpen && (
                <TouchableWithoutFeedback onPress={closeMenu}>
                    <Animated.View style={[styles.overlay, overlayStyle]} pointerEvents="auto">
                        <View style={styles.overlayBackground} />
                        
                        <View style={styles.menuItemsContainer} pointerEvents="box-none">
                            {MENU_ITEMS.map((item, index) => (
                                <MenuItemComponent
                                    key={item.id}
                                    item={item}
                                    index={index}
                                    animation={animation}
                                    onPress={handlePress}
                                />
                            ))}
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
                        <Icon 
                            name={(isOpen ? "close" : "flash") as any} 
                            size={32} 
                            color="#FFFFFF" 
                        />
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
        bottom: Platform.OS === 'ios' ? 180 : 155,
        right: 28,
        alignItems: 'flex-end',
    },
    menuItemWrapper: {
        marginBottom: 20,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    menuItemLabel: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
        marginRight: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        overflow: 'hidden',
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

