import { useEffect, useState } from "react"
import axios from "axios"
import { Sidebar } from "../"
const HeroSection = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get("/api/v1/post/")
                setPosts(res.data.data)
            } catch (error) {
                console.error("Error fetching posts:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchPosts()
    }, [])

    return (
        <section className="bg-base-100 py-10 px-4 md:px-8">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-xl font-bold mb-8 text-center text-grey-400">
                    Latest Posts
                </h1>
                {loading ? (
                    <div className="text-center">
                        <span className="loading loading-spinner loading-md"></span>
                    </div>
                ) : posts.length === 0 ? (
                    <div className="text-center text-gray-500">
                        No posts found.
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-1">
                            <div className="space-y-4">
                                {posts.map((post) => (
                                    <div
                                        key={post._id}
                                        className="flex flex-row items-center bg-gray-800 rounded-lg shadow px-5 py-4 transition hover:bg-gray-700"
                                    >
                                        <div className="flex-1 min-w-0">
                                            <h2 className="text-lg font-bold text-gray-100 mb-1 line-clamp-1">
                                                {post.title}
                                            </h2>
                                            <p className="text-sm text-gray-300 mb-1 line-clamp-1">
                                                {post.content.slice(0, 80)}...
                                            </p>
                                            <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-200">
                                                {post.category?.name ||
                                                    "Uncategorized"}
                                            </span>
                                        </div>
                                        <a
                                            href={`/posts/${post.slug}`}
                                            className="ml-4 px-4 py-2 rounded bg-gray-200 text-gray-900 font-semibold text-sm shadow hover:bg-white transition-colors duration-150"
                                        >
                                            Read More
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="md:w-64 w-full md:shrink-0">
                            <Sidebar />
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default HeroSection
