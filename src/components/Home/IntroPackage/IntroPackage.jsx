import React from 'react'
import './IntroPackage.css'

import celebrate from '/assets/celebrate.png'
import box from '/assets/box.png'

const IntroPackage = () => {

    const listIntroPackage = [
        {
            id: 1,
            img: box,
            title: "Package 1",
            duration: "1 month",
            number_of_items: 1,
            index: "first",
        },
        {
            id: 2,
            img: box,
            title: "Package 2",
            duration: "3 month",
            number_of_items: 3,
            index: "second",
        },
        {
            id: 3,
            img: box,
            title: "Package 3",
            duration: "6 month",
            number_of_items: 6,
            index: "third",
        },
        {
            id: 4,
            img: box,
            title: "Package 4",
            duration: "12 month",
            number_of_items: 12,
            index: "fourth",
        }
    ]

    return (
        <div className="intro_package-container">
            {/* <div className="header">
                <img src={celebrate} />
            </div> */}

            <p className='title'>Our Packages</p>
            <p className='slogan'>Service Package Full of Surprises – A Gift Just for Your Kids</p>

            <div className="best-box">
                {listIntroPackage.map((item) => (
                    <div key={item.id}
                        // className="box"
                        className={`box ${item.index}`}
                    >
                        <div className="box-content">
                            <img src={item.img} />
                            <p>{item.title}</p>
                            <ul>
                                <li>
                                    <strong>Duration: </strong> {item.duration}
                                </li>
                                <li>
                                    <strong>No. boxes received: </strong> {item.number_of_items}
                                </li>
                            </ul>
                            <button>Buy Now</button>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default IntroPackage