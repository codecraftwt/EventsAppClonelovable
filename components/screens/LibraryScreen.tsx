import { ResourceCard } from '@/components/cards/ResourceCard';
import { Header } from '@/components/common/Header';
import { SearchBar } from '@/components/common/SearchBar';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useResources } from '@/hooks/useFirebaseData';
import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LibraryScreen() {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];
    const [searchQuery, setSearchQuery] = useState('');
    const { resources, loading, error } = useResources();

    if (loading) {
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
                <Header title="Minneapolis Resources" />
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.tint} />
                    <Text style={[styles.loadingText, { color: colors.text }]}>Loading resources...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
                <Header title="Minneapolis Resources" />
                <View style={styles.errorContainer}>
                    <Text style={[styles.errorText, { color: colors.text }]}>Error loading resources: {error}</Text>
                </View>
            </SafeAreaView>
        );
    }

    const filteredResources = resources.filter(resource =>
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const categories = [
        { name: 'Networking Tips', icon: 'person.2.fill', color: '#8B5CF6', count: 87 },
        { name: 'Event Planning', icon: 'calendar.badge.plus', color: '#2196F3', count: 64 },
        { name: 'Community Building', icon: 'person.3.fill', color: '#E91E63', count: 92 },
        { name: 'Minneapolis Guide', icon: 'map.fill', color: '#8B5CF6', count: 56 },
    ];

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <Header title="Minneapolis Resources" />

            <ScrollView style={styles.scrollContainer}>
                {/* Welcome Section */}
                <View style={[styles.welcomeCard, { backgroundColor: '#E8D5FF' }]}>
                    <Text style={[styles.welcomeTitle, { color: colors.text }]}>New to Minneapolis Connect?</Text>
                    <Text style={[styles.welcomeSubtitle, { color: colors.text }]}>Complete your profile and get verified.</Text>
                    <TouchableOpacity style={[styles.startButton, { backgroundColor: colors.tint }]}>
                        <IconSymbol name="person.badge.plus" size={16} color="white" />
                        <Text style={styles.startButtonText}>Start</Text>
                    </TouchableOpacity>
                </View>

                {/* Search Bar */}
                <SearchBar
                    placeholder="Search resources..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />

                {/* Categories Section */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Categories</Text>
                    <View style={styles.categoriesGrid}>
                        {categories.map((category) => (
                            <TouchableOpacity
                                key={category.name}
                                style={[styles.categoryCard, { backgroundColor: '#E8D5FF' }]}
                            >
                                <IconSymbol name={category.icon as any} size={32} color={category.color} />
                                <Text style={[styles.categoryTitle, { color: colors.text }]}>{category.name}</Text>
                                <Text style={[styles.categoryCount, { color: colors.text }]}>{category.count} resources</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Recent Section */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent</Text>
                    {filteredResources.map((resource) => (
                        <ResourceCard
                            key={resource.id}
                            resource={resource}
                            onPress={() => console.log('View resource', resource.id)}
                        />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
    welcomeCard: {
        padding: 20,
        borderRadius: 12,
        marginBottom: 20,
        position: 'relative',
    },
    welcomeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    welcomeSubtitle: {
        fontSize: 14,
        marginBottom: 16,
    },
    startButton: {
        position: 'absolute',
        right: 20,
        top: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        gap: 4,
    },
    startButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    categoryCard: {
        width: '48%',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 12,
    },
    categoryTitle: {
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 4,
    },
    categoryCount: {
        fontSize: 12,
        opacity: 0.7,
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
