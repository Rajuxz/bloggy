import React, { useEffect, useState } from "react"
import { PlusIcon, TrophyIcon } from "@heroicons/react/24/outline"
import axios from "axios"
import { Link } from "react-router"
const Post = () => {
    const [posts, setPosts] = useState([])
    const [loading, isLoading] = useState(true) //Initially posts are loading.
    const [hasError, setHasError] = useState({ status: false, message: "" })
    useEffect(function () {
        const fetchPosts = async function () {
            try {
                const posts = await axios.get("/api/v1/post/")
                setPosts(posts.data.data)
            } catch (error) {
                setHasError({ status: true, message: error.message })
            } finally {
                isLoading(false)
            }
        }
        fetchPosts()
    }, [])
    return hasError.status ? (
        <div className="bg-red-500 text-white p-3">{hasError.message}</div>
    ) : (
        <>
            <div className="h-full w-full text-black">
                <div className="flex items-center justify-between">
                    <div className="text-black">
                        <h1>Manage Posts</h1>
                    </div>
                    <div className="bg-slate-800 p-2 rounded-full cursor-pointer">
                        <Link to="/admin/add-post/">
                            <PlusIcon className="text-white h-5 w-5" />
                        </Link>
                    </div>
                </div>
                {loading ? (
                    <div className="animate animate-bounce">Loading ... </div>
                ) : (
                    <div className="flex flex-col">
                        {posts.map((post) => {
                            return (
                                <div
                                    key={post._id}
                                    className="mb-2 bg-slate-400 p-2 w-10/12 text-white rounded-md"
                                >
                                    <div>
                                        <h1>{post.content.slice(0, 40)}...</h1>
                                        <span
                                            className="bg-slate-500 py-0.5 px-0.5
                                        text-white rounded-full"
                                        >
                                            {post.category.name}
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </>
    )
}

export default Post
