import React, { useEffect, useState } from "react";
import { Space, Table, Tag, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import ModalConfirm from "../../Modal-Confirm/ModalConfirm";
import { deleteSoftPackage } from "../../../apis/package.request";
import ModalCreatePackage from "./ModalCreatePackage";
import { getDataPackage } from "../../../redux/actions/package.action";
const ManagePackage = () => {
  const columns = [
    {
      title: "Package name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => <span>{price.toLocaleString("vi-VN")} VNĐ</span>,
    },
    {
      title: "No. of boxes",
      dataIndex: "numberOfSend",
      key: "numberOfSend",
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
            onClick={() => showModalConfirm(record.id)}
          >
            <MdDelete />
          </button>
        </Space>
      ),
    },
  ];
  const dispatch = useDispatch();
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
  const [packageId, setPackageId] = useState("");
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [callback, setCallback] = useState(false);
  const [search, setSearch] = useState("");

  const showModalConfirm = (id) => {
    setIsModalConfirmOpen(true);
    setPackageId(id);
  };

  const handleConfirmOk = async () => {
    try {
      const response = await deleteSoftPackage(packageId);
      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
    setCallback((prev) => !prev);
    setIsModalConfirmOpen(false);
  };

  const handleConfirmCancel = () => {
    setIsModalConfirmOpen(false);
  };

  const showModalCreate = () => {
    setIsOpenCreate(true);
  };
  const handleCancelCreate = () => {
    setIsOpenCreate(false);
  };

  useEffect(() => {
    dispatch(getDataPackage(search, 1));
  }, [callback, search]);

  const dataPackage = useSelector((state) => state.packageReducer?.packages);
  return (
    <>
      <div>
        <h1>Package Management</h1>
        <div className="search">
          <input
            type="text"
            placeholder="Search by package name..."
            className="input-search"
            onChange={(e) => setSearch(e.target.value)}
          />

          <button className="create" onClick={showModalCreate}>
            <IoAddCircleOutline />
            <span>Create package</span>
          </button>
        </div>
        <div className="table">
          <Table
            columns={columns}
            dataSource={dataPackage}
            pagination={{
              pageSize: 4,
            }}
          />
        </div>
      </div>
      <ModalConfirm
        handleOk={handleConfirmOk}
        handleCancel={handleConfirmCancel}
        isModalOpen={isModalConfirmOpen}
        message={"Are you sure you want to delete this package?"}
      />
      <ModalCreatePackage
        isModalOpen={isOpenCreate}
        handleCancel={handleCancelCreate}
        setCallback={setCallback}
        setIsOpenCreate={setIsOpenCreate}
      />
    </>
  );
};

export default ManagePackage;
