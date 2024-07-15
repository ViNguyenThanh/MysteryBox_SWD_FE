import React, { useEffect, useState } from 'react'
import './ChooseBoxStep.css'

import { getBoxCondition } from '../../../../apis/box.request'

const ChooseBoxStep = ({ selectedId, setSelectedId, dataGetBox }) => {
    const [boxes, setBoxes] = useState([]);

    const handleButtonClick = (id) => {
        setSelectedId(id);
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await getBoxCondition(dataGetBox);
            setBoxes(response.data?.mysteryBoxs);
        };
        fetchData();
    }, []);

    return (
        <div className='choose_box_step-container'>
            {boxes.map((item) => (
                <div
                    className="choose_box-item"
                    key={item.id}
                    style={{ border: selectedId === item.id ? "8px solid #ce85ff" : "8px solid #44D2FF" }}
                >
                    <img src={item.image} />
                    <p className='box-item-title' style={{ color: selectedId === item.id ? '#ce85ff' : '#44D2FF' }}>
                        {item.name}
                    </p>
                    <p className='box-item-content'>{item.description}</p>
                    <div className="box-item-btn">
                        <button
                            onClick={() => handleButtonClick(item.id)}
                            className={selectedId === item.id ? "chosen" : ""} 
                            style={{ backgroundColor: selectedId === item.id ? "#ce85ff" : "#44D2FF" }}
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