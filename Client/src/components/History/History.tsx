import React, { useEffect, useState } from "react";
import "./History.css";
import BaseAxios from "../../api/axiosClient";
const History: React.FC = () => {
  const [data, setData] = useState<any>();
  const [countDowndateExp, setCountDowndateExp] = useState(0);
  const [userExists, setUserExists] = useState(false);
  const userLogin = JSON.parse(
    (localStorage.getItem("userLogin") as any) || []
  );
  const handleGetHistoryPayment = async () => {
    try {
      const response = await BaseAxios.get("/api/v1/history");
      const user = response?.data?.find((item: any) => {
        return item?.idUser._id == userLogin?._id;
      });
      if (user == undefined) {
        setUserExists(false); // Không tìm thấy user
      } else {
        setUserExists(true); // Tìm thấy user
        setData(user);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetHistoryPayment();
    if (data?.expiration_Date) {
      const targetDate = new Date(data.expiration_Date);
      const currentDate = new Date();
      const timeRemaining = (targetDate as any) - (currentDate as any);
      // Tính toán số ngày còn lại
      const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      setCountDowndateExp(daysRemaining);
    }
  }, [data, countDowndateExp]);
  return (
    <section className="section-history">
      <h2 className="title-h2">History Payment</h2>
      {userExists ? (
        <table>
          <thead>
            <tr>
              <th>Subscription Plan</th>
              <th>Price</th>
              <th>Purchase Date</th>
              <th>Expiration Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data?.LifetimeSubscriber ? "Forever" : "30 Day"}</td>
              <td>{data?.price} $</td>
              <td>{data?.createdAt.split("T")[0]}</td>
              <td>{countDowndateExp}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <img className="img-history-not-found" src="/image/shopping, e-commerce _ shopping cart, cart, empty, not found, basket, shop_md.webp" alt="Image Placeholder" />
      )}
    </section>
  );
};

export default History;
