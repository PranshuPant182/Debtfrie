import React from 'react'
import video from '../assets/DF_MotionBanner.mp4'

function Banner() {
    return (
        <div className="w-full sm:min-h-screen bg-white relative overflow-hidden">
            {/* Video Container */}
            <div className="relative w-full h-full">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                
            </div>
        </div>
    )
}

export default Banner