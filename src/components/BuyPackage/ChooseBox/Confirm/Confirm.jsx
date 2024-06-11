import React from 'react'
import './Confirm.css'

const Confirm = () => {
    // if (!selectedPackage) {
    //     // Nếu selectedPackage không tồn tại, hiển thị một thông báo hoặc xử lý khác ở đây
    //     return <div>Loading...</div>; // Ví dụ
    // }
    return (
        <div className='confirm-container'>
            <p className='confirm-title'> ❣️ Please confirm the information carefully before going to the next step ❣️</p>
            <div className="confirm-content">
                <p><strong>Kid's name: </strong> Emily Johnson</p>
                <p><strong>Parent's name: </strong> Dan Nguyen</p>
                <p><strong>Phone number: </strong> 0931309408</p>
                <p><strong>Email: </strong> Dannguyen@example.com</p>
                <p><strong>Package: </strong> Package 1</p>
                <p><strong>Total price: </strong>500.000 VND</p>
            </div>
        </div>
    )
}

export default Confirm