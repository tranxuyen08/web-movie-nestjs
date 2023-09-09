import React from "react";
import "../DefaultLayout/DefaultLayout.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { DefaultLayoutProps } from "../../types/types";
import SortMovie from "../../components/sortMovie/FilterMovie";
import FilterMovie from "../../components/FilterMovie";
// import {DefaultLayoutProps} from '../../types/types'
// import SortMovie from "../../components/sortMovie/FilterMovie";
// import FilterMovie from "../../components/FilterMovie";
// import FilterMovie from "../../components/FilterMovie/FilterMovie";

const ExploreLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <>
      <Sidebar />
      <div className="wrapper-middle-content">
        <div className="container-middle">{children}</div>
      </div>
      {/* <RightBar /> */}
      <div className="group-sort-filter">
      <SortMovie/>
      <FilterMovie/>
      </div>
    </>
  );
};

export default ExploreLayout;
