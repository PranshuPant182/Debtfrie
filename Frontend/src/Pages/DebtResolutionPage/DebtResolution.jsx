import React from 'react'
import Layout from '../Layout'
import FAQAccordion from '../../components/Faq'
import StepSlider2 from '../../components/Slider2'
import DebtCalculator_Resolution from '../../components/calculator_Resolution'
import DebtResolutionCard from '../../components/DebtResolution_card'
import DebtResolutionCard2 from '../../components/DebtResolution_card2'
import DebtQuiz from '../../components/DebtQuiz'
import DebtResolutionCard3 from '../../components/DebtResolution_card3'
import DebtResolutionCard4 from '../../components/DebtResolution_card4'
import DebtResolutionHero from '../../components/DebtResolutionHero'
import { getCanonicalUrl } from '../../utils/seoUtils'

function DebtResolution() {
  return (
    <Layout>
      <title>Debt Resolution Services India | Debtfrie</title>
      <meta name="description" content="Resolve credit card, personal & business loan debt with Debtfrie's expert negotiators. Legal, one-time settlements to reduce your total dues." />
      <link rel="canonical" href={getCanonicalUrl('/debt-resolution')} />
      <meta property="og:title" content="Debt Resolution Services India | Debtfrie" />
      <meta property="og:description" content="Resolve credit card, personal & business loan debt with Debtfrie's expert negotiators. Legal, one-time settlements to reduce your total dues." />
      <meta property="og:url" content={getCanonicalUrl('/debt-resolution')} />
      <meta property="og:type" content="website" />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Service",
              "@id": `${getCanonicalUrl('/debt-resolution')}#service`,
              "name": "Legal Debt Resolution & Settlement",
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
                "description": "Initial Free/Paid Consultation & Debt Assessment"
              },
              "description": "Settle your credit card debts and personal loans legally through creditor negotiations led by expert financial advisors and advocates."
            },
            {
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How does the Debtfrie debt resolution process function?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Debtfrie negotiates with creditors on behalf of clients to reduce outstanding amounts, reschedule payments, or restructure debt, aiming for a mutually agreeable solution."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is the practice of debt settlement legally recognized in India?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, debt settlement is legally permitted when done through mutual agreement between borrower and creditor, though it may affect credit scores."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Does participating in a debt settlement program affect my credit score?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Your credit score will get affected temporarily, however it will be rebuildable with the expert financial advisory at Debtfrie."
                  }
                }
              ]
            }
          ]
        })}
      </script>
      <DebtResolutionHero />
      <DebtResolutionCard />
      <DebtResolutionCard2 />
      <DebtResolutionCard3 />
      <DebtResolutionCard4 />
      <StepSlider2 />
      <DebtCalculator_Resolution />
      <DebtQuiz />
      <FAQAccordion page="debt-resolution" limit={5} showButton={false} />
    </Layout>
  )
}

export default DebtResolution