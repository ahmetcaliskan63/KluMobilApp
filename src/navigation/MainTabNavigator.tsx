import React from 'react';
import { View, Platform, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { DashboardScreen } from '../screens/home/DashboardScreen';
import { CafeteriaScreen } from '../screens/cafeteria/CafeteriaScreen';
import { AnnouncementsScreen } from '../screens/announcements/AnnouncementsScreen';
import { LibraryScreen } from '../screens/library/LibraryScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { MainTabParamList } from '../types/navigation';
import { theme as defaultTheme } from '../config/theme';
import { useAppTheme } from '../hooks/useAppTheme';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScheduleScreen } from '../screens/home/ScheduleScreen';
import { OBSScreen } from '../screens/home/OBSScreen';
import { CourseDetailScreen } from '../screens/home/CourseDetailScreen';
import { ExamDetailScreen } from '../screens/home/ExamDetailScreen';
import { HomeStackParamList } from '../types/navigation';

const Tab = createBottomTabNavigator<MainTabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
        <HomeStack.Screen name="Dashboard" component={DashboardScreen} />
        <HomeStack.Screen name="Schedule" component={ScheduleScreen} />
        <HomeStack.Screen name="OBS" component={OBSScreen} />
        <HomeStack.Screen name="CourseDetail" component={CourseDetailScreen} />
        <HomeStack.Screen name="ExamDetail" component={ExamDetailScreen} />
    </HomeStack.Navigator>
);

export const MainTabNavigator: React.FC = () => {
    const { theme, isDarkMode } = useAppTheme();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = '';

                    switch (route.name) {
                        case 'HomeStack':
                            iconName = focused ? 'home' : 'home-outline';
                            break;
                        case 'Cafeteria':
                            iconName = focused ? 'restaurant' : 'restaurant-outline';
                            break;
                        case 'Announcements':
                            iconName = focused ? 'notifications' : 'notifications-outline';
                            break;
                        case 'Library':
                            iconName = focused ? 'book' : 'book-outline';
                            break;
                        case 'Profile':
                            iconName = focused ? 'person' : 'person-outline';
                            break;
                    }

                    if (route.name === 'HomeStack') return null;

                    return (
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 36,
                            width: 48,
                            borderRadius: 12,
                            backgroundColor: focused ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                            borderWidth: focused ? 1 : 0,
                            borderColor: 'rgba(255, 255, 255, 0.08)',
                        }}>
                            <Icon
                                name={iconName}
                                size={focused ? 22 : 21}
                                color={focused ? '#FFFFFF' : 'rgba(255, 255, 255, 0.75)'}
                            />
                        </View>
                    );
                },
                tabBarActiveTintColor: '#FFFFFF',
                tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.7)',
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: Platform.OS === 'ios' ? 95 : 85,
                    backgroundColor: '#101D42',
                    borderTopWidth: 0,
                    paddingBottom: Platform.OS === 'ios' ? 35 : 18,
                    paddingTop: 8,
                    ...Platform.select({
                        ios: {
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: -10 },
                            shadowOpacity: 0.3,
                            shadowRadius: 15,
                        },
                        android: {
                            elevation: 35,
                        },
                    }),
                },
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontWeight: '800',
                    letterSpacing: 0.8,
                    textTransform: 'uppercase',
                    marginTop: 4,
                },
                headerShown: true,
                headerStyle: {
                    backgroundColor: '#101D42', // Rich Executive Blue
                    height: Platform.OS === 'ios' ? 120 : 110, // Increased by 10px
                    elevation: 20, // Max elevation for Android shadow & layering
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 10,
                    borderBottomWidth: 0,
                    zIndex: 10000, // Extremely high z-index to stay on top
                },
                headerTitleStyle: {
                    fontWeight: '900',
                    fontSize: 17,
                    color: '#FFFFFF',
                    letterSpacing: 0.5,
                },
                headerTitleAlign: 'center',
                headerLeft: () => (
                    <View style={{
                        marginLeft: 12,
                        zIndex: 10001,
                        elevation: 21,
                        height: '100%',
                        justifyContent: 'center', // Center vertically
                    }}>
                        <View style={{
                            width: 45, // Prominent size
                            height: 45,
                            borderRadius: 25,
                            backgroundColor: '#FFFFFF',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: 2,
                            borderColor: 'rgba(255, 255, 255, 0.4)',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.25,
                            shadowRadius: 4,
                            elevation: 10,
                        }}>
                            <Image
                                source={require('../assets/logo.png')}
                                style={{ width: 43, height: 43 }}
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                ),
                headerRight: () => <View style={{ width: 56 }} />,
                tabBarShowLabel: true,
                tabBarHideOnKeyboard: true,
            })}>
            <Tab.Screen
                name="Cafeteria"
                component={CafeteriaScreen}
                options={{ title: 'Yemekhane' }}
            />
            <Tab.Screen
                name="Announcements"
                component={AnnouncementsScreen}
                options={{ title: 'Duyurular' }}
            />
            <Tab.Screen
                name="HomeStack"
                component={HomeStackNavigator}
                options={{
                    title: 'Ana Sayfa',
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            width: 72,
                            height: 72,
                            borderRadius: 36,
                            backgroundColor: '#101D42',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: Platform.OS === 'ios' ? 50 : 55,
                            borderWidth: 1,
                            borderColor: 'rgba(255, 255, 255, 0.15)',
                            ...Platform.select({
                                ios: {
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 10 },
                                    shadowOpacity: 0.4,
                                    shadowRadius: 12,
                                },
                                android: {
                                    elevation: 15,
                                },
                            }),
                        }}>
                            <View style={{
                                width: 58,
                                height: 58,
                                borderRadius: 29,
                                backgroundColor: '#FFFFFF',
                                justifyContent: 'center',
                                alignItems: 'center',
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.1,
                                shadowRadius: 4,
                            }}>
                                <Icon name={focused ? 'home' : 'home-outline'} size={28} color="#101D42" />
                            </View>
                        </View>
                    ),
                    tabBarLabel: () => null,
                }}
            />
            <Tab.Screen
                name="Library"
                component={LibraryScreen}
                options={{ title: 'Kütüphane' }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ title: 'Profil' }}
            />
        </Tab.Navigator>
    );
};
