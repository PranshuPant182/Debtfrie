import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import images from "../../utils/images";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BlogCard = ({ post }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/blogDetail/${post._id}`); // or post.id depending on your API
    };
    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col border border-gray-100" onClick={handleClick}>
            <img src={post.image} alt={post.title} className="w-full h-50 object-cover" />
            <div className="p-6 flex flex-col gap-4">
                <p className="text-sm text-blue-600 font-semibold" style={{ fontFamily: 'Youth', fontWeight: 900, lineHeight: '100%', letterSpacing: '0%' }}>{post.category}</p>
                <div className="flex items-start justify-between gap-2">
                    <h2 className="font-semibold text-[16px] leading-snug text-gray-900" style={{ fontFamily: 'Youth', fontWeight: 900, lineHeight: '100%', letterSpacing: '0%' }}>{post.title}</h2>
                    <span className="text-gray-500 text-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M6.854 3.646a.5.5 0 0 0-.708.708L9.293 7.5H1.5a.5.5 0 0 0 0 1h7.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4z" />
                        </svg>
                    </span>
                </div>
                <p className="text-sm text-gray-600" style={{ fontFamily: 'gilroy', fontWeight: 400, lineHeight: '100%', letterSpacing: '0%' }}>{post.description}</p>
                <div className="flex items-center gap-2 mt-2">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Alec Whitten" className="w-6 h-6 rounded-full" />
                    <div className="text-xs text-gray-700" style={{ fontFamily: 'gilroy', fontWeight: 400, lineHeight: '100%', letterSpacing: '0%' }}>
                        <p className="leading-none font-medium">{post.author}</p>
                        <p className="text-gray-400">{post.date}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const BlogHomePage = () => {
    const [blogs, setBlogs] = useState([]);
    const [visibleCount, setVisibleCount] = useState(9);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch blogs from backend
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/blogs`)
            .then(res => {
                setBlogs(res.data?.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching blogs:", err);
                setLoading(false);
            });
    }, []);

    const handleSeeMore = () => {
        setVisibleCount((prev) => prev + 3);
    };

    const filteredPosts = blogs?.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const visiblePosts = filteredPosts.slice(0, visibleCount);

    return (
        <Layout>
            <div className="p-4 md:p-10 max-w-screen-xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-5xl font-bold" style={{ fontFamily: 'Youth', fontWeight: 900, lineHeight: '100%', letterSpacing: '0%' }}>
                        Welcome To The <span className="text-blue-600">Debtfrie</span> Blog
                    </h1>
                    <p className="text-gray-600 mt-3 max-w-xl mx-auto" style={{ fontFamily: 'gilroy', fontWeight: 400, lineHeight: '100%', letterSpacing: '0%' }}>
                        Your Trusted Guide To Financial Freedom—Practical Tips, Expert Insights,
                        And Strategies To Stay Debt-Free!
                    </p>
                </div>

                <div className="mb-8 max-w-xl mx-auto">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-5 pr-10 py-3 bg-gray-100 text-gray-600 rounded-full focus:outline-none"
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85zm-5.242 1.656a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z" />
                            </svg>
                        </span>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-10">
                        <p className="text-gray-500">Loading blogs...</p>
                    </div>
                ) : (
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {visiblePosts.length > 0 ? (
                            visiblePosts.map((post, idx) => {
                                const fallbackImage = [images.Blog1, images.Blog2, images.Blog3][idx % 3];
                                const formattedDate = new Date(post.createdAt).toLocaleDateString('en-IN', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                });

                                // const postWithExtras = {
                                //     ...post,
                                //     image: post.image || fallbackImage,
                                //     date: formattedDate,
                                // };

                                const postWithExtras = {
                                    ...post,
                                    image: post.imageUrl
                                        ? `${import.meta.env.VITE_API_BASE_URL.replace(/\/api$/, "")}${post.imageUrl}`
                                        : fallbackImage,
                                    date: formattedDate,
                                };

                                return <BlogCard key={post.id || idx} post={postWithExtras} />;
                            })
                        ) : (
                            <div className="col-span-full text-center py-10">
                                <p className="text-gray-500 font-medium">
                                    No matches found for "{searchQuery}"
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {!loading && visibleCount < filteredPosts.length && (
                    <div className="mt-10 text-center">
                        <button
                            onClick={handleSeeMore}
                            className="px-6 py-2 text-blue-700 rounded-full underline cursor-pointer font-medium"
                        >
                            See More
                        </button>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default BlogHomePage;