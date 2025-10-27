# Firebase Integration Guide

This document explains how Firebase has been integrated into the Minneapolis Connect app and how to use the new Firebase features.

## Overview

The app has been successfully integrated with Firebase Firestore for data management, replacing the previous mock data system. This provides real-time data synchronization, offline support, and scalable backend infrastructure.

## Firebase Configuration

### Setup
- Firebase project: `test-app-1b89b`
- Configuration file: `constants/firebase.ts`
- Services initialized: Firestore, Auth, Storage

### Configuration Details
```typescript
const firebaseConfig = {
  apiKey: "AIzaSyB-Z-63K0TVMnbYAtKMnbKV45DDPTVHrOE",
  authDomain: "test-app-1b89b.firebaseapp.com",
  projectId: "test-app-1b89b",
  storageBucket: "test-app-1b89b.firebasestorage.app",
  messagingSenderId: "854474821664",
  appId: "1:854474821664:web:706d2bc147932ec132ec45",
  measurementId: "G-E4G46YVD1K"
};
```

## Firestore Collections

The app uses the following Firestore collections:

1. **users** - User profiles and information
2. **events** - Community events and activities
3. **posts** - Social media posts and updates
4. **comments** - Comments on posts
5. **resources** - Educational resources and guides
6. **groups** - Community groups and organizations

## Services

### FirestoreService (`services/firestoreService.ts`)

Comprehensive service classes for each data type:

- **UserService** - User management operations
- **EventService** - Event CRUD operations
- **PostService** - Post management and comments
- **CommentService** - Comment operations
- **ResourceService** - Resource management
- **GroupService** - Group operations

Each service provides:
- CRUD operations (Create, Read, Update, Delete)
- Real-time subscriptions
- Error handling
- Type safety with TypeScript

### Custom Hooks (`hooks/useFirebaseData.ts`)

React hooks for easy data management:

- **useFirebaseData()** - Complete app data
- **useUsers()** - User data only
- **useEvents()** - Event data only
- **usePosts()** - Post data only
- **useResources()** - Resource data only
- **useGroups()** - Group data only

Features:
- Loading states
- Error handling
- Real-time updates
- Helper methods for filtering

## Data Migration

### Migration Script (`scripts/migrateData.ts`)

The `DataMigrationService` class handles migrating existing mock data to Firebase:

```typescript
import { DataMigrationService } from '../scripts/migrateData';

// Migrate all data
await DataMigrationService.migrateAllData();
```

### Migration Component (`components/common/DataMigrationComponent.tsx`)

A React Native component for running data migration:

```typescript
import DataMigrationComponent from '@/components/common/DataMigrationComponent';

// Use in your app
<DataMigrationComponent onMigrationComplete={() => console.log('Done!')} />
```

### Running Migration

1. Navigate to `/migration` in your app
2. Tap "Start Migration" button
3. Wait for completion
4. Data will be populated in Firebase Firestore

## Updated Components

### Screen Components

All screen components have been updated to use Firebase data:

- **HomeScreen** - Uses `useFirebaseData()` for posts and groups
- **EventsScreen** - Uses `useEvents()` for event data
- **LibraryScreen** - Uses `useResources()` for resource data

### Features Added

- Loading states with ActivityIndicator
- Error handling with user-friendly messages
- Real-time data updates
- Category filtering for events
- Search functionality for resources

## Usage Examples

### Basic Data Fetching

```typescript
import { useEvents } from '@/hooks/useFirebaseData';

function MyComponent() {
  const { events, loading, error } = useEvents();
  
  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error}</Text>;
  
  return (
    <View>
      {events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </View>
  );
}
```

### Real-time Subscriptions

```typescript
import { EventService } from '@/services/firestoreService';

// Subscribe to real-time updates
const unsubscribe = EventService.subscribeToEvents((events) => {
  console.log('Events updated:', events);
});

// Cleanup subscription
unsubscribe();
```

### Creating New Data

```typescript
import { EventService } from '@/services/firestoreService';

const newEvent = {
  title: 'New Event',
  description: 'Event description',
  date: '2025-01-01',
  time: '10:00 AM',
  location: 'Minneapolis',
  category: 'Community',
  attendees: 0,
  organizer: userObject,
  tags: ['community', 'networking']
};

const eventId = await EventService.createEvent(newEvent);
```

## Firebase Rules (Recommended)

For production, set up proper Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Events are readable by all, writable by authenticated users
    match /events/{eventId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Posts are readable by all, writable by authenticated users
    match /posts/{postId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Comments are readable by all, writable by authenticated users
    match /comments/{commentId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Resources are readable by all
    match /resources/{resourceId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Groups are readable by all, writable by authenticated users
    match /groups/{groupId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Next Steps

1. **Authentication**: Implement Firebase Authentication for user login/signup
2. **Storage**: Add Firebase Storage for image uploads
3. **Push Notifications**: Integrate Firebase Cloud Messaging
4. **Analytics**: Add Firebase Analytics for user behavior tracking
5. **Performance**: Implement Firebase Performance Monitoring

## Troubleshooting

### Common Issues

1. **Network Errors**: Ensure stable internet connection
2. **Permission Denied**: Check Firestore security rules
3. **Data Not Loading**: Verify Firebase configuration
4. **Migration Fails**: Check Firebase project permissions

### Debug Mode

Enable debug logging:

```typescript
// In your app initialization
import { initializeApp } from 'firebase/app';
import { connectFirestoreEmulator } from 'firebase/firestore';

if (__DEV__) {
  connectFirestoreEmulator(db, 'localhost', 8080);
}
```

## Support

For Firebase-related issues:
1. Check Firebase Console for errors
2. Review Firestore security rules
3. Verify network connectivity
4. Check Firebase project configuration

The integration is now complete and ready for production use!





