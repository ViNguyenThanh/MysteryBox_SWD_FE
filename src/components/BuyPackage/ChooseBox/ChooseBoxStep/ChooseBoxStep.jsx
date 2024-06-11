import React, { useEffect, useState } from 'react'
import './ChooseBoxStep.css'

import box from '/assets/MysteryBox.jpg'

const ChooseBoxStep = ({selectedId, setSelectedId}) => {

    const listBox = [
        {
            id: 1,
            img: box,
            title: "Mystery Box 1",
            description: "Inside lies wonders no one can foresee. Do you dare to discover?",
        },
        {
            id: 2,
            img: box,
            title: "Mystery Box 2",
            description: "Can you guess the secrets hidden within this box? Only the brave will open it.",
        },
        {
            id: 3,
            img: box,
            title: "Mystery Box 3",
            description: "Mysteries and surprises await you inside this box. Are you ready?",
        },
        {
            id: 4,
            img: box,
            title: "Mystery Box 4",
            description: "A box filled with unpredictable marvels. Will you uncover its secrets?",
        },
        {
            id: 5,
            img: box,
            title: "Mystery Box 5",
            description: "What is hidden inside this box? Open it and discover unexpected secrets.",
        },
        {
            id: 6,
            img: box,
            title: "Mystery Box 6",
            description: "Unbelievable secrets await your discovery in this mystery box. Are you prepared?",
        },
        {
            id: 7,
            img: box,
            title: "Mystery Box 7",
            description: "This box may contain surprises beyond imagination. Open it and find out.",
        },
        {
            id: 8,
            img: box,
            title: "Mystery Box 8",
            description: "A magical world is waiting for you inside this mystery box. Are you curious enough?",
        },
        {
            id: 9,
            img: box,
            title: "Mystery Box 9",
            description: "Open this box and enter a world full of mysteries and surprises. Do you dare?",
        }
    ]

    const handleButtonClick = (id) => {
        setSelectedId(id);
    };
  return (
    <div className='choose_box_step-container'>
        {listBox.map((item) => (
            <div 
            
                className="choose_box-item" 
                key={item.id}
                style={{border: selectedId === item.id ? "8px solid #ce85ff": "8px solid #44D2FF"}}
            >
                <img src={item.img}/>
                <p className='box-item-title' style={{color: selectedId === item.id ? '#ce85ff' : '#44D2FF' }}> 
                    {item.title}
                </p>
                <p className='box-item-content'>{item.description}</p>
                <div className="box-item-btn">
                    <button 
                        onClick={() => handleButtonClick(item.id)}
                        className={selectedId === item.id ? "chosen" : ""} // viết dòng này để chỉnh màu khi hover box đã đc chọn
                        style={{backgroundColor: selectedId === item.id ? "#ce85ff" : "#44D2FF"}}
                    >
                        Choose
                    </button>
                </div>
            </div>
        ))}
    </div>
  )
}

export default ChooseBoxStep