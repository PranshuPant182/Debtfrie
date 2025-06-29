import { createRoot } from 'react-dom/client'
import './index.css'
import HomePage from './Pages/HomePage/HomePage.jsx'
import AboutUs from './Pages/AboutUsPage/AboutUs.jsx'
import DebtResolution from './Pages/DebtResolutionPage/DebtResolution.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ContactUs from './Pages/ContactUsPage/ContactUs.jsx'
import DebtConsolidation from './Pages/DebtConsolidationPage/DebtConsolidation.jsx'
import FAQs from './Pages/FAQsPage/FAQs.jsx'
import BlogPage from './Pages/BlogPage/BlogPage.jsx'
import BlogDetailPage from './Pages/BlogPage/BlogDetailPage.jsx'
import ScrollToTop from './utils/ScrollToTop.jsx'

createRoot(document.getElementById('root')).render(

    <BrowserRouter>
        <ScrollToTop />
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/contactus' element={<ContactUs />} />
            <Route path='/debtResolution' element={<DebtResolution />} />
            <Route path='/aboutUs' element={<AboutUs />} />
            <Route path='/debtRestructuring' element={<DebtConsolidation />} />
            <Route path='/faqs' element={<FAQs />} />
            <Route path='/blog' element={<BlogPage />} />
            <Route path='/blogDetail/:id' element={<BlogDetailPage />} />
        </Routes>
    </BrowserRouter>
)
