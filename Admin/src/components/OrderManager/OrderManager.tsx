import BaseAxios from "../../api/axiosInstance";
import "./OrderManager.css";
import React, { useEffect, useState } from "react";

const OrderManager: React.FC = () => {
  const [data, setData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const handleGetAllHistory = async () => {
    const response = await BaseAxios.get("/api/v1/history");
    const allDataHistory = response.data;
    const totalPrice = response.data.reduce((total: number, item: any) => {
      return total + item.price;
    }, 0);
    setTotalPrice(totalPrice);
    setData(allDataHistory);
  };
  useEffect(() => {
    handleGetAllHistory();
  }, []);

  return (
    <div className="content-user sales">
      {/* Same as */}
      <div className="wrapper-title">
        <span className="sperator"></span>
        <span className="title-page">Sale Management</span>
      </div>
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Name</th>
            <th>Email</th>
            <th>Subscription</th>
            <th>Expiration Date</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            data.map((item: any, index) => {
              const userPaid = (item as any)?.idUser;
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{userPaid.lastName + " " + userPaid.firstName}</td>
                  <td>{userPaid.email}</td>
                  <td>{item?.LifetimeSubscriber ? "Forever" : "30 Day"}</td>
                  <td>{item.expiration_Date.substring(0, 10)}</td>
                  <td>{item.price}$</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="wrapper-payment">
        <h4 className="title-payment-total">Total price :</h4>
        <span>${totalPrice.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default OrderManager;
