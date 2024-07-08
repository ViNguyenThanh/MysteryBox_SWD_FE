import React, { useState } from 'react'
import './ChooseBox.css'

import { Button, message, Steps, theme } from 'antd';
import ChooseTheme from './ChooseTheme/ChooseTheme';
import ChooseKid from './ChooseKid/ChooseKid';
import Confirm from './Confirm/Confirm';
import ChooseBoxStep from './ChooseBoxStep/ChooseBoxStep';
import { useNavigate } from 'react-router-dom';

const ChooseBox = () => {
    const navigate = useNavigate()

    const [isNextEnabled, setNextEnabled] = useState(false);
    const [selectedThemeId, setSelectedThemeId] = useState(null); // Lưu ID của theme đã chọn ở bên đây 
    const [selectedRowKey, setSelectedRowKey] = useState(null); // State để lưu key của hàng được chọn trong ChooseKid
    const [paginationState, setPaginationState] = useState({ current: 1, pageSize: 5 }); // lưu thông tin phân trang
    const [dataConfirm, setDataConfirm] = useState({});
    const [selectedBoxId, setSelectedBoxId] = useState(null)
    const [dataGetBox, setDataGetBox] = useState({
        themeId: "",
        yob: "",
      });

    // const [dataInput, setDataInput] = useState({
    //     nameOfAdult: '',
    //     phone: '',
    //     email: '',
    //     address: '',
    // });

    const steps = [
        {
            title: 'Choose theme',
            content:
                <ChooseTheme
                    setNextEnabled={setNextEnabled}
                    selectedId={selectedThemeId}
                    setSelectedId={setSelectedThemeId} // Truyền hàm để cập nhật ID của theme đã chọn
                />,
        },
        {
            title: 'Choose kid',
            content:
                <ChooseKid
                    setNextEnabled={setNextEnabled}
                    selectedRowKey={selectedRowKey} // Truyền key của hàng đã chọn
                    setSelectedRowKey={setSelectedRowKey} // Truyền hàm để cập nhật key của hàng đã chọn
                    paginationState={paginationState} // Truyền trạng thái phân trang
                    setPaginationState={setPaginationState} // ruyền hàm để cập nhật trạng thái phân trang
                />,
        },
        {
            title: 'Confirm',
            content:
                <Confirm
                    setNextEnabled={setNextEnabled}
                    selectedRowKey={selectedRowKey}
                    selectedThemeId={selectedThemeId}
                    setDataConfirm={setDataConfirm}
                />,
        },
        {
            title: 'Choose box',
            content:
                <ChooseBoxStep
                    selectedId={selectedBoxId}
                    setSelectedId={setSelectedBoxId}
                    dataGetBox={dataGetBox}
                />,
        },
    ];

    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
        window.scrollTo(0, 350);
    };
    const prev = () => {
        setCurrent(current - 1);
        window.scrollTo(0, 350);
    };

    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));
    const contentStyle = {
        lineHeight: '260px',
        textAlign: 'center',
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
    };

    const handleDone = () => {
        message.success({
            content: 'Complete the Choose Box process!',
            // duration: 0, // Hiển thị vô thời hạn // này xài khi cần chỉnh css cho nút thông báo thôi
        });
        // navigate('/')
        window.scrollTo(0, 350);
    };

    return (
        <div className='choose_box-container'>
            <p className='choose_box-title'>Choose box</p>

            <div className="choose_box-content">
                <Steps current={current} items={items} />

                <div style={contentStyle}>{steps[current].content}</div>

                {/* div dành cho nút Next, Previous */}
                <div className='choose_box-btn'>

                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={() => next()} disabled={!isNextEnabled}>
                            Next
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button type="primary" /*onClick={() => message.success('Processing complete!')} */ onClick={handleDone} disabled={!selectedBoxId}>
                            Done
                        </Button>
                    )}
                    {current > 0 && (
                        <Button
                            style={{
                                margin: '0 8px',
                            }}
                            onClick={() => prev()}
                        >
                            Previous
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ChooseBox