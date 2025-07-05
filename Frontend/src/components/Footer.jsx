import React from 'react';
import images from '../utils/images';
import { faFacebook, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faYoutube, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

function Footer() {
    const navigate = useNavigate();
    return (
        <footer className="bg-[#02102f] text-white">
            {/* Hero CTA */}
            <div className="relative w-full">
                <div className="w-full h-100 bg-gray-800 relative">
                    <img src={images.handShake} alt="Handshake" className="w-full h-full object-cover opacity-25" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 py-12" style={{ fontFamily: 'Youth', fontWeight: 900 }}>
                        <h2 className="text-xl sm:text-3xl font-bold mb-6 max-w-4xl mx-auto tracking-widest">
                            Transform Your Debt Struggles Into Financial <br className="hidden sm:inline" /> Freedom And Lasting Peace Of Mind
                        </h2>
                        <button onClick={() => navigate('/contactus')} className="bg-[#3369e3] hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium flex items-center shadow-lg transform transition hover:scale-105" style={{ fontFamily: 'gilroy' }}>
                            GET STARTED
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer Grid */}
            <div className="container mx-auto px-6 md:px-12 py-12">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-10">
                    {/* Company Info, Contact & Certificates */}
                    <div className="md:col-span-2">
                        {/* Brand Name */}
                        <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: 'Youth', fontWeight: 900 }}>
                            Debt<span className="text-yellow-500">frie</span>
                        </h2>

                        {/* Description */}
                        <p className="text-gray-400 text-sm mt-4 mb-6" style={{ fontFamily: 'gilroy' }}>
                            Debtfrie is India’s first legal-based fintech, empowering individuals to take control of their
                            debt with expert guidance and trusted solutions.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3 text-gray-300 text-sm mb-6" style={{ fontFamily: 'gilroy' }}>
                            <div className="flex items-start gap-2">
                                <span className="text-lg">📞</span>
                                <span>+91 9266990923 / +91 120-4210615</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <FontAwesomeIcon icon={faWhatsapp} className="text-green-500 text-lg mt-1" />
                                <a
                                    href="https://wa.me/919266990923"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:underline"
                                >
                                    +91 92669 90923
                                </a>
                            </div>

                            <div className="flex items-start gap-2">
                                <span className="text-lg">📧</span>
                                <span>official@debtfrie.in</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-lg">🏢</span>
                                <span>D-34 Sector 2 Noida,<br />Red FM Lane, 201301</span>
                            </div>
                        </div>

                        {/* Certificates */}
                        <div className="mt-6">
                            <p className="text-gray-400 text-sm mb-2">Certified for Best Consumer Debt practices:</p>
                            <div className="flex items-center space-x-3">
                                <img src={images.Certificate2} alt="ISO" className="h-10 sm:h-16 object-contain" />
                                <img src={images.Certificate3} alt="PCI DSS" className="h-16 object-contain" />
                                <img src={images.Certificate1} alt="SISA" className="h-10 object-contain" />
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-medium mb-4">Quick Links</h3>
                        <ul className="space-y-3 text-gray-400 text-sm" style={{ fontFamily: 'gilroy' }}>
                            <li onClick={() => navigate('/')} className="hover:text-white cursor-pointer">Home</li>
                            <li onClick={() => navigate('/aboutUs')} className="hover:text-white cursor-pointer">About Us</li>
                            <li onClick={() => navigate('/debtResolution')} className="hover:text-white cursor-pointer">Debt Resolution</li>
                            <li onClick={() => navigate('/debtRestructuring')} className="hover:text-white cursor-pointer">Debt Restructuring</li>
                            <li onClick={() => navigate('/blog')} className="hover:text-white cursor-pointer">Reading Room</li>
                            <li onClick={() => navigate('/contactus')} className="hover:text-white cursor-pointer">Contact Us</li>
                            {/* <li className="hover:text-white cursor-pointer">Client Testimonials</li> */}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-medium mb-4">Our Services</h3>
                        <ul className="space-y-3 text-gray-400 text-sm" style={{ fontFamily: 'gilroy' }}>
                            <li onClick={() => navigate('/debtResolution')}>Debt Resolution</li>
                            <li onClick={() => navigate('/debtRestructuring')}>Debt Restructuring</li>
                            <li>Debt Settlements</li>
                            <li>Legal Support</li>
                            <li>Anti-Harassment</li>
                        </ul>
                    </div>

                    {/* Library */}
                    <div>
                        <h3 className="text-lg font-medium mb-4">Library</h3>
                        <ul className="space-y-3 text-gray-400 text-sm" style={{ fontFamily: 'gilroy' }}>
                            <li onClick={() => navigate('/blog')} className="hover:text-white cursor-pointer">Blogs</li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-lg font-medium mb-4">Social Media</h3>
                        <ul className="space-y-3 text-gray-400 text-sm" style={{ fontFamily: 'gilroy' }}>
                            <li><a href="https://www.instagram.com/debtfrie" target="_blank" rel="noreferrer" className="hover:text-white">Instagram</a></li>
                            <li><a href="https://www.facebook.com/share/19Q4GZ7dTe" target="_blank" rel="noreferrer" className="hover:text-white">Facebook</a></li>
                            <li><a href="https://x.com/Debtfrie" target="_blank" rel="noreferrer" className="hover:text-white">Twitter</a></li>
                            <li><a href="https://www.linkedin.com/posts/debtfrie_struggling-to-pay-your-business-emis-or-bnpl-activity-7346870740043878401-cJP3" target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn</a></li>
                            <li><a href="https://youtube.com/@debtfrie?si=mJlk4JGq7NIzB2U4" target="_blank" rel="noreferrer" className="hover:text-white">YouTube</a></li>
                        </ul>

                        <div className="flex space-x-4 mt-4">
                            <a href="https://www.facebook.com/share/19Q4GZ7dTe" target="_blank" className="hover:scale-110 transition"><FontAwesomeIcon icon={faFacebook} size="xl" /></a>
                            <a href="https://x.com/Debtfrie" target="_blank" className="hover:scale-110 transition"><FontAwesomeIcon icon={faXTwitter} size="xl" /></a>
                            <a href="https://www.instagram.com/debtfrie" target="_blank" className="hover:scale-110 transition"><FontAwesomeIcon icon={faInstagram} size="xl" /></a>
                            <a href="https://www.linkedin.com/posts/debtfrie_struggling-to-pay-your-business-emis-or-bnpl-activity-7346870740043878401-cJP3" target="_blank" className="hover:scale-110 transition"><FontAwesomeIcon icon={faLinkedin} size="xl" /></a>
                            <a href="https://youtube.com/@debtfrie?si=mJlk4JGq7NIzB2U4" target="_blank" className="hover:scale-110 transition"><FontAwesomeIcon icon={faYoutube} size="xl" /></a>
                        </div>

                    </div>
                </div>
            </div>

            {/* Awards & Accreditations */}
            <div className="border-t border-gray-800 bg-[#02102f] px-6 py-8">
                <h3 className="text-white text-lg md:text-xl font-semibold text-center mb-6" style={{ fontFamily: 'gilroy' }}>
                    Awards & Accreditations
                </h3>
                <div className="flex flex-wrap justify-center items-center gap-6 mb-4">
                    <img src={images.MCA_logo} alt="Award 1" className="h-12 sm:h-16 object-contain" />
                    <img src={images.barCouncil_logo} alt="Award 2" className="h-12 sm:h-16 object-contain" />
                    {/* <img src={images.Award3} alt="Award 3" className="h-12 sm:h-16 object-contain" /> */}
                </div>
                <p className="text-center text-white text-sm md:text-base" style={{ fontFamily: 'gilroy' }}>
                    BCI Registered Advocates
                </p>
            </div>



            {/* Bottom Bar */}
            <div className="border-t border-gray-800 bg-[#02102f] text-center py-6 text-gray-400 text-sm" style={{ fontFamily: 'gilroy' }}>
                GSTIN: 09ABBCA5615N1ZF &nbsp;|&nbsp; Powered by Advocentia Financial Resolutions Pvt. Ltd. &nbsp;|&nbsp; © 2024 Design Mnks. All rights reserved.
            </div>


        </footer>
    );
}

export default Footer;
