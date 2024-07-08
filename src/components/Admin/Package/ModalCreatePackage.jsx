import { Input, InputNumber, Modal, Select, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { createPackage } from "../../../apis/package.request";
import optionAges from "../../../data/optionAges.json";
const ModalCreatePackage = ({
  isModalOpen,
  handleCancel,
  setIsOpenCreate,
  setCallback,
}) => {
  const formik = useFormik({
    initialValues: {
      age: "",
      name: "",
      description: "",
      price: "",
      numberOfSend: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please input package's name"),
      age: Yup.string().required("Please choose age range"),
      description: Yup.string().required("Please input package's description"),
      price: Yup.number().required("Please input package's price"),
      numberOfSend: Yup.number().required(
        "Please enter the number of gift package deliveries"
      ),
    }),
    onSubmit: async (values) => {
      try {
        const hideLoading = message.loading("Waiting for create package", 0);
        const response = await createPackage(values);
        hideLoading()
        if (response.data.success) {
          message.success(response.data.message);
          setIsOpenCreate(false);
          setCallback((prev) => !prev);
        } else {
          message.success(response.data.message);
        }
      } catch (error) { }
    },
  });

  return (
    <>
      <Modal
        title="Create package"
        open={isModalOpen}
        onOk={formik.handleSubmit}
        onCancel={handleCancel}
        okText="Create package"
        cancelText="Cancel"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "12px 0",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "calc(50% - 8px)",
            }}
          >
            <label style={{ fontSize: "12px" }}>Name</label>
            <Input
              placeholder="Package"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              style={{ marginBottom: "15px" }}
            />
            {formik.errors.name && formik.touched.name && (
              <p
                style={{
                  color: "red",
                  marginBottom: "15px",
                  marginTop: "-12px",
                  fontSize: "12px",
                }}
              >
                {formik.errors.name}{" "}
              </p>
            )}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "calc(50% - 8px)",
            }}
          >
            <label style={{ fontSize: "12px" }}>Age</label>
            <Select
              name="age"
              onChange={(value) => formik.setFieldValue("age", value)}
              onBlur={formik.handleBlur}
              value={formik.values.age || undefined}
              placeholder="Age range"
              // style={{
              //   marginBottom: "4px",
              //   width: "100%",
              // }}
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
              width: "calc(50% - 8px)",
            }}
          >
            <label style={{ fontSize: "12px" }}>Price</label>
            <InputNumber
              placeholder="500.000"
              suffix="VND"
              style={{
                width: "100%",
              }}
              name="price"
              onChange={(value) => formik.setFieldValue("price", value)}
              onBlur={formik.handleBlur}
              value={formik.values.price}
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
              width: "calc(50% - 8px)",
            }}
          >
            <label style={{ fontSize: "12px" }}>No. of boxes</label>
            <InputNumber
              style={{
                width: "100%",
              }}
              name="numberOfSend"
              onChange={(value) => formik.setFieldValue("numberOfSend", value)}
              onBlur={formik.handleBlur}
              value={formik.values.numberOfSend}
              controls={false}
              placeholder="2"
            />
            {formik.errors.numberOfSend && formik.touched.numberOfSend && (
              <p
                style={{
                  color: "red",
                  marginBottom: "15px",
                  marginTop: "0px",
                  fontSize: "12px",
                }}
              >
                {formik.errors.numberOfSend}{" "}
              </p>
            )}
          </div>
        </div>
        <div style={{ marginTop: "10px" }}>
          <label style={{ fontSize: "12px" }}>Description</label>
          <TextArea
            placeholder="Description about package"
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
                marginTop: "-10px",
                fontSize: "12px",
              }}
            >
              {formik.errors.description}{" "}
            </p>
          )}
        </div>
      </Modal>
    </>
  );
};

export default ModalCreatePackage;
