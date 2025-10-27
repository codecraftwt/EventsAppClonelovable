# Minneapolis Connect App - Component Structure

This document outlines the component-based architecture and folder structure for the Minneapolis Connect app.

## 📁 Folder Structure

```
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx          # Tab navigation configuration
│   │   ├── index.tsx            # Home screen (imports HomeScreen component)
│   │   ├── events.tsx           # Events screen (imports EventsScreen component)
│   │   ├── dates.tsx            # Dating screen (imports DatesScreen component)
│   │   └── library.tsx          # Resources screen (imports LibraryScreen component)
│   └── _layout.tsx              # Root layout
├── components/
│   ├── screens/                 # Screen components
│   │   ├── HomeScreen.tsx       # City feed screen
│   │   ├── EventsScreen.tsx     # Events listing screen
│   │   ├── DatesScreen.tsx      # Dating screen
│   │   └── LibraryScreen.tsx    # Resources screen
│   ├── common/                  # Reusable UI components
│   │   ├── Header.tsx           # App header component
│   │   ├── SearchBar.tsx        # Search input component
│   │   └── CategoryFilter.tsx   # Category filter component
│   ├── cards/                   # Card components
│   │   ├── EventCard.tsx        # Event display card
│   │   ├── PostCard.tsx         # Social media post card
│   │   ├── DatingCard.tsx       # Dating profile card
│   │   └── ResourceCard.tsx     # Resource item card
│   └── ui/                      # Basic UI components (existing)
├── types/
│   └── index.ts                 # TypeScript type definitions
├── constants/
│   └── mockData.ts              # Mock data for development
└── assets/
    └── images/
        └── dummy/               # Placeholder images
```

## 🧩 Component Architecture

### Screen Components (`components/screens/`)
- **HomeScreen**: City feed with posts, groups, and social interactions
- **EventsScreen**: Event listings with search and filtering
- **DatesScreen**: Dating interface with profile cards
- **LibraryScreen**: Resource hub with categories and search

### Common Components (`components/common/`)
- **Header**: Reusable header with title and action buttons
- **SearchBar**: Search input with icon and placeholder
- **CategoryFilter**: Horizontal scrollable category buttons

### Card Components (`components/cards/`)
- **EventCard**: Displays event details with image, info, and actions
- **PostCard**: Social media post with comments and engagement
- **DatingCard**: Dating profile with swipe actions
- **ResourceCard**: Resource item with metadata and actions

## 📊 Data Structure

### Types (`types/index.ts`)
- `User`: User profile information
- `Event`: Event details and metadata
- `Post`: Social media post with engagement
- `Resource`: Learning resource information
- `Group`: Community group details

### Mock Data (`constants/mockData.ts`)
- `mockUsers`: Sample user profiles with images
- `mockEvents`: Sample events with details
- `mockPosts`: Sample social media posts
- `mockResources`: Sample learning resources
- `mockGroups`: Sample community groups

## 🖼️ Images and Assets

### Dummy Images
The app uses placeholder images from Unsplash for development:
- **Profile Images**: User avatars for posts and profiles
- **Event Images**: Event photos for cards
- **Group Images**: Community group icons

### Icons
- Uses `IconSymbol` component for consistent iconography
- SF Symbols for iOS-style icons
- Color-coded icons for different categories

## 🎨 Design System

### Colors
- **Primary**: Purple (#8B5CF6) for active states
- **Accent**: Pink (#FF69B4) for location pins
- **Success**: Green (#4CAF50) for community tags
- **Warning**: Orange (#FF9500) for engagement icons

### Typography
- **Headers**: Bold, 20px
- **Titles**: Bold, 18px
- **Body**: Regular, 16px
- **Captions**: Regular, 14px
- **Small**: Regular, 12px

### Spacing
- **Padding**: 16px standard, 12px compact
- **Margins**: 16px between cards, 8px between small elements
- **Border Radius**: 12px for cards, 8px for buttons

## 🔧 Usage Examples

### Using Screen Components
```tsx
// In app/(tabs)/index.tsx
import HomeScreen from '@/components/screens/HomeScreen';
export default HomeScreen;
```

### Using Card Components
```tsx
import { EventCard } from '@/components/cards/EventCard';
import { mockEvents } from '@/constants/mockData';

<EventCard 
  event={mockEvents[0]} 
  onPress={() => console.log('View event')} 
/>
```

### Using Common Components
```tsx
import { Header } from '@/components/common/Header';
import { SearchBar } from '@/components/common/SearchBar';

<Header title="Minneapolis Events" rightActions={<ProfileButton />} />
<SearchBar placeholder="Search events..." />
```

## 🚀 Benefits

1. **Reusability**: Components can be used across different screens
2. **Maintainability**: Clear separation of concerns
3. **Scalability**: Easy to add new features and screens
4. **Consistency**: Unified design system across the app
5. **Type Safety**: TypeScript types for all data structures
6. **Development**: Mock data for easy testing and development

## 📱 Features Implemented

- ✅ Bottom tab navigation (Home, Events, Dates, Library)
- ✅ Component-based architecture
- ✅ Reusable UI components
- ✅ Mock data with realistic content
- ✅ Image placeholders from Unsplash
- ✅ TypeScript type definitions
- ✅ Responsive design
- ✅ Dark/light mode support
- ✅ Interactive elements (buttons, cards, inputs)

