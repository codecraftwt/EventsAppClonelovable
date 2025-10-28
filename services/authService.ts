import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from '@/constants/firebase';
import { UserService } from './firestoreService';

interface SignUpData {
  email: string;
  password: string;
  name: string;
  age?: number;
  location: string;
  occupation?: string;
  sexuality?: string;
  bio?: string;
  interests?: string[];
  profileImage?: string;
}

interface SignInData {
  email: string;
  password: string;
}

export class AuthService {
  static async signUp(data: SignUpData) {
    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // Update the user's display name
      await updateProfile(userCredential.user, {
        displayName: data.name,
      });

      // Create user profile in Firestore
      const userProfile: any = {
        uid: userCredential.user.uid, // Store Firebase UID
        name: data.name,
        location: data.location,
        interests: data.interests || [],
        verified: false,
      };

      // Only add optional fields if they have values
      if (data.age && data.age > 0) {
        userProfile.age = data.age;
      }
      if (data.occupation && data.occupation.trim()) {
        userProfile.occupation = data.occupation;
      }
      if (data.sexuality && data.sexuality.trim()) {
        userProfile.sexuality = data.sexuality;
      }
      if (data.bio && data.bio.trim()) {
        userProfile.bio = data.bio;
      }
      if (data.profileImage && data.profileImage.trim()) {
        userProfile.profileImage = data.profileImage;
      }

      await UserService.createUser(userProfile);

      return { user: userCredential.user, error: null };
    } catch (error: any) {
      console.error('Sign up error:', error);
      return {
        user: null,
        error: error.message || 'Failed to create account',
      };
    }
  }

  static async signIn(data: SignInData) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      return { user: userCredential.user, error: null };
    } catch (error: any) {
      console.error('Sign in error:', error);
      let errorMessage = 'Failed to sign in';
      
      // Provide user-friendly error messages
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later';
      }
      
      return { user: null, error: errorMessage };
    }
  }

  static async signOut() {
    try {
      await firebaseSignOut(auth);
      return { error: null };
    } catch (error: any) {
      console.error('Sign out error:', error);
      return { error: error.message || 'Failed to sign out' };
    }
  }
}


