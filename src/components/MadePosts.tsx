export const madePosts = [
    {
        id: 12345,
        userId: "4821",
        username: "anon4821",
        content: "This is my first anonymous post 👀",
        upvotes: 12,
        downvotes: 2,
        upvotedUsers: [],
        downvotedUsers: [],
        timestamp: Date.now() - 1000 * 60 * 5, 
    },
    {
        id: 67890,
        userId: "9921",
        username: "anon9921",
        content: "Does anyone else feel like React finally clicked today?",
        upvotes: 25,
        downvotes: 1,
        timestamp: Date.now() - 1000 * 60 * 60, // 1 hour ago
        upvotedUsers: [],
        downvotedUsers: [],
    },
    {
        id: 54321,
        userId: "1112",
        username: "anon1112",
        content: "Hot take: useContext is easier than props drilling 😤",
        upvotes: 40,
        downvotes: 5,
        timestamp: Date.now() - 1000 * 60 * 60 * 3, 
        upvotedUsers: [],
        downvotedUsers: [],  
    }
]