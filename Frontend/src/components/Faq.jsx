import React, { useState } from 'react';
import { CirclePlus, CircleMinus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const pageFaqs = {
    home: [
        {
            question: "What is debt settlement and how does it work?",
            answer: "Debt settlement is a process where we negotiate with your creditors to allow you to pay a lump sum that is less than the total amount you owe. This legally resolves the account as 'settled' and gets you out of the debt trap."
        },
        {
            question: "Is Debtfrie a legitimate debt relief company in India?",
            answer: "Yes, Debtfrie is a legitimate debt relief platform registered under the Ministry of Corporate Affairs, ISO-certified, and backed by a network of Bar Council-registered advocates who guide you legally."
        },
        {
            question: "How long does the debt settlement process take?",
            answer: "The process typically takes 3 to 12 months, depending on the number of accounts you have, your total debt volume, and your monthly savings capacity."
        },
        {
            question: "Will debt settlement affect my CIBIL score?",
            answer: "Yes, settling a debt temporarily lowers your CIBIL score. However, once you are debt-free, our credit rebuilding program guides you on restoring your creditworthiness in a short period."
        },
        {
            question: "What debt solutions does Debtfrie offer besides settlement?",
            answer: "Apart from debt settlement, we offer debt restructuring, EMI reduction programs, creditor harassment protection, and expert financial counseling."
        }
    ],
    'debt-resolution': [
        {
            question: "How is debt resolution different from bankruptcy?",
            answer: "Bankruptcy is a court-ordered legal declaration that severely damages your credit for years. Debt resolution is a negotiated settlement with lenders to resolve your dues without going through bankruptcy courts."
        },
        {
            question: "What makes Debtfrie one of the best debt settlement companies in India?",
            answer: "We are India’s first legal-based fintech, employing experienced advocates who handle creditor harassment and legal notices, providing you with a safe, compliant route to financial freedom."
        },
        {
            question: "What documents do I need to start debt resolution?",
            answer: "You need basic KYC documents (PAN, Aadhaar), your recent bank statements, loan agreement letters, and a record of creditor harassment or legal notices if any."
        },
        {
            question: "Can debt resolution help with multiple loans at once?",
            answer: "Yes, we can enroll multiple unsecured debts, including personal loans, credit card balances, and payday loans, consolidating them into one structured resolution plan."
        },
        {
            question: "How much can my outstanding debt be reduced by?",
            answer: "On average, negotiators at Debtfrie help settle outstanding unsecured balances for 50% or less of the total outstanding dues, depending on the creditor and your financial situation."
        }
    ],
    'debt-restructuring': [
        {
            question: "What is debt restructuring and how is it different from settlement?",
            answer: "Restructuring renegotiates your loan terms (lower interest rates, longer tenure, lower EMIs) without reducing the principal. Settlement resolves the debt completely for a lesser amount."
        },
        {
            question: "Will restructuring my loan affect my credit score?",
            answer: "Restructuring has a much lower negative impact on your credit score compared to settlement or default, as it represents an active agreement to continue paying on revised terms."
        },
        {
            question: "Who qualifies for debt restructuring?",
            answer: "Individuals with a steady income who are struggling to pay high-interest EMIs but want to pay their principal over an extended period qualify for restructuring."
        },
        {
            question: "Can I restructure multiple loans together?",
            answer: "Yes, we can work with multiple creditors to restructure your overall repayment load, aligning your monthly EMIs with your current disposable income."
        },
        {
            question: "How long does the debt management and restructuring process take?",
            answer: "Restructuring agreements can usually be negotiated within 30 to 90 days, depending on the response times of the participating financial institutions."
        }
    ],
    enquiry: [
        {
            question: "Is the consultation really free?",
            answer: "Yes, your initial consultation with Debtfrie’s debt experts is 100% free and confidential. We evaluate your debts and lay out your settlement options without any obligation."
        },
        {
            question: "What information do I need to provide?",
            answer: "You only need to share basic details: your total outstanding debt amount, type of loans (credit cards, personal loans, etc.), and monthly income so we can assess your eligibility."
        },
        {
            question: "Will my employer or family be contacted during this process?",
            answer: "Absolutely not. Debtfrie respects your privacy. All consultations are highly confidential, and we never contact your employer, family, or references."
        },
        {
            question: "How soon will I hear back after submitting the form?",
            answer: "Once you submit your enquiry, one of our financial consultants or legal experts will call you back within 24 hours to guide you."
        },
        {
            question: "Am I obligated to proceed with debt settlement after the consultation?",
            answer: "No, the consultation is completely free of obligation. You are free to decide whether our resolution program is the right fit for your situation."
        }
    ],
    blog: [
        {
            question: "How often is the blog updated with new debt relief guides?",
            answer: "Our blog is updated weekly with new articles covering credit scores, debt settlement legalities, borrower rights, and financial advice."
        },
        {
            question: "Can I request a topic on loan settlement or debt consolidation?",
            answer: "Yes! If you want us to cover a specific topic, you can write to us via our contact form and our editorial team will address it."
        },
        {
            question: "Are these articles reviewed by legal or financial experts?",
            answer: "Yes, all articles on the Debtfrie blog are written and reviewed by our legal team of advocates and senior financial advisors."
        },
        {
            question: "Do you cover Debt Recovery Tribunal (DRT) cases and bank harassment topics?",
            answer: "Yes, we frequently publish guides on dealing with DRT notices, SARFAESI acts, recovery agent regulations, and legal steps to stop bank harassment."
        },
        {
            question: "Where can I read real client debt-free success stories?",
            answer: "You can find client case studies and success stories in our dedicated testimonials section and featured blog posts."
        }
    ],
    faqs: [
        {
            question: "What is debt settlement and how does it work?",
            answer: "Debt settlement is a negotiated agreement where a lender accepts a reduced lump sum payment to close your unsecured loan or credit card debt permanently."
        },
        {
            question: "How does a one-time settlement (OTS) affect my CIBIL score?",
            answer: "An OTS is marked as 'Settled' on your credit report, which temporarily lowers your CIBIL score. However, once you are debt-free, you can start rebuild programs to raise your score."
        },
        {
            question: "What's the difference between debt settlement and debt consolidation?",
            answer: "Consolidation combines multiple loans into a single new loan with one EMI. Settlement negotiates to reduce the total amount you owe to close the accounts."
        },
        {
            question: "Can Debtfrie help if I'm facing a Debt Recovery Tribunal (DRT) case?",
            answer: "Yes, our network of Bar Council-registered advocates can draft legal replies, guide you through DRT hearings, and negotiate a settlement out of court."
        },
        {
            question: "Is debt settlement legal in India, and is Debtfrie a registered debt settlement agency?",
            answer: "Yes, settling debt through mutual out-of-court agreements is fully legal. Debtfrie is registered under the Ministry of Corporate Affairs and operates legally."
        }
    ],
    testimonials: [
        {
            question: "Are these client testimonials verified?",
            answer: "Yes, all testimonials on our website are verified success stories from real clients who completed our debt settlement or restructuring programs."
        },
        {
            question: "Can I speak with a past client before signing up for debt settlement?",
            answer: "To protect the privacy and confidentiality of our clients, we do not share their contact details. However, you can read their detailed case studies and video reviews."
        },
        {
            question: "How long did it take these clients to become debt free?",
            answer: "Most clients featured in our testimonials achieved complete debt freedom within 6 to 18 months, depending on their total outstanding amount."
        },
        {
            question: "What types of debt did these clients settle, credit cards, personal loans, or business loans?",
            answer: "Our clients have successfully settled credit card dues, personal loans, business loans, and instant loan app debts."
        },
        {
            question: "How can I share my own experience with Debtfrie after settlement?",
            answer: "Once your program is complete and you receive your NOCs, you can submit your review via our feedback form or video testimonial request."
        }
    ],
    'about-us': [
        {
            question: "Who founded Debtfrie, and what are their legal credentials?",
            answer: "Debtfrie was founded by financial and legal industry veterans with over 15 years of experience in debt resolution, banking litigation, and consumer rights."
        },
        {
            question: "Is Debtfrie a registered debt settlement agency in India?",
            answer: "Yes, Debtfrie is incorporated under the Ministry of Corporate Affairs, ISO certified, and backed by legal advocates specialized in debt resolution."
        },
        {
            question: "Which cities does Debtfrie operate in?",
            answer: "We offer PAN-India services. While our corporate office is in Noida, we serve clients from all major cities, including Delhi, Mumbai, Bengaluru, and Chennai."
        },
        {
            question: "How is Debtfrie different from other debt settlement companies?",
            answer: "Unlike generic agencies, we have an internal legal team of advocates to protect you from harassment, legal notices, and court summons."
        },
        {
            question: "Does Debtfrie charge any upfront fees before settlement is finalized?",
            answer: "We charge nominal subscription and service fees that are fully disclosed upfront, with no hidden costs or surprise settlement charges."
        }
    ]
};

const FAQAccordion = ({ page = 'faqs', limit = null, showButton = true }) => {
    const [openIndex, setOpenIndex] = useState(0);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    const faqItems = pageFaqs[page] || pageFaqs['faqs'];

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const filteredPosts = faqItems.filter(post =>
        post.question.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const displayedItems = limit ? filteredPosts.slice(0, limit) : filteredPosts;

    const HeadingTag = limit ? 'h2' : 'h1';

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8">
            <div className="text-center mb-8">
                <HeadingTag className="text-4xl sm:text-6xl font-bold text-navy-900 mb-2" style={{ fontFamily: 'Youth', fontWeight: 900 }}>Frequently Asked Questions</HeadingTag>
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