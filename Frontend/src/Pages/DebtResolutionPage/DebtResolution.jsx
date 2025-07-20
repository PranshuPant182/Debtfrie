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

function DebtResolution() {
  return (
    <Layout>
      <DebtResolutionHero />
      <DebtResolutionCard />
      <DebtResolutionCard2 />
      <DebtResolutionCard3 />
      <DebtResolutionCard4 />
      <StepSlider2 />
      <DebtCalculator_Resolution />
      <DebtQuiz />
      <FAQAccordion limit={3} showButton={true} />
    </Layout>
  )
}

export default DebtResolution
