import React, { useState, useEffect } from 'react';
import Layout from '../Layout';

function DynamicTestimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({});
    const [stats, setStats] = useState({ total: 0, avgRating: 0 });

    // Configure your API base URL here
    const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`;

    // Fetch testimonials from API
    const fetchTestimonials = async (page = 1, limit = 9) => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/testimonials?page=${page}&limit=${limit}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                setTestimonials(data.data);
                setPagination(data.pagination);
            } else {
                throw new Error(data.message || 'Failed to fetch testimonials');
            }
        } catch (err) {
            console.error('Error fetching testimonials:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch testimonial statistics
    const fetchStats = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/testimonials/admin/stats`);

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    setStats(data.data.overview);
                }
            }
        } catch (err) {
            console.error('Error fetching stats:', err);
        }
    };

    useEffect(() => {
        fetchTestimonials(currentPage);
        fetchStats();
    }, [currentPage]);

    const StarRating = ({ rating }) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        return (
            <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) => (
                    <svg
                        key={index}
                        className={`w-4 h-4 ${index < fullStars ? 'text-yellow-400 fill-current' :
                            index === fullStars && hasHalfStar ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
                <span className="text-sm font-medium text-gray-900 ml-1">{rating.toFixed(1)}</span>
            </div>
        );
    };

    const LoadingSkeleton = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-pulse">
                    <div className="flex items-start gap-3 mb-4">
                        <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                        <div className="flex-1">
                            <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                            <div className="h-3 bg-gray-300 rounded w-16"></div>
                        </div>
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="w-4 h-4 bg-gray-300 rounded"></div>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-3 bg-gray-300 rounded"></div>
                        <div className="h-3 bg-gray-300 rounded w-4/5"></div>
                        <div className="h-3 bg-gray-300 rounded w-3/5"></div>
                    </div>
                </div>
            ))}
        </div>
    );

    const ErrorMessage = ({ message, onRetry }) => (
        <div className="text-center py-12">
            <div className="max-w-md mx-auto">
                <div className="text-red-500 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.78-1.333-2.694-1.333-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Unable to Load Testimonials</h3>
                <p className="text-gray-600 mb-6">{message}</p>
                <button
                    onClick={onRetry}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Try Again
                </button>
            </div>
        </div>
    );

    const Pagination = () => {
        if (!pagination.pages || pagination.pages <= 1) return null;

        const pages = [];
        const maxVisiblePages = 5;
        const halfVisible = Math.floor(maxVisiblePages / 2);

        let startPage = Math.max(1, currentPage - halfVisible);
        let endPage = Math.min(pagination.pages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return (
            <div className="flex justify-center items-center gap-2 mt-12">
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Previous
                </button>

                {startPage > 1 && (
                    <>
                        <button
                            onClick={() => setCurrentPage(1)}
                            className="px-3 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                            1
                        </button>
                        {startPage > 2 && <span className="px-2 text-gray-500">...</span>}
                    </>
                )}

                {pages.map(page => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 rounded-lg border text-sm font-medium ${currentPage === page
                                ? 'bg-blue-500 text-white border-blue-500'
                                : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                            }`}
                    >
                        {page}
                    </button>
                ))}

                {endPage < pagination.pages && (
                    <>
                        {endPage < pagination.pages - 1 && <span className="px-2 text-gray-500">...</span>}
                        <button
                            onClick={() => setCurrentPage(pagination.pages)}
                            className="px-3 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                            {pagination.pages}
                        </button>
                    </>
                )}

                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === pagination.pages}
                    className="px-3 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>
        );
    };

    const handleRetry = () => {
        setError(null);
        fetchTestimonials(currentPage);
        fetchStats();
    };

    const formatNumber = (num) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num.toString();
    };

    if (error) {
        return (
            <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <ErrorMessage message={error} onRetry={handleRetry} />
                </div>
            </div>
        );
    }

    return (
        <Layout>
            <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center px-4 py-2 bg-white rounded-full border border-gray-200 mb-6">
                            <span className="text-sm text-blue-500">User Reviews</span>
                        </div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Youth', fontWeight: 900, lineHeight: '100%', letterSpacing: '0%' }}>
                            More than <span className="text-blue-500">1000</span> Happy Users
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            From overwhelming debt to financial freedom - read authentic stories from clients who transformed their lives with our comprehensive debt resolution solutions.
                        </p>
                        {stats.avgRating > 0 && (
                            <div className="flex items-center justify-center gap-2 mt-4">
                                <span className="text-sm text-gray-600">Average rating:</span>
                                <StarRating rating={stats.avgRating} />
                            </div>
                        )}
                    </div>

                    {/* Loading State */}
                    {loading && <LoadingSkeleton />}

                    {/* Testimonials Grid */}
                    {!loading && testimonials.length > 0 && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {testimonials.map((testimonial) => (
                                    <div
                                        key={testimonial._id}
                                        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
                                    >
                                        {/* Header with Avatar and Info */}
                                        <div className="flex items-start gap-3 mb-4">
                                            <img
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                className="w-12 h-12 rounded-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=random&size=48`;
                                                }}
                                            />
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-gray-900 text-sm">
                                                    {testimonial.name}
                                                </h4>
                                                <p className="text-gray-500 text-sm">
                                                    {new Date(testimonial.createdAt).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short'
                                                    })}
                                                </p>
                                            </div>
                                            <StarRating rating={testimonial.rating} />
                                        </div>

                                        {/* Review Text */}
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            {testimonial.text}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            <Pagination />
                        </>
                    )}

                    {/* Empty State */}
                    {!loading && testimonials.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-gray-400 mb-4">
                                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                        d="M7 8h10m0 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m10 0v10a2 2 0 01-2 2H9a2 2 0 01-2-2V8m0 0V6a2 2 0 012-2h6a2 2 0 012 2v2" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No testimonials found</h3>
                            <p className="text-gray-600">Be the first to share your experience!</p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default DynamicTestimonials;
