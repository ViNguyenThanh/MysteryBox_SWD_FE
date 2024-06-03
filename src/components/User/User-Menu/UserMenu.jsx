import React from 'react'
import './UserMenu.css'

import logo from "/assets/Logo.png"
import search from "/assets/search.png"

const UserMenu = () => {
  return (
    <div className="user_menu-container">
      <div className="image">
        <img src={logo} />
      </div>
      <div className="btn">
        <div className="user_profile-btn">
            
        </div>
      </div>
    </div>
  )
}

export default UserMenu