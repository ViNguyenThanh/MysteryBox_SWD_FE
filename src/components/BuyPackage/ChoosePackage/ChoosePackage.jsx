import React, { useState } from 'react'
import './ChoosePackage.css'

import package1 from '/assets/Package1.jpg'
import package2 from '/assets/Package2.jpg'
import package3 from '/assets/Package3.jpg'
import package4 from '/assets/Package4.jpg'
import { useNavigate } from 'react-router-dom'

const ChoosePackage = () => {

  const navigate = useNavigate()

  const listPackage = [
    {
      id: 1,
      img: package1,
      title: "Package 1",
      duration: "1 month",
      noOfBoxes: 1,
      sale: 0,
      price: "500.000",
    },
    {
      id: 2,
      img: package2,
      title: "Package 2",
      duration: "3 months",
      noOfBoxes: 3,
      sale: 5,
      price: "1.425.000",
    },
    {
      id: 3,
      img: package3,
      title: "Package 3",
      duration: "6 month",
      noOfBoxes: 6,
      sale: 8,
      price: "2.760.000",
    },
    {
      id: 4,
      img: package4,
      title: "Package 4",
      duration: "12 month",
      noOfBoxes: 21,
      sale: 10,
      price: "5.400.000",
    },
  ]

  const [selectedId, setSelectedId] = useState(null)

  const handleClick = (id) => {
    setSelectedId(id)
  }
  const handleButtonClick = () => {
    navigate("/buy-package/choose-box");
    window.scrollTo(0, 0); // Cuộn lên đầu trang
}

  return (
    <div className='choose_package-container'>
      <p className='choose_package-title'>Package price</p>
      {listPackage.map((item) => (
        <div
          className="choose_package-content"
          key={item.id}
          onClick={() => handleClick(item.id)}
        >
          <img src={item.img}
            onClick={() => handleClick(item.id)}
            style={{ border: selectedId === item.id ? "5px solid black" : "none" }}
          />
          <p className='sub-title'>
            {item.title}
          </p>
          <ul>
            <li>
              <strong>Duration: </strong> {item.duration}
            </li>
            <li>
              <strong>No. of boxes: </strong> {item.noOfBoxes}
            </li>
            <li>
              <strong>Sale: </strong> {item.sale}%
            </li>
          </ul>
          <p className='price'>{item.price} VND</p>
        </div>
      ))}

      <p className="explain-content">
        Here, we will sell combo packs, depending on the time you choose to buy, we will <br/>
        target that time and send you surprise gifts every month. You can choose the theme <br/> 
        and gift box for yourself, but you will not know what products will be inside.
      </p>
      
      <div className="choose_package-btn">
        <button onClick={handleButtonClick}>Buy Now</button>
      </div>
    </div>
  )
}

export default ChoosePackage