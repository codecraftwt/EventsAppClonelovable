import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { EventService } from '@/services/firestoreService';
import { Event } from '@/types';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EventDetailsScreen() {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];
    const [isLiked, setIsLiked] = useState(false);
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Get eventId from route params
    const { eventId } = useLocalSearchParams<{ eventId: string }>();

    // Fetch event data from Firebase
    useEffect(() => {
        const fetchEvent = async () => {
            if (!eventId) {
                setError('No event ID provided');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);
                const eventData = await EventService.getEventById(eventId as string);

                if (!eventData) {
                    setError('Event not found');
                } else {
                    setEvent(eventData);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load event');
                console.error('Error fetching event:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [eventId]);

    const handleJoinEvent = () => {
        // Handle join event logic
        if (event) {
            console.log('Joining event:', event.id);
        }
    };

    const handleLike = () => {
        setIsLiked(!isLiked);
    };

    // Loading state
    if (loading) {
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
                <View style={[styles.header, { backgroundColor: colors.background }]}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
                        <IconSymbol name="chevron.left" size={24} color={colors.text} />
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, { color: colors.text }]}>Event Details</Text>
                    <View style={styles.headerButton} />
                </View>
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color={colors.tint} />
                    <Text style={[styles.loadingText, { color: colors.text }]}>Loading event...</Text>
                </View>
            </SafeAreaView>
        );
    }

    // Error state
    if (error || !event) {
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
                <View style={[styles.header, { backgroundColor: colors.background }]}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
                        <IconSymbol name="chevron.left" size={24} color={colors.text} />
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, { color: colors.text }]}>Event Details</Text>
                    <View style={styles.headerButton} />
                </View>
                <View style={styles.centerContainer}>
                    <IconSymbol name="exclamationmark.triangle" size={48} color={colors.text} />
                    <Text style={[styles.errorText, { color: colors.text }]}>{error || 'Event not found'}</Text>
                    <TouchableOpacity
                        style={[styles.retryButton, { backgroundColor: colors.tint }]}
                        onPress={() => router.back()}
                    >
                        <Text style={styles.retryButtonText}>Go Back</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Header */}
            <View style={[styles.header, { backgroundColor: colors.background }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
                    <IconSymbol name="chevron.left" size={24} color={colors.text} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: colors.text }]}>Event Details</Text>
                <TouchableOpacity style={styles.headerButton}>
                    <IconSymbol name="square.and.arrow.up" size={24} color={colors.text} />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollContainer}>
                {/* Event Banner Image */}
                <View style={styles.bannerContainer}>
                    <Image source={{ uri: event.image }} style={styles.bannerImage} />

                    {/* Category Tag */}
                    <View style={styles.categoryTag}>
                        <Text style={styles.categoryText}>{event.category}</Text>
                    </View>

                    {/* Like Button */}
                    <TouchableOpacity style={styles.likeButton} onPress={handleLike}>
                        <IconSymbol
                            name={isLiked ? "heart.fill" : "heart"}
                            size={24}
                            color={isLiked ? "#FF3B30" : "white"}
                        />
                    </TouchableOpacity>
                </View>

                {/* Event Information Card */}
                <View style={[styles.card, { backgroundColor: colors.background }]}>
                    <Text style={[styles.eventTitle, { color: colors.text }]}>{event.title}</Text>
                    <Text style={[styles.eventDescription, { color: colors.text }]}>{event.description}</Text>

                    {/* Event Details */}
                    <View style={styles.detailsContainer}>
                        <View style={[styles.detailRow, { backgroundColor: '#F5F5F5' }]}>
                            <IconSymbol name="calendar" size={20} color={colors.text} />
                            <Text style={[styles.detailText, { color: colors.text }]}>{event.date}</Text>
                        </View>

                        <View style={[styles.detailRow, { backgroundColor: '#F5F5F5' }]}>
                            <IconSymbol name="clock.fill" size={20} color={colors.text} />
                            <Text style={[styles.detailText, { color: colors.text }]}>{event.time}</Text>
                        </View>

                        <View style={[styles.detailRow, { backgroundColor: '#F5F5F5' }]}>
                            <IconSymbol name="location.fill" size={20} color={colors.text} />
                            <Text style={[styles.detailText, { color: colors.text }]}>{event.location}</Text>
                        </View>

                        <View style={[styles.detailRow, { backgroundColor: '#F5F5F5' }]}>
                            <IconSymbol name="person.2.fill" size={20} color={colors.text} />
                            <Text style={[styles.detailText, { color: colors.text }]}>{event.attendees} people</Text>
                        </View>
                    </View>

                    {/* Join Event Button */}
                    <TouchableOpacity style={styles.joinButton} onPress={handleJoinEvent}>
                        <Text style={styles.joinButtonText}>Join Event</Text>
                    </TouchableOpacity>
                </View>

                {/* Attendees Section */}
                <View style={[styles.card, { backgroundColor: colors.background }]}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Attendees ({event.attendees})</Text>
                    <View style={styles.attendeesContainer}>
                        <View style={styles.attendeeInfoContainer}>
                            <IconSymbol name="person.2.fill" size={32} color={colors.text} />
                            <Text style={[styles.attendeeCount, { color: colors.text }]}>
                                {event.attendees} {event.attendees === 1 ? 'person' : 'people'} attending
                            </Text>
                        </View>
                        {event.maxAttendees && (
                            <Text style={[styles.maxAttendeesText, { color: colors.text }]}>
                                Maximum capacity: {event.maxAttendees}
                            </Text>
                        )}
                    </View>
                </View>

                {/* About the Organizer Section */}
                <View style={[styles.card, { backgroundColor: colors.background }]}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>About the Organizer</Text>
                    <View style={styles.organizerContainer}>
                        {event.organizer.profileImage ? (
                            <Image source={{ uri: event.organizer.profileImage }} style={styles.organizerAvatar} />
                        ) : (
                            <View style={styles.organizerAvatarPlaceholder}>
                                <IconSymbol name="person.circle.fill" size={40} color={colors.text} />
                            </View>
                        )}
                        <View style={styles.organizerInfo}>
                            <Text style={[styles.organizerName, { color: colors.text }]}>{event.organizer.name}</Text>
                            {event.organizer.bio && (
                                <Text style={[styles.organizerDescription, { color: colors.text }]}>{event.organizer.bio}</Text>
                            )}
                            {event.organizer.location && (
                                <View style={styles.organizerLocationContainer}>
                                    <IconSymbol name="location.fill" size={14} color={colors.text} />
                                    <Text style={[styles.organizerLocation, { color: colors.text }]}>{event.organizer.location}</Text>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    headerButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    scrollContainer: {
        flex: 1,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        gap: 16,
    },
    loadingText: {
        fontSize: 16,
        marginTop: 12,
    },
    errorText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 12,
    },
    retryButton: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginTop: 8,
    },
    retryButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    bannerContainer: {
        position: 'relative',
        height: 250,
    },
    bannerImage: {
        width: '100%',
        height: '100%',
    },
    categoryTag: {
        position: 'absolute',
        top: 16,
        right: 16,
        backgroundColor: '#8B5CF6',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    categoryText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
    },
    likeButton: {
        position: 'absolute',
        top: 16,
        left: 16,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        margin: 16,
        borderRadius: 12,
        padding: 20,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    eventTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    eventDescription: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 20,
    },
    detailsContainer: {
        gap: 12,
        marginBottom: 20,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderRadius: 8,
        gap: 12,
    },
    detailText: {
        fontSize: 16,
        fontWeight: '500',
    },
    joinButton: {
        backgroundColor: '#8B5CF6',
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    joinButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    attendeesContainer: {
        gap: 12,
    },
    attendeeInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    attendeeCount: {
        fontSize: 16,
        fontWeight: '500',
    },
    maxAttendeesText: {
        fontSize: 14,
        opacity: 0.7,
    },
    organizerContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
    },
    organizerAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    organizerAvatarPlaceholder: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    organizerInfo: {
        flex: 1,
    },
    organizerName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    organizerDescription: {
        fontSize: 14,
        opacity: 0.7,
        marginBottom: 4,
    },
    organizerLocationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 4,
    },
    organizerLocation: {
        fontSize: 12,
        opacity: 0.6,
    },
});






