import { Input, InputNumber, Modal, Select, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import optionColors from "../../../data/optionColors.json";
import optionOrigins from "../../../data/optionOrigins.json";
import optionGenders from "../../../data/optionGender.json";
import { getBox } from "../../../redux/actions/box.action";
import { getThemes } from "../../../redux/actions/theme.action";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import store from "../../../store/ReduxStore";
import { createProduct } from "../../../redux/actions/product.action";
import { uploadImages } from "../../../apis/upload-image.request";

const ModalCreateProduct = ({ open, setOpen, setCallback }) => {
  const [previewImages, setPreviewImages] = useState([]);
  const formik = useFormik({
    initialValues: {
      boxId: "",
      themeId: "",
      name: "",
      images: [],
      description: "",
      price: "",
      quantity: "",
      gender: "",
      color: "",
      type: "",
      material: "",
      origin: "",
    },
    validationSchema: Yup.object({
      boxId: Yup.string().required("Please choose box"),
      themeId: Yup.string().required("Please choose theme"),
      name: Yup.string().max('Product name must not more than 30 characters').required("Please input product name"),
      description: Yup.string().max('Description must not more than 30 characters').required("Please input description"),
      price: Yup.string().required("Please input price"),
      quantity: Yup.number().required("Please input quantity"),
      gender: Yup.string().required("Please choose gender"),
      color: Yup.string().required("Please choose color"),
      type: Yup.string().required("Please input type"),
      material: Yup.string().required("Please input material"),
      origin: Yup.string().required("Please input origin"),
    }),
    onSubmit: async (values) => {
      const imageData = new FormData();
      values.images.forEach((image, index) => {
        imageData.append("images", image);
      });

      try {
        const response = await uploadImages(imageData)
        const imageUrls = response.data.files;
        const updatedValues = {
          ...values,
          images: imageUrls,
        };
        await dispatch(createProduct(updatedValues));
        const responseCreateProduct = store.getState().productReducer.res;
        if (responseCreateProduct.success) {
          message.success(responseCreateProduct.message);
          setCallback((prev) => !prev);
          setOpen(false);
          formik.handleReset();
          setPreviewImages([]);
        } else {
          message.error(responseCreateTheme.message);
        }
      } catch (error) {
        console.error("Error uploading files:", error);
      }
    },
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBox());
    dispatch(getThemes("", 1));
  }, []);
  const boxs = useSelector((state) => state.boxReducer?.boxs || []);
  const themes = useSelector((state) => state.themeReducer?.themes || []);
  const boxOptions = boxs.map((box) => ({
    value: box.id,
    label: box.name,
  }));
  const themeOptions = themes.map((theme) => ({
    value: theme.id,
    label: theme.name,
  }));

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    formik.setFieldValue("images", files);
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previewUrls);
  };
  return (
    <div>
      <Modal
        title="Create new product"
        centered
        open={open}
        onOk={formik.handleSubmit}
        onCancel={() => setOpen(false)}
        width={1000}
        okText="Create"
        cancelText="Cancel"
      >
        <div>
          <Input
            placeholder="Input product name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.errors.name && formik.touched.name && (
            <p
              style={{
                color: "red",
                marginBottom: "15px",
                marginTop: "-10px",
                fontSize: "12px",
              }}
            >
              {formik.errors.name}{" "}
            </p>
          )}
        </div>
        <div>
          <Input
            placeholder="Material"
            name="material"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.material}
          />
          {formik.errors.material && formik.touched.material && (
            <p
              style={{
                color: "red",
                marginBottom: "15px",
                marginTop: "-10px",
                fontSize: "12px",
              }}
            >
              {formik.errors.material}{" "}
            </p>
          )}
        </div>
        <div>
          <Input
            placeholder="Loại sản phẩm"
            name="type"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.type}
          />
          {formik.errors.type && formik.touched.type && (
            <p
              style={{
                color: "red",
                marginBottom: "15px",
                marginTop: "-10px",
                fontSize: "12px",
              }}
            >
              {formik.errors.type}{" "}
            </p>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "calc(33% - 8px)",
            }}
          >
            <label>Giá tiền sản phẩm</label>
            <InputNumber
              prefix="$"
              name="price"
              onChange={(value) => formik.setFieldValue("price", value)}
              onBlur={formik.handleBlur}
              value={formik.values.price}
              style={{
                width: "100%",
              }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            />
            {formik.errors.price && formik.touched.price && (
              <p
                style={{
                  color: "red",
                  marginBottom: "15px",
                  marginTop: "0px",
                  fontSize: "12px",
                }}
              >
                {formik.errors.price}{" "}
              </p>
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "calc(33% - 8px)",
            }}
          >
            <label>Số lượng</label>
            <InputNumber
              name="quantity"
              onChange={(value) => formik.setFieldValue("quantity", value)}
              onBlur={formik.handleBlur}
              value={formik.values.quantity}
              style={{
                width: "100%",
              }}
            />
            {formik.errors.quantity && formik.touched.quantity && (
              <p
                style={{
                  color: "red",
                  marginBottom: "15px",
                  marginTop: "0px",
                  fontSize: "12px",
                }}
              >
                {formik.errors.quantity}{" "}
              </p>
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "calc(33% - 8px)",
            }}
          >
            <label>Giới tính</label>
            <Select
              name="gender"
              onChange={(value) => formik.setFieldValue("gender", value)}
              onBlur={formik.handleBlur}
              value={formik.values.gender}
              style={{
                width: "100%",
              }}
              options={optionGenders}
            />
            {formik.errors.gender && formik.touched.gender && (
              <p
                style={{
                  color: "red",
                  marginBottom: "15px",
                  marginTop: "0px",
                  fontSize: "12px",
                }}
              >
                {formik.errors.gender}{" "}
              </p>
            )}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "10px 0",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "calc(25% - 8px)",
            }}
          >
            <label>Color</label>
            <Select
              name="color"
              onChange={(value) => formik.setFieldValue("color", value)}
              onBlur={formik.handleBlur}
              value={formik.values.color}
              style={{
                width: "100%",
              }}
              options={optionColors}
            />
            {formik.errors.color && formik.touched.color && (
              <p
                style={{
                  color: "red",
                  marginBottom: "15px",
                  marginTop: "0px",
                  fontSize: "12px",
                }}
              >
                {formik.errors.color}{" "}
              </p>
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "calc(25% - 8px)",
            }}
          >
            <label>Box</label>
            <Select
              name="boxId"
              onChange={(value) => formik.setFieldValue("boxId", value)}
              onBlur={formik.handleBlur}
              value={formik.values.boxId}
              style={{
                width: "100%",
              }}
              options={boxOptions}
            />
            {formik.errors.boxId && formik.touched.boxId && (
              <p
                style={{
                  color: "red",
                  marginBottom: "15px",
                  marginTop: "0px",
                  fontSize: "12px",
                }}
              >
                {formik.errors.boxId}{" "}
              </p>
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "calc(25% - 8px)",
            }}
          >
            <label>Theme</label>
            <Select
              name="themeId"
              onChange={(value) => formik.setFieldValue("themeId", value)}
              onBlur={formik.handleBlur}
              value={formik.values.themeId}
              style={{
                width: "100%",
              }}
              options={themeOptions}
            />
            {formik.errors.themeId && formik.touched.themeId && (
              <p
                style={{
                  color: "red",
                  marginBottom: "15px",
                  marginTop: "0px",
                  fontSize: "12px",
                }}
              >
                {formik.errors.themeId}{" "}
              </p>
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "calc(25% - 8px)",
            }}
          >
            <label>Origin</label>
            <Select
              name="origin"
              onChange={(value) => formik.setFieldValue("origin", value)}
              onBlur={formik.handleBlur}
              value={formik.values.origin}
              style={{
                width: "100%",
              }}
              options={optionOrigins}
            />
            {formik.errors.origin && formik.touched.origin && (
              <p
                style={{
                  color: "red",
                  marginBottom: "15px",
                  marginTop: "0px",
                  fontSize: "12px",
                }}
              >
                {formik.errors.origin}{" "}
              </p>
            )}
          </div>
        </div>
        <div>
          <label>Miêu tả sản phẩm</label>
          <TextArea
            rows={4}
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          />
          {formik.errors.description && formik.touched.description && (
            <p
              style={{
                color: "red",
                marginBottom: "15px",
                marginTop: "0px",
                fontSize: "12px",
              }}
            >
              {formik.errors.description}{" "}
            </p>
          )}
        </div>
        <label
          className="images"
          style={{
            border: "1px solid black",
            minHeight: "400px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          htmlFor="product-images"
        >
          {previewImages.length > 0 ? (
            <div
              style={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}
            >
              {previewImages.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`preview ${index}`}
                  style={{
                    width: "200px",
                    height: "200px",
                    margin: "5px",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                />
              ))}
            </div>
          ) : (
            <>
              <span>Hình ảnh sản phẩm dưới dạng jpg, png, jpeg</span>
            </>
          )}
          <input
            id="product-images"
            type="file"
            name="images"
            multiple
            hidden
            onChange={handleFileChange}
          />
        </label>
      </Modal>
    </div>
  );
};

export default ModalCreateProduct;
