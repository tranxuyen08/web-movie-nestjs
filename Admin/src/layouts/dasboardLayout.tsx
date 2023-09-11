import React, { ReactNode } from "react";
import SideBarAdmin from "../components/SideBarAdmin/SideBarAdmin";
import DasboardContentTop from "../components/DasboardContentTop/DasboardContentTop";
import "./dashboardLayout.css"
interface DasBoardLayOutProps {
  children: ReactNode;
}

const DasBoardLayOut: React.FC<DasBoardLayOutProps> = ({ children }) => {
  return (
    <>
      <SideBarAdmin />
      <div className="wrapper-layout">
        <DasboardContentTop />
        {children}
      </div>
    </>
  );
};

export default DasBoardLayOut;
