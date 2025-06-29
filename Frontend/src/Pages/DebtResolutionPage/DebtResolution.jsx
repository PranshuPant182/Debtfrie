import React from 'react'
import Layout from '../Layout'
import TestimonialsSection from '../../components/Testimonial'
import FAQAccordion from '../../components/Faq'
import images from '../../utils/images'
import StepSlider2 from '../../components/Slider2'
import { useNavigate } from 'react-router-dom'
import DebtCalculator_Resolution from '../../components/Calculator_Resolution'

function DebtResolution() {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="w-full min-h-screen bg-[#ebf1fc] flex flex-col lg:flex-row items-center justify-between overflow-hidden">
        {/* Left Section: Text */}
        <div className="flex-1 space-x-9 px-6 sm:px-12 py-10 lg:pl-30 mt-10 sm:mt-0">
          <p className="text-sm text-[#3369E3] font-medium mb-2" style={{
            fontFamily: 'gilroy',
          }}
          >Best Debt Relief Solution</p>
          <h1 className="text-3xl sm:text-6xl font-extrabold text-[#111827] mb-4 leading-tight" style={{
            fontFamily: 'Youth'
          }}
          >
             
            Find Freedom from <br className="hidden sm:block" />
            Debt with <span className='text-[#3369E3]'>DebtFrie</span>
          </h1>
          <p className="text-[#4B5563] text-sm sm:text-base mb-6 w-full " style={{
            fontFamily: 'gilroy'
          }}
          >
            Struggling with overwhelming debt? Our Debt Resolution Program helps you settle your debts for less than you owe, so you can regain financial freedom faster.
          </p>
          <button className="bg-[#3369e3] text-white text-sm px-4 py-3 rounded-xl flex items-center gap-2" style={{
            fontFamily: 'gilroy'
          }}
          onClick={() =>{
            navigate('/contactus')
          }}
          >
            GET STARTED
            <span className="text-white text-lg">→</span>
          </button>
        </div>

        {/* Right Section: Image */}
        <div className="flex-1 w-full h-full p-0">
          <img
            src={images.Women}
            alt="Hero Visual"
            className="w-full h-full object-cover p-0 m-0 mt-9 sm:mt-36"
          />
        </div>
      </div>
      <StepSlider2 />
      <DebtCalculator_Resolution />
      <TestimonialsSection />
      <FAQAccordion limit={3} showButton={true} />
    </Layout>
  )
}

export default DebtResolution
