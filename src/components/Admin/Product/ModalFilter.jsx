import { InputNumber, Modal, Select, Slider } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBox } from "../../../redux/actions/box.action";
import { getThemes } from "../../../redux/actions/theme.action";
import optionColors from "../../../data/optionColors.json";
import optionOrigin from "../../../data/optionOrigins.json";
const ModalFilter = ({
  isModalOpen,
  setIsModalFilterOpen,
  handleCancel,
  setCallback,
  setDataFilter,
  dataFilter,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getThemes("", 1));
  }, []);

  const themes = useSelector((state) => state.themeReducer?.themes || []);

  const themeOptions = themes.map((theme) => ({
    value: theme.id,
    label: theme.name,
  }));

  const onChange = (name, value) => {
    setDataFilter((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleChange = (name, value) => {
    setDataFilter((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleFilter = () => {
    // dispatch(getProducts(dataFilter.fromPrice, dataFilter.toPrice, "", 1));
    setIsModalFilterOpen(false);
    setCallback((prev) => !prev);
  };
  const handleClear = () => {
    setDataFilter({
      fromPrice: "",
      toPrice: "",
      colorQuery: "",
      originQuery: "",
      boxIdQuery: "",
      themeIdQuery: "",
    });
    setIsModalFilterOpen(false);
    setCallback((prev) => !prev);
  };

  const changeStringToArray = (dataFilter) => {
    if (dataFilter) {
      return dataFilter.split(",").map((item) => item.trim());
    }
    return [];
  };

  return (
    <div>
      <Modal
        title="Filter"
        open={isModalOpen}
        onOk={handleFilter}
        onCancel={handleClear}
        okText="Filter"
        cancelText="Clear"
      >
        <div className="filter-container">
          <Select
            mode="multiple"
            placeholder="Theme"
            allowClear
            onChange={(value) => onChange("themeIdQuery", value.join(","))}
            // value={changeStringToArray(dataFilter.themeIdQuery)}
            options={themeOptions}
            className="filter-child"
          />

          <Select
            mode="tags"
            placeholder="Color"
            allowClear
            onChange={(value) => onChange("colorQuery", value.join(","))}
            options={optionColors}
            value={changeStringToArray(dataFilter.colorQuery)}
            className="filter-child"
          />
          <Select
            mode="tags"
            placeholder="Origin"
            allowClear
            onChange={(value) => onChange("originQuery", value.join(","))}
            options={optionOrigin}
            value={changeStringToArray(dataFilter.originQuery)}
            className="filter-child"
          />
          <div className="filter-price">
            <div className="from-price">
              <label>From:</label>
              <InputNumber
                suffix="VND"
                controls={false}
                style={{
                  width: "100%",
                }}
                value={dataFilter.fromPrice}
                name="fromPrice"
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                onChange={(value) => handleChange("fromPrice", value)}
              />
            </div>
            <div className="to-price">
              <label>To: </label>
              <InputNumber
                suffix="VND"
                controls={false}
                style={{
                  width: "100%",
                }}
                value={dataFilter.toPrice}
                name="toPrice"
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                onChange={(value) => handleChange("toPrice", value)}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalFilter;
