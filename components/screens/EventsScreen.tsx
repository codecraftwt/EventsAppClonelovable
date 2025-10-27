import { EventCard } from '@/components/cards/EventCard';
import { CategoryFilter } from '@/components/common/CategoryFilter';
import { Header } from '@/components/common/Header';
import { SearchBar } from '@/components/common/SearchBar';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useEvents } from '@/hooks/useFirebaseData';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EventsScreen() {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];
    const [activeCategory, setActiveCategory] = useState('All');
    const { events, loading, error } = useEvents();

    const categories = ['All', 'Community', 'Volunteering', 'Small Business', 'Social Dinners', 'Networking'];

    if (loading) {
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
                <Header title="Minneapolis Events" />
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.tint} />
                    <Text style={[styles.loadingText, { color: colors.text }]}>Loading events...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
                <Header title="Minneapolis Events" />
                <View style={styles.errorContainer}>
                    <Text style={[styles.errorText, { color: colors.text }]}>Error loading events: {error}</Text>
                </View>
            </SafeAreaView>
        );
    }

    // Filter events by category
    const filteredEvents = activeCategory === 'All'
        ? events
        : events.filter(event => event.category === activeCategory);

    const groupedEvents = filteredEvents.reduce((acc, event) => {
        const date = event.date;
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(event);
        return acc;
    }, {} as Record<string, typeof events>);

    const headerRightActions = (
        <>
            <IconSymbol name="message.fill" size={24} color={colors.text} />
            <IconSymbol name="questionmark.circle.fill" size={24} color={colors.text} />
            <TouchableOpacity onPress={() => router.push('/profile')}>
                <View style={[styles.profilePic, { backgroundColor: colors.tint }]} />
            </TouchableOpacity>
        </>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <Header title="Minneapolis Events" rightActions={headerRightActions} />

            <SearchBar placeholder="Search events by name, description, location..." />

            <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onCategoryPress={setActiveCategory}
                showMoreFilters={true}
            />

            <ScrollView style={styles.eventsContainer}>
                {Object.entries(groupedEvents).map(([date, events]) => (
                    <View key={date}>
                        {/* Date Header */}
                        <View style={styles.dateHeader}>
                            <IconSymbol name="chevron.down" size={16} color={colors.text} />
                            <Text style={[styles.dateText, { color: colors.text }]}>
                                {new Date(date).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </Text>
                            <Text style={[styles.eventCount, { color: colors.text }]}>
                                {events.length} event{events.length !== 1 ? 's' : ''}
                            </Text>
                        </View>

                        {/* Event Cards */}
                        {events.map((event) => (
                            <EventCard
                                key={event.id}
                                event={event}
                                onPress={() => console.log('View event', event.id)}
                            />
                        ))}
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    profilePic: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },
    eventsContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
    dateHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        gap: 8,
    },
    dateText: {
        fontSize: 18,
        fontWeight: '600',
        flex: 1,
    },
    eventCount: {
        fontSize: 14,
        fontWeight: '500',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: 16,
        textAlign: 'center',
    },
});
