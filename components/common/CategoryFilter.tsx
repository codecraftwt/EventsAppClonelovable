import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CategoryFilterProps {
    categories: string[];
    activeCategory: string;
    onCategoryPress: (category: string) => void;
    showMoreFilters?: boolean;
}

export function CategoryFilter({
    categories,
    activeCategory,
    onCategoryPress,
    showMoreFilters = false
}: CategoryFilterProps) {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    return (
        <View style={styles.categoryContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
                {categories.map((category) => (
                    <TouchableOpacity
                        key={category}
                        style={[
                            styles.categoryButton,
                            activeCategory === category ? styles.activeCategory : { backgroundColor: '#F0F0F0' }
                        ]}
                        onPress={() => onCategoryPress(category)}
                    >
                        {activeCategory === category && (
                            <IconSymbol name="line.3.horizontal.decrease" size={16} color="white" />
                        )}
                        <Text
                            style={[
                                activeCategory === category ? styles.activeCategoryText : styles.categoryText,
                                { color: activeCategory === category ? 'white' : colors.text }
                            ]}
                        >
                            {category}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            {showMoreFilters && (
                <Text style={[styles.moreFilters, { color: colors.tint }]}>More Filters</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    categoryContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    categoryScroll: {
        marginBottom: 8,
    },
    categoryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 8,
        gap: 4,
    },
    activeCategory: {
        backgroundColor: '#8B5CF6',
    },
    activeCategoryText: {
        color: 'white',
        fontWeight: '500',
    },
    categoryText: {
        fontWeight: '500',
    },
    moreFilters: {
        fontSize: 14,
        fontWeight: '500',
    },
});

