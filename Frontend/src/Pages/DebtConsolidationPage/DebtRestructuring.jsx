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

function DebtRestructuring() {
  return (
    <Layout>
      <DebtRestructuringHero />
      <DebtRestructuring_card1 />
      <DebtRestructuring_card2 />
      <DebtRestructuring_card3 />
      {/* <StepSlider3 /> */}
      <DebtCalculator_Restructuring />
      <DebtQuiz2 />
      <FAQAccordion limit={3} showButton={true} />
    </Layout>
  )
}

export default DebtRestructuring
