import video from '../assets/Official.mp4'
import { useEffect, useRef } from 'react';

export default function VideoSection() {
    const videoRef = useRef(null);


    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        videoRef.current?.play().catch((err) => {
                            console.log('Autoplay failed:', err);
                        });
                    } else {
                        videoRef.current?.pause();
                    }
                });
            },
            {
                threshold: 0.5, // Adjust this if needed
            }
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, []);

    return (
        <div className="max-w-[1400px] mx-auto px-4 py-16 z-10 relative">
            {/* Heading */}
            <div className="text-center mb-10" style={{ fontFamily: 'Youth', fontWeight: 900 }}>
                <h1 className="text-3xl md:text-5xl font-bold text-navy-900 mb-2">
                    Debt-Free Living Starts
                </h1>
                <h1 className="text-3xl md:text-5xl font-bold mb-4 sm:mb-8">
                    With <span className="text-blue-500">Debt</span><span className="text-yellow-500">Frie</span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-800 mb-8" style={{ fontFamily: 'gilroy', fontWeight: 400 }}>
                    Join The DebtFrie Success Stories Today!
                </p>
            </div>

            {/* Video Player */}
            <div className="flex justify-center">
                <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <video
                        ref={videoRef}
                        className="w-full h-auto"
                        controls
                        preload="metadata"
                        muted // Autoplay requires this in many browsers
                        style={{ maxHeight: '600px' }}
                    >
                        <source src={video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </div>
    );
}
