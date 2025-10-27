import { Header } from '@/components/common/Header';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    const [profile, setProfile] = useState({
        name: 'Sarah Johnson',
        age: '28',
        location: 'Portland, OR',
        occupation: 'Community Organizer',
        sexuality: 'Bisexual',
        bio: 'Passionate about social justice and community building. Love hiking, coffee, and meaningful conversations.',
    });

    const [selectedInterests, setSelectedInterests] = useState([
        'Social Justice', 'Community Building', 'Hiking', 'Coffee'
    ]);

    const allInterests = [
        'Social Justice', 'Community Building', 'Hiking', 'Coffee',
        'Environmental Activism', 'Volunteering', 'Mental Health Advocacy', 'LGBTQ+ Rights',
        'Travel', 'Photography', 'Design', 'Food', 'Art', 'Music', 'Sports',
        'Reading', 'Cooking', 'Gaming'
    ];

    const toggleInterest = (interest: string) => {
        setSelectedInterests(prev =>
            prev.includes(interest)
                ? prev.filter(i => i !== interest)
                : [...prev, interest]
        );
    };

    const headerRightActions = (
        <>
            <IconSymbol name="message.fill" size={24} color={colors.text} />
            <IconSymbol name="questionmark.circle.fill" size={24} color={colors.text} />
            <TouchableOpacity onPress={() => router.back()}>
                <View style={[styles.profilePic, { backgroundColor: colors.tint }]} />
            </TouchableOpacity>
        </>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <Header title="Profile" rightActions={headerRightActions} />

            <ScrollView style={styles.scrollContainer}>
                {/* Profile Picture Section */}
                <View style={styles.profilePictureSection}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' }}
                        style={styles.profilePicture}
                    />
                    <TouchableOpacity style={[styles.editProfileButton, { backgroundColor: '#F0F0F0' }]}>
                        <Text style={[styles.editProfileText, { color: colors.text }]}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>

                {/* Personal Information Card */}
                <View style={[styles.card, { backgroundColor: colors.background }]}>
                    <View style={styles.inputGroup}>
                        <Text style={[styles.label, { color: colors.text }]}>Name</Text>
                        <TextInput
                            style={[styles.input, { color: colors.text, borderColor: colors.border }]}
                            value={profile.name}
                            onChangeText={(text) => setProfile(prev => ({ ...prev, name: text }))}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={[styles.label, { color: colors.text }]}>Age</Text>
                        <TextInput
                            style={[styles.input, { color: colors.text, borderColor: colors.border }]}
                            value={profile.age}
                            onChangeText={(text) => setProfile(prev => ({ ...prev, age: text }))}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={[styles.label, { color: colors.text }]}>Location</Text>
                        <TextInput
                            style={[styles.input, { color: colors.text, borderColor: colors.border }]}
                            value={profile.location}
                            onChangeText={(text) => setProfile(prev => ({ ...prev, location: text }))}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={[styles.label, { color: colors.text }]}>Occupation</Text>
                        <TextInput
                            style={[styles.input, { color: colors.text, borderColor: colors.border }]}
                            value={profile.occupation}
                            onChangeText={(text) => setProfile(prev => ({ ...prev, occupation: text }))}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={[styles.label, { color: colors.text }]}>Sexuality</Text>
                        <View style={[styles.dropdown, { borderColor: colors.border }]}>
                            <Text style={[styles.dropdownText, { color: colors.text }]}>{profile.sexuality}</Text>
                            <IconSymbol name="chevron.right" size={16} color={colors.text} />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={[styles.label, { color: colors.text }]}>Bio</Text>
                        <View style={[styles.bioContainer, { borderColor: colors.border }]}>
                            <TextInput
                                style={[styles.bioInput, { color: colors.text }]}
                                value={profile.bio}
                                onChangeText={(text) => setProfile(prev => ({ ...prev, bio: text }))}
                                multiline
                                numberOfLines={4}
                            />
                            <IconSymbol name="doc.text.fill" size={16} color={colors.text} />
                        </View>
                    </View>

                    {/* Interests Section */}
                    <View style={styles.interestsSection}>
                        <Text style={[styles.sectionTitle, { color: colors.text }]}>Interests</Text>
                        <View style={styles.interestsGrid}>
                            {allInterests.map((interest) => (
                                <TouchableOpacity
                                    key={interest}
                                    style={[
                                        styles.interestTag,
                                        selectedInterests.includes(interest)
                                            ? styles.selectedInterest
                                            : styles.unselectedInterest
                                    ]}
                                    onPress={() => toggleInterest(interest)}
                                >
                                    {selectedInterests.includes(interest) && (
                                        <IconSymbol name="checkmark" size={16} color="white" />
                                    )}
                                    <Text style={[
                                        styles.interestText,
                                        { color: selectedInterests.includes(interest) ? 'white' : colors.text }
                                    ]}>
                                        {interest}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>

                {/* Account Settings Card */}
                <View style={[styles.card, { backgroundColor: colors.background }]}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Account Settings</Text>

                    <TouchableOpacity style={styles.settingRow}>
                        <IconSymbol name="doc.text.fill" size={20} color={colors.text} />
                        <Text style={[styles.settingText, { color: colors.text }]}>Pause Account</Text>
                        <IconSymbol name="chevron.right" size={16} color={colors.text} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingRow}>
                        <IconSymbol name="trash.fill" size={20} color="#FF3B30" />
                        <Text style={[styles.settingText, { color: '#FF3B30' }]}>Delete Data & Account</Text>
                        <IconSymbol name="chevron.right" size={16} color="#FF3B30" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingRow}>
                        <IconSymbol name="doc.text.fill" size={20} color={colors.text} />
                        <Text style={[styles.settingText, { color: colors.text }]}>Terms of Service</Text>
                        <IconSymbol name="chevron.right" size={16} color={colors.text} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingRow}>
                        <IconSymbol name="doc.text.fill" size={20} color={colors.text} />
                        <Text style={[styles.settingText, { color: colors.text }]}>Privacy Policy</Text>
                        <IconSymbol name="chevron.right" size={16} color={colors.text} />
                    </TouchableOpacity>
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
    profilePictureSection: {
        alignItems: 'center',
        paddingVertical: 24,
    },
    profilePicture: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 16,
    },
    editProfileButton: {
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 20,
    },
    editProfileText: {
        fontSize: 16,
        fontWeight: '500',
    },
    card: {
        borderRadius: 12,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        fontSize: 16,
    },
    dropdown: {
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dropdownText: {
        fontSize: 16,
    },
    bioContainer: {
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    bioInput: {
        flex: 1,
        fontSize: 16,
        minHeight: 80,
        textAlignVertical: 'top',
    },
    interestsSection: {
        marginTop: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    interestsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    interestTag: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        marginBottom: 8,
        gap: 4,
    },
    selectedInterest: {
        backgroundColor: '#8B5CF6',
    },
    unselectedInterest: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    interestText: {
        fontSize: 14,
        fontWeight: '500',
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        gap: 12,
    },
    settingText: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
    },
    profilePic: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },
});






