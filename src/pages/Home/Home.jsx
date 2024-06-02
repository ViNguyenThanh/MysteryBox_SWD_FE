import React from 'react'
import "./Home.css"
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Slide from '../../components/Home/Slide'

const Home = () => {
  return (
    <div className='container'>
      <Header/>
      <div className="home-container">
        <Slide/>
      </div>
      <Footer/>
    </div>
  )
}

export default Home