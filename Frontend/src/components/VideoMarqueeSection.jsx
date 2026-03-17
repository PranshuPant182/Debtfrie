import video from '../assets/Official.mp4'
import { useEffect, useRef } from 'react';

export default function VideoSection() {
    const videoRef = useRef(null);


    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (videoRef.current) {
                            videoRef.current.muted = false;
                            videoRef.current.play().catch((err) => {
                                console.log('Unmuted autoplay failed, trying muted:', err);
                                if (videoRef.current) {
                                    videoRef.current.muted = true;
                                    videoRef.current.play().catch((mutedErr) => {
                                        console.log('Muted autoplay also failed:', mutedErr);
                                    });
                                }
                            });
                        }
                    } else {
                        videoRef.current?.pause();
                    }
                });
            },
            {
                threshold: 0.2, // Play as soon as 20% is visible
            }
        );

        const currentVideoRef = videoRef.current;
        if (currentVideoRef) {
            observer.observe(currentVideoRef);
        }

        return () => {
            if (currentVideoRef) {
                observer.unobserve(currentVideoRef);
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
                        loop
                        playsInline
                        autoPlay
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
