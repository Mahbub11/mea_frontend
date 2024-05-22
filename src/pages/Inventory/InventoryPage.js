import React, { useState } from "react";
import { AnimatedCounter } from "react-animated-counter";
import PurchaseHistory from "../../Components/Inventory/PurchaseHistory";
import { Modal } from "antd";
import Addbalance from "../../Components/Inventory/Addbalance";

export default function InventoryPage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 720);
  const config = isMobile
    ? { maxWidth: "98vw", padding: 0 }
    : { maxWidth: "80vw" };
    const [show, isShow] = useState(false);


    const handleModal=()=>{
        isShow(true)
    }

  return (
    <div>
      <div className=" h-full w-full px-5 py-5">
        <div>
          <div className="flex justify-between w-full">
            <h1 className="font-poppinsBold text-[25px]">Current Balance</h1>
            <button onClick={handleModal} className="bg-green-300 px-2 py-2 rounded-md">
              Purchase
            </button>
          </div>
          <div>
            <div className="mt-5 md:text-[25px] sm:text-[15px]  font-poppins">
              <div className="flex gap-5 justify-start flex-wrap">
                <div className="px-10 py-5 bg-home rounded-md flex flex-col justify-center">
                  <h1 className="md:text-[30px] sm:text-[15px]">
                    Stone <span className="text-[10px]">(ton)</span>
                  </h1>
                  <div className="mr-[3rem]">
                    <AnimatedCounter
                      decimalPrecision={false}
                      value={55}
                      color="white"
                      fontSize="40px"
                    />
                  </div>
                </div>
                <div className="px-10 py-5 bg-home rounded-md flex flex-col justify-center">
                  <h1 className="md:text-[30px] sm:text-[15px]">
                    Sand <span className="text-[10px]">(ton)</span>
                  </h1>
                  <div className="mr-[2.5rem]">
                    <AnimatedCounter
                      decimalPrecision={false}
                      value={55}
                      color="white"
                      fontSize="40px"
                    />
                  </div>
                </div>
                <div className="px-10 py-5 bg-home rounded-md flex flex-col justify-center">
                  <h1 className="md:text-[30px] sm:text-[15px]">
                    Cement <span className="text-[10px]">(ton)</span>
                  </h1>
                  <div className="mr-[4rem]">
                    <AnimatedCounter
                      decimalPrecision={false}
                      value={55}
                      color="white"
                      fontSize="40px"
                    />
                  </div>
                </div>
                <div className="px-10 py-5 bg-home rounded-md flex flex-col justify-center">
                  <h1 className="md:text-[30px] sm:text-[15px]">
                    Admixer <span className="text-[10px]">(ton)</span>
                  </h1>
                  <div className="mr-[4rem]">
                    <AnimatedCounter
                      decimalPrecision={false}
                      value={55}
                      color="white"
                      fontSize="40px"
                    />
                  </div>
                </div>
                <div className="px-10 py-5 bg-home rounded-md flex flex-col justify-center">
                  <h1 className="md:text-[30px] sm:text-[15px]">
                    Bricks Chips <span className="text-[10px]">(ton)</span>
                  </h1>
                  <div className="mr-[6rem]">
                    <AnimatedCounter
                      decimalPrecision={false}
                      value={55}
                      color="white"
                      fontSize="40px"
                    />
                  </div>
                </div>
                {/* <div className="px-5 py-5 bg-home rounded-md flex flex-col justify-center">
                <h1 className="md:text-[20px] sm:text-[15px]">
                  Current Balance
                </h1>
                <AnimatedCounter value={876547} color="white" fontSize="40px" />
              </div> */}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h1 className="font-poppinsBold text-[25px]">Purchase History</h1>
          <div>
            <PurchaseHistory></PurchaseHistory>
          </div>
        </div>
      </div>

      <div>
        <Modal
          style={config}
          footer={null}
          maskClosable={false}
          closable={true}
          width="md:w-[100%] sm:w-full"
          open={show}
          onCancel={() => isShow(false)}
          className=" top-[1rem] m-auto z-10"
        >
          <div>
           <Addbalance></Addbalance>
          </div>
        </Modal>
      </div>
    </div>
  );
}
