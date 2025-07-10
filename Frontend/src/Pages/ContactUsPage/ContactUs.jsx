// // import React, { useState } from 'react'
// // import Layout from '../Layout'
// // import { useForm } from 'react-hook-form';
// // import images from '../../utils/images'
// // import ThankYouModal from '../../components/ThankYouModal';

// // function ContactUs() {

// //   const [showThankYou, setShowThankYou] = useState(false);
// //   const [isLoading, setIsLoading] = useState(false);

// //   const {
// //     register,
// //     handleSubmit,
// //     formState: { errors },
// //   } = useForm();

// //   const loadRazorpayScript = () =>
// //     new Promise((resolve) => {
// //       const script = document.createElement("script");
// //       script.src = "https://checkout.razorpay.com/v1/checkout.js";
// //       script.onload = () => resolve(true);
// //       script.onerror = () => resolve(false);
// //       document.body.appendChild(script);
// //     });


// //   const onSubmit = async (formData) => {
// //     setIsLoading(true);
// //     const res = await loadRazorpayScript();
// //     if (!res) {
// //       alert("Failed to load Razorpay SDK");
// //       setIsLoading(false);
// //       return;
// //     }

// //     try {
// //       // const orderRes = await fetch("http://localhost:3000/api/payment/create-order", {
// //       //   method: "POST",
// //       //   headers: { "Content-Type": "application/json" },
// //       // });

// //       const orderRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/payment/create-order`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //       });

// //       const { order } = await orderRes.json();

// //       const options = {
// //         key: import.meta.env.VITE_RAZORPAY_KEY,
// //         amount: order.amount,
// //         currency: order.currency,
// //         name: "DebtFree",
// //         description: "Form Submission Fee",
// //         order_id: order.id,
// //         handler: async function (response) {

// //           const saveRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/submit-form`, {
// //             method: "POST",
// //             headers: { "Content-Type": "application/json" },
// //             body: JSON.stringify({ formData, paymentInfo: response }),
// //           });


// //           const result = await saveRes.json();
// //           setIsLoading(false); //  stop loader after success

// //           if (result.success) {
// //             setShowThankYou(true);
// //           } else {
// //             alert("Payment success, but failed to submit form.");
// //           }
// //         },
// //         modal: {
// //           ondismiss: () => {
// //             setIsLoading(false); // stop loader if user closes/cancels Razorpay popup
// //           },
// //         },
// //         prefill: {
// //           name: formData.fullName,
// //           email: formData.email,
// //           contact: formData.phone,
// //         },
// //         theme: { color: "#3399cc" },
// //       };

// //       const rzp1 = new window.Razorpay(options);
// //       rzp1.open();
// //     } catch (error) {
// //       console.error("Error:", error);
// //       alert("Something went wrong.");
// //       setIsLoading(false);
// //     }
// //   };


// //   return (
// //     <Layout>
// //       <div className="flex flex-col lg:flex-row w-full min-h-screen bg-white px-4 py-8 lg:px-20 gap-8">
// //         {/* Left Side - Office Info */}
// //         <div className="lg:w-1/2 w-full sm:mt-16">
// //           <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4" style={{
// //             fontFamily: 'Youth',
// //             fontWeight: 900,
// //             lineHeight: '100%',
// //             letterSpacing: '0%',
// //           }}>
// //             Talk to Our <span className="text-blue-600">Debt-Free Expert</span>
// //           </h1>
// //           <p className="text-gray-600 mb-6 text-md sm:text-xl" style={{
// //             fontFamily: 'gilroy',
// //             fontWeight: 400,
// //             lineHeight: '100%',
// //             letterSpacing: '0%',
// //           }}>
// //             Have questions about managing debt, financial planning, or becoming debt-free? Fill out the form, and our experts will get in touch with you.
// //             <br /><br />
// //             <span className="text-blue-600 font-semibold">Register now for just ₹50!</span>
// //           </p>

// //           <h2 className="text-2xl font-semibold text-gray-800 mb-2" style={{
// //             fontFamily: 'Youth',
// //             fontWeight: 900,
// //             lineHeight: '100%',
// //             letterSpacing: '0%',
// //           }}>Our Office</h2>
// //           <img src={images.meeting} alt="Our Office" className="w-full rounded-lg mb-6" />

// //           <div className="text-gray-700" style={{
// //             fontFamily: 'gilroy',
// //             fontWeight: 400,
// //             lineHeight: '100%',
// //             letterSpacing: '0%',
// //           }}>
// //             <h3 className="font-semibold text-xl sm:text-3xl mb-4">Need help with a query?</h3>
// //             <p className='text-lg ga'><strong>Support Email</strong><br />support@debtfrie.com</p>
// //             <p className="mt-2 text-lg" ><strong>Customer Helpline</strong><br />+91 98765 43210 [Mon – Sat, 10AM – 7PM]</p>
// //             <p className="mt-4 text-lg" >Need assistance? We're here to help you take control of your finances. Contact us today.</p>
// //           </div>
// //         </div>

// //         {/* Right Side - Form */}
// //         <div className="lg:w-1/2 w-full sm:mt-10">
// //           <h2 className="text-3xl font-semibold text-gray-900 mb-6" style={{
// //             fontFamily: 'Youth',
// //             fontWeight: 900,
// //             lineHeight: '100%',
// //             letterSpacing: '0%',
// //           }}>Contact Form</h2>

// //           <p className="text-lg text-black mb-6" style={{
// //             fontFamily: 'gilroy',
// //             fontWeight: 400,
// //             lineHeight: '100%',
// //             letterSpacing: '0%',
// //           }}
// //           >
// //             Fill out the form below, and our team will get back to you promptly. Let's<br /> connect and create solutions together.
// //           </p>

// //           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
// //             {/* 1. Full Name */}
// //             <div>
// //               <label className="block text-base font-medium mb-3">Full Name <span className='text-red-600'>*</span></label>
// //               <input {...register("fullName", { required: "Full name is required." })}
// //                 placeholder="Enter your full name"
// //                 className="w-full px-4 py-3 bg-[#f1f2f6] text-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
// //               {errors.fullName && <p className="text-red-600 text-sm mt-1">{errors.fullName.message}</p>}
// //             </div>

// //             {/* 2. Mobile Number */}
// //             <div>
// //               <label className="block text-base font-medium mb-3">Mobile Number <span className='text-red-600'>*</span></label>
// //               <input {...register("phone", {
// //                 required: "Phone number is required.",
// //                 pattern: {
// //                   value: /^[0-9]{10}$/,
// //                   message: "Enter a valid 10-digit mobile number"
// //                 }
// //               })}
// //                 placeholder="Enter your contact number"
// //                 className="w-full px-4 py-3 bg-[#f1f2f6] text-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
// //               {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>}
// //             </div>

// //             {/* 3. Email */}
// //             <div>
// //               <label className="block text-base font-medium mb-3">Email ID <span className='text-red-600'>*</span></label>
// //               <input type="email" {...register("email", { required: "Email is required." })}
// //                 placeholder="Enter your email"
// //                 className="w-full px-4 py-3 bg-[#f1f2f6] text-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
// //               {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
// //             </div>

// //             {/* 4. City of Residence */}
// //             <div>
// //               <label className="block text-base font-medium mb-3">City of Residence</label>
// //               <select {...register("city")} className="w-full px-4 py-3 bg-[#f1f2f6] text-gray-600 rounded-xl">
// //                 <option value="">Select your city</option>
// //                 <option value="Delhi NCR">Delhi NCR</option>
// //                 <option value="Kolkata">Kolkata</option>
// //                 <option value="Mumbai">Mumbai</option>
// //                 <option value="Pune">Pune</option>
// //                 <option value="Bangalore">Bangalore</option>
// //                 <option value="Chennai">Chennai</option>
// //                 <option value="Hyderabad">Hyderabad</option>
// //                 <option value="Gujarat">Gujarat</option>
// //                 <option value="Other">Other</option>
// //               </select>
// //             </div>

// //             {/* 5. Monthly Income */}
// //             <div>
// //               <label className="block text-base font-medium mb-3">Monthly Income</label>
// //               <select {...register("monthlyIncome")} className="w-full px-4 py-3 bg-[#f1f2f6] text-gray-600 rounded-xl">
// //                 <option value="">Select income bracket</option>
// //                 <option value="No Income">Currently No Income</option>
// //                 <option value="<15000">Less than ₹15,000</option>
// //                 <option value="15000-20000">₹15,000 – ₹20,000</option>
// //                 <option value="20000-40000">₹20,000 – ₹40,000</option>
// //                 <option value="40000-60000">₹40,000 – ₹60,000</option>
// //                 <option value="60000-80000">₹60,000 – ₹80,000</option>
// //                 <option value="80000-100000">₹80,000 – ₹1,00,000</option>
// //                 <option value=">100000">Above ₹1,00,000</option>
// //               </select>
// //             </div>

// //             {/* 6. Credit Card Dues */}
// //             <div>
// //               <label className="block text-base font-medium mb-3">Outstanding Credit Card Dues</label>
// //               <select {...register("creditCardDues")} className="w-full px-4 py-3 bg-[#f1f2f6] text-gray-600 rounded-xl">
// //                 <option value="">Select option</option>
// //                 <option value="None">No Credit Card Dues</option>
// //                 <option value="<1L">Less than ₹1 Lakh</option>
// //                 <option value="1-5L">₹1 – ₹5 Lakhs</option>
// //                 <option value="5-10L">₹5 – ₹10 Lakhs</option>
// //                 <option value="10-15L">₹10 – ₹15 Lakhs</option>
// //                 <option value="15-20L">₹15 – ₹20 Lakhs</option>
// //                 <option value=">20L">More than ₹20 Lakhs</option>
// //               </select>
// //             </div>

// //             {/* 7. Personal Loan Dues */}
// //             <div>
// //               <label className="block text-base font-medium mb-3">Outstanding Personal Loan Dues</label>
// //               <select {...register("loanDues")} className="w-full px-4 py-3 bg-[#f1f2f6] text-gray-600 rounded-xl">
// //                 <option value="">Select option</option>
// //                 <option value="None">No Personal Loan Dues</option>
// //                 <option value="<1L">Less than ₹1 Lakh</option>
// //                 <option value="1-2L">₹1 – ₹2 Lakhs</option>
// //                 <option value="2-5L">₹2 – ₹5 Lakhs</option>
// //                 <option value="5-10L">₹5 – ₹10 Lakhs</option>
// //                 <option value="10-15L">₹10 – ₹15 Lakhs</option>
// //                 <option value="15-20L">₹15 – ₹20 Lakhs</option>
// //                 <option value="20-30L">₹20 – ₹30 Lakhs</option>
// //                 <option value=">30L">Above ₹30 Lakhs</option>
// //               </select>
// //             </div>

// //             {/* 8. EMI Bounce Status */}
// //             <div>
// //               <label className="block text-base font-medium mb-3">EMI Bounce Status</label>
// //               <select {...register("emiBounce")} className="w-full px-4 py-3 bg-[#f1f2f6] text-gray-600 rounded-xl">
// //                 <option value="">Select option</option>
// //                 <option value="None">No EMI Bounce</option>
// //                 <option value="1">1 EMI Bounce</option>
// //                 <option value="2">2 EMI Bounces</option>
// //                 <option value="3">3 EMI Bounces</option>
// //                 <option value=">3">More than 3 EMI Bounces</option>
// //               </select>
// //             </div>

// //             {/* 9. Additional Comments */}
// //             <div>
// //               <label className="block text-base font-medium mb-3">Additional Queries or Comments</label>
// //               <textarea
// //                 {...register("additionalInfo")}
// //                 placeholder="Write any questions or details you'd like to share..."
// //                 rows={4}
// //                 className="w-full px-4 py-3 bg-[#f1f2f6] text-gray-600 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               />
// //             </div>

// //             {/* Submit Button */}
// //             <button type="submit" className="text-[14px] bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 mt-4">
// //               Pay and Submit your request
// //             </button>
// //           </form>

// //           <ThankYouModal visible={showThankYou} onClose={() => setShowThankYou(false)} />
// //         </div>
// //         {isLoading && (
// //           <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
// //             <div className="w-16 h-16 border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
// //             <p className="ml-4 text-white font-semibold text-lg">Processing...</p>
// //           </div>
// //         )}
// //       </div>
// //     </Layout>
// //   )
// // }

// // export default ContactUs

// import React, { useState, useRef, useEffect } from 'react'
// import Layout from '../Layout'
// import { useForm } from 'react-hook-form';
// import images from '../../utils/images'
// import ThankYouModal from '../../components/ThankYouModal';

// function ContactUs() {
//   const [showThankYou, setShowThankYou] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [paymentStatus, setPaymentStatus] = useState('');
//   const pollIntervalRef = useRef(null);
//   const currentOrderRef = useRef(null);
//   const currentFormDataRef = useRef(null);
//   const maxPollAttempts = 60; // 5 minutes of polling
//   const pollAttemptRef = useRef(0);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   // Clean up polling on component unmount
//   useEffect(() => {
//     return () => {
//       if (pollIntervalRef.current) {
//         clearInterval(pollIntervalRef.current);
//       }
//     };
//   }, []);

//   const loadRazorpayScript = () =>
//     new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });

//   // Check if device is mobile
//   const isMobileDevice = () => {
//     return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
//   };

//   // Start polling for payment status (for desktop QR payments)
//   const startPaymentPolling = (orderId) => {
//     pollAttemptRef.current = 0;
//     setPaymentStatus('Waiting for payment... Please scan the QR code with your UPI app');

//     pollIntervalRef.current = setInterval(async () => {
//       try {
//         const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/payment/check-order-status/${orderId}`);
//         const data = await response.json();

//         if (data.success && data.status === 'paid') {
//           // Payment successful
//           clearInterval(pollIntervalRef.current);
//           setPaymentStatus('Payment successful! Processing...');

//           // Verify and submit form
//           const paymentData = {
//             razorpay_order_id: orderId,
//             razorpay_payment_id: data.payment_id,
//             razorpay_signature: data.signature || 'polling_detected'
//           };

//           await verifyAndSubmitForm(currentFormDataRef.current, paymentData);
//         }

//         pollAttemptRef.current++;
//         if (pollAttemptRef.current >= maxPollAttempts) {
//           clearInterval(pollIntervalRef.current);
//           setPaymentStatus('');
//           setIsLoading(false);
//           alert('Payment timeout. Please try again or contact support if payment was deducted.');
//         }

//       } catch (error) {
//         console.error('Polling error:', error);
//       }
//     }, 5000); // Poll every 5 seconds
//   };

//   // Stop polling
//   const stopPaymentPolling = () => {
//     if (pollIntervalRef.current) {
//       clearInterval(pollIntervalRef.current);
//       pollIntervalRef.current = null;
//     }
//     setPaymentStatus('');
//   };

//   // Verify payment and submit form
//   const verifyAndSubmitForm = async (formData, paymentInfo) => {
//     try {
//       // First verify payment with server
//       const verifyResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/payment/verify-payment`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(paymentInfo),
//       });

//       const verifyData = await verifyResponse.json();

//       if (!verifyData.success) {
//         throw new Error('Payment verification failed');
//       }

//       // If verification successful, submit form
//       const saveRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/submit-form`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ formData, paymentInfo }),
//       });

//       const result = await saveRes.json();
//       setIsLoading(false);
//       stopPaymentPolling();

//       if (result.success) {
//         setShowThankYou(true);
//       } else {
//         alert("Payment verified, but failed to submit form. Please contact support.");
//       }
//     } catch (error) {
//       console.error("Verification error:", error);
//       setIsLoading(false);
//       stopPaymentPolling();
//       alert("Payment verification failed. Please contact support if payment was deducted.");
//     }
//   };

//   const onSubmit = async (formData) => {
//     setIsLoading(true);
//     currentFormDataRef.current = formData;

//     const res = await loadRazorpayScript();
//     if (!res) {
//       alert("Failed to load Razorpay SDK");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const orderRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/payment/create-order`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//       });

//       if (!orderRes.ok) {
//         throw new Error('Failed to create order');
//       }

//       const orderData = await orderRes.json();
//       if (!orderData.success) {
//         throw new Error('Order creation failed');
//       }

//       const { order } = orderData;
//       currentOrderRef.current = order;

//       const options = {
//         key: import.meta.env.VITE_RAZORPAY_KEY,
//         amount: order.amount,
//         currency: order.currency,
//         name: "DebtFrie",
//         description: "Debt Resolution Consultation Fee",
//         order_id: order.id,
//         handler: async function (response) {
//           // This handles successful payment (mainly for mobile)
//           stopPaymentPolling();
//           await verifyAndSubmitForm(formData, response);
//         },
//         modal: {
//           ondismiss: () => {
//             stopPaymentPolling();
//             setIsLoading(false);
//             setPaymentStatus('');
//           },
//           // When modal opens, start polling for desktop payments
//           onopen: () => {
//             if (!isMobileDevice()) {
//               // For desktop, start polling after a short delay
//               setTimeout(() => {
//                 startPaymentPolling(order.id);
//               }, 2000);
//             }
//           },
//         },
//         prefill: {
//           name: formData.fullName,
//           email: formData.email,
//           contact: formData.phone,
//         },
//         theme: { color: "#3399cc" },
//         // Add retry options for better UPI experience
//         retry: {
//           enabled: true,
//           max_count: 3
//         },
//         // Add timeout for better mobile experience
//         timeout: 300, // 5 minutes
//       };

//       const rzp1 = new window.Razorpay(options);

//       // Handle payment failure
//       rzp1.on('payment.failed', function (response) {
//         stopPaymentPolling();
//         setIsLoading(false);
//         setPaymentStatus('');
//         console.error('Payment failed:', response.error);
//         alert(`Payment failed: ${response.error.description}`);
//       });

//       rzp1.open();
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Something went wrong. Please try again.");
//       setIsLoading(false);
//       stopPaymentPolling();
//     }
//   };

//   return (
//     <Layout>
//       <div className="flex flex-col lg:flex-row w-full min-h-screen bg-white px-4 py-8 lg:px-20 gap-8">
//         {/* Left Side - Office Info */}
//         <div className="lg:w-1/2 w-full sm:mt-16">
//           <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4" style={{
//             fontFamily: 'Youth',
//             fontWeight: 900,
//             lineHeight: '100%',
//             letterSpacing: '0%',
//           }}>
//             Talk to Our <span className="text-blue-600">Debt-Free Expert</span>
//           </h1>
//           <p className="text-gray-600 mb-6 text-md sm:text-xl" style={{
//             fontFamily: 'gilroy',
//             fontWeight: 400,
//             lineHeight: '100%',
//             letterSpacing: '0%',
//           }}>
//             Have questions about managing debt, financial planning, or becoming debt-free? Fill out the form, and our experts will get in touch with you.
//             <br /><br />
//             <span className="text-blue-600 font-semibold">Register now for just ₹49!</span>
//           </p>

//           <h2 className="text-2xl font-semibold text-gray-800 mb-2" style={{
//             fontFamily: 'Youth',
//             fontWeight: 900,
//             lineHeight: '100%',
//             letterSpacing: '0%',
//           }}>Our Office</h2>
//           <img src={images.meeting} alt="Our Office" className="w-full rounded-lg mb-6" />

//           <div className="text-gray-700" style={{
//             fontFamily: 'gilroy',
//             fontWeight: 400,
//             lineHeight: '100%',
//             letterSpacing: '0%',
//           }}>
//             <h3 className="font-semibold text-xl sm:text-3xl mb-4">Need help with a query?</h3>
//             <p className='text-lg ga'><strong>Support Email</strong><br />support@debtfrie.com</p>
//             <p className="mt-2 text-lg" ><strong>Customer Helpline</strong><br />+91 98765 43210 [Mon – Sat, 10AM – 7PM]</p>
//             <p className="mt-4 text-lg" >Need assistance? We're here to help you take control of your finances. Contact us today.</p>
//           </div>
//         </div>

//         {/* Right Side - Form */}
//         <div className="lg:w-1/2 w-full sm:mt-10">
//           <h2 className="text-3xl font-semibold text-gray-900 mb-6" style={{
//             fontFamily: 'Youth',
//             fontWeight: 900,
//             lineHeight: '100%',
//             letterSpacing: '0%',
//           }}>Contact Form</h2>

//           <p className="text-lg text-black mb-6" style={{
//             fontFamily: 'gilroy',
//             fontWeight: 400,
//             lineHeight: '100%',
//             letterSpacing: '0%',
//           }}
//           >
//             Fill out the form below, and our team will get back to you promptly. Let's<br /> connect and create solutions together.
//           </p>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             {/* 1. Full Name */}
//             <div>
//               <label className="block text-base font-medium mb-3">Full Name <span className='text-red-600'>*</span></label>
//               <input {...register("fullName", { required: "Full name is required." })}
//                 placeholder="Enter your full name"
//                 className="w-full px-4 py-3 bg-[#f1f2f6] text-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
//               {errors.fullName && <p className="text-red-600 text-sm mt-1">{errors.fullName.message}</p>}
//             </div>

//             {/* 2. Mobile Number */}
//             <div>
//               <label className="block text-base font-medium mb-3">Mobile Number <span className='text-red-600'>*</span></label>
//               <input {...register("phone", {
//                 required: "Phone number is required.",
//                 pattern: {
//                   value: /^[0-9]{10}$/,
//                   message: "Enter a valid 10-digit mobile number"
//                 }
//               })}
//                 placeholder="Enter your contact number"
//                 className="w-full px-4 py-3 bg-[#f1f2f6] text-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
//               {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>}
//             </div>

//             {/* 3. Email */}
//             <div>
//               <label className="block text-base font-medium mb-3">Email ID <span className='text-red-600'>*</span></label>
//               <input type="email" {...register("email", { required: "Email is required." })}
//                 placeholder="Enter your email"
//                 className="w-full px-4 py-3 bg-[#f1f2f6] text-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
//               {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
//             </div>

//             {/* 4. City of Residence */}
//             <div>
//               <label className="block text-base font-medium mb-3">City of Residence</label>
//               <select {...register("city")} className="w-full px-4 py-3 bg-[#f1f2f6] text-gray-600 rounded-xl">
//                 <option value="">Select your city</option>
//                 <option value="Delhi NCR">Delhi NCR</option>
//                 <option value="Kolkata">Kolkata</option>
//                 <option value="Mumbai">Mumbai</option>
//                 <option value="Pune">Pune</option>
//                 <option value="Bangalore">Bangalore</option>
//                 <option value="Chennai">Chennai</option>
//                 <option value="Hyderabad">Hyderabad</option>
//                 <option value="Gujarat">Gujarat</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>

//             {/* 5. Monthly Income */}
//             <div>
//               <label className="block text-base font-medium mb-3">Monthly Income</label>
//               <select {...register("monthlyIncome")} className="w-full px-4 py-3 bg-[#f1f2f6] text-gray-600 rounded-xl">
//                 <option value="">Select income bracket</option>
//                 <option value="No Income">Currently No Income</option>
//                 <option value="<15000">Less than ₹15,000</option>
//                 <option value="15000-20000">₹15,000 – ₹20,000</option>
//                 <option value="20000-40000">₹20,000 – ₹40,000</option>
//                 <option value="40000-60000">₹40,000 – ₹60,000</option>
//                 <option value="60000-80000">₹60,000 – ₹80,000</option>
//                 <option value="80000-100000">₹80,000 – ₹1,00,000</option>
//                 <option value=">100000">Above ₹1,00,000</option>
//               </select>
//             </div>

//             {/* 6. Credit Card Dues */}
//             <div>
//               <label className="block text-base font-medium mb-3">Outstanding Credit Card Dues</label>
//               <select {...register("creditCardDues")} className="w-full px-4 py-3 bg-[#f1f2f6] text-gray-600 rounded-xl">
//                 <option value="">Select option</option>
//                 <option value="None">No Credit Card Dues</option>
//                 <option value="<1L">Less than ₹1 Lakh</option>
//                 <option value="1-5L">₹1 – ₹5 Lakhs</option>
//                 <option value="5-10L">₹5 – ₹10 Lakhs</option>
//                 <option value="10-15L">₹10 – ₹15 Lakhs</option>
//                 <option value="15-20L">₹15 – ₹20 Lakhs</option>
//                 <option value=">20L">More than ₹20 Lakhs</option>
//               </select>
//             </div>

//             {/* 7. Personal Loan Dues */}
//             <div>
//               <label className="block text-base font-medium mb-3">Outstanding Personal Loan Dues</label>
//               <select {...register("loanDues")} className="w-full px-4 py-3 bg-[#f1f2f6] text-gray-600 rounded-xl">
//                 <option value="">Select option</option>
//                 <option value="None">No Personal Loan Dues</option>
//                 <option value="<1L">Less than ₹1 Lakh</option>
//                 <option value="1-2L">₹1 – ₹2 Lakhs</option>
//                 <option value="2-5L">₹2 – ₹5 Lakhs</option>
//                 <option value="5-10L">₹5 – ₹10 Lakhs</option>
//                 <option value="10-15L">₹10 – ₹15 Lakhs</option>
//                 <option value="15-20L">₹15 – ₹20 Lakhs</option>
//                 <option value="20-30L">₹20 – ₹30 Lakhs</option>
//                 <option value=">30L">Above ₹30 Lakhs</option>
//               </select>
//             </div>

//             {/* 8. EMI Bounce Status */}
//             <div>
//               <label className="block text-base font-medium mb-3">EMI Bounce Status</label>
//               <select {...register("emiBounce")} className="w-full px-4 py-3 bg-[#f1f2f6] text-gray-600 rounded-xl">
//                 <option value="">Select option</option>
//                 <option value="None">No EMI Bounce</option>
//                 <option value="1">1 EMI Bounce</option>
//                 <option value="2">2 EMI Bounces</option>
//                 <option value="3">3 EMI Bounces</option>
//                 <option value=">3">More than 3 EMI Bounces</option>
//               </select>
//             </div>

//             {/* 9. Additional Comments */}
//             <div>
//               <label className="block text-base font-medium mb-3">Additional Queries or Comments</label>
//               <textarea
//                 {...register("additionalInfo")}
//                 placeholder="Write any questions or details you'd like to share..."
//                 rows={4}
//                 className="w-full px-4 py-3 bg-[#f1f2f6] text-gray-600 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full text-[16px] bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
//             >
//               {isLoading ? 'Processing...' : 'Pay ₹49 and Submit Request'}
//             </button>
//           </form>

//           <ThankYouModal visible={showThankYou} onClose={() => setShowThankYou(false)} />
//         </div>

//         {/* Loading Overlay */}
//         {isLoading && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center z-50">
//             <div className="bg-white rounded-lg p-6 max-w-md mx-4 text-center">
//               <div className="w-16 h-16 border-4 border-blue-400 border-dashed rounded-full animate-spin mx-auto mb-4"></div>
//               <p className="text-gray-800 font-semibold text-lg mb-2">Processing Payment...</p>
//               {paymentStatus && (
//                 <p className="text-blue-600 text-sm">{paymentStatus}</p>
//               )}
//               {!isMobileDevice() && paymentStatus && (
//                 <p className="text-gray-500 text-xs mt-2">
//                   Desktop users: Please scan the QR code with your UPI app
//                 </p>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </Layout>
//   )
// }

// export default ContactUs


import React, { useState, useRef, useEffect } from 'react'
import Layout from '../Layout'
import { useForm } from 'react-hook-form';
import images from '../../utils/images'
import ThankYouModal from '../../components/ThankYouModal';

function ContactUs() {
  const [showThankYou, setShowThankYou] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');
  const pollIntervalRef = useRef(null);
  const currentOrderRef = useRef(null);
  const currentFormDataRef = useRef(null);
  const maxPollAttempts = 60; // 5 minutes of polling
  const pollAttemptRef = useRef(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Clean up polling on component unmount
  useEffect(() => {
    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, []);

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  // Start polling for payment status (for non-QR payments)
  const startPaymentPolling = (orderId) => {
    pollAttemptRef.current = 0;
    setPaymentStatus('Processing payment... Please complete the payment');

    pollIntervalRef.current = setInterval(async () => {
      try {
        // Fixed: Use the correct endpoint that matches your backend
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/payment/order-status/${orderId}`);
        const data = await response.json();

        console.log('Polling response:', data);

        if (data.success && data.payments && data.payments.length > 0) {
          const payment = data.payments[0];

          if (payment.status === 'captured') {
            // Payment successful
            clearInterval(pollIntervalRef.current);
            setPaymentStatus('Payment successful! Processing...');

            // Create payment data for verification
            const paymentData = {
              razorpay_order_id: orderId,
              razorpay_payment_id: payment.id,
              razorpay_signature: payment.id + '|' + orderId // Simple signature for webhook payments
            };

            await verifyAndSubmitForm(currentFormDataRef.current, paymentData);
            return;
          }
        }

        pollAttemptRef.current++;
        if (pollAttemptRef.current >= maxPollAttempts) {
          clearInterval(pollIntervalRef.current);
          setPaymentStatus('');
          setIsLoading(false);
          alert('Payment timeout. Please try again or contact support if payment was deducted.');
        } else {
          // Update status with remaining time
          const remainingTime = Math.ceil((maxPollAttempts - pollAttemptRef.current) * 5 / 60);
          setPaymentStatus(`Processing payment... (${remainingTime} minutes remaining)`);
        }

      } catch (error) {
        console.error('Polling error:', error);
        pollAttemptRef.current++;

        if (pollAttemptRef.current >= maxPollAttempts) {
          clearInterval(pollIntervalRef.current);
          setPaymentStatus('');
          setIsLoading(false);
          alert('Unable to check payment status. Please contact support if payment was deducted.');
        }
      }
    }, 5000); // Poll every 5 seconds
  };

  // Stop polling
  const stopPaymentPolling = () => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
    setPaymentStatus('');
    pollAttemptRef.current = 0;
  };

  // Verify payment and submit form
  const verifyAndSubmitForm = async (formData, paymentInfo) => {
    try {
      console.log('Verifying payment:', paymentInfo);

      // For webhook-detected payments, skip verification and directly submit
      if (paymentInfo.razorpay_signature.includes('|')) {
        // This is likely a webhook-detected payment, submit form directly
        const saveRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/submit-form`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ formData, paymentInfo }),
        });

        const result = await saveRes.json();
        setIsLoading(false);
        stopPaymentPolling();

        if (result.success) {
          setShowThankYou(true);
        } else {
          alert("Payment successful, but failed to submit form. Please contact support.");
        }
        return;
      }

      // For regular payments, verify first
      const verifyResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/payment/verify-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentInfo),
      });

      const verifyData = await verifyResponse.json();

      if (!verifyData.success) {
        throw new Error('Payment verification failed');
      }

      // If verification successful, submit form
      const saveRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/submit-form`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData, paymentInfo }),
      });

      const result = await saveRes.json();
      setIsLoading(false);
      stopPaymentPolling();

      if (result.success) {
        setShowThankYou(true);
      } else {
        alert("Payment verified, but failed to submit form. Please contact support.");
      }
    } catch (error) {
      console.error("Verification error:", error);
      setIsLoading(false);
      stopPaymentPolling();
      alert("Payment processing failed. Please contact support if payment was deducted.");
    }
  };

  const onSubmit = async (formData) => {
    setIsLoading(true);
    currentFormDataRef.current = formData;

    const res = await loadRazorpayScript();
    if (!res) {
      alert("Failed to load Razorpay SDK");
      setIsLoading(false);
      return;
    }

    try {
      const orderRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!orderRes.ok) {
        throw new Error('Failed to create order');
      }

      const orderData = await orderRes.json();
      if (!orderData.success) {
        throw new Error('Order creation failed');
      }

      const { order } = orderData;
      currentOrderRef.current = order;

      console.log('Order created:', order.id);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        name: "DebtFrie",
        description: "Debt Resolution Consultation Fee",
        order_id: order.id,

        // Control which payment methods are available - NO QR CODE
        method: {
          upi: true,        // UPI (intent/collect only, no QR)
          card: true,       // Credit/Debit cards
          netbanking: true, // Net banking
          wallet: true,     // Digital wallets (Paytm, etc.)
          emi: false,       // Disable EMI options
          paylater: false   // Disable pay later options
        },

        // Fine-tune UPI to remove QR
        config: {
          display: {
            blocks: {
              utib: {
                name: 'Pay using UPI',
                instruments: [
                  {
                    method: 'upi',
                    flows: ['intent', 'collect'] // Only intent & collect, NO 'qr'
                  }
                ]
              },
              banks: {
                name: 'Pay using Netbanking',
                instruments: [
                  { method: 'netbanking' }
                ]
              },
              cards: {
                name: 'Cards',
                instruments: [
                  { method: 'card' }
                ]
              }
            },
            sequence: ['block.utib', 'block.cards', 'block.banks'],
            preferences: {
              show_default_blocks: false // Use our custom blocks
            }
          }
        },

        handler: async function (response) {
          // This handles successful payment (mainly for mobile)
          console.log('Payment success handler called:', response);
          stopPaymentPolling();
          await verifyAndSubmitForm(formData, response);
        },

        modal: {
          ondismiss: () => {
            console.log('Payment modal dismissed');
            stopPaymentPolling();
            setIsLoading(false);
            setPaymentStatus('');
          },
          // When modal opens, start polling for fallback
          onopen: () => {
            console.log('Payment modal opened');
            // Start light polling for webhook detection
            setTimeout(() => {
              startPaymentPolling(order.id);
            }, 3000);
          },
        },

        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },

        theme: {
          color: "#3399cc"
        },

        // Enhanced options for better success rates
        retry: {
          enabled: true,
          max_count: 3
        },

        timeout: 300, // 5 minutes timeout

        // Better mobile experience
        remember_customer: false,
        readonly: {
          email: true,
          contact: true,
          name: true
        }
      };

      const rzp1 = new window.Razorpay(options);

      // Handle payment failure
      rzp1.on('payment.failed', function (response) {
        console.log('Payment failed:', response.error);
        stopPaymentPolling();
        setIsLoading(false);
        setPaymentStatus('');
        alert(`Payment failed: ${response.error.description}`);
      });

      rzp1.open();
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
      setIsLoading(false);
      stopPaymentPolling();
    }
  };

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row w-full min-h-screen bg-white px-4 py-8 lg:px-20 gap-8">
        {/* Left Side - Office Info */}
        <div className="lg:w-1/2 w-full sm:mt-16">
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4" style={{
            fontFamily: 'Youth',
            fontWeight: 900,
            lineHeight: '100%',
            letterSpacing: '0%',
          }}>
            Talk to Our <span className="text-blue-600">Debt-Free Expert</span>
          </h1>
          <p className="text-gray-600 mb-6 text-md sm:text-xl" style={{
            fontFamily: 'gilroy',
            fontWeight: 400,
            lineHeight: '100%',
            letterSpacing: '0%',
          }}>
            Have questions about managing debt, financial planning, or becoming debt-free? Fill out the form, and our experts will get in touch with you.
            <br /><br />
            <span className="text-blue-600 font-semibold">Register now for just ₹49!</span>
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-2" style={{
            fontFamily: 'Youth',
            fontWeight: 900,
            lineHeight: '100%',
            letterSpacing: '0%',
          }}>Our Office</h2>
          <img src={images.meeting} alt="Our Office" className="w-full rounded-lg mb-6" />

          <div className="text-gray-700" style={{
            fontFamily: 'gilroy',
            fontWeight: 400,
            lineHeight: '100%',
            letterSpacing: '0%',
          }}>
            <h3 className="font-semibold text-xl sm:text-3xl mb-4">Need help with a query?</h3>
            <p className='text-lg ga'><strong>Support Email</strong><br />support@debtfrie.com</p>
            <p className="mt-2 text-lg" ><strong>Customer Helpline</strong><br />+91 98765 43210 [Mon – Sat, 10AM – 7PM]</p>
            <p className="mt-4 text-lg" >Need assistance? We're here to help you take control of your finances. Contact us today.</p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="lg:w-1/2 w-full sm:mt-10">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6" style={{
            fontFamily: 'Youth',
            fontWeight: 900,
            lineHeight: '100%',
            letterSpacing: '0%',
          }}>Contact Form</h2>

          <p className="text-lg text-black mb-6" style={{
            fontFamily: 'gilroy',
            fontWeight: 400,
            lineHeight: '100%',
            letterSpacing: '0%',
          }}
          >
            Fill out the form below, and our team will get back to you promptly. Let's<br /> connect and create solutions together.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              <select {...register("city")} className="w-full px-4 py-3 bg-[#f1f2f6] text-gray-600 rounded-xl">
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
            </div>

            {/* Monthly Income */}
            <div>
              <label className="block text-base font-medium mb-3">Monthly Income</label>
              <select {...register("monthlyIncome")} className="w-full px-4 py-3 bg-[#f1f2f6] text-gray-600 rounded-xl">
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
            </div>

            {/* Credit Card Dues */}
            <div>
              <label className="block text-base font-medium mb-3">Outstanding Credit Card Dues</label>
              <select {...register("creditCardDues")} className="w-full px-4 py-3 bg-[#f1f2f6] text-gray-600 rounded-xl">
                <option value="">Select option</option>
                <option value="None">No Credit Card Dues</option>
                <option value="<1L">Less than ₹1 Lakh</option>
                <option value="1-5L">₹1 – ₹5 Lakhs</option>
                <option value="5-10L">₹5 – ₹10 Lakhs</option>
                <option value="10-15L">₹10 – ₹15 Lakhs</option>
                <option value="15-20L">₹15 – ₹20 Lakhs</option>
                <option value=">20L">More than ₹20 Lakhs</option>
              </select>
            </div>

            {/* Personal Loan Dues */}
            <div>
              <label className="block text-base font-medium mb-3">Outstanding Personal Loan Dues</label>
              <select {...register("loanDues")} className="w-full px-4 py-3 bg-[#f1f2f6] text-gray-600 rounded-xl">
                <option value="">Select option</option>
                <option value="None">No Personal Loan Dues</option>
                <option value="<1L">Less than ₹1 Lakh</option>
                <option value="1-2L">₹1 – ₹2 Lakhs</option>
                <option value="2-5L">₹2 – ₹5 Lakhs</option>
                <option value="5-10L">₹5 – ₹10 Lakhs</option>
                <option value="10-15L">₹10 – ₹15 Lakhs</option>
                <option value="15-20L">₹15 – ₹20 Lakhs</option>
                <option value="20-30L">₹20 – ₹30 Lakhs</option>
                <option value=">30L">Above ₹30 Lakhs</option>
              </select>
            </div>

            {/* EMI Bounce Status */}
            <div>
              <label className="block text-base font-medium mb-3">EMI Bounce Status</label>
              <select {...register("emiBounce")} className="w-full px-4 py-3 bg-[#f1f2f6] text-gray-600 rounded-xl">
                <option value="">Select option</option>
                <option value="None">No EMI Bounce</option>
                <option value="1">1 EMI Bounce</option>
                <option value="2">2 EMI Bounces</option>
                <option value="3">3 EMI Bounces</option>
                <option value=">3">More than 3 EMI Bounces</option>
              </select>
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
              {isLoading ? 'Processing...' : 'Pay ₹49 and Submit Request'}
            </button>
          </form>

          <ThankYouModal visible={showThankYou} onClose={() => setShowThankYou(false)} />
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md mx-4 text-center">
              <div className="w-16 h-16 border-4 border-blue-400 border-dashed rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-800 font-semibold text-lg mb-2">Processing Payment...</p>
              {paymentStatus && (
                <p className="text-blue-600 text-sm mb-2">{paymentStatus}</p>
              )}
              <div className="text-gray-500 text-xs">
                <p>Choose your preferred payment method</p>
                <p className="mt-1">UPI • Cards • Net Banking • Wallets</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default ContactUs