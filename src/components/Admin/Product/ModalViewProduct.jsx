import { Carousel, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { getProductById } from "../../../apis/product.request";

const ModalViewProduct = ({
  productId,
  isModalOpen,
  handleOk,
  handleCancel,
}) => {
  const [dataProduct, setDataProduct] = useState({});
  const [currentImage, setCurrentImage] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const response = await getProductById(productId);
      setCurrentImage(response?.data.product?.images[0]);
      setDataProduct(response.data);
    };
    fetchData();
  }, [productId]);
  const handleThumbnailClick = (img) => {
    setCurrentImage(img);
  };
  return (
    <Modal
      title="Product Detail"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      className="modal-custom-width"
    >
      <div className="view-container">
        <div className="images">
          <img src={currentImage} className="image-view" />
          <div className="list-images">
            <ul>
              {dataProduct?.product?.images?.map((item) => (
                <li key={item.id}>
                  <img
                    src={item}
                    className="image"
                    alt={`Slide ${item.id}`}
                    onClick={() => handleThumbnailClick(item)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="view-infomation">
          <h4>Product Information</h4>
          {/* <ul>
            <li>
              <b>Product's name: </b>
              {dataProduct?.product?.name}
            </li>
            <li>
              <b>Price: </b>
              {dataProduct?.product?.price.toLocaleString("vi-VN")} vnđ
            </li>
            <li>
              <b>Age: </b>
              {dataProduct?.product?.age}
            </li>
            <li>
              <b>Theme: </b>
              {dataProduct?.product?.theme?.name}
            </li>
            <li>
              <b>Description: </b>
              {dataProduct?.product?.description}
            </li>
            <li>
              <b>Quantity: </b>
              {dataProduct?.product?.quantity}
            </li>
            <li>
              <b>Gender: </b>
              {dataProduct?.product?.gender}
            </li>
            <li>
              <b>Color: </b>
              {dataProduct?.product?.color}
            </li>
            <li>
              <b>Type: </b>
              {dataProduct?.product?.type}
            </li>
            <li>
              <b>Origin: </b>
              {dataProduct?.product?.origin}
            </li>
            <li>
              <b>Material: </b>
              {dataProduct?.product?.material}
            </li>
          </ul> */}
          <table>
            <tbody>
              <tr>
                <td><b>Product's name:</b></td>
                <td>{dataProduct?.product?.name}</td>
              </tr>
              <tr>
                <td><b>Price:</b></td>
                <td>{dataProduct?.product?.price.toLocaleString("vi-VN")} VND</td>
                <td><b>Age:</b></td>
                <td>{dataProduct?.product?.age}</td>
              </tr>
              <tr>
                <td><b>Theme:</b></td>
                <td>{dataProduct?.product?.theme?.name}</td>
              </tr>
              <tr>
                <td><b>Description:</b></td>
                <td>{dataProduct?.product?.description}</td>
              </tr>
              <tr>
                <td><b>Quantity:</b></td>
                <td>{dataProduct?.product?.quantity}</td>
                <td><b>Gender:</b></td>
                <td>{dataProduct?.product?.gender}</td>
              </tr>
              <tr>
                <td><b>Color:</b></td>
                <td>{dataProduct?.product?.color}</td>
                <td><b>Type:</b></td>
                <td>{dataProduct?.product?.type}</td>
              </tr>
              <tr>
                <td><b>Origin:</b></td>
                <td>{dataProduct?.product?.origin}</td>
                <td><b>Material:</b></td>
                <td>{dataProduct?.product?.material}</td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    </Modal>
  );
};

export default ModalViewProduct;
