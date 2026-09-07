import { createRoot } from 'react-dom/client'
import { lazy, Suspense } from 'react'
import './index.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

// Keep HomePage static so the initial entry point loads instantly
import HomePage from './Pages/HomePage/HomePage.jsx'

// Lazy load other route components for code-splitting (improves page load metrics/Core Web Vitals)
const AboutUs = lazy(() => import('./Pages/AboutUsPage/AboutUs.jsx'))
const DebtResolution = lazy(() => import('./Pages/DebtResolutionPage/DebtResolution.jsx'))
const ContactUs = lazy(() => import('./Pages/ContactUsPage/ContactUs.jsx'))
const FAQs = lazy(() => import('./Pages/FAQsPage/FAQs.jsx'))
const BlogPage = lazy(() => import('./Pages/BlogPage/BlogPage.jsx'))
const BlogDetailPage = lazy(() => import('./Pages/BlogPage/BlogDetailPage.jsx'))
const DebtRestructuring = lazy(() => import('./Pages/DebtConsolidationPage/DebtRestructuring.jsx'))
const AdminDashboard = lazy(() => import('./Pages/TestPage/TestPage.jsx'))
const BlogAdminPanel = lazy(() => import('./Pages/BlogTest/BlogTest.jsx'))
const Testimonial = lazy(() => import('./Pages/Testimonial/Testimonial.jsx'))
const ThankYouPage = lazy(() => import('./Pages/ThankYouPage/ThankYou.jsx'))
const LandingPage = lazy(() => import('./Pages/LandingPage/LandingPage.jsx'))
const ContactFormNew = lazy(() => import('./Pages/ContactUsPage/ContactFormNew.jsx'))
const InquiryForm = lazy(() => import('./Pages/InquiryPage/InquiryForm.jsx'))
const EnquiryForm1 = lazy(() => import('./Pages/InquiryPage/EnquiryForm1.jsx'))
const NotFound = lazy(() => import('./Pages/NotFoundPage/NotFound.jsx'))

import ScrollToTop from './utils/ScrollToTop.jsx'
import FacebookPixelTracker from './utils/FacebookPixelTracker.jsx'
import UTMTracker from './utils/UTMTracker.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
        <ScrollToTop />
        <FacebookPixelTracker />
        <UTMTracker />

        {/* Suspense wrapper with custom loader spinner */}
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        }>
            <Routes>
                <Route path='/' element={<HomePage />} />

                {/* New SEO-friendly lowercase hyphenated URLs */}
                <Route path='/contact-us' element={<ContactUs />} />
                <Route path='/debt-resolution' element={<DebtResolution />} />
                <Route path='/about-us' element={<AboutUs />} />
                <Route path='/debt-restructuring' element={<DebtRestructuring />} />
                <Route path='/testimonials' element={<Testimonial />} />
                <Route path='/test' element={<AdminDashboard />} />
                <Route path='/admin' element={<BlogAdminPanel />} />
                <Route path='/thank-you' element={<ThankYouPage />} />

                {/* Client-side 301 redirect fallbacks for old URLs */}
                <Route path='/contactus' element={<Navigate to="/contact-us" replace />} />
                <Route path='/debtResolution' element={<Navigate to="/debt-resolution" replace />} />
                <Route path='/aboutUs' element={<Navigate to="/about-us" replace />} />
                <Route path='/debtRestructuring' element={<Navigate to="/debt-restructuring" replace />} />
                <Route path='/testimonial' element={<Navigate to="/testimonials" replace />} />
                <Route path='/Test' element={<Navigate to="/test" replace />} />
                <Route path='/Admin' element={<Navigate to="/admin" replace />} />
                <Route path='/ThankYou' element={<Navigate to="/thank-you" replace />} />

                <Route path='/faqs' element={<FAQs />} />
                <Route path='/blog' element={<BlogPage />} />
                <Route path='/blogDetail/:id' element={<BlogDetailPage />} />
                <Route path='/welcome' element={<LandingPage />} />
                <Route path='/contact-new' element={<ContactFormNew />} />
                <Route path='/enquiry' element={<InquiryForm />} />
                <Route path='/enquiry-1' element={<EnquiryForm1 />} />

                <Route path='*' element={<NotFound />} />
            </Routes>
        </Suspense>
    </BrowserRouter>
)
