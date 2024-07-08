import { Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getBox } from "../../../redux/actions/box.action";
import CreateBox from "./CreateBox";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    title: "Box name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Price Average",
    dataIndex: "priceAvarage",
    key: "priceAvarage",
    render: (priceAvarage) => (
      <span>{Number(priceAvarage).toLocaleString("vi-VN")} VNĐ</span>
    ),
  },
  {
    title: "No. product in box",
    dataIndex: "quantityProInBox",
    key: "quantityProInBox",
  },

  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    render: (image) => (
      <img
        src={image}
        style={{ width: "100px", height: "100px", objectFit: "cover" }}
      />
    ),
  },

  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <button className="action edit">
          <FaRegEdit />
        </button>
        <button
          className="action delete"
          // onClick={() => showModalConfirm(record.id)}
        >
          <MdDelete />
        </button>
      </Space>
    ),
  },
];
const ManageBox = () => {
  const dispatch = useDispatch();
  const [isModalCreateBox, setIsModalCreateBox] = useState(false);
  const [callback, setCallback] = useState(false);
  const navigate = useNavigate();
  const showModalCreateBox = () => {
    setIsModalCreateBox(true);
  };

  const handleCreateBoxOk = () => {
    setIsModalCreateBox(false);
  };

  const handleCancelBox = () => {
    setIsModalCreateBox(false);
  };
  useEffect(() => {
    dispatch(getBox());
  }, [callback]);
  const dataBox = useSelector((state) => state.boxReducer?.boxs);
  return (
    <>
      <div>
        <h1>Box Management</h1>
        <div className="search">
          <input
            type="text"
            placeholder="Search box by name..."
            className="input-search"
            // onChange={(e) => setSearch(e.target.value)}
          />

          <button
            className="create"
            onClick={() => navigate("/admin/create-box")}
          >
            <IoAddCircleOutline />
            <span>Tạo box</span>
          </button>
        </div>
        <div className="table">
          <Table
            columns={columns}
            dataSource={dataBox}
            pagination={{
              pageSize: 4,
            }}
          />
        </div>
      </div>
      <CreateBox
        isModalOpen={isModalCreateBox}
        setIsModalCreateBox={setIsModalCreateBox}
        handleCancel={handleCancelBox}
        setCallback={setCallback}
      />
    </>
  );
};

export default ManageBox;
