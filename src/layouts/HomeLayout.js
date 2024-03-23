import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../Components/Home/Header";

function HomeLayout(props) {
  return (
    <div className="w-screen h-auto ">
      <span className={` overflow-hidden `}></span>
      <Header></Header>
      <div>
        <Outlet></Outlet>

        {/* <Footer></Footer> */}
      </div>
    </div>
  );
}

export default HomeLayout;
