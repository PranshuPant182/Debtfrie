import React from 'react'
import video from '../assets/DF_MotionBanner.mp4'

function Banner() {
    return (
        <div className="w-full sm:min-h-screen bg-[#F1F7FF] relative overflow-hidden">
            {/* Video Container with padding/margin */}
            <div className="relative w-full h-full p-4 sm:p-8 md:p-12 lg:p-16 flex items-center justify-center">
                <div className="w-full max-w-6xl rounded-2xl overflow-hidden shadow-2xl">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-auto object-cover"
                    >
                        <source src={video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </div>
    )
}

export default Banner