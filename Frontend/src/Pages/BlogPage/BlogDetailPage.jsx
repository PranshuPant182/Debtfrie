import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import BlogSection from '../../components/BlogSection';
import images from '../../utils/images';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function BlogDetailPage() {
    const { id } = useParams(); // blog ID from URL
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/blogs/${id}`)
            .then((res) => {
                setBlog(res.data?.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching blog:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <Layout>
                <div className="text-center py-10 text-gray-500">Loading blog...</div>
            </Layout>
        );
    }

    if (!blog) {
        return (
            <Layout>
                <div className="text-center py-10 text-red-500">Blog not found.</div>
            </Layout>
        );
    }

    const {
        title,
        category,
        image,
        sections,
        createdAt,
        disclaimer,
        author,
    } = blog;


    const formattedDate = new Date(createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    return(
            <Layout>
                <div className="mx-auto">
                    <div className="max-w-3xl mx-auto px-4 py-10 text-gray-800">

                        {/* Blog Meta */}
                        <div className="text-sm text-gray-500 mb-2 text-center">
                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                                {category || "General"}
                            </span>
                            <span className="ml-4">{formattedDate}</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-2">
                            {title}
                        </h1>

                        {/* Subtitle/Description
                        {description && (
                            <p className="text-center text-sm sm:text-base text-gray-600 mb-4">
                                {description}
                            </p>
                        )} */}

                        {/* Disclaimer */}
                        {disclaimer && (
                            <div className="text-xs italic text-red-500 text-center mb-6">
                                {disclaimer}
                            </div>
                        )}

                        {/* Image */}
                        <div className="w-full flex justify-center mb-8">
                            <img
                                src={images.BlogImage}
                                alt="Blog Cover"
                                className="rounded-md max-w-full h-auto"
                            />
                        </div>

                        {/* Main Content */}
                        <section className="space-y-6 text-sm sm:text-base leading-relaxed">
                            {Array.isArray(sections) && sections.map((section, index) => {
                                if (section.type === 'heading') {
                                    return (
                                        <h2 key={index} className="font-semibold text-lg mt-6 mb-2 text-gray-900">
                                            {section.text}
                                        </h2>
                                    );
                                }

                                if (section.type === 'paragraph') {
                                    return (
                                        <p key={index} className="text-gray-800">
                                            {section.text}
                                        </p>
                                    );
                                }

                                if (section.type === 'list') {
                                    return (
                                        <div key={index} className="mt-6">
                                            {section.title && (
                                                <h3 className="font-semibold text-base mb-2">{section.title}</h3>
                                            )}

                                            {section.items && (
                                                <ul className="list-disc pl-5 space-y-1 text-gray-800">
                                                    {section.items.map((item, i) => (
                                                        <li key={i}>{item}</li>
                                                    ))}
                                                </ul>
                                            )}

                                            {Array.isArray(section.subitems) && section.subitems.map((sub, subIndex) => (
                                                <div key={subIndex} className="mt-4">
                                                    <h4 className="font-semibold text-sm mb-1">{sub.subheading}</h4>
                                                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                                                        {sub.points.map((point, pointIdx) => (
                                                            <li key={pointIdx}>{point}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    );
                                }

                                return null;
                            })}
                        </section>

                        {/* Author Info */}
                        <div className="mt-10 flex items-center gap-3">
                            <img
                                src="https://randomuser.me/api/portraits/women/44.jpg"
                                alt="Author"
                                className="w-8 h-8 rounded-full"
                            />
                            <p className="text-sm text-gray-600 font-medium">
                                Written by {author || "Admin"}
                            </p>
                        </div>
                    </div>

                    {/* Related Blogs */}
                    <BlogSection title={false} />
                </div>
            </Layout>
        );
}

export default BlogDetailPage;