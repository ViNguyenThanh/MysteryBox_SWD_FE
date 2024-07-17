import { Modal } from "antd";
import React from "react";

const ModalConfirm = ({ isModalOpen, handleOk, handleCancel, message }) => {
  return (
    <div>
      <Modal
        title="Xác nhận"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{message}</p>
      </Modal>
    </div>
  );
};

export default ModalConfirm;
