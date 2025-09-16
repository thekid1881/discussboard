'use client';

import { useEffect, useState } from "react";

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newContent, setNewContent] = useState('');
    const [replyTo, setReplyTo] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const fetchPosts = async () => {
        setLoading(true)
        const res = await fetch('/api/posts')
        const data = await res.json()
        setPosts(data)
        setLoading(false)
    }

    const handleSubmit = async () => {
        const formData = new FormData()

        if (!newContent.trim()) return
        
        formData.append('content', newContent)

        if (imageFile) {
            formData.append('image', imageFile)
        }

        const res = await fetch('/api/posts', {
            method: 'POST',
            body: formData,
        })

        const newPost = await res.json()
        setPosts([newPost, ...posts])
        setNewContent('')
        setImageFile(null)
        fetchPosts()
    }

    const handleDelete = async (id) => {
        const res = await fetch('/api/posts', {
            method: 'DELETE',
            body: JSON.stringify({ id }),
        });

        const data = await res.json();

        if (!res.ok) {
            console.error(data.error);
            return;
        }

        fetchPosts()
    };

    useEffect(() => {
        fetchPosts()
    }, [])

    const topLevelPosts = posts.filter(p => p.parent_id===null)
    const repliesByParent = posts.reduce((acc, post) => {
        if (post.parent_id) {
            acc[post.parent_id] = acc[post.parent_id] || []
            acc[post.parent_id].push(post)
        }
        return acc
    }, {})

    return (
        <div className="grid grid-cols-2 justify-items-center mt-3 mx-3">
            <div className="col-start-1 w-full py-4 px-8">
                <form>
                    <label className="font-bold text-xl mb-2">
                        {replyTo ? 'Replying to Post' : 'Create New Post'}
                    </label>
                    <textarea
                        className="w-full border rounded p-2 bg-white"
                        rows="3"
                        value={newContent}
                        placeholder="Enter post content here..."
                        onChange={(e) => setNewContent(e.target.value)}
                        required
                    />
                    <label 
                        htmlFor="imageFileInput"
                        className="cursor-pointer bg-gray-300 p-2 rounded-md border-solid border-1 border-gray-700"
                    >
                        Attach Image
                    </label>
                    <input
                        type="file"
                        id="imageFileInput"
                        className="text-sm text-gray-500 mx-2"
                        accept="Image/*"
                        onChange={(e) => setImageFile(e.target.files[0])}
                    />
                    <button
                        className="bg-gray-300 px-2 py-1 border-solid border-1 border-gray-700 rounded-md hover:bg-gray-500 hover:text-white hover:underline"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                    {replyTo && (
                        <button
                            className="text-gray-500 underline"
                            onClick={() => setReplyTo(null)}
                        >
                            Cancel Reply
                        </button>
                    )}
                </form>
            </div>
            <div className="col-start-2 w-full py-4 px-8">
                <h2 className="font-bold text-xl mb-2">
                    Posts
                </h2>
                {loading && <p>Loading...</p>}
                {!loading && topLevelPosts.map(post => (
                    <div key={post.id} className="border p-2 rounded bg-white my-3">
                        <p className="px-2 py-1">{post.content}</p>
                        {post.image_url && (
                            <img src={post.image_url} alt="Attached" style={{ maxWidth: '300px' }} />
                        )}
                        <button
                            className="bg-gray-300 px-2 py-1 border-solid border-1 border-gray-700 rounded-md hover:bg-gray-500 hover:text-white hover:underline mx-2 my-1"
                            onClick={() => setReplyTo(post.id)}
                        >
                            Reply
                        </button>
                        <button
                            className="bg-gray-300 px-2 py-1 border-solid border-1 border-gray-700 rounded-md hover:bg-gray-500 hover:text-white hover:underline mx-2 my-1"
                            onClick={() => handleDelete(post.id)}
                        >
                            Delete
                        </button>
                        {repliesByParent[post.id]?.map(reply => (
                            <div key={reply.id} className="p-2 border-1 bg-gray-200">
                                <p>{reply.content}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}