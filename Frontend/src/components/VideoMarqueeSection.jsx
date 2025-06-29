import { useRef } from 'react';

const videoData = [
    { id: 1, title: 'Credit Score Tips', url: 'https://youtu.be/X4HcuMtu5zc?si=6Ti5ZoKS8vkmSXwt', thumbnail: 'https://img.youtube.com/vi/X4HcuMtu5zc/hqdefault.jpg' },
    { id: 2, title: 'Debt Management', url: 'https://youtu.be/X4HcuMtu5zc?si=6Ti5ZoKS8vkmSXwt', thumbnail: 'https://img.youtube.com/vi/X4HcuMtu5zc/hqdefault.jpg' },
    { id: 3, title: 'Financial Freedom', url: 'https://youtu.be/X4HcuMtu5zc?si=6Ti5ZoKS8vkmSXwt', thumbnail: 'https://img.youtube.com/vi/X4HcuMtu5zc/hqdefault.jpg' },
    // Add more videos here
];

export default function VideoMarqueeSection() {
    const scrollRef = useRef(null);

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
                <p className="text-lg sm:text-xl text-gray-800" style={{ fontFamily: 'gilroy', fontWeight: 400 }}>
                    Join The DebtFrie Success Stories Today!
                </p>
            </div>

            {/* Marquee */}
            {/* Marquee */}
            <div
                className="overflow-hidden relative group"
                style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
            >
                <div
                    ref={scrollRef}
                    className="flex gap-6 animate-scroll group-hover:[animation-play-state:paused] w-max"
                >
                    {[...videoData, ...videoData].map((video, index) => (
                        <div
                            key={`${video.id}-${index}`}
                            className="min-w-[300px] bg-white rounded-xl shadow-lg hover:scale-105 transition-transform cursor-pointer"
                            onClick={() => window.open(video.url, '_blank')}
                        >
                            <img
                                src={video.thumbnail}
                                alt={video.title}
                                className="w-full h-96 object-cover rounded-t-xl"
                            />
                            <div className="p-4" style={{ fontFamily: 'gilroy' }}>
                                <h3 className="text-md font-semibold text-gray-800">{video.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
