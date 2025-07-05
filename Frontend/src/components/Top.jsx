import React, { useState, useEffect } from "react";
import { MoveRight } from "lucide-react";
import images from "../utils/images"; // adjust this path as necessary
import { useNavigate } from "react-router-dom";

const HeaderData = [
  {
    HeadingTop: (
      <>
        Achieve Financial Freedom With <span className="text-[#3369e3]">Debt</span>
        <span className="text-[#fcd43a]">Frie</span>
      </>
    ),
    HeadingBottom: (
      <>India’s trusted solution for debt relief, loan settlement and financial freedom.</>),
    Image: images.HomePageBottom,
  },
  {
    HeadingTop: (<>
      Expert <span className="text-[#4575FE]">Legal Assistance</span> at Every Step
    </>),
    HeadingBottom: (
      <>
        Our team works with legal experts to ensure a smooth and compliant debt resolution.
      </>
    ),
    Image: images.HomePageBottom3,
  },
  {
    HeadingTop: (
      <>
        <span className="text-[#4575FE]">Trusted Advocates</span> for Your Debt Relief
      </>
    ),
    HeadingBottom: (<>
      Our experienced legal team ensures fair settlements and protects your rights.
    </>),
    Image: images.HomePageBottom4,
  },
  {
    HeadingTop: (<>
      <span className="text-[#4575FE]">Debt-Free</span>, Stress-Free, Worry-Free!
    </>),
    HeadingBottom: (<>
      Settle your loans, regain control, and start a financially secure future today.
    </>),
    Image: images.HomePageBottom5,
  },
];

const HeroSection = ({scrollToMiddle}) => {
  const [index, setIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % HeaderData.length);
        setIsFading(false);
      }, 500); // fade out before switching
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const current = HeaderData[index];

  return (
    <div className="w-full flex flex-col items-center min-h-[600px] sm:min-h-[650px] lg:min-h-[700px]" >
      {/* FRONT HEADING */}
      <div className={`transition-opacity duration-500 ease-in-out ${isFading ? "opacity-0" : "opacity-100"
        }  w-full py-6 md:py-8 flex flex-col justify-center items-center sm:mt-15 px-2`}>
        <h1 className="text-4xl sm:text-5xl text-center" style={{
          fontFamily: 'Youth',
          fontWeight: 900,
          lineHeight: '100%',
          letterSpacing: '0%',
        }}
        >{current.HeadingTop}</h1>
        <br />
        <p className='text-[16px] sm:text-2xl text-center' style={{
          fontFamily: 'gilroy',
          lineHeight: '100%',
          letterSpacing: '0%',
        }}>{current.HeadingBottom}</p>
      </div>

      {/* FRONT BUTTONS */}
      <div className='w-full flex flex-row justify-center items-center space-x-4' style={{
        fontFamily: 'gilroy',
        lineHeight: '100%',
        fontWeight: 400,
        letterSpacing: '0%',
      }}>
        <button className='bg-[#3369e3] text-white px-3 font-medium  py-3 sm:py-2 md:px-4 md:py-3 rounded-2xl text-sm flex items-center gap-2'
          onClick={() => navigate("/contactus")}>
          <span>GET DFEBT FREE</span>
          <MoveRight className="w-4 h-4 md:w-5 md:h-5" />
        </button>
        <button className='text-sm bg-gray-200 px-3 font-medium  py-3 sm:py-2 md:px-4 md:py-3 rounded-2xl' onClick={scrollToMiddle}>
          LEARN HOW IT WORKS
        </button>
      </div>

      {/* FRONT IMAGE */}
      <div className="w-full max-w-[400px] sm:max-w-[600px] h-[350px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] relative overflow-hidden">
        <img
          src={current.Image}
          alt="Header"
          className={` absolute inset-0 h-full w-full object-cover rounded-lg transition-opacity duration-500 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'
            }`}
        />
      </div>
    </div>
  );
};

export default HeroSection;
