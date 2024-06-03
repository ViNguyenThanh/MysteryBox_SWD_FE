import React from 'react'
import './User.css'
import UserMenu from '../../components/User/User-Menu/UserMenu'

const User = () => {
  return (
    <div className="user-whole-container">
        <div className="user-container">
            <UserMenu/>
            <div style={{width: "80%", height: "200vh"}}></div>
        </div>
    </div>
  )
}

export default User