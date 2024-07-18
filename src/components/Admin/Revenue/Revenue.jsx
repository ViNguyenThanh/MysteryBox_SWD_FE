import React, { useEffect, useState } from "react";
import "./Revenue.css";
import { IoStatsChart } from "react-icons/io5";
import { CiShoppingCart } from "react-icons/ci";
import { FaUserFriends } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDownLong } from "react-icons/fa6";
import Chart from "./Chart";
import { Button, DatePicker, message, Select } from "antd";
import {
  revenueDate,
  revenueMonth,
  revenueWeek,
} from "../../../apis/dashboard.request";
import optionMonths from "../../../data/optionMonths.json";
const { RangePicker } = DatePicker;
const Revenue = () => {
  const [dataRevenue, setDataRevenue] = useState({});
  const [monthSelected, setMonthSelected] = useState(null);
  const [dataMonth, setDataMonth] = useState([]);
  const [dates, setDates] = useState([null, null]);
  useEffect(() => {
    const fetchRevenue = async () => {
      const response = await revenueWeek();
      setDataRevenue(response.data);
    };
    fetchRevenue();
  }, []);

  const listData = [
    {
      number: dataRevenue?.sumMoneyInDateRange,
      des: "Tổng tiền",
      color: "color-blue",
      status: "reduce",
      growNumber: "2.65",
      text: "So với tuần trước",
      icon: <IoStatsChart />,
    },
    {
      number: dataRevenue?.countOrders,
      des: "Đơn hàng",
      color: "color-green",
      status: "reduce",
      growNumber: "0.85",
      text: "So với tuần trước",
      icon: <CiShoppingCart />,
    },
    {
      number: dataRevenue?.totalNewAccountsInDateRange,
      des: "Khách hàng mới",
      color: "color-red",
      status: "increase",
      growNumber: "6.65",
      text: "So với tuần trước",
      icon: <FaUserFriends />,
    },
    {
      number: dataRevenue?.growthRate,
      des: "Tăng trưởng",
      color: "color-tomato",
      status: "increase",
      growNumber: "10.65",
      text: "So với tuần trước",
      icon: <IoStatsChart />,
    },
  ];

  const onChange = (value) => {
    setMonthSelected(value);
  };
  const handleGetDataMonth = async () => {
    try {
      const res = await revenueMonth(monthSelected);
      if (res.data?.success) {
        message.success("Get Data Success");
        setDataMonth(res.data?.data);
      } else {
        message.success("Error System");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleDateChange = (dates) => {
    setDates(dates);
  };
  const handleSubmit = async () => {
    const startDate = dates[0] ? dates[0].format("YYYY-MM-DD") : null;
    const endDate = dates[1] ? dates[1].format("YYYY-MM-DD") : null;

    if (!startDate || !endDate) {
      message.error("Both startDate and endDate are required");
      return;
    }

    try {
      const response = await revenueDate({ startDate, endDate });
      if (response.data.success) {
        message.success("Get data success");
        setDataRevenue(response.data);
      } else {
        message.error("Error system");
      }
    } catch (error) {
      console.error("Error fetching revenue data:", error);
    }
  };
  return (
    <div className="revenue-container">
      <h1>Doanh thu</h1>
      <div className="cards">
        {listData.map((item) => (
          <div className="card total-price">
            <div className="item-1">
              <div>
                <p className="number">{item.number?.toLocaleString()}</p>
                <p className="des">{item.des}</p>
              </div>
              {/* <IoStatsChart className="icon color-blue" /> */}
              <div className={`icon ${item.color}`}>{item.icon}</div>
            </div>
            <div className="item-2">
              <div className={item.status === "increase" ? "grow" : "down"}>
                {item.status === "increase" ? (
                  <FaArrowUp />
                ) : (
                  <FaArrowDownLong />
                )}

                <p className="number">{item.growNumber}%</p>
              </div>
              <p className="text">So với tuần trước</p>
            </div>
          </div>
        ))}
      </div>
      <div className="charts">
        <div className="card chart">
          <Chart dataMonth={dataMonth} monthSelected={monthSelected} />
        </div>
        <div className="filter">
          <div className="filter-date">
            <div className="title">Chọn ngày tháng</div>
            <div className="date">
              <RangePicker onChange={handleDateChange} />
            </div>
            <button
              style={{
                marginTop: "12px",
                position: "absolute",
                top: "55%",
                left: "50%",
                transform: "translate(-50%, 0%)",
                border: "none",
                color: "white",
                padding: "8px 32px",
                cursor: "pointer",
                background: "#3572EF",
                borderRadius: "8px",
              }}
              onClick={handleSubmit}
            >
              Dữ liệu
            </button>
          </div>
          <div className="filter-choose">
            <div className="title">Bộ lọc</div>

            <Select
              className="select-month"
              placeholder="Select month"
              optionFilterProp="label"
              onChange={onChange}
              options={optionMonths}
            />
            <button
              style={{
                marginTop: "12px",
                position: "absolute",
                top: "45%",
                left: "50%",
                transform: "translate(-50%, 0%)",
                border: "none",
                color: "white",
                padding: "8px 32px",
                cursor: "pointer",
                background: "#3572EF",
                borderRadius: "8px",
              }}
              onClick={() => handleGetDataMonth()}
            >
              Dữ liệu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Revenue;
