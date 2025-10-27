import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ResourceCardProps {
    resource: any; // Using any for now since we're loading from JSON
    onPress?: () => void;
}

export function ResourceCard({ resource, onPress }: ResourceCardProps) {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    return (
        <TouchableOpacity
            style={[styles.resourceCard, { backgroundColor: colors.background }]}
            onPress={onPress}
        >
            <View style={styles.resourceIconContainer}>
                <IconSymbol
                    name={resource.icon || 'doc.text.fill'}
                    size={24}
                    color={resource.color || '#2196F3'}
                />
            </View>
            <View style={styles.resourceContent}>
                <Text style={[styles.resourceTitle, { color: colors.text }]}>{resource.title}</Text>
                <View style={styles.resourceMeta}>
                    <View style={[styles.resourceType, { backgroundColor: '#E3F2FD' }]}>
                        <Text style={[styles.resourceTypeText, { color: resource.color || '#2196F3' }]}>
                            {resource.type}
                        </Text>
                    </View>
                    <Text style={[styles.resourceDuration, { color: colors.text }]}>{resource.duration}</Text>
                    <View style={[styles.resourceCategory, { backgroundColor: '#F0F0F0' }]}>
                        <Text style={[styles.resourceCategoryText, { color: colors.text }]}>
                            {resource.category}
                        </Text>
                    </View>
                </View>
            </View>
            <IconSymbol name="arrow.up.right" size={20} color={colors.text} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    resourceCard: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    resourceIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    resourceContent: {
        flex: 1,
    },
    resourceTitle: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
    },
    resourceMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    resourceType: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    resourceTypeText: {
        fontSize: 12,
        fontWeight: '500',
    },
    resourceDuration: {
        fontSize: 12,
        opacity: 0.7,
    },
    resourceCategory: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    resourceCategoryText: {
        fontSize: 12,
        fontWeight: '500',
    },
});
