import React, { useState } from 'react'
import './Header.css'

import logo from "/assets/Logo.png"
import search from "/assets/search.png"
import arrow_down from "/assets/arrow-down.png"
import arrow_up from "/assets/arrow-up.png"

import { useNavigate } from 'react-router-dom'


const Header = () => {

  const navigate = useNavigate()

  const choice = [
    {
      id: 1,
      name: "Age",
    },
    {
      id: 2,
      name: "Gender",
    },
    {
      id: 3,
      name: "Color",
    },
    {
      id: 4,
      name: "Theme",
    },
    {
      id: 5,
      name: "Type",
    },
    {
      id: 6,
      name: "Toy Origin",
    },
    {
      id: 7,
      name: "Material",
    },
  ]

  const [hoveredIndex, setHoveredIndex] = useState(null)
  const handleMouseEnter = (id) => {
    setHoveredIndex(id)
  }
  const handleMouseLeave = () => {
    setHoveredIndex(null)
  }

  const [hover, setHover] = useState(false)

  return (
    <div className="header-whole-container">
      <div className='header-container'>

        <div className="header-left">
          <img src={logo} className='logo' onClick={() => navigate('/')} />
          <div className="search">
            <input type="text" placeholder='Search' />
            <img src={search} />
          </div>
        </div>

        <div className="header-right">
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Buy Package</li>
            <li onClick={() => navigate('/login')}>Sign In/Sign Up</li>
          </ul>
        </div>

        <div className="header-bottom">
          <div className="choice">
            <ul>
              {choice.map((item) => (
                <li
                  key={item.id}
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                  // onMouseEnter={() => setHover(true)}
                  // onMouseLeave={() => setHover(false)}
                
                >
                  {item.name}
                  <img src={hoveredIndex === item.id ? arrow_up : arrow_down} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header