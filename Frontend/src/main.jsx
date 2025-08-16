import { createRoot } from 'react-dom/client'
import './index.css'
import HomePage from './Pages/HomePage/HomePage.jsx'
import AboutUs from './Pages/AboutUsPage/AboutUs.jsx'
import DebtResolution from './Pages/DebtResolutionPage/DebtResolution.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ContactUs from './Pages/ContactUsPage/ContactUs.jsx'
import FAQs from './Pages/FAQsPage/FAQs.jsx'
import BlogPage from './Pages/BlogPage/BlogPage.jsx'
import BlogDetailPage from './Pages/BlogPage/BlogDetailPage.jsx'
import ScrollToTop from './utils/ScrollToTop.jsx'
import DebtRestructuring from './Pages/DebtConsolidationPage/DebtRestructuring.jsx'
import AdminDashboard from './Pages/TestPage/TestPage.jsx'
import BlogAdminPanel from './Pages/BlogTest/BlogTest.jsx'
import FacebookPixelTracker from './utils/FacebookPixelTracker.jsx'
import Testimonial from './Pages/Testimonial/Testimonial.jsx'
import ThankYouPage from './Pages/ThankYouPage/ThankYou.jsx'

createRoot(document.getElementById('root')).render(

    <BrowserRouter>
        <ScrollToTop />
        <FacebookPixelTracker />
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/contactus' element={<ContactUs />} />
            <Route path='/debtResolution' element={<DebtResolution />} />
            <Route path='/aboutUs' element={<AboutUs />} />
            <Route path='/debtRestructuring' element={<DebtRestructuring />} />
            <Route path='/faqs' element={<FAQs />} />
            <Route path='/testimonial' element={<Testimonial />} />
            <Route path='/blog' element={<BlogPage />} />
            <Route path='/blogDetail/:id' element={<BlogDetailPage />} />
            <Route path='/Test' element={<AdminDashboard />} />
            <Route path='/Admin' element={<BlogAdminPanel />} />
            <Route path='/ThankYou' element={<ThankYouPage />} />

        </Routes>
    </BrowserRouter>
)
