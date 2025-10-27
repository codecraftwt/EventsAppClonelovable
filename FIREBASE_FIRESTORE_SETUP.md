# Firebase Firestore Setup Guide

## Step 1: Enable Firestore Database

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `test-app-1b89b`
3. Navigate to **Firestore Database** in the left sidebar
4. Click **"Create database"**
5. Choose **"Start in test mode"** (for development)
6. Select a location (choose one close to your users)

## Step 2: Set Up Firestore Security Rules

Go to **Firestore Database** → **Rules** tab and replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - readable by all, writable by authenticated users
    match /users/{userId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Events collection - readable by all, writable by authenticated users
    match /events/{eventId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Posts collection - readable by all, writable by authenticated users
    match /posts/{postId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Comments collection - readable by all, writable by authenticated users
    match /comments/{commentId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Resources collection - readable by all, writable by authenticated users
    match /resources/{resourceId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Groups collection - readable by all, writable by authenticated users
    match /groups/{groupId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Step 3: Initialize Collections

### Option 1: Using the App (Recommended)

1. Start your Expo app: `npm start`
2. Navigate to `/firebase-setup` in your app
3. Tap **"Initialize Collections"** button
4. Wait for the process to complete
5. Tap **"Check Collections Status"** to verify

### Option 2: Manual Setup

If you prefer to create collections manually:

1. Go to **Firestore Database** → **Data** tab
2. Click **"Start collection"**
3. Create these collections one by one:
   - `users`
   - `events` 
   - `posts`
   - `comments`
   - `resources`
   - `groups`

## Step 4: Verify Collections

After initialization, you should see:

- **users**: 5 documents (Sarah, Mike, Emily, David, Marcus)
- **events**: 3 documents (Block Party, Garden Festival, Food Drive)
- **posts**: 2 documents (Volunteer opportunity, Job posting)
- **comments**: 3 documents (Comments on posts)
- **resources**: 6 documents (Articles, videos, podcasts)
- **groups**: 1 document (MPLS Environmental Group)

## Step 5: Test Your App

1. Navigate to different screens in your app:
   - **Home** (`/`) - Should show posts and groups
   - **Events** (`/events`) - Should show events
   - **Library** (`/library`) - Should show resources
2. Check that data loads without errors
3. Verify real-time updates work

## Troubleshooting

### Collections Not Showing Up

1. **Check Firebase Console**: Make sure you're in the correct project
2. **Check Rules**: Ensure Firestore rules allow read access
3. **Check Network**: Ensure stable internet connection
4. **Check Console Logs**: Look for Firebase errors in browser/app console

### Permission Denied Errors

1. **Update Rules**: Make sure Firestore rules allow read/write access
2. **Check Authentication**: If using auth, ensure user is logged in
3. **Test Mode**: For development, use test mode rules

### Data Not Loading

1. **Check Collection Names**: Ensure collection names match exactly
2. **Check Document Structure**: Verify document fields match your types
3. **Check Imports**: Ensure Firebase imports are correct

## Production Considerations

### Security Rules for Production

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // More restrictive rules for production
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /events/{eventId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Add more specific rules as needed
  }
}
```

### Performance Optimization

1. **Indexes**: Create composite indexes for complex queries
2. **Pagination**: Implement pagination for large datasets
3. **Caching**: Use Firebase offline persistence
4. **Monitoring**: Enable Firebase Performance Monitoring

## Next Steps

1. **Authentication**: Implement Firebase Authentication
2. **Storage**: Add Firebase Storage for images
3. **Analytics**: Add Firebase Analytics
4. **Push Notifications**: Implement Firebase Cloud Messaging
5. **Functions**: Add Firebase Cloud Functions for server-side logic

Your Firebase Firestore is now ready to use! 🎉
