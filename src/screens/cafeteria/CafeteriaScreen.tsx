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
import { theme } from '../../config/theme';
import { MOCK_WEEKLY_MENU, MOCK_STATS } from '../../data/mockData';

export const CafeteriaScreen: React.FC = () => {
    const insets = useSafeAreaInsets();

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />

            {/* Header */}
            <View style={[styles.header, { paddingTop: Math.max(insets.top, 20) }]}>
                <Text style={styles.headerTitle}>Yemekhane</Text>
                <View style={styles.infoCard}>
                    <View style={styles.infoItem}>
                        <Icon name="card-outline" size={24} color="#FFFFFF" />
                        <View>
                            <Text style={styles.infoLabel}>Bakiyeniz</Text>
                            <Text style={styles.infoValue}>₺{MOCK_STATS.balance}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.topUpButton}>
                        <Text style={styles.topUpText}>Yükle</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <Text style={styles.sectionTitle}>Haftalık Menü</Text>

                {MOCK_WEEKLY_MENU.map((menu, index) => (
                    <Card key={index} style={styles.menuCard} elevation="small">
                        <View style={styles.cardHeader}>
                            <View>
                                <Text style={styles.dayText}>{menu.day}</Text>
                                <Text style={styles.dateText}>{menu.date}</Text>
                            </View>
                            <View style={[styles.statusBadge, index === 3 && styles.activeBadge]}>
                                <Text style={[styles.statusText, index === 3 && styles.activeStatusText]}>
                                    {index === 3 ? 'Bugün' : 'Gelecek'}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.itemList}>
                            {menu.items.map((item, i) => (
                                <View key={i} style={styles.itemRow}>
                                    <Icon name="ellipse" size={6} color={theme.colors.primary} style={styles.bullet} />
                                    <Text style={styles.itemText}>{item}</Text>
                                </View>
                            ))}
                        </View>
                    </Card>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F2F5',
    },
    header: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: theme.spacing.lg,
        paddingBottom: theme.spacing.xl,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        ...theme.shadows.medium,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 20,
    },
    infoCard: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: 20,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'space-between',
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
        fontSize: 18,
        fontWeight: 'bold',
    },
    topUpButton: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
    },
    topUpText: {
        color: theme.colors.primary,
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
        backgroundColor: '#FFFFFF',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F2F5',
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
        backgroundColor: '#F0F2F5',
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
