import React, { useState } from 'react'
import './UserMenu.css'

import logo from "/assets/Logo.png"
import user_profile_icon from "/assets/user_profile-icon.png"
import baby_profile_icon from "/assets/baby.png"
import order_icon from "/assets/checkout.png"

const UserMenu = ({ onShowUserProfile, onHideUserProfile }) => {

  const listBtn = [
    {
      id: 1,
      img: user_profile_icon,
      title: "User's profile",
    },
    {
      id: 2,
      img: baby_profile_icon,
      title: "Kid's profile",
    },
    {
      id: 3,
      img: order_icon,
      title: "Orders",
    },
  ]

  const listSubBtn = [
    {
      id: 1,
      title: "Kid 1",
    },
    {
      id: 2,
      title: "Kid 2",
    },
    {
      id: 3,
      title: "Kid 3",
    },
    {
      id: 4,
      title: "Kid 4",
    },
    {
      id: 5,
      title: "Kid 5",
    },
    {
      id: 6,
      title: "Kid 6",
    },
    {
      id: 7,
      title: "Kid 7",
    },
    {
      id: 8,
      title: "Kid 8",
    },
  ]

  const [activeButton, setActiveButton] = useState(null); //  lưu trạng thái của nút chính đang được chọn.

  const [showSubButtons, setShowSubButtons] = useState(false); // xác định xem có hiển thị các nút con hay không
  const [activeSubButton, setActiveSubButton] = useState(null) //  lưu trạng thái của nút con đang được chọn

  // khi nhấn vào một nút chính, nếu nút chính có id là 2 thì nó sẽ bật/tắt việc hiển thị các nút con. 
  // Nếu không phải, nó sẽ chỉ đặt nút chính là activeButton và ẩn các nút con nếu có
  const handleButtonClick = (buttonIndex) => {
    if (buttonIndex === 2) {
      if (showSubButtons) {
        setActiveSubButton(null); // Reset trạng thái của các nút con khi nút 2 được bấm lần thứ hai
      }
      setShowSubButtons(!showSubButtons);
    }
    setActiveButton(buttonIndex);
    setActiveSubButton(null)

    // Gọi hàm onShowUserProfile khi buttonIndex là 1 (User's profile)
    if (buttonIndex === 1) {
      onShowUserProfile();
    } else {
      onHideUserProfile();
    }
  }

  // khi nhấn vào một nút con. Nó sẽ đặt nút con là activeSubButton và tắt việc chọn nút chính.
  const handleSubButtonClick = (subButtonIndex) => {
    setActiveSubButton(subButtonIndex);
    setActiveButton(null)
  };


  return (

    <div className="user_menu-container">

      <div className="image">
        <img src={logo} />
      </div>

      <div className="list-btn">
        {listBtn.map((item) => (
          <div key={item.id} className='btn'>
            <div className={`btn-item ${activeButton === item.id ? 'choose' : ''}`}
              onClick={() => handleButtonClick(item.id)}
            >
              <div className="image-icon">
                <img src={item.img} />
              </div>
              <p>{item.title}</p>
            </div>
            {item.id === 2 && showSubButtons && (
              <div className={`sub-btn ${showSubButtons ? 'show' : 'hide'}`}>
                {listSubBtn.map((subItem) => (
                  <div className={`sub-btn-item ${activeSubButton === subItem.id ? 'choose' : ''}`}
                    onClick={() => handleSubButtonClick(subItem.id)}
                    key={subItem.id}
                  >
                    <div className="image-icon">
                      <img src={baby_profile_icon} />
                    </div>
                    <p>{subItem.title}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserMenu