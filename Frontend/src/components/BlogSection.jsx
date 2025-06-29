import React, { useState, useEffect } from 'react';
import blog1 from '../assets/Images/blog1.png';
import blog2 from '../assets/Images/blog2.png';
import blog3 from '../assets/Images/blog3.png';
import { useNavigate } from 'react-router-dom';

const BlogSection = ({ title }) => {
    const navigate = useNavigate();
    // const blogPosts = [
    //     {
    //         id: 1,
    //         category: "Debt Management",
    //         title: "Breaking Free: How People Are Overcoming Debt",
    //         description: "Discover inspiring stories of individuals who conquered...",
    //         image: blog1,
    //         author: "Alec Whitten",
    //         date: "17 Jan 2025",
    //         slug: "#"
    //     },
    //     {
    //         id: 1,
    //         category: "Debt Management",
    //         title: "Breaking Free: How People Are Overcoming Debt",
    //         description: "Discover inspiring stories of individuals who conquered...",
    //         image: blog1,
    //         author: "Alec Whitten",
    //         date: "17 Jan 2025",
    //         slug: "#"
    //     },
    //     {
    //         id: 2,
    //         category: "Smart Money Moves",
    //         title: "5 Proven Strategies to Reduce Your Debt Faster",
    //         description: "Practical tips and techniques to pay off your debts.",
    //         image: blog2,
    //         author: "Alec Whitten",
    //         date: "17 Jan 2025",
    //         slug: "#"
    //     },
    //     {
    //         id: 3,
    //         category: "Financial Planning",
    //         title: "Debt-Free Future: How to Stay Out of Debt Forever",
    //         description: "Learn essential financial habits to maintain a debt-free...",
    //         image: blog3,
    //         author: "Alec Whitten",
    //         date: "17 Jan 2025",
    //         slug: "#"
    //     }
    // ];

    // State for mobile carousel
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [blogPosts, setBlogPosts] = useState([]);

    const handleClick = (postId) => {
        navigate(`/blogDetail/${postId}`);
    };

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/blogs`)
            .then(res => res.json())
            .then(data => {
                const fallbackImages = [blog1, blog2, blog3];

                const formattedBlogs = data.slice(0, 4).map((post, index) => ({
                    ...post,
                    image: post.image || fallbackImages[index % fallbackImages.length],
                    date: new Date(post.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                    }),
                }));

                setBlogPosts(formattedBlogs);
            })
            .catch(err => console.error("Error fetching blogs:", err));
    }, []);



    // Check if screen is mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Initial check
        checkMobile();

        // Add resize listener
        window.addEventListener('resize', checkMobile);

        // Cleanup
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Auto-rotate carousel on mobile
    useEffect(() => {
        if (!isMobile) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % blogPosts.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isMobile, blogPosts.length]);


    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <section className="sm:py-10 w-full px-4 sm:px-12 mx-auto">
            <div className="max-w-full">
                {title && <h2 className="text-5xl font-bold text-center mb-12" style={{
                    fontFamily: 'Youth',
                    fontWeight: 900,
                    lineHeight: '100%',
                    letterSpacing: '0%',
                }}>Blog Section</h2>}

                {/* Desktop view - full width grid */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-10 w-full">
                    {blogPosts.map((post) => (
                        <div key={post.id} className="bg-white rounded-3xl shadow-md overflow-hidden border border-gray-100 transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 w-full">
                            <div className="relative">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-48 object-cover"
                                />
                            </div>

                            <div className="p-6">
                                <div className="mb-3">
                                    <span className="text-blue-600 text-sm font-medium">{post.category}</span>
                                </div>

                                <h3 className="text-lg font-bold mb-2 flex justify-between items-start">
                                    <span style={{
                                        fontFamily: 'Youth',
                                        fontWeight: 900,
                                        lineHeight: '100%',
                                        letterSpacing: '0%',
                                    }}>{post.title}</span>
                                    <div
                                        // onClick={() => navigate(`/blogDetail/${post._id}`)}
                                        onClick={() => handleClick(post._id)}
                                        className="ml-2 text-gray-500 hover:text-blue-600 cursor-pointer"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.33301 12.6667L12.6663 3.33334M12.6663 3.33334H5.33301M12.6663 3.33334V10.6667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </h3>

                                <p className="text-gray-600 mb-6" style={{
                                    fontFamily: 'gilroy',
                                    fontWeight: 400,
                                    lineHeight: '100%',
                                    letterSpacing: '0%',
                                }}>{post.description}</p>

                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden flex-shrink-0">
                                        <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-500">
                                            {post.author.charAt(0)}
                                        </div>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium">{post.author}</p>
                                        <p className="text-xs text-gray-500">{post.date}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile view - carousel (unchanged) */}
                <div className="md:hidden w-full">
                    <div className="relative overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {blogPosts.map((post) => (
                                <div
                                    key={post.id}
                                    className="w-full flex-shrink-0 bg-white rounded-3xl shadow-md overflow-hidden border border-gray-100"
                                    onClick={() => handleClick(post._id)}
                                >
                                    <div className="relative">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-48 object-cover"
                                        />
                                    </div>

                                    <div className="p-6">
                                        <div className="mb-3">
                                            <span className="text-blue-600 text-sm font-medium">{post.category}</span>
                                        </div>

                                        <h3 className="text-xl font-bold mb-2 flex justify-between items-start">
                                            <span>{post.title}</span>
                                            <a href={post.slug} className="ml-2 text-gray-500 hover:text-blue-600">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M3.33301 12.6667L12.6663 3.33334M12.6663 3.33334H5.33301M12.6663 3.33334V10.6667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </a>
                                        </h3>

                                        <p className="text-gray-600 mb-6">{post.description}</p>

                                        <div className="flex items-center">
                                            <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden flex-shrink-0">
                                                <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-500">
                                                    {post.author.charAt(0)}
                                                </div>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium">{post.author}</p>
                                                <p className="text-xs text-gray-500">{post.date}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Indicators */}
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                            {blogPosts.map((_, index) => (
                                <button
                                    key={index}
                                    className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'}`}
                                    onClick={() => goToSlide(index)}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* See More link */}
                <div className="mt-10 text-center">
                    <a
                        onClick={() => navigate('/blog')}
                        className="inline-block text-blue-600 cursor-pointer font-medium hover:text-blue-800 transition-colors"
                    >
                        See More
                    </a>
                </div>
            </div>
        </section>
    );
};

export default BlogSection;