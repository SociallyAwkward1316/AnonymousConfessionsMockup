import { useState } from "react";
import { madePosts } from "../components/MadePosts";

type newPostType = {
        id: number,
        userId: string,
        content: string,
        upvotes: number,
        downvotes: number,
        timestamp: number,
        upvotedUsers: string[],
        downvotedUsers: string[]
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

    function addUpvote(clickedId:number) {

        const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");
        const currentUserId = userInfo?.userId || null;
        if (!currentUserId) return;

        setPosts((posts) => 
            posts.map((post) => {
                if(post.id === clickedId) {
                    if(post.upvotedUsers?.includes(currentUserId)){
                        const updatedUsers = (post.upvotedUsers || []).filter((userId) => userId !== currentUserId)
                        return {
                            ...post,
                            upvotes: post.upvotes -1,
                            upvotedUsers: updatedUsers
                        }
                    } else {
                       return {
                        ...post, 
                        upvotes: post.upvotes +1,
                        upvotedUsers: [...(post.upvotedUsers || []), currentUserId]
                        };
                    }
                }
                return post;
            })
        );

    }

    function addDownvote(clickedId:number) {

        const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");
        const currentUserId = userInfo?.userId || null;
        if (!currentUserId) return;

        setPosts((posts) => 
            posts.map((post) => {
                if(post.id === clickedId) {
                    if(post.downvotedUsers?.includes(currentUserId)){
                        const updatedUsers = (post.downvotedUsers || []).filter((userId) => userId !== currentUserId)
                        return {
                            ...post,
                            downvotes: post.downvotes -1,
                            downvotedUsers: updatedUsers
                        }
                    } else {
                       return {
                        ...post, 
                        downvotes: post.downvotes +1,
                        downvotedUsers: [...(post.downvotedUsers || []), currentUserId]
                        };
                    }
                }
                return post;
            })
        );

    }
    function addPost(content:string){
        if (!content.trim()) return

        const userInfo = JSON.parse(localStorage.getItem("userInfo") || "[]");

        const newPost:newPostType = {
            id: Math.floor(Math.random() * (1000000) + 1),
            userId: userInfo.userId,
            content,
            upvotes: 0,
            downvotes: 0,
            timestamp: Date.now(),
            upvotedUsers: [],
            downvotedUsers: []
        };

        setPosts((theRest) => [newPost, ...theRest])
        setInput("");
    }

    return (
        <div className="min-h-screen bg-black text-zinc-200">
            <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-center text-4xl mb-6">Anonymous Post Feed</h2>

            <div className="flex flex-col items-start gap-3">
            <textarea 
                rows={4}
                className="w-full bg-zinc-900 border border-zinc-600 px-4 py-2 rounded-xl"
                placeholder="Write a post..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />

            <button className="bg-blue-500 px-4 py-2 rounded-xl hover:bg-blue-600 transition" onClick={() => addPost(input)}>Add Post</button>
            </div>

            <div className="flex justify-end ">
            <select
               className="bg-zinc-900 outline-none focus:outline-none p-2"
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
            >
                <option value="newest">Newest to Oldest</option>
                <option value="oldest">Oldest to Newest</option>
                <option value="trending">Trending</option>
                {/* there will be a msot liekd and least liekd option */}
            </select>
            </div>

            <div className="flex flex-col gap-4 pt-6">
                {sortedPosts.map((post) => (
                    <div key={post.id}>
                        <div className="flex flex-col gap-1 bg-zinc-900 border border-zinc-800 rounded-2xl pt-5 px-5 pb-1 shadow-md">
                        <p className="break-words">
                            {post.content}
                        </p>
                        <div className="flex flex-row gap-2 text-sm">
                            <button className="text-white-800 hover:scale-110 transition-transform"
                            onClick={() => addUpvote(post.id)}
                            > 
                                <span className="text-green-400">▲</span> {post.upvotes} 
                            </button>

                            <button className="text-white-800 hover:scale-110 transition-transform"
                            onClick = {() => addDownvote(post.id)}
                            >
                                <span className="text-red-400 ">▼</span> {post.downvotes} 
                            </button>
                        </div>
                        </div>
                        <p className="text-xs text-zinc-300 text-right pr-2 pt-1">{new Date(post.timestamp).toLocaleString()}</p>
                    </div>    
                ))}
            </div>
            </div>
        </div>
    )
}
