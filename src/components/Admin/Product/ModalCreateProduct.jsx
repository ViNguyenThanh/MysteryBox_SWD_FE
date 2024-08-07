import { Input, InputNumber, Modal, Select, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import optionColors from "../../../data/optionColors.json";
import optionOrigins from "../../../data/optionOrigins.json";
import optionGenders from "../../../data/optionGender.json";
import optionMaterials from "../../../data/optionMaterials.json";
import optionTypes from "../../../data/optionTypes.json";
import optionAges from "../../../data/optionAges.json";
import { getBox } from "../../../redux/actions/box.action";
import { getThemes } from "../../../redux/actions/theme.action";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import store from "../../../store/ReduxStore";
import { createProduct } from "../../../redux/actions/product.action";
import { uploadImages } from "../../../apis/upload-image.request";

const ModalCreateProduct = ({ open, setOpen, setCallback }) => {
  const [previewImages, setPreviewImages] = useState([]);
  const formik = useFormik({
    initialValues: {
      productCode: "",
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
      age: "",
    },
    validationSchema: Yup.object({
      productCode: Yup.string().required("Vui lòng nhập mã sản phẩm"),
      themeId: Yup.string().required("Vui lòng chọn chủ đề"),
      name: Yup.string().required("Vui lòng nhập tên sản phẩm"),
      description: Yup.string().required("Vui lòng nhập mô tả sản phẩm"),
      price: Yup.string()
        .required("Vui lòng nhập giá sản phẩm")
        .test(
          "max-price",
          "Giá không được vượt quá 100.000 VND",
          (value) => parseFloat(value) <= 100000
        ),
      quantity: Yup.number().required("Vui lòng nhập số lượng sản phẩm"),
      gender: Yup.string().required("Vui lòng chọn giới tính"),
      color: Yup.string().required("Vui lòng chọn màu sắc"),
      type: Yup.string().required("Vui lòng nhập loại sản phẩm"),
      material: Yup.string().required("Vui lòng nhập chất liệu"),
      origin: Yup.string().required("Vui lòng chọn xuất xứ sản phẩm"),
      age: Yup.string().required("Vui lòng chọn độ tuổi"),
    }),
    onSubmit: async (values) => {
      const imageData = new FormData();
      values.images.forEach((image, index) => {
        imageData.append("images", image);
      });

      try {
        const hideLoading = message.loading("Vui lòng đợi trong giây lát", 0);
        const response = await uploadImages(imageData)
        const imageUrls = response.data.files;
        const updatedValues = {
          ...values,
          images: imageUrls,
        };
        await dispatch(createProduct(updatedValues));
        hideLoading()
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
    dispatch(getThemes("", 1));
  }, []);

  const themes = useSelector((state) => state.themeReducer?.themes || []);

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
        title="Tạo mới sản phẩm"
        centered
        open={open}
        onOk={formik.handleSubmit}
        onCancel={() => setOpen(false)}
        width={1000}
        okText="Tạo"
        cancelText="Hủy"
      >
        <div>
          <label style={{ fontSize: "12px" }}>Tên</label>
          <Input
            placeholder="Tên sản phẩm"
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

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "calc(33% - 8px)",
            }}
          >
            <label>Chất liệu</label>
            <Select
              name="material"
              onChange={(value) => formik.setFieldValue("material", value)}
              onBlur={formik.handleBlur}
              value={formik.values.material || undefined}
              placeholder="Ex: wood"
              style={{
                width: "100%",
              }}
              options={optionMaterials}
            />
            {formik.errors.material && formik.touched.material && (
              <p
                style={{
                  color: "red",
                  marginBottom: "15px",
                  marginTop: "0px",
                  fontSize: "12px",
                }}
              >
                {formik.errors.material}{" "}
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
            <label>Loại</label>
            <Select
              name="type"
              onChange={(value) => formik.setFieldValue("type", value)}
              onBlur={formik.handleBlur}
              value={formik.values.type || undefined}
              placeholder="Ex: puzzle"
              style={{
                width: "100%",
              }}
              options={optionTypes}
            />
            {formik.errors.type && formik.touched.type && (
              <p
                style={{
                  color: "red",
                  marginBottom: "15px",
                  marginTop: "0px",
                  fontSize: "12px",
                }}
              >
                {formik.errors.type}{" "}
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
            <label>Tuổi</label>
            <Select
              name="age"
              onChange={(value) => formik.setFieldValue("age", value)}
              onBlur={formik.handleBlur}
              value={formik.values.age || undefined}
              placeholder="Ex: 9-12"
              style={{
                width: "100%",
              }}
              options={optionAges}
            />
            {formik.errors.age && formik.touched.age && (
              <p
                style={{
                  color: "red",
                  marginBottom: "15px",
                  marginTop: "0px",
                  fontSize: "12px",
                }}
              >
                {formik.errors.age}{" "}
              </p>
            )}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "calc(33% - 8px)",
            }}
          >
            <label>Giá</label>
            <InputNumber
              suffix="VND"
              name="price"
              onChange={(value) => formik.setFieldValue("price", value)}
              onBlur={formik.handleBlur}
              value={formik.values.price}
              placeholder="Ex: 20.000"
              style={{
                width: "100%",
              }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              controls={false}
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
              controls={false}
              placeholder="Ex: 2"
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
            <label>Màu</label>
            <Select
              name="color"
              onChange={(value) => formik.setFieldValue("color", value)}
              onBlur={formik.handleBlur}
              value={formik.values.color || undefined}
              placeholder="Ex: Blue"
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
            <label>Code</label>
            <Input
              placeholder="Ex: SP-000"
              name="productCode"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.productCode}
            />
            {formik.errors.productCode && formik.touched.productCode && (
              <p
                style={{
                  color: "red",
                  marginBottom: "15px",
                  marginTop: "-10px",
                  fontSize: "12px",
                }}
              >
                {formik.errors.productCode}{" "}
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
            <label>Chủ đề</label>
            <Select
              name="themeId"
              onChange={(value) => formik.setFieldValue("themeId", value)}
              onBlur={formik.handleBlur}
              value={formik.values.themeId || undefined}
              placeholder="Ex: Frozen"
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
            <label>Xuất xứ</label>
            <Select
              name="origin"
              onChange={(value) => formik.setFieldValue("origin", value)}
              onBlur={formik.handleBlur}
              value={formik.values.origin || undefined}
              placeholder="Ex: China"
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
          <label>Miêu tả</label>
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
              <span>Images in: jpg, png, jpeg</span>
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
