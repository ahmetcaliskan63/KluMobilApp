import React from 'react';
import { View } from 'react-native';
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

                    return (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Icon name={iconName} size={24} color={color} />
                            {focused && route.name !== 'HomeStack' && (
                                <View style={{
                                    width: 4,
                                    height: 4,
                                    borderRadius: 2,
                                    backgroundColor: theme.colors.primary,
                                    marginTop: 4,
                                }} />
                            )}
                        </View>
                    );
                },
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: isDarkMode ? theme.colors.textLight : 'rgba(24, 41, 88, 0.4)',
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    height: 65,
                    backgroundColor: theme.colors.card,
                    borderRadius: 25,
                    borderWidth: 1.5,
                    borderColor: theme.colors.border,
                    paddingBottom: 0,
                    paddingTop: 0,
                    borderTopWidth: 0,
                    ...theme.shadows.medium,
                    shadowColor: theme.colors.primary,
                    shadowOpacity: isDarkMode ? 0.3 : 0.1,
                    shadowRadius: 10,
                },
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontWeight: '700',
                    marginBottom: 10,
                },
                headerShown: true,
                headerStyle: {
                    backgroundColor: theme.colors.primary,
                },
                headerTintColor: '#FFFFFF',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                tabBarShowLabel: true,
            })}>
            <Tab.Screen
                name="Cafeteria"
                component={CafeteriaScreen}
                options={{ title: 'Yemekhane', headerShown: false }}
            />
            <Tab.Screen
                name="Announcements"
                component={AnnouncementsScreen}
                options={{ title: 'Duyurular', headerShown: false }}
            />
            <Tab.Screen
                name="HomeStack"
                component={HomeStackNavigator}
                options={{
                    title: 'Ana Sayfa',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            width: 65,
                            height: 65,
                            backgroundColor: theme.colors.primary,
                            borderRadius: 33,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: 25,
                            borderWidth: 6,
                            borderColor: theme.colors.background,
                            ...theme.shadows.medium,
                        }}>
                            <Icon name={focused ? 'home' : 'home-outline'} size={28} color="#FFFFFF" />
                        </View>
                    ),
                    tabBarLabel: () => null,
                }}
            />
            <Tab.Screen
                name="Library"
                component={LibraryScreen}
                options={{ title: 'Kütüphane', headerShown: false }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ title: 'Profil', headerShown: false }}
            />
        </Tab.Navigator>
    );
};
