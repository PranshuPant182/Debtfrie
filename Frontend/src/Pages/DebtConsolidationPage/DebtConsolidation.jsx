import React from 'react'
import Layout from '../Layout'
import DebtCalculator from '../../components/Calculator'
import TestimonialsSection from '../../components/Testimonial'
import FAQAccordion from '../../components/Faq'
import images from '../../utils/images'
import CardSection from '../../components/CardSection'
import StepSlider3 from '../../components/Slider3'
import { useNavigate } from 'react-router-dom'
import DebtCalculator_Restructuring from '../../components/Calculator_Restructuring'

function DebtConsolidation() {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="w-full min-h-screen bg-[#fff9da] flex flex-col lg:flex-row items-center justify-between overflow-hidden">
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
            Simplify Your Debt <br className="hidden sm:block" />
            with One Easy Plan
          </h1>
          <p className="text-[#4B5563] sm:text-base mb-6 w-full " style={{
            fontFamily: 'gilroy'
          }}
          >
            Feeling overwhelmed by multiple debts? Our Debt Consolidation Program helps you combine all your loans into one manageable payment—with lower interest rates and a faster path to financial freedom.
          </p>
          <button className="bg-[#3369e3] text-white text-sm px-4 py-3 rounded-xl flex items-center gap-2" style={{
            fontFamily: 'gilroy'
          }}
            onClick={() => {
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
            src={images.Men}
            alt="Hero Visual"
            className="w-full h-full object-cover p-0 m-0 mt-9 sm:mt-32"
          />
        </div>
      </div>
      <CardSection />
      <StepSlider3 />
      <DebtCalculator_Restructuring />
      <TestimonialsSection />
      <FAQAccordion limit={3} showButton={true} />
    </Layout>
  )
}

export default DebtConsolidation
