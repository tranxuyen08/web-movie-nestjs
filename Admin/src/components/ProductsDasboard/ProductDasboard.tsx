import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import BaseAxios from "../../api/axiosInstance";

const LineChartExample: React.FC = () => {
  const [data, setData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState<number[]>([]);
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const handleGetAllHistory = async () => {
    try {
      const response = await BaseAxios.get("/api/v1/history");
      const dataHistory = response.data;
      setData(dataHistory);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetAllHistory();
  }, []);

  useEffect(() => {
    // Khởi tạo mảng tổng doanh thu cho từng tháng với giá trị ban đầu là 0
    const initialRevenue = Array(12).fill(0);

    // Tính toán tổng doanh thu cho từng tháng
    data.forEach((item) => {
      if ((item as any).price && (item as any).createdAt) {
        const price = (item as any).price;
        const expirationDate = new Date((item as any).createdAt);
        const month = expirationDate.getMonth();
        initialRevenue[month] += price;
      }
    });

    setTotalRevenue(initialRevenue);
  }, [data]);

  // Tạo dữ liệu cho biểu đồ
  const chartData = [
    ["Month", "Revenue"],
    ...months.map((month, index) => [month, totalRevenue[index]])
  ];

  const options = {
    title: "Monthly Revenue",
    legend: { position: "bottom" },
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

export default LineChartExample;
