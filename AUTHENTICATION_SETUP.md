# Firebase Authentication Setup

## What Has Been Implemented

### 1. AuthContext (`context/AuthContext.tsx`)
- Created authentication context to manage user state
- Provides `user`, `loading`, and `isAuthenticated` values
- Uses Firebase `onAuthStateChanged` to track authentication status

### 2. AuthService (`services/authService.ts`)
- **signUp()**: Creates user account with Firebase Auth and stores profile in Firestore
- **signIn()**: Authenticates user with email and password
- **signOut()**: Signs out the current user
- Includes error handling with user-friendly error messages

### 3. Root Layout Updated (`app/_layout.tsx`)
- Wrapped app with `AuthProvider`
- Shows signin/signup screens when not authenticated
- Shows main app screens when authenticated

## What You Need to Create

### Create Sign-In Screen (`app/signin.tsx`)

Create this file with a login form similar to your ProfileScreen component:

```typescript
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthService } from '@/services/authService';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignInScreen() {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSignIn = async () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        setLoading(true);
        const result = await AuthService.signIn({ email, password });
        setLoading(false);
        if (result.error) {
            Alert.alert('Sign In Failed', result.error);
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
                <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                    <View style={styles.headerContainer}>
                        <Text style={[styles.title, { color: colors.text }]}>Welcome Back</Text>
                        <Text style={[styles.subtitle, { color: colors.text, opacity: 0.7 }]}>
                            Sign in to continue to Minneapolis Connect
                        </Text>
                    </View>

                    <View style={styles.formContainer}>
                        <View style={styles.inputContainer}>
                            <Text style={[styles.label, { color: colors.text }]}>Email</Text>
                            <TextInput
                                style={[styles.input, { 
                                    backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#f5f5f5',
                                    color: colors.text,
                                    borderColor: colorScheme === 'dark' ? '#333' : '#e0e0e0'
                                }]}
                                placeholder="Enter your email"
                                placeholderTextColor={colors.text + '80'}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                editable={!loading}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={[styles.label, { color: colors.text }]}>Password</Text>
                            <View style={{ position: 'relative' }}>
                                <TextInput
                                    style={[styles.input, { 
                                        backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#f5f5f5',
                                        color: colors.text,
                                        borderColor: colorScheme === 'dark' ? '#333' : '#e0e0e0'
                                    }]}
                                    placeholder="Enter your password"
                                    placeholderTextColor={colors.text + '80'}
                                    value={password}
                                    onChangeText={setPassword}
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

                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: colors.tint }, loading && styles.buttonDisabled]}
                            onPress={handleSignIn}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                <Text style={styles.buttonText}>Sign In</Text>
                            )}
                        </TouchableOpacity>

                        <View style={styles.footerContainer}>
                            <Text style={[styles.footerText, { color: colors.text }]}>
                                Don't have an account?{' '}
                            </Text>
                            <TouchableOpacity onPress={() => router.replace('/signup')} disabled={loading}>
                                <Text style={[styles.linkText, { color: colors.tint }]}>Sign Up</Text>
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
    headerContainer: { marginBottom: 40 },
    title: { fontSize: 32, fontWeight: 'bold', marginBottom: 8 },
    subtitle: { fontSize: 16 },
    formContainer: { width: '100%' },
    inputContainer: { marginBottom: 20 },
    label: { fontSize: 14, fontWeight: '600', marginBottom: 8 },
    input: { height: 50, borderWidth: 1, borderRadius: 10, paddingHorizontal: 15, fontSize: 16 },
    eyeIcon: { position: 'absolute', right: 15, top: 15 },
    button: { height: 50, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
    buttonDisabled: { opacity: 0.6 },
    buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
    footerContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
    footerText: { fontSize: 14 },
    linkText: { fontSize: 14, fontWeight: '600' },
});
```

### Create Sign-Up Screen (`app/signup.tsx`)

Similar to sign-in but with additional fields:
- Full Name (required)
- Email (required)
- Location (required)
- Occupation (optional)
- Password (required)
- Confirm Password (required)

Follow the same pattern as the ProfileScreen component for input fields and validation.

## How It Works

1. When the app starts, the `AuthProvider` checks if a user is authenticated
2. If no user is logged in, the app shows the signin screen
3. Users can navigate between signin and signup screens
4. After successful authentication, users are automatically redirected to the main app
5. All other screens are protected and only accessible when authenticated

## Testing

1. Run your app
2. You should see the signin screen first
3. Click "Sign Up" to create a new account
4. Fill in the required fields and submit
5. You'll be automatically signed in and redirected to the main app
6. Log out if needed using the `AuthService.signOut()` method

## Notes

- Users are stored in both Firebase Auth (for authentication) and Firestore (for profile data)
- The signup process creates the Firebase Auth account AND stores additional profile information in Firestore
- All screens except signin/signup are protected and require authentication

