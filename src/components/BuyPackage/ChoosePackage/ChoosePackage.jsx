import React, { useEffect, useState } from 'react'
import './ChoosePackage.css'

import package1 from '/assets/Package1.jpg'
import package2 from '/assets/Package2.jpg'
import package3 from '/assets/Package3.jpg'
import package4 from '/assets/Package4.jpg'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getDataPackage } from "../../../redux/actions/package.action";
import getUserLocalstorage from "../../../utils/UserCurrent";
import { message } from "antd";
import { getKidProfile } from "../../../redux/actions/kid.action";
import { LoadingOutlined } from "@ant-design/icons";

const ChoosePackage = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

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
  // const [isEnabled, setIsEnabled] = useState(false); // BỎ
  const [errorMessage, setErrorMessage] = useState('')

  // dùng để khi mới vào trang, dù selectedId đang null nhưng nút Buy Now vẫn màu cam, 
  // chỉ khi người dùng không chọn package đã bấm Buy Now thì nút Buy Now mới bị đỏ
  const [isButtonClicked, setIsButtonClicked] = useState(false)


  const handleClick = (id) => {
    setSelectedId(id)
    setErrorMessage('') // Xóa thông báo lỗi khi đã chọn gói
  }


  useEffect(() => {
    dispatch(getDataPackage("", 1));
    dispatch(getKidProfile());
  }, []);
  const responsePackages = useSelector((state) => state.packageReducer);
  const kidOfUserCurrent = useSelector((state) => state.kidReducer?.dataKids);

  const handleButtonClick = () => {
    const user = getUserLocalstorage();
    if (!user) {
      message.warning("Please log in to purchase");
      navigate("/login");
    } else if (kidOfUserCurrent.length === 0) {
      message.warning("Create an account for your kid then go shopping!!");
      navigate("/user/kid-profile");
    }
    if (user && kidOfUserCurrent.length > 0) {
      // navigate(`/buy-package/choose-box/${selectedId}`);
      // window.scrollTo(0, 0);
      setIsButtonClicked(true)
      if (selectedId !== null) {
        // navigate("/buy-package/choose-box");
        navigate(`/buy-package/choose-box/${selectedId}`);
        window.scrollTo(0, 0) // Cuộn lên đầu trang
      } else {
        setErrorMessage('Please select a package before proceeding to buy.')
      }
    }

  }

  // BỎ
  /*useEffect(() => {
    if (selectedId !== null) {
      setIsEnabled(true);
    }
  }, [selectedId, setIsEnabled]);*/


  return (
    <div className='choose_package-container'>
      <p className='choose_package-title'>Package price</p>
      {responsePackages?.packages?.map((item) => (
        <div
          className="choose_package-content"
          key={item.id}
          onClick={() => handleClick(item.id)}
        >
          <img
            src={
              item.name === "Package 1"
                ? package1
                : item.name === "Package 2"
                  ? package2
                  : item.name === "Package 3"
                    ? package3
                    : item.name === "Package 4"
                      ? package4
                      : package1
            }
            onClick={() => handleClick(item.id)}
            style={{ border: selectedId === item.id ? "5px solid black" : "none" }}
          />
          <p className='sub-title'>
            {item.name}
          </p>
          <ul>
            <li>
              <strong>Duration: </strong> {item.numberOfSend} months
            </li>
            <li>
              <strong>No. of boxes: </strong> {item.numberOfSend}
            </li>
            <li>
              <strong>Sale: </strong> {item.description}
            </li>
          </ul>
          <p className='price'>
            {Number(item.price).toLocaleString("vi-VN")} VND
          </p>
        </div>
      ))}
      {responsePackages?.loading && (
        <p>
          <LoadingOutlined
            style={{
              fontSize: "30px",
              position: "absolute",
              top: "30%",
              left: "50%",
            }}
          />
        </p>
      )}

      <p className="explain-content">
        Here, we will sell combo packs, depending on the time you choose to buy, we will <br />
        target that time and send you surprise gifts every month. You can choose the theme <br />
        and gift box for yourself, but you will not know what products will be inside.
      </p>

      <div className="choose_package-btn">
        <button
          onClick={handleButtonClick}
          // disabled={!isEnabled} // ko đc để disabled vì khi nút bị disabled thì không hiện được thông báo
          className={selectedId === null && isButtonClicked ? 'inactive' : 'active'}
        >
          Buy Now
        </button>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  )
}

export default ChoosePackage