import React from 'react'
import './Slide.css'
import { Carousel, Col, Row } from 'antd'
import { alignProperty } from '@mui/material/styles/cssUtils';
// import 'antd/es/carousel/style/css';

import img from "/assets/Login_Register_img2.jpg"

const contentStyle = {
  margin: 0,
  height: '300px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const imgSlide = [
  {
    id: 1,
    img: img,
  },
  {
    id: 2,
    img: img,
  },
  {
    id: 3,
    img: img,
  },
  {
    id: 4,
    img: img,
  },
]

const Slide = () => {

  return (
    <div className='slide-whole-container'>
      <div className="slide-container">
        <Carousel arrows infinite={false}>
          {imgSlide.map((item) => (
            <div className='slide-content' key={item.id}>
              <img src={item.img} />
            </div>
          ))}
        </Carousel>
        {/* <Row>
          <Col span={24} offset={0}>
            
          </Col>
        </Row> */}
      </div>
    </div>
  )
}

export default Slide