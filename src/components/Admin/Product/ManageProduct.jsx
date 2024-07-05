import React, { useEffect, useState } from "react";
import { Space, Table, Tag, message } from "antd";
import { FaFilter } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import ModalViewProduct from "./ModalViewProduct";
import "./ManageProduct.css";
import ModalConfirm from "../../Modal-Confirm/ModalConfirm";
import ModalFilter from "./ModalFilter";
import ModalCreateProduct from "./ModalCreateProduct";
import { deleteProductById } from "../../../apis/product.request";
import { getProducts } from "../../../redux/actions/product.action";
const ManageProduct = () => {
  const columns = [
    {
      title: "Product Name",
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
      render: (price) => <span>{price.toLocaleString("vi-VN")}</span>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Image",
      dataIndex: "images",
      key: "images",
      render: (images) => (
        <img
          src={images && images[0]}
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
      ),
    },

    {
      title: "Action",
      key: "record",
      render: (_, record) => (
        <Space size="middle">
          <button
            className="action view"
            onClick={() => showModalView(record.id)}
          >
            <FaEye />
          </button>
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

  const [isModalViewOpen, setIsModalViewOpen] = useState(false);
  const [productId, setProductId] = useState("");
  const [productIdDelete, setProductIdDelete] = useState("");
  const [callback, setCallback] = useState(false);
  const [searchProduct, setSearchProduct] = useState("");
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
  const [isModalFilterOpen, setIsModalFilterOpen] = useState(false);
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [dataFilter, setDataFilter] = useState({
    fromPrice: "",
    toPrice: "",
    colorQuery: "",
    originQuery: "",
    boxIdQuery: "",
    themeIdQuery: "",
  });
  // Modal confirm
  const showModalConfirm = (productId) => {
    setIsModalConfirmOpen(true);
    setProductIdDelete(productId);
  };
  const handleConfirmOk = () => {
    const deleteData = async () => {
      try {
        const response = await deleteProductById(productIdDelete);
        if (response.data.success) {
          message.success(response.data.message);
        } else {
          message.error(response.data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    deleteData();
    setCallback((prev) => !prev);
    setIsModalConfirmOpen(false);
  };
  const handleConfirmCancel = () => {
    setIsModalConfirmOpen(false);
  };

  // ModalView
  const showModalView = (productId) => {
    setIsModalViewOpen(true);
    setProductId(productId);
  };
  const handleViewOk = () => {
    setIsModalViewOpen(false);
  };
  const handleViewCancel = () => {
    setIsModalViewOpen(false);
  };

  const showModalCreate = () => {
    setIsOpenCreate(true);
  };
  useEffect(() => {
    dispatch(
      getProducts(
        dataFilter.boxIdQuery,
        dataFilter.themeIdQuery,
        dataFilter.originQuery,
        dataFilter.colorQuery,
        dataFilter.fromPrice,
        dataFilter.toPrice,
        searchProduct,
        1
      )
    );
  }, [callback, searchProduct]);
  const dataProducts = useSelector((state) => state.productReducer.products);
  return (
    <>
      <div>
        <h1>Product Management</h1>
        <div className="search">
          <input
            type="text"
            placeholder="Search by name of product..."
            className="input-search"
            onChange={(e) => setSearchProduct(e.target.value)}
          />
          <button
            className="btn-filter"
            onClick={() => setIsModalFilterOpen(true)}
          >
            <FaFilter />
            <span>Filter</span>
          </button>
          <button className="create" onClick={() => setIsOpenModalCreate(true)}>
            <IoAddCircleOutline />
            <span style={{marginLeft: '5px'}}>Create Product</span>
          </button>
        </div>

        <div className="table">
          <Table
            columns={columns}
            dataSource={dataProducts}
            pagination={{
              pageSize: 4,
            }}
          />
        </div>
      </div>
      <ModalViewProduct
        productId={productId}
        isModalOpen={isModalViewOpen}
        handleOk={handleViewOk}
        handleCancel={handleViewCancel}
      />
      <ModalConfirm
        isModalOpen={isModalConfirmOpen}
        handleOk={handleConfirmOk}
        handleCancel={handleConfirmCancel}
        message="Are you sure you want to delete this product?"
      />
      <ModalFilter
        isModalOpen={isModalFilterOpen}
        setIsModalFilterOpen={setIsModalFilterOpen}
        handleCancel={() => setIsModalFilterOpen(false)}
        setCallback={setCallback}
        setDataFilter={setDataFilter}
        dataFilter={dataFilter}
      />
      <ModalCreateProduct
        open={isOpenModalCreate}
        setOpen={setIsOpenModalCreate}
        setCallback={setCallback}
      />
      {/* <ModalImage /> */}
    </>
  );
};

export default ManageProduct;
