import React, { ReactNode, useState } from "react";
import "./DefaultLayout.css";
import RightBar from "../../components/RightBar/RightBar";
import Sidebar from "../../components/Sidebar/Sidebar";
import {DefaultLayoutProps} from '../../types/types'
// import SortMovie from "../../components/sortMovie/FilterMovie";
// import FilterMovie from "../../components/FilterMovie";

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <>
      <Sidebar />
      <div className="wrapper-middle-content">
        <div className="container-middle">{children}</div>
      </div>
      <RightBar />
      {/* <div className="group-sort-filter">
      <SortMovie/>
      <FilterMovie/>
      </div> */}
    </>
  );
};

export default DefaultLayout;
