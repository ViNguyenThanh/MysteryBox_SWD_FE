import React from 'react'
import './Ranking.css'

import celebrate from '/assets/celebrate.png'
// import celebrate_star from '/assets/celebrate-star.png'
import box from '/assets/box.png'

const Ranking = () => {

    const rankingBox = [
        {
            id: 1,
            img: box,
            title: "Astronaut Mystery",
            number_of_items: 5,
            des: "Astronauts fly into space, discovering new mysteries",
            gender: 'girl'
        },
        {
            id: 2,
            img: box,
            title: "Astronaut Mystery",
            number_of_items: 7,
            des: "Astronauts fly into space, discovering new mysteries",
            gender: 'boy',
        },
        {
            id: 3,
            img: box,
            title: "Astronaut Mystery",
            number_of_items: 4,
            des: "Astronauts fly into space, discovering new mysteries",
            gender: 'unisex',
        }
    ]

    return (
        <div className="ranking-whole-container">
            <div className="ranking-container">
                <div className="header">
                    <img src={celebrate} />
                </div>

                <p className='title'>Best selling boxes</p>

                <div className="best-box">
                    {rankingBox.map((item) => (
                        <div key={item.id} 
                            // className="box"
                            className={`box ${item.gender}`}
                        >
                            <div className="box-content">
                                <img src={item.img} />
                                <p>{item.title}</p>
                                <ul>
                                    <li>
                                        <strong>Number of items: </strong> {item.number_of_items}
                                    </li>
                                    <li>
                                        <strong>Description: </strong> {item.des}
                                    </li>
                                </ul>
                                <button>Add</button>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default Ranking