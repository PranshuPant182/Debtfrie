// import { useRef } from 'react';

// const videoData = [
//     { id: 1, title: 'Struggling with EMIs? This Is Your WayOut!', url: 'https://youtube.com/shorts/xfcW5GTe13Y?si=66GMGiBXT4xrncbH', thumbnail: 'https://img.youtube.com/vi/xfcW5GTe13Y/hqdefault.jpg' },
//     { id: 2, title: 'Recovery Agents Doing What They Do Best!', url: 'https://youtube.com/shorts/fzQtC9ZTlLQ?si=7-T4Z2U8K5mLf8Qa', thumbnail: 'https://img.youtube.com/vi/fzQtC9ZTlLQ/hqdefault.jpg' },
//     { id: 3, title: 'What is Loan Settlement?', url: 'https://youtube.com/shorts/ruqcfS1dZVs?si=vyokt4EwbJw-u6GV', thumbnail: 'https://img.youtube.com/vi/ruqcfS1dZVs/hqdefault.jpg' },
//     { id: 4, title: 'The Hidden Truth Behind "No Cost EMI"!', url: 'https://youtube.com/shorts/dnwPiicw4ns?si=fny3iJppEN18ChPQ', thumbnail: 'https://img.youtube.com/vi/dnwPiicw4ns/hqdefault.jpg' },
//     { id: 5, title: 'Banks Are HIDING This About Loans', url: 'https://youtube.com/shorts/m7qMPc15TQ0?si=ooW2bfc-XE0nPWmx', thumbnail: 'https://img.youtube.com/vi/m7qMPc15TQ0/hqdefault.jpg' },
// ];

// export default function VideoMarqueeSection() {
//     const scrollRef = useRef(null);

//     return (
//         <div className="max-w-[1400px] mx-auto px-4 py-16 z-10 relative">
//             {/* Heading */}
//             <div className="text-center mb-10" style={{ fontFamily: 'Youth', fontWeight: 900 }}>
//                 <h1 className="text-3xl md:text-5xl font-bold text-navy-900 mb-2">
//                     Debt-Free Living Starts
//                 </h1>
//                 <h1 className="text-3xl md:text-5xl font-bold mb-4 sm:mb-8">
//                     With <span className="text-blue-500">Debt</span><span className="text-yellow-500">Frie</span>
//                 </h1>
//                 <p className="text-lg sm:text-xl text-gray-800" style={{ fontFamily: 'gilroy', fontWeight: 400 }}>
//                     Join The DebtFrie Success Stories Today!
//                 </p>
//             </div>

//             {/* Marquee */}
//             {/* Marquee */}
//             <div
//                 className="overflow-hidden relative group"
//                 style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
//             >
//                 <div
//                     ref={scrollRef}
//                     className="flex gap-6 animate-scroll group-hover:[animation-play-state:paused] w-max"
//                 >
//                     {[...videoData, ...videoData].map((video, index) => (
//                         <div
//                             key={`${video.id}-${index}`}
//                             className="max-w-[230px] bg-white rounded-xl shadow-lg hover:scale-105 transition-transform cursor-pointer"
//                             onClick={() => window.open(video.url, '_blank')}
//                         >
//                             <img
//                                 src={video.thumbnail}
//                                 alt={video.title}
//                                 className="w-full h-72 object-cover rounded-t-xl"
//                             />
//                             <div className="p-4" style={{ fontFamily: 'gilroy' }}>
//                                 <h3 className="text-md font-semibold text-gray-800">{video.title}</h3>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//         </div>
//     );
// }


import video from '../../public/official.mp4'
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
