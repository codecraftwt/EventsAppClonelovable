import { Header } from '@/components/common/Header';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthService } from '@/services/authService';
import { UserService } from '@/services/firestoreService';
import { useAuth } from '@/context/AuthContext';
import { User } from '@/types';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];
    const { user: firebaseUser } = useAuth();

    const [profile, setProfile] = useState({
        name: '',
        age: '',
        location: '',
        occupation: '',
        sexuality: '',
        bio: '',
    });

    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [userProfile, setUserProfile] = useState<User | null>(null);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [tempImage, setTempImage] = useState<string | null>(null);
    const [showImagePreview, setShowImagePreview] = useState(false);

    const allInterests = [
        'Social Justice', 'Community Building', 'Hiking', 'Coffee',
        'Environmental Activism', 'Volunteering', 'Mental Health Advocacy', 'LGBTQ+ Rights',
        'Travel', 'Photography', 'Design', 'Food', 'Art', 'Music', 'Sports',
        'Reading', 'Cooking', 'Gaming', 'Technology', 'Networking', 'Education'
    ];

    // Load user profile data
    useEffect(() => {
        const loadUserProfile = async () => {
            if (!firebaseUser) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const userData = await UserService.getUserByUid(firebaseUser.uid);
                
                if (userData) {
                    setUserProfile(userData);
                    setProfile({
                        name: userData.name || '',
                        age: userData.age?.toString() || '',
                        location: userData.location || '',
                        occupation: userData.occupation || '',
                        sexuality: userData.sexuality || '',
                        bio: userData.bio || '',
                    });
                    setSelectedInterests(userData.interests || []);
                    setProfileImage(userData.profileImage || null);
                }
            } catch (error) {
                console.error('Error loading user profile:', error);
                Alert.alert('Error', 'Failed to load profile data');
            } finally {
                setLoading(false);
            }
        };

        loadUserProfile();
    }, [firebaseUser]);

    const toggleInterest = (interest: string) => {
        setSelectedInterests(prev =>
            prev.includes(interest)
                ? prev.filter(i => i !== interest)
                : [...prev, interest]
        );
    };

    const pickImage = async () => {
        try {
            // Request permissions first
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (permissionResult.granted === false) {
                Alert.alert('Permission Required', 'Permission to access photo library is required!');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
                base64: false,
                exif: false,
                presentationStyle: ImagePicker.UIImagePickerPresentationStyle.FULL_SCREEN,
            });

            console.log('Image picker result:', result);

            if (!result.canceled && result.assets && result.assets.length > 0) {
                setTempImage(result.assets[0].uri);
                setShowImagePreview(true);
            }
        } catch (error) {
            console.error('Error picking image:', error);
            Alert.alert('Error', 'Failed to pick image. Please try again.');
        }
    };

    const takePhoto = async () => {
        try {
            // Request permissions first
            const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
            if (permissionResult.granted === false) {
                Alert.alert('Permission Required', 'Permission to access camera is required!');
                return;
            }

            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
                base64: false,
                exif: false,
                presentationStyle: ImagePicker.UIImagePickerPresentationStyle.FULL_SCREEN,
            });

            console.log('Camera result:', result);

            if (!result.canceled && result.assets && result.assets.length > 0) {
                setTempImage(result.assets[0].uri);
                setShowImagePreview(true);
            }
        } catch (error) {
            console.error('Error taking photo:', error);
            Alert.alert('Error', 'Failed to take photo. Please try again.');
        }
    };

    const pickImageWithoutCropper = async () => {
        try {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (permissionResult.granted === false) {
                Alert.alert('Permission Required', 'Permission to access photo library is required!');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false,
                quality: 0.8,
                base64: false,
                exif: false,
            });

            console.log('Image picker result (no cropper):', result);

            if (!result.canceled && result.assets && result.assets.length > 0) {
                setTempImage(result.assets[0].uri);
                setShowImagePreview(true);
            }
        } catch (error) {
            console.error('Error picking image:', error);
            Alert.alert('Error', 'Failed to pick image. Please try again.');
        }
    };

    const showImagePicker = () => {
        Alert.alert(
            'Update Profile Picture',
            'Choose how you want to update your profile picture',
            [
                { text: 'Camera (with crop)', onPress: takePhoto },
                { text: 'Photo Library (with crop)', onPress: pickImage },
                { text: 'Photo Library (no crop)', onPress: pickImageWithoutCropper },
                { text: 'Cancel', style: 'cancel' },
            ]
        );
    };

    const confirmImage = () => {
        if (tempImage) {
            setProfileImage(tempImage);
        }
        setShowImagePreview(false);
        setTempImage(null);
    };

    const cancelImage = () => {
        setShowImagePreview(false);
        setTempImage(null);
    };

    const handleSaveProfile = async () => {
        if (!userProfile) {
            Alert.alert('Error', 'No profile data found');
            return;
        }

        try {
            setSaving(true);
            
            const updatedData = {
                name: profile.name,
                age: profile.age ? parseInt(profile.age) : undefined,
                location: profile.location,
                occupation: profile.occupation || undefined,
                sexuality: profile.sexuality || undefined,
                bio: profile.bio || undefined,
                interests: selectedInterests,
                profileImage: profileImage || undefined,
            };

            // Remove undefined values
            const cleanData = Object.fromEntries(
                Object.entries(updatedData).filter(([_, value]) => value !== undefined)
            );

            await UserService.updateUser(userProfile.id, cleanData);
            Alert.alert('Success', 'Profile updated successfully');
        } catch (error) {
            console.error('Error saving profile:', error);
            Alert.alert('Error', 'Failed to save profile');
        } finally {
            setSaving(false);
        }
    };

    const handleLogout = async () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                { 
                    text: 'Logout', 
                    style: 'destructive',
                    onPress: async () => {
                        const result = await AuthService.signOut();
                        if (result.error) {
                            Alert.alert('Error', result.error);
                        } else {
                            router.replace('/signin');
                        }
                    }
                }
            ]
        );
    };

    const headerRightActions = (
        <>
            <TouchableOpacity onPress={handleSaveProfile} disabled={saving || loading}>
                {saving ? (
                    <ActivityIndicator size="small" color={colors.tint} />
                ) : (
                    <IconSymbol name="checkmark.circle.fill" size={24} color={colors.tint} />
                )}
            </TouchableOpacity>
            <IconSymbol name="message.fill" size={24} color={colors.text} />
            <IconSymbol name="questionmark.circle.fill" size={24} color={colors.text} />
            <TouchableOpacity onPress={() => router.back()}>
                <View style={[styles.profilePic, { backgroundColor: colors.tint }]} />
            </TouchableOpacity>
        </>
    );

    if (loading) {
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
                <Header title="Profile" rightActions={headerRightActions} />
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.tint} />
                    <Text style={[styles.loadingText, { color: colors.text }]}>Loading profile...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <Header title="Profile" rightActions={headerRightActions} />

            <ScrollView style={styles.scrollContainer}>
                {/* Profile Picture Section */}
                <View style={styles.profilePictureSection}>
                    <TouchableOpacity onPress={showImagePicker} disabled={saving || loading}>
                        <View style={[styles.profileImageContainer, { 
                            borderColor: colorScheme === 'dark' ? '#333' : '#e0e0e0' 
                        }]}>
                            {profileImage ? (
                                <Image source={{ uri: profileImage }} style={styles.profileImage} />
                            ) : (
                                <View style={styles.profileImagePlaceholder}>
                                    <IconSymbol name="person.circle" size={60} color={colors.text} />
                                </View>
                            )}
                            <View style={[styles.cameraIcon, { backgroundColor: colors.tint }]}>
                                <IconSymbol name="camera.fill" size={16} color="white" />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <Text style={[styles.profileImageText, { color: colors.text }]}>
                        Tap to update profile picture
                    </Text>
                </View>

                {/* Image Preview Modal */}
                {showImagePreview && tempImage && (
                    <View style={styles.imagePreviewOverlay}>
                        <View style={[styles.imagePreviewModal, { backgroundColor: colors.background }]}>
                            <Text style={[styles.previewTitle, { color: colors.text }]}>
                                Preview Profile Picture
                            </Text>
                            <View style={styles.previewImageContainer}>
                                <Image source={{ uri: tempImage }} style={styles.previewImage} />
                            </View>
                            <View style={styles.previewButtons}>
                                <TouchableOpacity 
                                    style={[styles.previewButton, styles.cancelButton]} 
                                    onPress={cancelImage}
                                >
                                    <Text style={styles.cancelButtonText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={[styles.previewButton, styles.confirmButton, { backgroundColor: colors.tint }]} 
                                    onPress={confirmImage}
                                >
                                    <Text style={styles.confirmButtonText}>Use This Photo</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}

                {/* Personal Information Card */}
                <View style={[styles.card, { backgroundColor: colors.background }]}>
                    <View style={styles.inputGroup}>
                        <Text style={[styles.label, { color: colors.text }]}>Name</Text>
                        <TextInput
                            style={[styles.input, { 
                                color: colors.text, 
                                borderColor: colorScheme === 'dark' ? '#333' : '#e0e0e0' 
                            }]}
                            value={profile.name}
                            onChangeText={(text) => setProfile(prev => ({ ...prev, name: text }))}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={[styles.label, { color: colors.text }]}>Age</Text>
                        <TextInput
                            style={[styles.input, { 
                                color: colors.text, 
                                borderColor: colorScheme === 'dark' ? '#333' : '#e0e0e0' 
                            }]}
                            value={profile.age}
                            onChangeText={(text) => setProfile(prev => ({ ...prev, age: text }))}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={[styles.label, { color: colors.text }]}>Location</Text>
                        <TextInput
                            style={[styles.input, { 
                                color: colors.text, 
                                borderColor: colorScheme === 'dark' ? '#333' : '#e0e0e0' 
                            }]}
                            value={profile.location}
                            onChangeText={(text) => setProfile(prev => ({ ...prev, location: text }))}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={[styles.label, { color: colors.text }]}>Occupation</Text>
                        <TextInput
                            style={[styles.input, { 
                                color: colors.text, 
                                borderColor: colorScheme === 'dark' ? '#333' : '#e0e0e0' 
                            }]}
                            value={profile.occupation}
                            onChangeText={(text) => setProfile(prev => ({ ...prev, occupation: text }))}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={[styles.label, { color: colors.text }]}>Sexuality</Text>
                        <View style={[styles.dropdown, { 
                            borderColor: colorScheme === 'dark' ? '#333' : '#e0e0e0' 
                        }]}>
                            <Text style={[styles.dropdownText, { color: colors.text }]}>{profile.sexuality}</Text>
                            <IconSymbol name="chevron.right" size={16} color={colors.text} />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={[styles.label, { color: colors.text }]}>Bio</Text>
                        <View style={[styles.bioContainer, { 
                            borderColor: colorScheme === 'dark' ? '#333' : '#e0e0e0' 
                        }]}>
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

                    <TouchableOpacity style={styles.settingRow} onPress={handleLogout}>
                        <IconSymbol name="arrow.right.square.fill" size={20} color="#FF9500" />
                        <Text style={[styles.settingText, { color: '#FF9500' }]}>Logout</Text>
                        <IconSymbol name="chevron.right" size={16} color="#FF9500" />
                    </TouchableOpacity>

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
    profileImageContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: 16,
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 60,
    },
    profileImagePlaceholder: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImageText: {
        fontSize: 14,
        opacity: 0.7,
    },
    imagePreviewOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    imagePreviewModal: {
        width: '90%',
        maxWidth: 400,
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
    },
    previewTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    previewImageContainer: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: 'hidden',
        marginBottom: 30,
        borderWidth: 3,
        borderColor: '#fff',
    },
    previewImage: {
        width: '100%',
        height: '100%',
    },
    previewButtons: {
        flexDirection: 'row',
        gap: 15,
        width: '100%',
    },
    previewButton: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#f0f0f0',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    confirmButton: {
        // backgroundColor will be set dynamically
    },
    cancelButtonText: {
        color: '#333',
        fontSize: 16,
        fontWeight: '600',
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 50,
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        fontWeight: '500',
    },
});






