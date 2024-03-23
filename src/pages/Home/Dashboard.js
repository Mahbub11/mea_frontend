import React from "react";
import { Link } from "react-router-dom";
import { Radio } from "antd";
import { AnimatedCounter } from "react-animated-counter";
import OrderGraph from "../../Components/Graph/OrderGraph";
import CftMpaGraph from "../../Components/Graph/CftMpaGraph";
import { useSelector } from "react-redux";

function Dashboard(props) {
  const { companyList } = useSelector((state) => state.company);
  const { projectList } = useSelector((state) => state.project);

  return (
    <div className="h-full w-full px-2 -z-10">
      <div className="w-full px-2 py-2 h-full  m-auto ">
        <div className=" rounded-sm">
          <div>
            <h1 className="text-center text-[40px] font-poppinsBold">
              Dashboard
            </h1>
          </div>

          <div className="mt-10 md:text-[25px] sm:text-[15px]  font-poppins">
            <div className="flex gap-5 justify-center flex-wrap">
              <div className="px-5 py-5 bg-home rounded-md flex flex-col justify-center">
                <h1 className="md:text-[20px] sm:text-[15px]">Total Company</h1>
                <AnimatedCounter
                  decimalPrecision={false}
                  value={companyList.length}
                  color="white"
                  fontSize="40px"
                />
              </div>
              <div className="px-5 py-5 bg-home rounded-md flex flex-col justify-center">
                <h1 className="md:text-[20px] sm:text-[15px]">Total Project</h1>
                <AnimatedCounter
                  decimalPrecision={false}
                  value={projectList.length}
                  color="white"
                  fontSize="40px"
                />
              </div>
              {/* <div className="px-5 py-5 bg-home rounded-md flex flex-col justify-center">
                <h1 className="md:text-[20px] sm:text-[15px]">
                  Current Balance
                </h1>
                <AnimatedCounter value={876547} color="white" fontSize="40px" />
              </div> */}
            </div>
          </div>

          <div className="mt-10 w-full m-auto flex flex-col justify-center ">
            <div className="w-full m-auto flex justify-center">
              <Radio.Group className="" defaultValue="a" buttonStyle="solid">
                <div className=" flex flex-wrap justify-center w-full m-auto gap-1">
                  <Radio.Button value="a">Casting Report</Radio.Button>
                  {/* <Radio.Button value="b">Casting Growth</Radio.Button>
                  <Radio.Button value="c">Purchase</Radio.Button>
                  <Radio.Button value="d">Sell</Radio.Button> */}
                </div>
              </Radio.Group>
            </div>
            <div className="px-2 py-3 self-center">
              {/* <OrderGraph></OrderGraph> */}
              <CftMpaGraph></CftMpaGraph>
            </div>
          </div>

          {/* <div className="mt-10 md:w-[30%] sm:w-[40%] m-auto flex flex-col  gap-5 text-[20px]">
            <Link
              to={"/input/casting"}
              className="cursor-pointer w-full self-center px-3 py-3 rounded-md bg-green-300 text-center"
            >
              Input
            </Link>

            <Link
              to={"/listing"}
              className="cursor-pointer w-full self-center px-3 py-3 rounded-md bg-pink-300 text-center"
            >
              Generate
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
