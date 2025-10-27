import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface EventCardProps {
    event: any; // Using any for now since we're loading from JSON
    onPress?: () => void;
}

export function EventCard({ event, onPress }: EventCardProps) {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    const handlePress = () => {
        if (onPress) {
            onPress();
        } else {
            router.push(`/event-details?eventId=${event.id}`);
        }
    };

    return (
        <TouchableOpacity style={styles.eventCard} onPress={handlePress}>
            <View style={styles.eventImageContainer}>
                <View style={[styles.categoryTag, { backgroundColor: '#4CAF50' }]}>
                    <IconSymbol name="tag.fill" size={12} color="white" />
                    <Text style={styles.categoryTagText}>{event.category}</Text>
                </View>
                {event.image ? (
                    <Image source={{ uri: event.image }} style={styles.eventImage} />
                ) : (
                    <View style={styles.eventImagePlaceholder}>
                        <IconSymbol name="photo" size={32} color="#999" />
                        <Text style={styles.eventImageText}>Event Image</Text>
                    </View>
                )}
            </View>
            <View style={styles.eventContent}>
                <Text style={[styles.eventTitle, { color: colors.text }]}>{event.title}</Text>
                <Text style={[styles.eventDescription, { color: colors.text }]}>
                    {event.description}
                </Text>
                <View style={styles.eventDetails}>
                    <View style={styles.eventDetail}>
                        <IconSymbol name="clock.fill" size={16} color={colors.text} />
                        <Text style={[styles.eventDetailText, { color: colors.text }]}>{event.time}</Text>
                    </View>
                    <View style={styles.eventDetail}>
                        <IconSymbol name="location.fill" size={16} color={colors.text} />
                        <Text style={[styles.eventDetailText, { color: colors.text }]}>{event.location}</Text>
                    </View>
                    <View style={styles.eventDetail}>
                        <IconSymbol name="person.2.fill" size={16} color={colors.text} />
                        <Text style={[styles.eventDetailText, { color: colors.text }]}>{event.attendees} attending</Text>
                    </View>
                </View>
                <TouchableOpacity style={[styles.viewEventButton, { backgroundColor: colors.tint }]}>
                    <IconSymbol name="arrow.right" size={16} color="white" />
                    <Text style={styles.viewEventButtonText}>View Event</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    eventCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        marginBottom: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    eventImageContainer: {
        position: 'relative',
        height: 200,
    },
    categoryTag: {
        position: 'absolute',
        top: 12,
        right: 12,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        zIndex: 1,
        gap: 4,
    },
    categoryTagText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '500',
    },
    eventImage: {
        width: '100%',
        height: '100%',
    },
    eventImagePlaceholder: {
        flex: 1,
        backgroundColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    eventImageText: {
        color: '#666',
        fontSize: 14,
    },
    eventContent: {
        padding: 16,
    },
    eventTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    eventDescription: {
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 12,
    },
    eventDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    eventDetail: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    eventDetailText: {
        fontSize: 12,
        fontWeight: '500',
    },
    viewEventButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        gap: 8,
    },
    viewEventButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});
