import React from 'react'
import Layout from '../Layout'
import FAQAccordion from '../../components/Faq'
import StepSlider3 from '../../components/Slider3'
import DebtCalculator_Restructuring from '../../components/Calculator_Restructuring'
import DebtQuiz2 from '../../components/DebtQuiz2'
import DebtRestructuringHero from '../../components/DebtRestructuringHero'
import DebtRestructuring_card1 from '../../components/DebtRestructuring_card1'
import DebtRestructuring_card2 from '../../components/DebtRestructuring_card2'
import DebtRestructuring_card3 from '../../components/DebtRestructuring_card3'
import { getCanonicalUrl } from '../../utils/seoUtils'

function DebtRestructuring() {
  return (
    <Layout>
      <title>Debt Restructuring Services in India | Debtfrie</title>
      <meta name="description" content="Struggling to manage multiple loan repayments? Debtfrie offers debt restructuring solutions to help you regain financial stability without added stress." />
      <link rel="canonical" href={getCanonicalUrl('/debt-restructuring')} />
      <meta property="og:title" content="Debt Restructuring Services in India | Debtfrie" />
      <meta property="og:description" content="Struggling to manage multiple loan repayments? Debtfrie offers debt restructuring solutions to help you regain financial stability without added stress." />
      <meta property="og:url" content={getCanonicalUrl('/debt-restructuring')} />
      <meta property="og:type" content="website" />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Service",
              "@id": `${getCanonicalUrl('/debt-restructuring')}#service`,
              "name": "Debt Restructuring & Loan Consolidation",
              "provider": {
                "@type": "Organization",
                "name": "Debtfrie",
                "url": getCanonicalUrl('/')
              },
              "serviceType": "Debt Relief Services",
              "offers": {
                "@type": "Offer",
                "price": "49.00",
                "priceCurrency": "INR",
                "description": "Initial Free/Paid Consultation & Restructuring Setup"
              },
              "description": "Restructure your personal loans and credit cards into a single affordable monthly payment. Lower your monthly EMIs and secure an extended loan repayment term."
            },
            {
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What is debt restructuring options in addition to debt settlement?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Debt restructuring involves altering loan terms (e.g., reduced EMIs, extended tenure) without necessarily reducing the principal amount."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How does Debtfrie assist in managing creditor harassment?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our strong team of Advocates directly deal with lenders and harassment practices associated with them."
                  }
                }
              ]
            }
          ]
        })}
      </script>
      <DebtRestructuringHero />
      <DebtRestructuring_card1 />
      <DebtRestructuring_card2 />
      <DebtRestructuring_card3 />
      {/* <StepSlider3 /> */}
      <DebtCalculator_Restructuring />
      <DebtQuiz2 />
      <FAQAccordion page="debt-restructuring" limit={5} showButton={false} />
    </Layout>
  )
}

export default DebtRestructuring
