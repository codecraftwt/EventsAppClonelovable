import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthService } from '@/services/authService';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/icon-symbol';
import * as ImagePicker from 'expo-image-picker';

export default function SignUpScreen() {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        age: '',
        location: '',
        occupation: '',
        sexuality: '',
        bio: '',
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [showSexualityDropdown, setShowSexualityDropdown] = useState(false);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [tempImage, setTempImage] = useState<string | null>(null);
    const [showImagePreview, setShowImagePreview] = useState(false);

    const sexualityOptions = [
        'Straight', 'Gay', 'Lesbian', 'Bisexual', 'Pansexual', 'Asexual', 
        'Demisexual', 'Queer', 'Questioning', 'Prefer not to say'
    ];

    const allInterests = [
        'Social Justice', 'Community Building', 'Hiking', 'Coffee',
        'Environmental Activism', 'Volunteering', 'Mental Health Advocacy', 'LGBTQ+ Rights',
        'Travel', 'Photography', 'Design', 'Food', 'Art', 'Music', 'Sports',
        'Reading', 'Cooking', 'Gaming', 'Technology', 'Networking', 'Education'
    ];

    const updateField = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

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
            'Select Profile Picture',
            'Choose how you want to add your profile picture',
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

    const handleSignUp = async () => {
        if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim() || !formData.location.trim()) {
            Alert.alert('Error', 'Please fill in all required fields');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }
        if (formData.password.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters');
            return;
        }
        setLoading(true);
        const result = await AuthService.signUp({
            email: formData.email,
            password: formData.password,
            name: formData.name,
            age: formData.age ? parseInt(formData.age) : undefined,
            location: formData.location,
            occupation: formData.occupation || '',
            sexuality: formData.sexuality || '',
            bio: formData.bio || '',
            interests: selectedInterests,
            profileImage: profileImage || '',
        });
        setLoading(false);
        if (result.error) {
            Alert.alert('Sign Up Failed', result.error);
        } else {
            router.replace('/(tabs)');
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
                <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                    <View style={styles.headerContainer}>
                        <Text style={[styles.title, { color: colors.text }]}>Create Account</Text>
                        <Text style={[styles.subtitle, { color: colors.text, opacity: 0.7 }]}>
                            Join Minneapolis Connect today
                        </Text>
                    </View>

                    {/* Profile Picture Section */}
                    <View style={styles.profilePictureSection}>
                        <TouchableOpacity onPress={showImagePicker} disabled={loading}>
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
                            Tap to add profile picture
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

                    <View style={styles.formContainer}>
                        <View style={styles.inputContainer}>
                            <Text style={[styles.label, { color: colors.text }]}>
                                Full Name <Text style={{ color: 'red' }}>*</Text>
                            </Text>
                            <TextInput
                                style={[styles.input, { 
                                    backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#f5f5f5',
                                    color: colors.text,
                                    borderColor: colorScheme === 'dark' ? '#333' : '#e0e0e0'
                                }]}
                                placeholder="Enter your full name"
                                placeholderTextColor={colors.text + '80'}
                                value={formData.name}
                                onChangeText={(value) => updateField('name', value)}
                                autoCapitalize="words"
                                editable={!loading}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={[styles.label, { color: colors.text }]}>
                                Email <Text style={{ color: 'red' }}>*</Text>
                            </Text>
                            <TextInput
                                style={[styles.input, { 
                                    backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#f5f5f5',
                                    color: colors.text,
                                    borderColor: colorScheme === 'dark' ? '#333' : '#e0e0e0'
                                }]}
                                placeholder="Enter your email"
                                placeholderTextColor={colors.text + '80'}
                                value={formData.email}
                                onChangeText={(value) => updateField('email', value)}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                editable={!loading}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={[styles.label, { color: colors.text }]}>
                                Location <Text style={{ color: 'red' }}>*</Text>
                            </Text>
                            <TextInput
                                style={[styles.input, { 
                                    backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#f5f5f5',
                                    color: colors.text,
                                    borderColor: colorScheme === 'dark' ? '#333' : '#e0e0e0'
                                }]}
                                placeholder="e.g., Minneapolis, MN"
                                placeholderTextColor={colors.text + '80'}
                                value={formData.location}
                                onChangeText={(value) => updateField('location', value)}
                                autoCapitalize="words"
                                editable={!loading}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={[styles.label, { color: colors.text }]}>Age</Text>
                            <TextInput
                                style={[styles.input, { 
                                    backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#f5f5f5',
                                    color: colors.text,
                                    borderColor: colorScheme === 'dark' ? '#333' : '#e0e0e0'
                                }]}
                                placeholder="Enter your age"
                                placeholderTextColor={colors.text + '80'}
                                value={formData.age}
                                onChangeText={(value) => updateField('age', value)}
                                keyboardType="numeric"
                                editable={!loading}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={[styles.label, { color: colors.text }]}>Occupation</Text>
                            <TextInput
                                style={[styles.input, { 
                                    backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#f5f5f5',
                                    color: colors.text,
                                    borderColor: colorScheme === 'dark' ? '#333' : '#e0e0e0'
                                }]}
                                placeholder="Enter your occupation"
                                placeholderTextColor={colors.text + '80'}
                                value={formData.occupation}
                                onChangeText={(value) => updateField('occupation', value)}
                                editable={!loading}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={[styles.label, { color: colors.text }]}>Sexuality</Text>
                            <TouchableOpacity
                                style={[styles.dropdown, { 
                                    backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#f5f5f5',
                                    borderColor: colorScheme === 'dark' ? '#333' : '#e0e0e0'
                                }]}
                                onPress={() => setShowSexualityDropdown(!showSexualityDropdown)}
                                disabled={loading}
                            >
                                <Text style={[styles.dropdownText, { color: formData.sexuality ? colors.text : colors.text + '80' }]}>
                                    {formData.sexuality || 'Select your sexuality'}
                                </Text>
                                <IconSymbol name="chevron.down" size={16} color={colors.text} />
                            </TouchableOpacity>
                            
                            {showSexualityDropdown && (
                                <View style={[styles.dropdownList, { 
                                    backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#f5f5f5',
                                    borderColor: colorScheme === 'dark' ? '#333' : '#e0e0e0'
                                }]}>
                                    {sexualityOptions.map((option) => (
                                        <TouchableOpacity
                                            key={option}
                                            style={styles.dropdownItem}
                                            onPress={() => {
                                                updateField('sexuality', option);
                                                setShowSexualityDropdown(false);
                                            }}
                                        >
                                            <Text style={[styles.dropdownItemText, { color: colors.text }]}>{option}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={[styles.label, { color: colors.text }]}>Bio</Text>
                            <TextInput
                                style={[styles.bioInput, { 
                                    backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#f5f5f5',
                                    color: colors.text,
                                    borderColor: colorScheme === 'dark' ? '#333' : '#e0e0e0'
                                }]}
                                placeholder="Tell us about yourself..."
                                placeholderTextColor={colors.text + '80'}
                                value={formData.bio}
                                onChangeText={(value) => updateField('bio', value)}
                                multiline
                                numberOfLines={4}
                                textAlignVertical="top"
                                editable={!loading}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={[styles.label, { color: colors.text }]}>Interests</Text>
                            <Text style={[styles.subLabel, { color: colors.text, opacity: 0.7 }]}>
                                Select your interests (optional)
                            </Text>
                            <View style={styles.interestsGrid}>
                                {allInterests.map((interest) => (
                                    <TouchableOpacity
                                        key={interest}
                                        style={[
                                            styles.interestTag,
                                            selectedInterests.includes(interest)
                                                ? styles.selectedInterest
                                                : styles.unselectedInterest,
                                            { borderColor: colorScheme === 'dark' ? '#333' : '#e0e0e0' }
                                        ]}
                                        onPress={() => toggleInterest(interest)}
                                        disabled={loading}
                                    >
                                        {selectedInterests.includes(interest) && (
                                            <IconSymbol name="checkmark" size={14} color="white" />
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

                        <View style={styles.inputContainer}>
                            <Text style={[styles.label, { color: colors.text }]}>
                                Password <Text style={{ color: 'red' }}>*</Text>
                            </Text>
                            <View style={{ position: 'relative' }}>
                                <TextInput
                                    style={[styles.input, { 
                                        backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#f5f5f5',
                                        color: colors.text,
                                        borderColor: colorScheme === 'dark' ? '#333' : '#e0e0e0'
                                    }]}
                                    placeholder="Enter your password"
                                    placeholderTextColor={colors.text + '80'}
                                    value={formData.password}
                                    onChangeText={(value) => updateField('password', value)}
                                    secureTextEntry={!showPassword}
                                    autoCapitalize="none"
                                    editable={!loading}
                                />
                                <TouchableOpacity 
                                    style={styles.eyeIcon} 
                                    onPress={() => setShowPassword(!showPassword)}
                                >
                                    <Text style={{ color: colors.text, opacity: 0.6 }}>
                                        {showPassword ? 'Hide' : 'Show'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={[styles.label, { color: colors.text }]}>
                                Confirm Password <Text style={{ color: 'red' }}>*</Text>
                            </Text>
                            <View style={{ position: 'relative' }}>
                                <TextInput
                                    style={[styles.input, { 
                                        backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#f5f5f5',
                                        color: colors.text,
                                        borderColor: colorScheme === 'dark' ? '#333' : '#e0e0e0'
                                    }]}
                                    placeholder="Confirm your password"
                                    placeholderTextColor={colors.text + '80'}
                                    value={formData.confirmPassword}
                                    onChangeText={(value) => updateField('confirmPassword', value)}
                                    secureTextEntry={!showConfirmPassword}
                                    autoCapitalize="none"
                                    editable={!loading}
                                />
                                <TouchableOpacity 
                                    style={styles.eyeIcon} 
                                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    <Text style={{ color: colors.text, opacity: 0.6 }}>
                                        {showConfirmPassword ? 'Hide' : 'Show'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: colors.tint }, loading && styles.buttonDisabled]}
                            onPress={handleSignUp}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                <Text style={styles.buttonText}>Sign Up</Text>
                            )}
                        </TouchableOpacity>

                        <View style={styles.footerContainer}>
                            <Text style={[styles.footerText, { color: colors.text }]}>
                                Already have an account?{' '}
                            </Text>
                            <TouchableOpacity onPress={() => router.replace('/signin')} disabled={loading}>
                                <Text style={[styles.linkText, { color: colors.tint }]}>Sign In</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    keyboardView: { flex: 1 },
    scrollContent: { flexGrow: 1, justifyContent: 'center', padding: 20 },
    headerContainer: { marginBottom: 20 },
    title: { fontSize: 32, fontWeight: 'bold', marginBottom: 8 },
    subtitle: { fontSize: 16 },
    profilePictureSection: {
        alignItems: 'center',
        marginBottom: 30,
    },
    profileImageContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
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
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImageText: {
        marginTop: 8,
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
    formContainer: { width: '100%' },
    inputContainer: { marginBottom: 16 },
    label: { fontSize: 14, fontWeight: '600', marginBottom: 8 },
    subLabel: { fontSize: 12, marginBottom: 8 },
    input: { height: 50, borderWidth: 1, borderRadius: 10, paddingHorizontal: 15, fontSize: 16 },
    bioInput: { 
        height: 100, 
        borderWidth: 1, 
        borderRadius: 10, 
        paddingHorizontal: 15, 
        paddingVertical: 12, 
        fontSize: 16,
        textAlignVertical: 'top'
    },
    dropdown: {
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dropdownText: { fontSize: 16 },
    dropdownList: {
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        borderWidth: 1,
        borderRadius: 10,
        maxHeight: 200,
        zIndex: 1000,
        elevation: 5,
    },
    dropdownItem: {
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    dropdownItemText: { fontSize: 16 },
    interestsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 8,
    },
    interestTag: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        marginBottom: 8,
        gap: 4,
        borderWidth: 1,
    },
    selectedInterest: {
        backgroundColor: '#8B5CF6',
        borderColor: '#8B5CF6',
    },
    unselectedInterest: {
        backgroundColor: 'transparent',
    },
    interestText: {
        fontSize: 14,
        fontWeight: '500',
    },
    eyeIcon: { position: 'absolute', right: 15, top: 15 },
    button: { height: 50, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
    buttonDisabled: { opacity: 0.6 },
    buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
    footerContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
    footerText: { fontSize: 14 },
    linkText: { fontSize: 14, fontWeight: '600' },
});

