import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import {
  AiOutlineHistory,
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineMenu,
  AiOutlineSearch,
} from "react-icons/ai";
import { LuBookMarked } from "react-icons/lu";
import { MdOutlineExplore } from "react-icons/md";
import { BiLogOutCircle, BiUserCircle } from "react-icons/bi";
// import { UserAPI } from "../../api/userApiClient";
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { UserLogin } from "../../types/types";

const Header: React.FC = () => {
  const userLogin = JSON.parse(localStorage.getItem("userLogin") || "");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Ban đầu menu sẽ bị đóng
  const navigate = useNavigate()
  const accessTokenLogin = localStorage.getItem("accessToken") || "";
  // Hàm để mở/đóng menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleLogout = () => {
    navigate("/login");
  };
  return (
    <>
     <div className={`menu-left ${isMenuOpen ? "open" : ""}`}>
        <div className="list-nav">
          <div className="item-nav">
            <h3 className="title-h3">Menu</h3>
            <ul className="list-menu">
              <li className={location.pathname === "/" ? "active" : ""}>
                <Link to="/">
                  <AiOutlineHome className="icon" />
                  <p className="title-menu">Home</p>
                </Link>
              </li>
              <li className={location.pathname === "/Explore" ? "active" : ""}>
                <Link to="/Explore">
                  <MdOutlineExplore className="icon" />
                  <p className="title-menu">Explore</p>
                </Link>
              </li>
              <li className={location.pathname === "/Search" ? "active" : ""}>
                <Link to="/Search">
                  <AiOutlineSearch className="icon" />
                  <p className="title-menu">Search</p>
                </Link>
              </li>
            </ul>
          </div>
          <div className="item-nav">
            <h3 className="title-h3">PERSONAL</h3>
            <ul className="">
              <li
                className={location.pathname === "/BookMarked" ? "active" : ""}
              >
                <Link to="/BookMarked">
                  <LuBookMarked className="icon" />
                  <p className="title-menu">BookMarked</p>
                </Link>
              </li>
              <li className={location.pathname === "/History" ? "active" : ""}>
                <Link to="/History">
                  <AiOutlineHistory className="icon" />
                  <p className="title-menu">History</p>
                </Link>
              </li>
            </ul>
          </div>
          <div className="item-nav">
            <h3 className="title-h3">GENERAL</h3>
            <ul className="">
              <li className={location.pathname === "/Profile" ? "active" : ""}>
                <Link to="/Profile">
                  <BiUserCircle className="icon" />
                  <p className="title-menu">Profile</p>
                </Link>
              </li>
              {accessTokenLogin ? (
                <li
                  onClick={handleLogout}
                  className={location.pathname === "/Login" ? "active" : ""}
                >
                  <Link to="/Login">
                    <BiLogOutCircle className="icon" />
                    <p className="title-menu">Logout</p>
                  </Link>
                </li>
              ) : (
                <li className={location.pathname === "/Login" ? "active" : ""}>
                  <Link to="/Login">
                    <AiOutlineLogin className="icon" />
                    <p className="title-menu">Login</p>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      <header className="header">
        <div className="wrapper-header-top">
          <div className="header-top-left">
            <Link to="/" className="wrapper-img">
              <img src="/image/logo.png" alt="logo" />
            </Link>
            <h2 className="title-h1-mobile">
              MoonLight<span>&Chill</span>
            </h2>
          </div>
          <div className="icon-menu" onClick={toggleMenu}>
            <AiOutlineMenu />
          </div>
        </div>
        <div className="wrapper-content-header">
          <div className="header-left">
            <Link to="/">Movie</Link>
          </div>
          <div className="header-right">
            <p>
              Hi!! <span>{userLogin?.lastName}</span>
            </p>
            <Link to="/profile" className="avatar">
              <img src={userLogin?.avatar} alt="" />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
