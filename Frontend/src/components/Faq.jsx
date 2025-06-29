import React, { useState } from 'react';
import { CirclePlus, CircleMinus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FAQAccordion = ({ limit = null, showButton = true }) => {
    const [openIndex, setOpenIndex] = useState(0);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    const faqItems = [
        {
            question: "What is Debtfrie, and what does the company aim to achieve?",
            answer: "Debtfrie is a debt resolution platform that helps individuals manage, settle, or restructure their debts. Its goal is to help clients achieve a debt-free future through legal, ethical, and structured financial solutions."
        },
        {
            question: "How does the Debtfrie debt resolution process function?",
            answer: "Debtfrie negotiates with creditors on behalf of clients to reduce outstanding amounts, reschedule payments, or restructure debt, aiming for a mutually agreeable solution."
        },
        {
            question: "Who can avail Debtfrie services?",
            answer: "Any individual facing financial hardship, struggling with unsecured and secured debt, application loans, credit card loans, personal loans, payday loans or unable to manage EMIs can avail of Debtfrie’s services."
        },
        {
            question: "What are the Debt Management Programs of Debtfrie?",
            answer: "These include debt settlement, debt restructuring, EMI reduction programs, credit score rebuilding, and financial counseling."
        },
        {
            question: "Is the practice of debt settlement legally recognized in India?",
            answer: "Yes, debt settlement is legally permitted when done through mutual agreement between borrower and creditor, though it may affect credit scores which is rebuildable."
        },
        {
            question: "Does participating in a debt settlement program affect my credit score?",
            answer: "Your credit score will get affected temporarily, however it will be rebuildable with the expert financial advisory at Debtfrie."
        },
        {
            question: "Is it necessary to stop paying my EMIs while enrolled with Debtfrie?",
            answer: "Not necessarily. However, in some cases, clients may be advised to pause payments during negotiations, which should be done cautiously."
        },
        {
            question: "What are the charges or fees associated with Debtfrie’s services?",
            answer: "Fees are typically discussed upfront and vary from case to case."
        },
        {
            question: "What is the typical duration of the debt settlement process with Debtfrie?",
            answer: "The process usually takes minimum 2-3 months depending on debt size, number of creditors, and negotiation outcomes. However the duration may vary case to case."
        },
        {
            question: "How does Debtfrie assist in managing creditor harassment?",
            answer: "Our strong team of Advocates directly deal with lenders and harassment practices associated with them."
        },
        {
            question: "Can Debtfrie provide assistance with secured loans such as home or auto loans?",
            answer: "Yes Debtfrie deals with both secured and unsecured loans."
        },
        {
            question: "Are there any fees involved in the loan settlement process?",
            answer: "Yes, clients may be charged a processing fee or success-based fee, which should be transparently disclosed. However the same will vary from case to case."
        },
        {
            question: "What happens if a lender initiates legal proceedings during the settlement process?",
            answer: "Debtfrie offers legal support through its experienced team of advocates or mediation services and negotiates a settlement to potentially avoid prolonged legal issues."
        },
        {
            question: "Can I continue using my credit cards while enrolled in the Debtfrie program?",
            answer: "Typically, clients are advised to avoid using credit cards during the program to prevent additional debt."
        },
        {
            question: "Will I receive NOC once my debt has been successfully settled?",
            answer: "Yes, a No Objection Certificate (NOC) from the lender is issued upon successful settlement."
        },
        {
            question: "Can Debtfrie help me achieve complete debt freedom?",
            answer: "Yes, by settling or restructuring debts and offering financial as well as legal guidance from our expert team of Advocates and Financial Advisors, Debtfrie helps clients work toward financial stability."
        },
        {
            question: "Will I be eligible to take loan again?",
            answer: "Yes. With the help of Debtfrie’s Credit Score Rebuilding program one can be eligible for taking loans again within a short period of time."
        },
        {
            question: "Are Debtfrie’s services available PAN India?",
            answer: "Yes, the services are available across India via online and offline channels as well as internationally. Our head office is situated in Noida, Uttar Pradesh and we have clients from different cities."
        },
        {
            question: "Is there a minimum or maximum debt amount required to enrol with Debtfrie?",
            answer: "There is a minimum threshold of ₹2,00,000/-. There’s typically no strict upper limit."
        },
        {
            question: "Does enrollment with Debtfrie guarantee settlement of all my unsecured debts?",
            answer: "Debtfrie aims to settle all debts through negotiation, conciliation and arbitration."
        },
        {
            question: "Are there any hidden costs or upfront charges involved, or is the pricing completely transparent?",
            answer: "Debtfrie has a transparent fee structure according to the pay capacity of the client and there are no hidden charges."
        },
        {
            question: "What is debt restructuring options in addition to debt settlement?",
            answer: "Debt restructuring involves altering loan terms (e.g., reduced EMIs, extended tenure) without necessarily reducing the principal amount."
        },
        {
            question: "Can Loan Settlement process affect my CIBIL or Credit Score?",
            answer: "Yes, it usually lowers your credit score/CIBIL temporarily but can be improved over time with disciplined financial behaviour."
        },
        {
            question: "Can Debtfrie help reduce my EMI burden and secure lower interest rates?",
            answer: "Yes, through our debt restructuring programme that guarantees reduction of EMI and interest rates. This programme functions under the guidance of our experienced team of Advocates and Financial experts."
        },
        {
            question: "How does Debtfrie work on my CIBIL?",
            answer: "Debtfrie guarantees financial freedom by breaking the debt trap and subsequently guides in rebuilding the CIBIL score."
        },
        {
            question: "Is my CIBIL rebuildable?",
            answer: "Yes, with responsible credit use, timely payments, and financial discipline, your CIBIL score can improve."
        },
        {
            question: "Is a person eligible to take loan again post settlement process?",
            answer: "Yes, but it may take time to rebuild creditworthiness. Eligibility improves as your credit profile stabilizes."
        },
        {
            question: "Is Debtfrie registered?",
            answer: "Yes, Debtfrie is incorporated under Ministry of Corporate Affairs, ISO certified and operates under appropriate regulatory and business frameworks in India. Debtfrie is approved by Government of India."
        }
    ];


    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // If limit is passed (like 3), slice the list
    const filteredPosts = faqItems.filter(post =>
        post.question.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const displayedItems = limit ? filteredPosts.slice(0, limit) : filteredPosts;


    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8">
            <div className="text-center mb-8">
                <h1 className="text-4xl sm:text-6xl font-bold text-navy-900 mb-2" style={{ fontFamily: 'Youth', fontWeight: 900 }}>Frequently Asked Questions</h1>
                <p className="text-base sm:text-lg text-gray-700">
                    <span className='text-[#4575FE]'>Got Questions?</span> We've Got Answers!
                </p>
            </div>


            <div className="mb-8 max-w-xl mx-auto">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-5 pr-10 py-3 bg-gray-100 text-gray-600 rounded-full focus:outline-none"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85zm-5.242 1.656a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z" />
                        </svg>
                    </span>
                </div>
            </div>

            <div className="space-y-4 md:space-y-6">
                {displayedItems?.length > 0 ? (
                    displayedItems.map((item, index) => (
                        <div key={index} className="border-b border-gray-200 pb-4 hover:shadow-sm transition-shadow duration-200 rounded-lg">
                            <button
                                className="flex justify-between items-center w-full text-left py-4 px-2 sm:px-4 focus:outline-none"
                                onClick={() => toggleAccordion(index)}
                                aria-expanded={openIndex === index}
                            >
                                <span className="text-base sm:text-lg font-bold text-navy-900 pr-2" style={{ fontFamily: 'Youth' }}>
                                    {item.question}
                                </span>
                                <span className="text-black flex-shrink-0">
                                    {openIndex === index ? <CircleMinus size={24} /> : <CirclePlus size={24} />}
                                </span>
                            </button>

                            {openIndex === index && (
                                <div className="mt-2 px-2 sm:px-4 pb-4 text-gray-600 text-sm sm:text-lg" style={{ fontFamily: 'gilroy' }}>
                                    <p>{item.answer}</p>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500 font-medium">
                        No matches found for "{searchQuery}"
                    </p>
                )}
            </div>


            {showButton && (
                <div className="flex justify-center mt-8">
                    <button
                        className="w-full sm:w-auto px-6 py-2 bg-white hover:bg-gray-50 text-black rounded-full shadow-sm border border-gray-200"
                        onClick={() => navigate("/faqs")}
                    >
                        <span className="font-bold" style={{ fontFamily: 'Youth' }}>See More</span>
                    </button>
                </div>
            )}
        </div>
    );
};
export default FAQAccordion;