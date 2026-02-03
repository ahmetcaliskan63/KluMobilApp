import React from 'react';
import { View, Platform, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { DashboardScreen } from '../screens/home/DashboardScreen';
import { CafeteriaScreen } from '../screens/cafeteria/CafeteriaScreen';
import { AnnouncementsScreen } from '../screens/announcements/AnnouncementsScreen';
import { LibraryScreen } from '../screens/library/LibraryScreen';
import { SettingsScreen } from '../screens/settings/SettingsScreen';
import { MainTabParamList, RootStackParamList } from '../types/navigation';
import { theme as defaultTheme } from '../config/theme';
import { useAppTheme } from '../hooks/useAppTheme';
import { useNavigation, NavigationProp } from '@react-navigation/native';

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
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = '';

                    switch (route.name) {
                        case 'HomeStack': iconName = focused ? 'home' : 'home-outline'; break;
                        case 'Cafeteria': iconName = focused ? 'restaurant' : 'restaurant-outline'; break;
                        case 'Announcements': iconName = focused ? 'notifications' : 'notifications-outline'; break;
                        case 'Library': iconName = focused ? 'book' : 'book-outline'; break;
                        case 'Settings': iconName = focused ? 'settings' : 'settings-outline'; break;
                    }

                    if (route.name === 'HomeStack') return null;

                    return (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Icon
                                name={iconName}
                                size={24}
                                color={focused ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)'}
                            />
                            {focused && (
                                <View style={{
                                    width: 4,
                                    height: 4,
                                    borderRadius: 2,
                                    backgroundColor: '#FFFFFF',
                                    marginTop: 4,
                                }} />
                            )}
                        </View>
                    );
                },
                tabBarActiveTintColor: '#FFFFFF',
                tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.5)',
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: Platform.OS === 'ios' ? 95 : 75,
                    backgroundColor: '#101D42',
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    borderTopWidth: 1,
                    borderTopColor: 'rgba(255, 255, 255, 0.05)',
                    paddingBottom: Platform.OS === 'ios' ? 35 : 12,
                    paddingTop: 12,
                },
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontWeight: '700',
                    letterSpacing: 0.5,
                    marginTop: -5,
                },
                headerShown: true,
                headerStyle: {
                    backgroundColor: '#101D42',
                    height: Platform.OS === 'ios' ? 120 : 110,
                    elevation: 8,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.15,
                    shadowRadius: 12,
                    borderBottomWidth: 0,
                },
                headerTitleStyle: {
                    fontWeight: '900',
                    fontSize: 18,
                    color: '#FFFFFF',
                },
                headerTitleAlign: 'center',
                headerLeft: () => (
                    <View style={{ marginLeft: 16 }}>
                        <View style={{
                            width: 42,
                            height: 42,
                            borderRadius: 21,
                            backgroundColor: '#FFFFFF',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: 1,
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                        }}>
                            <Image
                                source={require('../assets/logo.png')}
                                style={{ width: 38, height: 38 }}
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                ),
                headerRight: () => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Profile')}
                        style={{ marginRight: 16 }}
                    >
                        <View style={{
                            width: 38,
                            height: 38,
                            borderRadius: 19,
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: 1,
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                        }}>
                            <Icon name="person" size={20} color="#FFFFFF" />
                        </View>
                    </TouchableOpacity>
                ),
                tabBarShowLabel: true,
                tabBarHideOnKeyboard: true,
            })}>
            <Tab.Screen
                name="Cafeteria"
                component={CafeteriaScreen}
                options={{ title: 'Yemek' }}
            />
            <Tab.Screen
                name="Announcements"
                component={AnnouncementsScreen}
                options={{ title: 'Duyuru' }}
            />
            <Tab.Screen
                name="HomeStack"
                component={HomeStackNavigator}
                options={{
                    title: 'Ana Sayfa',
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            width: 68,
                            height: 68,
                            borderRadius: 34,
                            backgroundColor: focused ? '#FFFFFF' : '#101D42', // Tıklandığında beyaza döner
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: Platform.OS === 'ios' ? 50 : 40,
                            borderWidth: 1.5,
                            borderColor: focused ? '#101D42' : '#FFFFFF', // Tıklandığında maviye döner
                        }}>
                            <View style={{
                                width: 52,
                                height: 52,
                                borderRadius: 26,
                                backgroundColor: focused ? '#101D42' : '#FFFFFF', // İç taraf tıklandığında mavi, değilse beyaz
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderWidth: 1.5,
                                borderColor: focused ? '#FFFFFF' : '#101D42',
                            }}>
                                <Icon
                                    name="home" // Her zaman dolu ikon (Daha belirgin mavi)
                                    size={28}
                                    color={focused ? '#FFFFFF' : '#101D42'}
                                />
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
                name="Settings"
                component={SettingsScreen}
                options={{ title: 'Ayarlar' }}
            />
        </Tab.Navigator >
    );
};
