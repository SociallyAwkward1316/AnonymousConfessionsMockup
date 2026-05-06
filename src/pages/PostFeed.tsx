import { useState } from "react";


export const madePosts = [
    {
         id: 12345,
        userId: "4821",
        username: "anon4821",
        content: "This is my first anonymous post 👀",
        upvotes: 12,
        downvotes: 2,
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
    },
    {
        id: 54321,
        userId: "1112",
        username: "anon1112",
        content: "Hot take: useContext is easier than props drilling 😤",
        upvotes: 40,
        downvotes: 5,
        timestamp: Date.now() - 1000 * 60 * 60 * 3,   
    }
]

type newPostType = {
        id: number,
        userId: string,
        content: string,
        upvotes: number,
        downvotes: number,
        timestamp: number,
    }

export function PostMain(){

    const [posts, setPosts] = useState<newPostType[]>(madePosts);
    const [input, setInput] = useState("");
    const [sortType, setSortType] = useState("newest");

    const sortedPosts = [...posts].sort((a, b) => {
        if (sortType === "trending") {
            return b.upvotes - a.upvotes;
        } else if (sortType === "oldest") {
            return a.timestamp - b.timestamp;
        } else {
            return b.timestamp - a.timestamp;
        }
    })

    function addPost(content:string){
        if (!content.trim()) return

        const userInfo = JSON.parse(localStorage.getItem("userInfo"));

        const newPost:newPostType = {
            id: Math.floor(Math.random() * (1000000) + 1),
            userId: userInfo.userId,
            content,
            upvotes: 0,
            downvotes: 0,
            timestamp: Date.now(),
        };

        setPosts((theRest) => [newPost, ...theRest])
        setInput("");
    }

    return (
        <div>

            <input 
                placeholder="Write a post..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />

            <button onClick={() => addPost(input)}>Add Post</button>

            <select
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
            >
                <option value="newest">Newest to Oldest</option>
                <option value="oldest">Oldest to Newest</option>
                <option value="trending">Trending</option>
                {/* there will be a msot liekd and least liekd option */}
            </select>

            <div>
                {sortedPosts.map((post) => (
                    <div key={post.id}>
                        <p>{post.content}</p>
                        <p> Upvotes: {post.upvotes} Downvotes: {post.downvotes} </p>
                    </div>    
                ))}
            </div>

        </div>
    )
}
