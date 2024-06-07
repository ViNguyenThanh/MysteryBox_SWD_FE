import React from 'react'
import "./Home.css"
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Slide from '../../components/Home/Slide/Slide'
import JoinUs from '../../components/Home/JoinUs/JoinUs'
import Ranking from '../../components/Home/Ranking/Ranking'
import Caption from '../../components/Home/Caption/Caption'
import StepToBuyPackage from '../../components/Home/StepByStep/StepByStep'


const Home = () => {
  return (
    <div className='container'>
      <Header />
      <div className="home-container">
        <Caption/>
        <Slide />
        <JoinUs />
        <StepToBuyPackage/>
        <Ranking />
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