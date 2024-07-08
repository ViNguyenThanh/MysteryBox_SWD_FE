import { Input, Modal, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { createTheme } from "../../../redux/actions/theme.action";
import { useDispatch } from "react-redux";
import store from "../../../store/ReduxStore";
import { uploadImage } from "../../../apis/upload-image.request";

const ModalCreate = ({
  isOpenCreate,
  handleCancelCreate,
  setIsOpenCreate,
  setCallback,
}) => {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const formik = useFormik({
    initialValues: {
      name: "",
      image: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().max(30, "Name must not exceed 30 characters").required("Please input theme name"),
      description: Yup.string().max(50, "Name must not exceed 50 characters").required("Please input theme description"),
    }),
    onSubmit: async (values) => {
      if (!selectedFile) {
        message.warning("Please choose picture");
        return;
      }
      const imageData = new FormData();
      imageData.append("img", selectedFile);
      try {
        const response = await uploadImage(imageData)
        const imageUrl = response.data.path;
        const updatedValues = {
          ...values,
          image: imageUrl,
        };

        const hideLoading = message.loading("Loading", 0);
        await dispatch(createTheme(updatedValues));
        hideLoading()
        const responseCreateTheme = store.getState().themeReducer.res;
        if (responseCreateTheme.success) {
          message.success(responseCreateTheme.message);
          setCallback((prev) => !prev);
          setIsOpenCreate(false);
          formik.handleReset();
          setPreviewUrl(null);
        } else {
          message.error(responseCreateTheme.message);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    },
  });
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };
  
  return (
    <>
      <Modal
        title="Create theme"
        open={isOpenCreate}
        onOk={formik.handleSubmit}
        onCancel={handleCancelCreate}
      >
        <Input
          placeholder="Theme name"
          name="name"
          style={{ marginBottom: "15px" }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.errors.name && formik.touched.name && (
          <div
            style={{
              color: "red",
              marginBottom: "15px",
              marginTop: "-10px",
              fontSize: "12px",
            }}
          >
            {formik.errors.name}{" "}
          </div>
        )}
        <TextArea
          rows={4}
          name="description"
          placeholder="Description"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />
        {formik.errors.description && formik.touched.description && (
          <div
            style={{
              color: "red",
              marginBottom: "15px",
              marginTop: "5px",
              fontSize: "12px",
            }}
          >
            {formik.errors.description}{" "}
          </div>
        )}
        <input
          id="imageThemeId"
          type="file"
          onChange={handleFileChange}
          hidden
        />
        <label htmlFor="imageThemeId">
          <div className="choose-image">
            {previewUrl ? (
              <img
                src={previewUrl}
                style={{
                  width: "300px",
                  height: "300px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            ) : (
              <span style={{ cursor: "pointer" }}>
                Choose picture in: jpg, jpeg, png
              </span>
            )}
          </div>
        </label>
      </Modal>
    </>
  );
};
export default ModalCreate;
