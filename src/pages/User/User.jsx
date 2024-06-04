import React, { useState } from 'react'
import './User.css'
import UserMenu from '../../components/User/UserMenu/UserMenu'
import blueHome from "/assets/home_blue.png"
import { useNavigate } from 'react-router-dom'
import UserProfile from '../../components/User/UserProfile/UserProfile'

const User = () => {

  const navigate = useNavigate()

  const [showUserProfile, setShowUserProfile] = useState(true); // đặt true để khi lần đầu vào http://localhost:5173/user thì trang UserProfile này sẽ hiển thị đầu tiên 

  const handleShowUserProfile = () => {
    setShowUserProfile(true);
  };
  const handleHideUserProfile = () => {
    setShowUserProfile(false);
  };

  return (
    <div className="user-whole-container">
      <div className="user-container">

        <UserMenu 
          onShowUserProfile={handleShowUserProfile}
          onHideUserProfile={handleHideUserProfile}
        />

        <div className='user-right-container'>
          <img src={blueHome} onClick={() => navigate("/")} />
          <p className='welcome-user'>Hi, username</p>

          <div className="info">
            {/* <UserProfile /> */}
            {showUserProfile && <UserProfile/>}
          </div>

        </div>
      </div>
    </div>
  )
}

export default User