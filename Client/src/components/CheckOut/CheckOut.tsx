import { PayPalButtons } from "@paypal/react-paypal-js";
import React from "react";
import "./CheckOut.css";
import BaseAxios from "../../api/axiosClient";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CheckOut: React.FC = () => {
  const navigate = useNavigate();
  let UserLogin: any = localStorage.getItem("userLogin") || "";
  UserLogin = JSON.parse(UserLogin);
  const currentDate = new Date();

  // Tính ngày hết hạn sau 30 ngày
  const expirationDate = new Date();
  expirationDate.setDate(currentDate.getDate() + 60);
  const handlePaymentSuccessMonth = async () => {
    // Gọi API để cập nhật role_subscription và ngay_het_han
    await BaseAxios.patch(`/api/v1/users/update/${UserLogin._id}`, {
      role_subscription: 2,
      expiration_Date: expirationDate, // Lưu ngày hết hạn
    })
      .then((response) => {
        if (response.status === 200) {
          const newUser = response.data;
          localStorage.setItem("userLogin", JSON.stringify(newUser));
          toast.success("Payment Successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          // Xác định thời gian 30 ngày sau
          const thirtyDaysLater = new Date();
          thirtyDaysLater.setDate(currentDate.getDate() + 60);

          // Sử dụng setTimeout để cập nhật role_subscription sau 30 ngày
          setTimeout(async () => {
            await BaseAxios.patch(`/api/v1/users/update/${UserLogin._id}`, {
              role_subscription: 1,
            })
              .then((response) => {
                if (response.status === 200) {
                  const newUser = response.data?.data;
                  localStorage.setItem("userLogin", JSON.stringify(newUser));
                } else {
                  console.log("Error");
                }
              })
              .catch((error) => {
                console.error(error);
              });
          }, (thirtyDaysLater as any) - (currentDate as any));
          navigate("/");
        } else {
          console.log("Error");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handlePaymentSuccessVIP = async () => {
    await BaseAxios.patch(`/api/v1/users/update/${UserLogin._id}`, {
      role_subscription: 2,
    })
      .then((response) => {
        if (response.status === 200) {
          const newUser = response.data?.data;
          localStorage.setItem("userLogin", JSON.stringify(newUser));
          toast.success("Payment Successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate("/");
        } else {
          console.log("Error");
        }
      })
      .catch((error) => {
        // Xử lý lỗi khi gọi API
        console.error(error);
      });
  };
  return (
    <div className="checkout">
      <div className="checkout-container">
        {/* <h1>Checkout</h1> */}
        <div className="checkout-wrapper">
          <div className="credit-card credit-card-1">
            <div className="credit-content">
              <h2>VIP $25</h2>
              <p>Watch exclusive FixCode&Chill movies for 30 days</p>
            </div>
            <PayPalButtons
              style={{
                layout: "horizontal",
                height: 48,
              }}
              createOrder={(data, actions) => {
                {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          currency_code: "USD",
                          value: "25", // Use the totalAmount value here
                        },
                        description: `Purchase at ${new Date().toLocaleString()}`,
                      },
                    ],
                  });
                }
              }}
              onApprove={(_, actions): any => {
                return actions.order
                  ?.capture()
                  .then(() => handlePaymentSuccessMonth());
              }}
            />
          </div>
          <div className="credit-card credit-card-2">
            <div className="credit-content">
              <h2>VIP $50</h2>
              <p>Watch all exclusive FixCode&Chill movies</p>
            </div>
            <PayPalButtons
              style={{
                layout: "horizontal",
                height: 48,
              }}
              createOrder={(data, actions) => {
                {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          currency_code: "USD",
                          value: "50", // Use the totalAmount value here
                        },
                        description: `Purchase at ${new Date().toLocaleString()}`,
                      },
                    ],
                  });
                }
              }}
              onApprove={(_, actions): any => {
                return actions.order
                  ?.capture()
                  .then(() => handlePaymentSuccessVIP());
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
