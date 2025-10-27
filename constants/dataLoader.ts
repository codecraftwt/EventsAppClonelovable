// Data loader utility - using direct data instead of JSON imports
const usersData = [
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

const eventsData = [
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
        organizerId: '1',
        tags: ['Community', 'Food', 'Music'],
        price: 'Free',
        maxAttendees: 500
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
        organizerId: '5',
        tags: ['Community', 'Gardening', 'Food'],
        price: 'Free',
        maxAttendees: 300
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
        organizerId: '4',
        tags: ['Volunteering', 'Food Security', 'Community'],
        price: 'Free',
        maxAttendees: 100
    },
];

const groupsData = [
    {
        id: '1',
        name: 'MPLS Environmental Group',
        description: 'Environmental activists working for a greener Minneapolis',
        memberCount: 14,
        newMessages: 8,
        image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=100&h=100&fit=crop',
        category: 'Environmental',
        icon: 'leaf.fill',
        color: '#4CAF50'
    },
    {
        id: '2',
        name: 'Minneapolis Food Security Network',
        description: 'Working together to end hunger in our community',
        memberCount: 23,
        newMessages: 12,
        image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=100&h=100&fit=crop',
        category: 'Food Security',
        icon: 'fork.knife',
        color: '#FF9800'
    },
];

const resourcesData = [
    {
        id: '1',
        title: 'How to Network Effectively in Minneapolis',
        type: 'Article',
        duration: '6 min read',
        category: 'Networking',
        description: 'Learn the best practices for building professional relationships in the Minneapolis community.',
        url: 'https://example.com/networking-guide',
        icon: 'doc.text.fill',
        color: '#2196F3'
    },
    {
        id: '2',
        title: 'Best Practices for Hosting Community Events',
        type: 'Video',
        duration: '12 min',
        category: 'Event Planning',
        description: 'A comprehensive guide to organizing successful community events.',
        url: 'https://example.com/event-planning-video',
        icon: 'video.fill',
        color: '#4CAF50'
    },
];

const postsData = [
    {
        id: '1',
        authorId: '1',
        content: 'Excited to share this volunteer opportunity! Second Harvest Heartland is hosting a community food drive next weekend. Sign up and help make a difference!',
        image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&h=200&fit=crop',
        timestamp: '1h ago',
        likes: 127,
        comments: ['1', '2', '3'],
        eventId: '3',
        type: 'event_share'
    },
];

const commentsData = [
    {
        id: '1',
        authorId: '2',
        content: 'Just signed up! Can\'t wait to help at this event.',
        timestamp: '45m ago',
        likes: 3,
        postId: '1'
    },
    {
        id: '2',
        authorId: '3',
        content: 'Such an important cause! Bringing my whole family.',
        timestamp: '30m ago',
        likes: 5,
        postId: '1'
    },
];

// Helper function to find user by ID
const findUserById = (id: string) => {
    return usersData.find(user => user.id === id);
};

// Helper function to find event by ID
const findEventById = (id: any) => {
    return eventsData.find(event => event.eventId === id);
};

// Process posts with author and event data
const processedPosts = postsData.map(post => ({
    ...post,
    author: findUserById(post.authorId),
    event: post.eventId ? findEventById(post.eventId) : null,
    comments: commentsData
        .filter(comment => comment.postId === post.id)
        .map(comment => ({
            ...comment,
            author: findUserById(comment.authorId)
        }))
}));

// Process events with organizer data
const processedEvents = eventsData.map(event => ({
    ...event,
    organizer: findUserById(event.organizerId)
}));

// Process groups with proper structure
const processedGroups = groupsData.map(group => ({
    ...group,
    icon: group.icon,
    color: group.color
}));

// Process resources with proper structure
const processedResources = resourcesData.map(resource => ({
    ...resource,
    icon: resource.icon,
    color: resource.color
}));

export const mockUsers = usersData;
export const mockEvents = processedEvents;
export const mockResources = processedResources;
export const mockGroups = processedGroups;
export const mockPosts = processedPosts;
export const mockComments = commentsData.map(comment => ({
    ...comment,
    author: findUserById(comment.authorId)
}));
