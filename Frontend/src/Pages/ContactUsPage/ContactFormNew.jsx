import React, { useState } from 'react'
import Layout from '../Layout'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function ContactFormNew() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    setIsLoading(true);
    console.log("Form Submitted Successfully:", formData);

    // Simulate a brief delay to show processing state
    setTimeout(() => {
      setIsLoading(false);
      navigate('/ThankYou');
    }, 1000);
  };

  return (
    <>
      <div className="w-full min-h-screen bg-white px-4 py-8 lg:px-20 flex justify-center items-start">
        <div className="w-full max-w-4xl">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center" style={{
            fontFamily: 'Youth',
            fontWeight: 900,
            lineHeight: '100%',
            letterSpacing: '0%',
          }}>Best Way to Settle Your Loans.</h2>

          <p className="text-lg text-black mb-6 text-center" style={{
            fontFamily: 'gilroy',
            fontWeight: 400,
            lineHeight: '100%',
            letterSpacing: '0%',
          }}
          >
            Speak with a Debtfrie financial expert and discover how you can legally reduce your loan burden and regain financial control. <br />Fill the form to start your confidential consultation.

          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-10">
            {/* Full Name */}
            <div>
              <label className="block text-base font-medium mb-3">Full Name <span className='text-red-600'>*</span></label>
              <input {...register("fullName", { required: "Full name is required." })}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 bg-[#f1f2f6] text-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
              {errors.fullName && <p className="text-red-600 text-sm mt-1">{errors.fullName.message}</p>}
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-base font-medium mb-3">Mobile Number <span className='text-red-600'>*</span></label>
              <input {...register("phone", {
                required: "Phone number is required.",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter a valid 10-digit mobile number"
                }
              })}
                placeholder="Enter your contact number"
                className="w-full px-4 py-3 bg-[#f1f2f6] text-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
              {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-base font-medium mb-3">Email ID <span className='text-red-600'>*</span></label>
              <input type="email" {...register("email", { required: "Email is required." })}
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-[#f1f2f6] text-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* City of Residence */}
            <div>
              <label className="block text-base font-medium mb-3">City of Residence</label>
              <div className="relative">
                <select {...register("city")} className="w-full px-4 py-3 bg-[#f1f2f6] text-gray-600 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select your city</option>
                  <option value="Delhi NCR">Delhi NCR</option>
                  <option value="Kolkata">Kolkata</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Pune">Pune</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Other">Other</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
            </div>

            {/* Monthly Income */}
            <div>
              <label className="block text-base font-medium mb-3">Monthly Income</label>
              <div className="relative">
                <select {...register("monthlyIncome")} className="w-full px-4 py-3 bg-[#f1f2f6] text-gray-600 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select income bracket</option>
                  <option value="No Income">Currently No Income</option>
                  <option value="<15000">Less than ₹15,000</option>
                  <option value="15000-20000">₹15,000 – ₹20,000</option>
                  <option value="20000-40000">₹20,000 – ₹40,000</option>
                  <option value="40000-60000">₹40,000 – ₹60,000</option>
                  <option value="60000-80000">₹60,000 – ₹80,000</option>
                  <option value="80000-100000">₹80,000 – ₹1,00,000</option>
                  <option value=">100000">Above ₹1,00,000</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
            </div>

            {/* Credit Card Dues */}
            <div>
              <label className="block text-base font-medium mb-3">Outstanding Credit Card Dues</label>
              <div className="relative">
                <select {...register("creditCardDues")} className="w-full px-4 py-3 bg-[#f1f2f6] text-gray-600 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select option</option>
                  <option value="None">No Credit Card Dues</option>
                  <option value="<1L">Less than ₹1 Lakh</option>
                  <option value="1-5L">₹1 – ₹5 Lakhs</option>
                  <option value="5-10L">₹5 – ₹10 Lakhs</option>
                  <option value="10-15L">₹10 – ₹15 Lakhs</option>
                  <option value="15-20L">₹15 – ₹20 Lakhs</option>
                  <option value=">20L">More than ₹20 Lakhs</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
            </div>

            {/* Personal Loan Dues */}
            <div>
              <label className="block text-base font-medium mb-3">Outstanding Personal Loan Dues (Personal Loan, Business Loan, Pay Day Loan, Consumer Loan, Education Loan, Overdraft etc.) ?</label>
              <div className="relative">
                <select {...register("loanDues")} className="w-full px-4 py-3 bg-[#f1f2f6] text-gray-600 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select option</option>
                  <option value="None">No Personal Loan Dues</option>
                  <option value="<1L">Less than Rs. 1 Lacs</option>
                  <option value="1-2L">Rs. 1-2 Lacs</option>
                  <option value="2-3L">Rs. 2-3 Lacs</option>
                  <option value="3-4L">Rs. 3-4 Lacs</option>
                  <option value="4-5L">Rs. 4-5 Lacs</option>
                  <option value="5-10L">Rs. 5-10 Lacs</option>
                  <option value="10-15L">Rs. 10-15 Lacs</option>
                  <option value="15-30L">Rs. 15-30 Lacs</option>
                  <option value="30-50L">Rs. 30-50 Lacs</option>
                  <option value="50-1Cr">Rs. 50- 1 Crore</option>
                  <option value=">1Cr">More than 1 Crore</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
            </div>

            {/* EMI Bounce Status */}
            <div>
              <label className="block text-base font-medium mb-3">EMI Bounce Status</label>
              <div className="relative">
                <select {...register("emiBounce")} className="w-full px-4 py-3 bg-[#f1f2f6] text-gray-600 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select option</option>
                  <option value="None">No EMI Bounce</option>
                  <option value="1 EMI Bounce">1 EMI Bounce</option>
                  <option value="2 EMI Bounces">2 EMI Bounces</option>
                  <option value="3 EMI Bounces">3 EMI Bounces</option>
                  <option value="More than 3 EMI Bounces">More than 3 EMI Bounces</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
            </div>

            {/* Additional Comments */}
            <div>
              <label className="block text-base font-medium mb-3">Additional Queries or Comments</label>
              <textarea
                {...register("additionalInfo")}
                placeholder="Write any questions or details you'd like to share..."
                rows={4}
                className="w-full px-4 py-3 bg-[#f1f2f6] text-gray-600 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full text-[16px] bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
            >
              {isLoading ? 'Processing...' : 'Submit'}
            </button>
            <div className="mt-6 text-center">
              <p className="text-[#1447e6] font-bold text-lg"><span className="text-red-600">*</span>WE DO NOT PROVIDE LOAN</p>
              <p className="text-gray-600 text-sm mt-1">We provide legal advice related to debts.</p>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ContactFormNew
