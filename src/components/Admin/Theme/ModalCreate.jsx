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
      name: Yup.string().max(30, "Tên không được vượt quá 30 ký tự").required("Vui lòng nhập tên chủ đề"),
      description: Yup.string().max(50, "Mô tả không được vượt quá 50 ký tự").required("Vui lòng nhập mô tả chủ đề"),
    }),
    onSubmit: async (values) => {
      if (!selectedFile) {
        message.warning("Hãy chọn hình minh họa");
        return;
      }
      const imageData = new FormData();
      imageData.append("img", selectedFile);
      try {
        const hideLoading = message.loading("Vui lòng đợi", 0);
        const response = await uploadImage(imageData)
        const imageUrl = response.data.path;
        const updatedValues = {
          ...values,
          image: imageUrl,
        };

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
          hideLoading()
          message.error(responseCreateTheme.message);
        }
      } catch (error) {
        hideLoading()
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
        title="Tạo chủ đề"
        open={isOpenCreate}
        onOk={formik.handleSubmit}
        onCancel={handleCancelCreate}
      >
        <Input
          placeholder="Tên chủ đề"
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
          placeholder="Miêu tả"
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
                Chọn ảnh dưới dạng: jpg, jpeg, png
              </span>
            )}
          </div>
        </label>
      </Modal>
    </>
  );
};
export default ModalCreate;
