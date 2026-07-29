import React from 'react';
import Layout from '../Layout';
import FAQAccordion from '../../components/Faq';
import { getCanonicalUrl } from '../../utils/seoUtils';

function FAQs() {
    return (
        <Layout>
            <title>Debt Settlement & Loan Settlement FAQs | Debtfrie</title>
            <meta name="description" content="Answers to common questions on loan settlement, CIBIL score impact, OTS & the debt resolution process in India. Get informed before you decide." />
            <link rel="canonical" href={getCanonicalUrl('/faqs')} />
            <meta property="og:title" content="Debt Settlement & Loan Settlement FAQs | Debtfrie" />
            <meta property="og:description" content="Answers to common questions on loan settlement, CIBIL score impact, OTS & the debt resolution process in India. Get informed before you decide." />
            <meta property="og:url" content={getCanonicalUrl('/faqs')} />
            <meta property="og:type" content="website" />
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": [
                        {
                            "@type": "Question",
                            "name": "What is debt settlement and how does it work?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Debt settlement is a negotiated agreement where a lender accepts a reduced lump sum payment to close your unsecured loan or credit card debt permanently."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "How does a one-time settlement (OTS) affect my CIBIL score?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "An OTS is marked as 'Settled' on your credit report, which temporarily lowers your CIBIL score. However, once you are debt-free, you can start rebuild programs to raise your score."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "What's the difference between debt settlement and debt consolidation?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Consolidation combines multiple loans into a single new loan with one EMI. Settlement negotiates to reduce the total amount you owe to close the accounts."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "Can Debtfrie help if I'm facing a Debt Recovery Tribunal (DRT) case?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Yes, our network of Bar Council-registered advocates can draft legal replies, guide you through DRT hearings, and negotiate a settlement out of court."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "Is debt settlement legal in India, and is Debtfrie a registered debt settlement agency?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Yes, settling debt through mutual out-of-court agreements is fully legal. Debtfrie is registered under the Ministry of Corporate Affairs and operates legally."
                            }
                        }
                    ]
                })}
            </script>
            <FAQAccordion page="faqs" showButton={false} />
        </Layout>
    );
}

export default FAQs;
