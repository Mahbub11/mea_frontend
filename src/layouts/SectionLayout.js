import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  BookOutlined,
  TableOutlined,
  AccountBookOutlined,
  ContainerOutlined,
  FileWordOutlined,
  ProfileOutlined,
  DollarOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, notification, Tabs, Grid, message } from "antd";
import "./index.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CloseNotification } from "../redux/actions";
import { getSellsList } from "../redux/slices/sells";
import { getCompanyList } from "../redux/slices/company";
import { getProjectList } from "../redux/slices/project";
import { getSellsReportList } from "../redux/slices/sellsReport";
import { API_LEVEL, APP_URL, LIVE_URL } from "../config";
import { persistor } from "../redux/store";
const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid;

export default function SectionLayout() {
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();
  const [collapsed, setCollapsed] = useState(true);
  const { common } = useSelector((state) => state.app);
  const navigate = useNavigate();

  const openNotificationWithIcon = (type) => {
    api[type]({
      message: common.severity,
      description: common.message,
      placement: "top",
    });
  };

  const openNotificationWithIconSpeecial = ({ type, message }) => {
    api[type]({
      message: type,
      description: message?.map(({ item, insufficientMaterials }) => {
        const materialsString = insufficientMaterials.join(", ");
        return (
          <div>
            <h2>Insufficient balance for <span className="text-red-500 font-[700] "> {materialsString}</span>
            {" "}for Category <span className="text-red-500 font-[700] "> {item}</span></h2>
          
          </div>
        );
      }),
      placement: "top",
      showProgress: true,
      pauseOnHover:true,
    });
  };

  useEffect(() => {
    dispatch(CloseNotification());

    if (common.message && common.severity != "special") {
      console.log(common.message);
      openNotificationWithIcon(common.severity);
    } else if(common.message && common.severity == "special") {
      console.log(common.message);
      // common?.message?.map(({ item, insufficientMaterials }) => {
      //   const materialsString = insufficientMaterials.join(", ");

      // });
      openNotificationWithIconSpeecial({
        type: "error",
        message: common.message,
      });
    }
  }, [common.message]);

  useEffect(() => {
    dispatch(getSellsList());
    dispatch(getSellsReportList());
    dispatch(getCompanyList());
    dispatch(getProjectList());
  }, []);

  const handleLogout = () => {
    persistor.purge();
    localStorage.removeItem("access");
    window.location.reload(true);
    navigate("/");
  };
  return (
    <Layout className="bg-#e0ebf8 h-screen m-auto z-50 sm:w-full ">
      {contextHolder}
      <Sider
        className={`${collapsed ? "hidden" : "block"}`}
        trigger={null}
        collapsible
        translate="3s"
        collapsed={false}
        style={{ background: "#e0ebf8", width: "40%" }}
      >
        <div className=" h-auto" />
        <Menu
          theme="light"
          mode="inline"
          className="mt-[5rem] bg-transparent "
          defaultSelectedKeys={["1"]}
          inlineCollapsed={collapsed}
          items={[
            {
              label: (
                <a href="/app" rel="noopener noreferrer">
                  Home
                </a>
              ),
              key: "home",
              icon: <HomeOutlined />,
            },
            {
              label: <a href={`/app/inventory`}>Inventory</a>,
              key: "Work_Order11",
              icon: <AccountBookOutlined />,
            },
            {
              label: <a href={`/app/work-order`}>Work Order</a>,
              key: "Work_Order111",
              icon: <ContainerOutlined />,
            },
            // {
            //   label: <a href={`${APP_URL}app/input/casting`}>Input Selling</a>,
            //   key: "Input_Order",
            //   icon: <HomeOutlined />,
            // },
            {
              label: "Casting",
              key: "access-control",
              icon: <FileWordOutlined />,
              collapsed: "block",

              children: [
                {
                  label: (
                    <a href={`/app/listing`} rel="noopener noreferrer">
                      Casting List
                    </a>
                  ),
                  // path: "listing",
                  key: "user2",
                  permission: "user list",
                },
                // {
                //   label: (
                //     <a href={`/app/billing`} rel="noopener noreferrer">
                //       Billing List
                //     </a>
                //   ),
                //   path: "billing",
                //   key: "user2",
                //   permission: "user list",
                // },
                {
                  label: (
                    <a href={`/app/invoice-list`} rel="noopener noreferrer">
                      Invoice List
                    </a>
                  ),
                  path: "app/invoice-list",
                  key: "user22",
                  permission: "user list",
                },
                {
                  label: (
                    <a href={`/app/casting-analysis`} rel="noopener noreferrer">
                      Sells Analysis
                    </a>
                  ),
                  path: "casting-analysis",
                  key: "role21",
                },
              ],
            },

            {
              label: "Clients",
              key: "access-control2",
              icon: <ProfileOutlined />,
              collapsed: "block",

              children: [
                {
                  label: (
                    <a href={`/app/company`} rel="noopener noreferrer">
                      Company
                    </a>
                  ),
                  path: "company",
                  key: "user233",
                  permission: "user list",
                },
                {
                  label: (
                    <a href={`/app/project`} rel="noopener noreferrer">
                      Project
                    </a>
                  ),
                  path: "project",
                  key: "user44",
                  permission: "user list",
                },
              ],
            },
            {
              label: <a href={`/app/payment`}>Payment</a>,
              key: "Work_Order",
              icon: <DollarOutlined />,
            },
            {
              label: (
                <button onClick={handleLogout} style={{ border: "none" }}>
                  Log Out
                </button>
              ),
              key: "LogOut",
              icon: <LogoutOutlined />,
            },
          ]}
        ></Menu>
      </Sider>
      <Layout>
        <Header
          className="flex justify-between z-50"
          style={{
            padding: 0,
            background: "#e0ebf8",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <h1
            className="sm:text-[30px] md:text-[40px]   bg-gradient-to-r
         from-blue-600 via-green-600 to-indigo-500 inline-block text-transparent bg-clip-text
          text-center text-[22px] font-serif font-[500] drop-shadow-sm w-auto"
          >
            <Link to={"/app"}>SCS</Link>
          </h1>
          <div></div>
        </Header>
        <div id="journal-scroll" className="h-[calc(100% +5rem)]">
          <div className="md:w-[90%] sm:w-full m-auto mt-5 relative ">
            <Outlet></Outlet>
          </div>
        </div>
      </Layout>
    </Layout>
  );
}
