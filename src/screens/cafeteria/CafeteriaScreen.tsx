import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '../../components/common';
import { theme as defaultTheme, Theme } from '../../config/theme';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Platform } from 'react-native';
import { MOCK_WEEKLY_MENU, MOCK_STATS } from '../../data/mockData';

export const CafeteriaScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const { theme, isDarkMode } = useAppTheme();
    const s = styles(theme);

    return (
        <View style={s.container}>
            <StatusBar barStyle="light-content" backgroundColor="#101D42" />

            {/* Balance Card integrated into content */}
            <View style={s.balanceWrapper}>
                <View style={s.infoCard}>
                    <View style={s.infoItem}>
                        <Icon name="card-outline" size={24} color="#FFFFFF" />
                        <View>
                            <Text style={s.infoLabel}>Bakiyeniz</Text>
                            <Text style={s.infoValue}>₺{MOCK_STATS.balance}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={s.topUpButton}>
                        <Text style={s.topUpText}>Yükle</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={s.scrollContent} showsVerticalScrollIndicator={false}>
                <Text style={s.sectionTitle}>Haftalık Menü</Text>

                {MOCK_WEEKLY_MENU.map((menu, index) => (
                    <Card key={index} style={s.menuCard} elevation="small">
                        <View style={s.cardHeader}>
                            <View>
                                <Text style={s.dayText}>{menu.day}</Text>
                                <Text style={s.dateText}>{menu.date}</Text>
                            </View>
                            <View style={[s.statusBadge, index === 3 && s.activeBadge]}>
                                <Text style={[s.statusText, index === 3 && s.activeStatusText]}>
                                    {index === 3 ? 'Bugün' : 'Gelecek'}
                                </Text>
                            </View>
                        </View>

                        <View style={s.itemList}>
                            {menu.items.map((item, i) => (
                                <View key={i} style={s.itemRow}>
                                    <Icon name="ellipse" size={6} color={theme.colors.primary} style={s.bullet} />
                                    <Text style={s.itemText}>{item}</Text>
                                </View>
                            ))}
                        </View>
                    </Card>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.surface,
    },
    balanceWrapper: {
        padding: theme.spacing.md,
        backgroundColor: theme.colors.surface,
    },
    infoCard: {
        flexDirection: 'row',
        backgroundColor: '#101D42',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        ...theme.shadows.medium,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    infoLabel: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 12,
    },
    infoValue: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
    topUpButton: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
    },
    topUpText: {
        color: '#101D42',
        fontWeight: 'bold',
        fontSize: 14,
    },
    scrollContent: {
        padding: theme.spacing.md,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginVertical: 16,
        paddingHorizontal: 4,
    },
    menuCard: {
        marginBottom: 16,
        padding: 16,
        borderRadius: 20,
        backgroundColor: theme.colors.card,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
        paddingBottom: 12,
    },
    dayText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    dateText: {
        fontSize: 13,
        color: theme.colors.textLight,
        marginTop: 2,
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        backgroundColor: theme.colors.border + '50',
    },
    activeBadge: {
        backgroundColor: theme.colors.primary + '15',
    },
    statusText: {
        fontSize: 11,
        fontWeight: 'bold',
        color: theme.colors.textSecondary,
    },
    activeStatusText: {
        color: theme.colors.primary,
    },
    itemList: {
        gap: 8,
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    bullet: {
        opacity: 0.6,
    },
    itemText: {
        fontSize: 15,
        color: theme.colors.textSecondary,
    },
});
