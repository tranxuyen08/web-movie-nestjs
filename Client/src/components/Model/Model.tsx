import React, { useState } from "react";
import "./Model.css";
import { AiOutlineClose } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FadingBoxProps } from "../../types/types";
import { useNavigate } from "react-router-dom";

const FadingBox: React.FC<FadingBoxProps> = ({ setIsModelOpen }) => {
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  const handleModalClose = () => {
    setIsModelOpen(false);
  };

  const handlePaymentFree = () => {
    setIsModelOpen(false);
    alert("Buy VIP Package to watch movies");
  };

  const handlePaymentMonth = async () => {
    await setPrice(25);
    navigate("/checkout");
  };

  const handlePaymentVIP = async () => {
    await setPrice(50);
    navigate("/checkout");
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="modal">
        <p className="closetab" onClick={handleModalClose}>
          <AiOutlineClose className="close-icon" />
        </p>
        <div className="modal-content">
          <h2>Experience the free movie package</h2>
          <div className="wrapper-card-service">
            <div className="card-service">
              <div className="card-service-img">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPSEV-lqEPCAZMRvaxfHi6EwKDpgBggClXrg&usqp=CAU"
                  alt=""
                />
              </div>
              <div className="content-service">
                <p className="title">Free Movie Watching Experience</p>
                <p className="title">Watch Full HD 720p Movies</p>
                <p className="title">Contains Ads</p>
                <p className="title">Access on 1 device only</p>
              </div>
              <button className="btn-buy" onClick={handlePaymentFree}>
                Payment
              </button>
            </div>
          </div>
        </div>
        <div className="modal-content">
          <h2>30-day Package</h2>
          <div className="wrapper-card-service">
            <div className="card-service">
              <div className="card-service-img">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPSEV-lqEPCAZMRvaxfHi6EwKDpgBggClXrg&usqp=CAU"
                  alt=""
                />
              </div>
              <div className="content-service">
                <p className="title">High-Speed Movie Watching Experience</p>
                <p className="title">Watch Full HD 2K Movies</p>
                <p className="title">No Ads</p>
                <p className="title">Expires after 30 days</p>
              </div>
              <button className="btn-buy" onClick={handlePaymentMonth}>
                Payment
              </button>
            </div>
          </div>
        </div>
        <div className="modal-content">
          <h2>VIP Lifetime Experience Package</h2>
          <div className="wrapper-card-service">
            <div className="card-service">
              <div className="card-service-img">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPSEV-lqEPCAZMRvaxfHi6EwKDpgBggClXrg&usqp=CAU"
                  alt=""
                />
              </div>
              <div className="content-service">
                <p className="title">High-Speed Movie Watching Experience</p>
                <p className="title">Watch Full HD 4K Movies</p>
                <p className="title">No Ads</p>
                <p className="title">Access on 3 devices</p>
              </div>
              <button className="btn-buy" onClick={handlePaymentVIP}>
                Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FadingBox;
