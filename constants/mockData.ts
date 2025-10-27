// Mock data for the Minneapolis Connect App

import { Comment, Event, Group, Post, Resource, User } from '../types';

export const mockUsers: User[] = [
    {
        id: '1',
        name: 'Sarah Mitchell',
        age: 27,
        location: 'Minneapolis, MN',
        occupation: 'Marketing Director',
        profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        bio: 'Passionate about community building and environmental justice',
        interests: ['Community', 'Environment', 'Volunteering'],
        verified: true,
    },
    {
        id: '2',
        name: 'Mike Johnson',
        age: 32,
        location: 'Minneapolis, MN',
        occupation: 'Software Engineer',
        profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        bio: 'Tech enthusiast who loves giving back to the community',
        interests: ['Technology', 'Volunteering', 'Networking'],
        verified: true,
    },
    {
        id: '3',
        name: 'Emily Chen',
        age: 28,
        location: 'Minneapolis, MN',
        occupation: 'Teacher',
        profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        bio: 'Elementary school teacher passionate about education equity',
        interests: ['Education', 'Social Justice', 'Community'],
        verified: true,
    },
    {
        id: '4',
        name: 'David Brown',
        age: 35,
        location: 'Minneapolis, MN',
        occupation: 'Non-profit Director',
        profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        bio: 'Leading local food security initiatives',
        interests: ['Food Security', 'Community', 'Volunteering'],
        verified: true,
    },
    {
        id: '5',
        name: 'Marcus Thompson',
        age: 30,
        location: 'Minneapolis, MN',
        occupation: 'Environmental Scientist',
        profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        bio: 'Urban forestry advocate and community organizer',
        interests: ['Environment', 'Urban Planning', 'Community'],
        verified: true,
    },
];

export const mockEvents: Event[] = [
    {
        id: '1',
        title: 'Neighborhood Block Party',
        description: 'Join neighbors for food, music, and community connection in a celebration of local unity.',
        date: '2025-10-13',
        time: '9:00 AM',
        location: 'Community Center',
        category: 'Community',
        image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=200&fit=crop',
        attendees: 290,
        organizer: mockUsers[0],
        tags: ['Community', 'Food', 'Music'],
    },
    {
        id: '2',
        title: 'Community Garden Harvest Festival',
        description: 'Celebrate the season\'s bounty with fresh produce, gardening workshops, and local food vendors.',
        date: '2025-10-13',
        time: '10:00 AM',
        location: 'Central Park',
        category: 'Community',
        image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=200&fit=crop',
        attendees: 172,
        organizer: mockUsers[4],
        tags: ['Community', 'Gardening', 'Food'],
    },
    {
        id: '3',
        title: 'Community Food Drive - Second Harvest Heartland',
        description: 'Join us for a weekend food sorting event at our Heartland warehouse. Help pack meals for families in need across Minneapolis.',
        date: '2025-10-20',
        time: '8:00 AM',
        location: 'Second Harvest Heartland Warehouse',
        category: 'Volunteering',
        image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&h=200&fit=crop',
        attendees: 45,
        organizer: mockUsers[3],
        tags: ['Volunteering', 'Food Security', 'Community'],
    },
];

export const mockGroups: Group[] = [
    {
        id: '1',
        name: 'MPLS Environmental Group',
        description: 'Environmental activists working for a greener Minneapolis',
        memberCount: 14,
        newMessages: 8,
        image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=100&h=100&fit=crop',
        category: 'Environmental',
    },
];

export const mockComments: Comment[] = [
    {
        id: '1',
        author: mockUsers[1],
        content: 'Just signed up! Can\'t wait to help at this event.',
        timestamp: '45m ago',
        likes: 3,
    },
    {
        id: '2',
        author: mockUsers[2],
        content: 'Such an important cause! Bringing my whole family.',
        timestamp: '30m ago',
        likes: 5,
    },
    {
        id: '3',
        author: mockUsers[3],
        content: 'I volunteered here last month - amazing organization!',
        timestamp: '20m ago',
        likes: 2,
    },
];

export const mockPosts: Post[] = [
    {
        id: '1',
        author: mockUsers[0],
        content: 'Excited to share this volunteer opportunity! Second Harvest Heartland is hosting a community food drive next weekend. Sign up and help make a difference!',
        image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&h=200&fit=crop',
        timestamp: '1h ago',
        likes: 127,
        comments: mockComments,
        event: mockEvents[2],
    },
    {
        id: '2',
        author: mockUsers[4],
        content: 'Tree Trust is hiring Community Engagement Coordinators! If you\'re passionate about urban forestry and environmental justice in Minneapolis, this is the perfect opportunity.',
        timestamp: '3h ago',
        likes: 89,
        comments: [],
    },
];

export const mockResources: Resource[] = [
    {
        id: '1',
        title: 'How to Network Effectively in Minneapolis',
        type: 'Article',
        duration: '6 min read',
        category: 'Networking',
        description: 'Learn the best practices for building professional relationships in the Minneapolis community.',
    },
    {
        id: '2',
        title: 'Best Practices for Hosting Community Events',
        type: 'Video',
        duration: '12 min',
        category: 'Event Planning',
        description: 'A comprehensive guide to organizing successful community events.',
    },
    {
        id: '3',
        title: 'Building Meaningful Connections in Your City',
        type: 'Podcast',
        duration: '35 min',
        category: 'Community',
        description: 'Podcast episode about creating lasting relationships through community involvement.',
    },
    {
        id: '4',
        title: 'Minneapolis Volunteer Opportunities Guide',
        type: 'Article',
        duration: '8 min read',
        category: 'Volunteering',
        description: 'Complete guide to volunteer opportunities in Minneapolis.',
    },
    {
        id: '5',
        title: 'Social Impact Through Small Business Support',
        type: 'Article',
        duration: '10 min read',
        category: 'Small Business',
        description: 'How supporting local businesses creates positive social impact.',
    },
    {
        id: '6',
        title: 'Creating Inclusive Community Spaces',
        type: 'Video',
        duration: '18 min',
        category: 'Community Building',
        description: 'Strategies for making community spaces welcoming to everyone.',
    },
];

