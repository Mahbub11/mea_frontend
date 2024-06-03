import React, { useEffect, useState } from "react";
import { AnimatedCounter } from "react-animated-counter";
import PurchaseHistory from "../../Components/Inventory/PurchaseHistory";
import { Modal, Skeleton } from "antd";
import Addbalance from "../../Components/Inventory/Addbalance";
import { useDispatch, useSelector } from "react-redux";
import { getInventory, getPurchaseList } from "../../redux/slices/inventory";

export default function InventoryPage() {
  const dispatch = useDispatch();
  const { inventory, purchaseHistory, loading } = useSelector(
    (state) => state.inventory
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth < 720);
  const [inventoryItem, setInventoryItem] = useState();
  const [purchaseList, setPurchaseList] = useState();
  const config = isMobile
    ? { maxWidth: "98vw", padding: 0 }
    : { maxWidth: "80vw" };
  const [show, isShow] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [busy, isBusy] = useState(true);

  useEffect(() => {
    dispatch(getInventory());
    dispatch(getPurchaseList());
    // setInventoryItem(inventory);
     setPurchaseList(purchaseHistory);
    isBusy(false);
  }, [busy, inventoryItem]);

  console.log(inventoryItem);

  const handleModal = () => {
    setShowInvoiceModal(true);
  };

  const handleInvoiceReFetch = () => {
    window.location.reload();
  };

  return (
    <div>
      {busy ? (
        <Skeleton></Skeleton>
      ) : (
        <div>
          <div className=" h-full w-full px-5 py-5">
            <div>
              <div className="flex justify-between w-full">
                <h1 className="font-poppinsBold text-[25px]">
                  Current Balance
                </h1>
                <button
                  onClick={handleModal}
                  className="bg-green-300 px-2 py-2 rounded-md"
                >
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
                      <h1 className="text-[40px] text-white">{inventory?.stone}</h1>
                      </div>
                    </div>
                    <div className="px-10 py-5 bg-home rounded-md flex flex-col justify-center">
                      <h1 className="md:text-[30px] sm:text-[15px]">
                        Sand <span className="text-[10px]">(ton)</span>
                      </h1>
                      <div className="mr-[2.5rem]">
                      <h1 className="text-[40px] text-white">{inventory?.sand}</h1>
                      </div>
                    </div>
                    <div className="px-10 py-5 bg-home rounded-md flex flex-col justify-center">
                      <h1 className="md:text-[30px] sm:text-[15px]">
                        Cement <span className="text-[10px]">(cft)</span>
                      </h1>
                      <div className="mr-[4rem]">
                      <h1 className="text-[40px] text-white">{inventory?.cement}</h1>
                      </div>
                    </div>
                    <div className="px-10 py-5 bg-home rounded-md flex flex-col justify-center">
                      <h1 className="md:text-[30px] sm:text-[15px]">
                      Admixture <span className="text-[10px]">(kg)</span>
                      </h1>
                      <div className="mr-[4rem]">
                      <h1 className="text-[40px] text-white">{inventory?.admixer}</h1>
                      </div>
                    </div>
                    <div className="px-10 py-5 bg-home rounded-md flex flex-col justify-center">
                      <h1 className="md:text-[30px] sm:text-[15px]">
                        Bricks Chips <span className="text-[10px]">(ton)</span>
                      </h1>
                      <div className="mr-[6rem]">
                        <AnimatedCounter
                          decimalPrecision={true}
                          value='0000'
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
              <div className="md:h-[30rem] sm:h-[20rem] overflow-y-scroll">
                <PurchaseHistory purchaseList={purchaseList}></PurchaseHistory>
              </div>
            </div>
          </div>

          <div>
            <Modal
              style={config}
              footer={null}
              maskClosable={false}
              closable={false}
              width="md:w-[100%] sm:w-full"
              open={showInvoiceModal}
              onCancel={() => setShowInvoiceModal(false)}
              className=" top-[1rem] m-auto z-10"
            >
              <div>
                <Addbalance
                  handleInvoiceReFetch={handleInvoiceReFetch}
                ></Addbalance>
              </div>
            </Modal>
          </div>
        </div>
      )}
    </div>
  );
}
