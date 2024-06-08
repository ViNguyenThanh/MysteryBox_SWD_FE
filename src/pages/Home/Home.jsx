import React from 'react'
import "./Home.css"
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Slide from '../../components/Home/Slide/Slide'
import JoinUs from '../../components/Home/join-us/JoinUs'
import Caption from '../../components/Home/Caption/Caption'
import StepToBuyPackage from '../../components/Home/step-by-step/StepByStep'
import IntroPackage from '../../components/Home/intro-package/IntroPackage'
import WhyChooseUs from '../../components/Home/why-choose-us/WhyChooseUs'


const Home = () => {
  return (
    <div className='container'>
      <Header />
      <div className="home-container">
        <Caption/>
        <Slide />
        <JoinUs />
        <StepToBuyPackage/>
        <IntroPackage />
        <WhyChooseUs/>
        {/* <div className="content">
          <JoinUs />
          <Ranking />
        </div> */}
      </div>
      <Footer />
    </div>
  )
}

export default Home