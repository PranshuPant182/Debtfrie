import React from 'react'
import Layout from '../Layout'
import { BookOpen, ShieldCheck, Target } from 'lucide-react'
import images from '../../utils/images'

function AboutUs() {

    const teamData = [
        {
            name: 'Amit Sharma',
            role: 'Debt Consultant',
            image: images.Expert1,
        },
        {
            name: 'Priya Verma',
            role: 'Financial Planner',
            image: images.Expert2,
        },
        {
            name: 'Rahul Mehta',
            role: 'Client Success Specialist',
            image: images.Expert1,
        },
        {
            name: 'Priya Verma',
            role: 'Financial Planner',
            image: images.Expert2,
        },
        {
            name: 'Rahul Mehta',
            role: 'Client Success Specialist',
            image: images.Expert1,
        },
        {
            name: 'Amit Sharma',
            role: 'Debt Consultant',
            image: images.Expert1,
        },
        {
            name: 'Priya Verma',
            role: 'Financial Planner',
            image: images.Expert2,
        },
        {
            name: 'Rahul Mehta',
            role: 'Client Success Specialist',
            image: images.Expert1,
        },
        {
            name: 'Priya Verma',
            role: 'Financial Planner',
            image: images.Expert2,
        },
        {
            name: 'Rahul Mehta',
            role: 'Client Success Specialist',
            image: images.Expert1,
        },
    ];

    return (
        <Layout>
            <div>
                <section className="w-full px-6 md:px-12 py-12 bg-white">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                        <div className="md:w-1/2">
                            <h2 className="text-[26px] sm:text-3xl sm:text-5xl font-bold leading-snug" style={{
                                fontFamily: 'Youth',
                                fontWeight: 900,
                                lineHeight: '100%',
                                letterSpacing: '0%',
                            }}>
                                Your Trusted Partner for <br />
                                a <span className="text-blue-600">Debt-Free</span> Future
                            </h2>
                        </div>
                        <div className="md:w-1/3 text-gray-600 text-base" style={{
                            fontFamily: 'gilroy',
                            fontWeight: 400,
                            lineHeight: '100%',
                            letterSpacing: '0%',
                        }}
                        >
                            <p>
                                {/* At DebtFrie, we empower individuals to break free from financial burdens. Our expert guidance and proven strategies help you regain control of your finances, stress-free. */}
                                At DebtFrie, we believe financial stress shouldn't define your future. If you're struggling with overdue loans or mounting debt, our expert team of advocates and financial professionals is here to guide you with dignity and clarity.

                                We specialize in loan settlement, debt restructuring, and advisory services—offering ethical, compliant, and empathetic solutions that ease legal and emotional strain. DebtFrie bridges the gap between borrowers and lenders, helping you restore financial stability and confidence.
                            </p>
                        </div>
                    </div>

                    {/* Card Section */}
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
                        {/* Card 1 */}
                        <div className="p-6 rounded-lg">
                            <div className="mb-4 flex justify-start">
                                <img src={images.Book} alt="Our Story Icon" className="w-16 h-16 object-contain" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-left" style={{
                                fontFamily: 'Youth',
                                fontWeight: 900,
                                lineHeight: '100%',
                                letterSpacing: '0%',
                            }}>Our Story</h3>
                            <p className="text-sm text-gray-600 text-left" style={{
                                fontFamily: 'gilroy',
                                fontWeight: 400,
                                lineHeight: '100%',
                                letterSpacing: '0%',
                            }}>
                                {/* DebtFrie was founded with a mission to help people eliminate debt and regain financial independence. We believe that financial freedom is not just a dream—it’s a journey we help you achieve with clarity and confidence. */}
                                Founded in 2021 by Arushi Khanna and Vanshit Kaushik during the financial turmoil of COVID-19, Debtfrie was created to help individuals overwhelmed by unsecured debt.
                                We specialize in Loan Settlement, Debt Restructuring, and Credit Score Rebuilding, offering compassionate, personalized support tailored to each client’s needs.
                                More than a debt resolution company, Debtfrie is a financial lifeline — empowering people to overcome debt and rebuild their financial future with dignity and confidence.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="p-6 rounded-lg">
                            <div className="mb-4 flex justify-start">
                                <img src={images.Target} alt="Our Mission Icon" className="w-16 h-16 object-contain" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-left" style={{
                                fontFamily: 'Youth',
                                fontWeight: 900,
                                lineHeight: '100%',
                                letterSpacing: '0%',
                            }}>Our Mission</h3>
                            <p className="text-sm text-gray-600 text-left" style={{
                                fontFamily: 'gilroy',
                                fontWeight: 400,
                                lineHeight: '100%',
                                letterSpacing: '0%',
                            }}>
                                {/* Our goal at DebtFrie is simple: to provide practical, effective, and ethical debt management solutions. We educate, guide, and support individuals in making informed financial decisions. */}
                                Our Vision: To be India’s most trusted debt resolution platform, empowering individuals to overcome financial stress and regain control of their future.<br/><br/>
                                Our Mission: To simplify debt settlement through transparent, legal, and personalized solutions with empathetic, judgment-free support.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="p-6 rounded-lg">
                            <div className="mb-4 flex justify-start">
                                <img src={images.Shield} alt="What Sets Us Apart Icon" className="w-16 h-16 object-contain" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-left" style={{
                                fontFamily: 'Youth',
                                fontWeight: 900,
                                lineHeight: '100%',
                                letterSpacing: '0%',
                            }}>What Sets Us Apart</h3>
                            <p className="text-sm text-gray-600 text-left" style={{
                                fontFamily: 'gilroy',
                                fontWeight: 400,
                                lineHeight: '100%',
                                letterSpacing: '0%',
                            }}>
                                What makes DebtFrie unique is our commitment to stress-free financial solutions—no hidden fees, no selling loans, just honest guidance to help you become truly debt-free.
                            </p>
                        </div>
                    </div>

                </section>
                <section className="w-full px-4 sm:px-8 md:px-16 py-12 bg-white">
                    {/* Image Section */}
                    <div className="relative w-full overflow-hidden rounded-xl shadow-md">
                        <img
                            src={images.AboutUS}
                            alt="Family Banner"
                            className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
                        />
                        <div className="absolute inset-0 bg-opacity-40 flex items-end justify-start p-6 sm:p-10">
                            <h2 className="text-white text-2xl sm:text-3xl md:text-6xl font-bold leading-tight" style={{
                                fontFamily: 'Youth',
                                fontWeight: 900,
                                lineHeight: '100%',
                                letterSpacing: '0%',
                            }}>
                                A Debt-Free Future
                            </h2>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-y-6 sm:gap-0 text-center">
                        <div className="flex flex-col items-center border-r border-[#3369e3]">
                            <h3 className="text-2xl sm:text-4xl font-extrabold text-[#02102f]" style={{
                                fontFamily: 'Youth',
                                fontWeight: 900,
                                lineHeight: '100%',
                                letterSpacing: '0%',
                            }}>2000+</h3>
                            <p className="text-sm text-gray-600 mt-2"
                                style={{
                                    fontFamily: 'gilroy',
                                    fontWeight: 400,
                                    lineHeight: '100%',
                                    letterSpacing: '0%',
                                }}
                            >Clients Empowered</p>
                        </div>

                        <div className="flex flex-col items-center border-l border-r border-gray-300 sm:border-r-2 sm:border-[#3369e3]">
                            <h3 className="text-2xl sm:text-4xl font-extrabold text-[#02102f]" style={{
                                fontFamily: 'Youth',
                                fontWeight: 900,
                                lineHeight: '100%',
                                letterSpacing: '0%',
                            }}>98%</h3>
                            <p className="text-sm text-gray-600 mt-2"
                                style={{
                                    fontFamily: 'gilroy',
                                    fontWeight: 400,
                                    lineHeight: '100%',
                                    letterSpacing: '0%',
                                }}
                            >Successful Debt Resolutions</p>
                        </div>

                        <div className="flex flex-col items-center sm:border-r-2 sm:border-[#3369e3]">
                            <h3 className="text-2xl sm:text-4xl font-extrabold text-[#02102f]" style={{
                                fontFamily: 'Youth',
                                fontWeight: 900,
                                lineHeight: '100%',
                                letterSpacing: '0%',
                            }}>50+</h3>
                            <p className="text-sm text-gray-600 mt-2"
                                style={{
                                    fontFamily: 'gilroy',
                                    fontWeight: 400,
                                    lineHeight: '100%',
                                    letterSpacing: '0%',
                                }}
                            >Financial Experts</p>
                        </div>

                        <div className="flex flex-col items-center border-l border-r border-gray-300 sm:border-none sm:border-l sm:border-r sm:border-gray-300">
                            <h3 className="text-2xl sm:text-4xl font-extrabold text-[#02102f]" style={{
                                fontFamily: 'Youth',
                                fontWeight: 900,
                                lineHeight: '100%',
                                letterSpacing: '0%',
                            }}>5+</h3>
                            <p className="text-sm text-gray-600 mt-2"
                                style={{
                                    fontFamily: 'gilroy',
                                    fontWeight: 400,
                                    lineHeight: '100%',
                                    letterSpacing: '0%',
                                }}
                            >Years of Expertise</p>
                        </div>
                    </div>
                </section>
                {/* <section className="bg-[#3369e3] text-white py-16">
                    <div className="text-center mb-12 px-4" style={{
                        fontFamily: 'Youth',
                        fontWeight: 900,
                        lineHeight: '100%',
                        letterSpacing: '0%',
                    }}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold">
                            Expert Guidance For A{' '}
                            <span className="text-[#FFC135]">Debt-Free</span> Future
                        </h2>
                        <p className="mt-4 text-lg" style={{
                            fontFamily: 'gilroy',
                            fontWeight: 400,
                            lineHeight: '100%',
                            letterSpacing: '0%',
                        }}>
                            Guiding You To Financial Freedom With Expert Debt Solutions.
                        </p>
                    </div>

                    <div className="overflow-x-auto pb-6 scrollbar-hide px-10">
                        <div className="flex space-x-6 px-6 w-max mx-auto">
                            {teamData.map((member, index) => (
                                <div
                                    key={index}
                                    className="w-48 overflow-hidden flex-shrink-0 "
                                >
                                    <div className="h-80 overflow-hidden rounded-xl">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="mt-2 text-left">
                                        <h3 className="font-medium text-white" style={{
                                            fontFamily: 'gilroy',
                                            fontWeight: 400,
                                            lineHeight: '100%',
                                            letterSpacing: '0%',
                                        }}>{member.name}</h3>
                                        <p className="text-sm text-white mt-1" style={{
                                            fontFamily: 'gilroy',
                                            fontWeight: 400,
                                            lineHeight: '100%',
                                            letterSpacing: '0%',
                                        }}>{member.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section> */}
            </div>
        </Layout>
    )
}

export default AboutUs
