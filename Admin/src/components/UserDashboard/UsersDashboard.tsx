import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
import "./UserDashboard.css";
import BaseAxios from "../../api/axiosInstance";

const UsersDashboard: React.FC = () => {
  const [userCreationData, setUserCreationData] = useState([]);
  const [paidUserCreationData, setPaidUserCreationData] = useState([]);
  const handleManagerUsers = async () => {
    try {
      const response = await BaseAxios.get("/api/v1/users");
      const allUsers = response.data;

      // Tính toán số lượng người dùng được tạo vào từng tháng
      const monthlyUserCounts = new Array(12).fill(0);
      const monthlyPaidUserCounts = new Array(12).fill(0);

      allUsers.forEach((user: any) => {
        const userCreatedAt = new Date(user.createdAt);
        const userCreatedMonth = userCreatedAt.getMonth();
        monthlyUserCounts[userCreatedMonth]++;

        // Kiểm tra nếu người dùng có role_subscription bằng 2 thì tăng số lượng của họ trong tháng đó
        if (user.role_subscription === 2) {
          monthlyPaidUserCounts[userCreatedMonth]++;
        }
      });

      setUserCreationData(monthlyUserCounts as any);
      setPaidUserCreationData(monthlyPaidUserCounts as any);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleManagerUsers();
  }, []);

  const chartData = [["Month", "User Registrations", "Paid Users"]];
  userCreationData.forEach((count, index) => {
    chartData.push([`Tháng ${index + 1}`, count, paidUserCreationData[index]]);
  });

  const options = {
    title: "User Registrations and Expenses by Month",
    hAxis: { title: "Month" },
    vAxis: { title: "Number of Users", minValue: 0 },
    legend: { position: "top", maxLines: 3 },
    colors: ["#52C1C5"], // Đặt màu cho cột đăng ký
    series: {
      1: { color: "#1B2942" }, // Đặt màu cho cột Expenses
    },
  };

  return (
    <div className="wrapper-dashboard">
      <div className="content-chart">
        <div className="content-chart-left">
          <Chart
            className="user-dashboard-content"
            chartType="ColumnChart"
            width="100%"
            height="500px"
            data={chartData}
            options={options}
          />
        </div>
        <div className="content-chart-right">
          <Chart
            className="user-dashboard-content"
            chartType="LineChart"
            width="100%"
            height="300px"
            data={chartData}
            options={options}
          />
          <Chart
            className="user-dashboard-content"
            chartType="PieChart"
            width="100%"
            height="300px"
            data={chartData}
            options={options}
          />
        </div>
      </div>
    </div>
  );
};

export default UsersDashboard;
