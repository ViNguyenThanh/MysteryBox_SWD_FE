import React, { useEffect, useState } from 'react'
import './Header.css'

import logo from "/assets/Logo.png"
import search from "/assets/search.png"
import arrow_down from "/assets/arrow-down.png"
import arrow_up from "/assets/arrow-up.png"

import { useNavigate } from 'react-router-dom'
import { Avatar, Dropdown, Space, message } from "antd";
import { logout } from "../../redux/actions/auth.action";
import { useDispatch } from "react-redux";
import { LogoutOutlined, ShoppingCartOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons'

const Header = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));
  const [info, setInfo] = useState(false);
  const handleLogout = () => {
    dispatch(logout());
    message.success("Log Out Successfully");
    setInfo(false);
  };

  const items = [
    {
      label: "User profile",
      key: '0',
      icon: <UserOutlined />,
      onClick: () => {
        navigate("/user/user-profile")
      }

    },
    {
      label: "Kid's profile",
      key: '1',
      icon: <SmileOutlined />,
      onClick: () => {
        navigate("/user/kid-profile")
      }
    },
    {
      label: "Order",
      key: '2',
      icon: <ShoppingCartOutlined />,
      onClick: () => {
        navigate("/user/order")
      }
    },
    {
      label: "Log out",
      key: '3',
      icon: <LogoutOutlined />,
      onClick: () => {
        dispatch(handleLogout());
      }
    },
  ];

  /* // vì ko xài hàng filter bên dưới nên này comment lại
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
  */

  const [showHeader, setShowHeader] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const controlHeader = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY < lastScrollY) { // Kiểm tra nếu người dùng cuộn lên. Nếu đúng, header sẽ được hiển thị
        setShowHeader(true)
      } else if (window.scrollY < 10) { // để khi component Header được gọi ở trang mới thì Header sẽ được hiện ra lần đầu tiên // nói cách khác, kiểm tra nếu người dùng ở gần đầu trang (khoảng cách cuộn từ trên cùng ít hơn 10px), header sẽ được hiển thị 
        setShowHeader(true)
      } else {
        setShowHeader(false)
      }
    }
    setLastScrollY(window.scrollY)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlHeader)

      return () => {
        window.removeEventListener('scroll', controlHeader)
      }
    }

  }, [lastScrollY])

  const handleClick = () => {
    navigate("/");
    window.scrollTo(0, 0); // Cuộn lên đầu trang
  }

  return (
    <div className={`header-whole-container ${showHeader ? 'show' : ''}`} >
      <div className={`header-container ${showHeader ? 'show-down' : ''}`}>

        <div className="header-left">
          <img src={logo} className='logo' onClick={handleClick} />

          {/* vì ko xài chức năng search nữa nên này comment lại */}
          {/* <div className="search">
            <input type="text" placeholder='Search' />
            <img src={search} />
          </div> */}
        </div>

        <div className="header-right">
          <ul>
            <li onClick={handleClick}>Home</li>
            <li>About Us</li>
            <li onClick={() => navigate('/buy-package')}>Buy Package</li>
            <li>Product</li>
            {/* <li onClick={() => navigate('/login')}>Sign In/Sign Up</li> */}
            {!user ? (
              <li className="btn" onClick={() => navigate("/login")}>
                Sign In/Sign Up
              </li>
            ) : (
              <Dropdown menu={{ items }} trigger={['click']} className='dropdown'>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <Avatar
                      src={
                        "https://cdn-media.sforum.vn/storage/app/media/THANHAN/avatar-trang-98.jpg"
                      }
                      onClick={() => setInfo((prev) => !prev)}
                      style={{ cursor: "pointer", width: '45px', height: '45px' }}
                    />
                  </Space>
                </a>
              </Dropdown>
            )}
          </ul>
        </div>


        {/* vì ko xài hàng filter nữa nên này comment lại */}
        {/* <div className="header-bottom">
          <div className="choice">
            <ul>
              {choice.map((item) => (
                <li
                  key={item.id}
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.name}
                  <img src={hoveredIndex === item.id ? arrow_up : arrow_down} />
                </li>
              ))}
            </ul>
          </div>
        </div> */}

      </div>
    </div>
  )
}

export default Header