import React, { useState } from 'react'
import './ChooseBox.css'

import { Button, message, Steps, theme } from 'antd';
import ChooseTheme from './ChooseTheme/ChooseTheme';

const ChooseBox = () => {

    const [isNextEnabled, setNextEnabled] = useState(false);
    const [selectedThemeId, setSelectedThemeId] = useState(null); // Lưu ID của theme đã chọn ở bên đây 
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
            content: 'Second-content',
        },
        {
            title: 'Confirm',
            content: 'Third-content',
        },
        {
            title: 'Choose box',
            content: 'Last-content',
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
            content: 'Processing complete!',
            // duration: 0, // Hiển thị vô thời hạn // này xài khi cần chỉnh css cho nút thông báo thôi
        });
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
                        <Button type="primary" /*onClick={() => message.success('Processing complete!')} */ onClick={handleDone}>
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