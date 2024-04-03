import { Drawer, Modal, Skeleton } from "antd";
import Search from "antd/es/input/Search";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CastingList from "../../Components/Casting/CastingList";
import { getSellsList } from "../../redux/slices/sells";
import EditSell from "../../Components/Casting/EditSell";
import InvoiceModal from "../../Components/Invoice/InvoiceModal";
import { getInvoiceList } from "../../redux/slices/invoice";
import axiosInstance from "../../utils/axios";
import { API_LEVEL } from "../../config";
import { ShowNotification } from "../../redux/actions";
import InvoiceFound from "../../Components/Casting/InvoiceFound";
import MakeBillModal from "../../Components/Casting/MakeBillModal";
import WorkOrderModal from "../../Components/WorkOrder/WorkOrderModal";
import { getWorkOrderList } from "../../redux/slices/workOrder";
import CastingItems from "../../Components/Casting/CastingItems";

function CastingPage(props) {
  const dispatch = useDispatch();
  // const { sellsReportList } = useSelector((state) => state.sellsReport);
  const { workOrder } = useSelector((state) => state.workOrder);
  // const { sellsList } = useSelector((state) => state.sells);
  const [busy, isBusy] = useState(true);
  const [filterData, setFilterData] = useState();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 720);
  const [showEdit, isShowEdit] = useState(false);
  const [editData, setEditData] = useState();
  const [invoiceData, setInvoiceData] = useState();
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [previousDue, setPreviousDue] = useState([]);
  const [showWorkOrderModal, setShowWorkOrderModal] = useState(false);
  const [workOrderData, setworkOrderData] = useState();
  const [drawer, setDrawer] = useState(false);
  const [castingItems, setCastingItems] = useState();
  const config = isMobile
    ? { maxWidth: "98vw", padding: 0 }
    : { maxWidth: "80vw" };

  useEffect(() => {
    dispatch(getWorkOrderList());
    // dispatch(getSellsList());
    dispatch(getInvoiceList());
    setFilterData(workOrder);
    isBusy(false);
  }, [busy, dispatch]);

  useEffect(() => {
    setFilterData(workOrder);
  }, [workOrder]);

  console.log(workOrder);

  const handleSearch = (e) => {
    if (e.target.value.length === 0) {
      setFilterData(workOrder);
    } else {
      const newData = workOrder.filter((val) =>
        val.company.name
          .toLocaleLowerCase()
          .includes(e.target.value.toLocaleLowerCase())
      );

      setFilterData(newData);
    }
  };

  const handleEditCompany = (id) => {
    setEditData();
    const data = filterData.filter((data) => data.id === id);
    setEditData(data[0]);

    console.log(data[0]);
    isShowEdit(true);
  };

  const handleReFetch = () => {
    isBusy(true);
    isShowEdit(false);

    // window.location.reload();
  };

  const handleCloseModal = () => {
    isBusy(true);
    isShowEdit(false);
  };

  const createBill = async (id) => {
    const data = workOrder.find((item) => item.id === id);
    setInvoiceData(data);

    // const prevDue = workOrder.filter(
    //   (val) =>
    //     val.id !== id &&
    //     val.cid === data.company.id &&
    //     val.pid === data.project.id &&
    //     (val.status === 0 || val.state === 3)
    // );

    // const finalCalculateVal = prevDue.map((val) => ({
    //   ...val,
    //   due: val.total_amount - val.paid_amount,
    // }));

    // setPreviousDue(finalCalculateVal);
    setShowInvoiceModal(true);
  };

  const handleInvoiceReFetch = () => {
    isBusy(true);
    setShowInvoiceModal(false);
  };
  const createWorkOrder = (id) => {
    const data = workOrder.find((item) => item.id === id);

    setworkOrderData(data);
    setShowWorkOrderModal(true);
  };

  const workOrderModal = () => {
    isBusy(true);
    setShowWorkOrderModal(false);
  };
  const openProjectList = (id) => {
    setDrawer(true);
    const data = filterData.filter((val) => val.id === id)[0];
    setCastingItems(data);
  };

  return (
    <div>
      {busy ? (
        <Skeleton></Skeleton>
      ) : (
        <div>
          <div className="mt-5">
            <h2 className="text-center font-poppinsBold text-[35px]">
              Casting List
            </h2>
            <div className="w-full flex justify-center mt-5">
              <Search
                className="md:w-[40%] sm:w-full px-2 sm:h-[10%] rounded-md "
                placeholder="Search Company"
                onChange={handleSearch}
              />
            </div>
            <div className="mt-2 md:w-[90%] sm:w-full m-auto">
              <CastingList
                openProjectList={openProjectList}
                createWorkOrder={createWorkOrder}
                createBill={createBill}
                handleEditCompany={handleEditCompany}
                list={filterData}
                handleReFetch={handleReFetch}
              ></CastingList>
            </div>
          </div>

          <div>
            <Modal
              style={config}
              footer={null}
              maskClosable={false}
              closable={false}
              width="md:w-[100%] sm:w-full"
              open={showEdit}
              onCancel={() => isShowEdit(false)}
              className=" top-[1rem] m-auto z-10"
            >
              <div>
                <EditSell
                  handleReFetch={handleReFetch}
                  data={editData}
                  handleCloseModal={handleCloseModal}
                ></EditSell>
              </div>
            </Modal>
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
                <MakeBillModal
                  handleInvoiceReFetch={handleInvoiceReFetch}
                  invoiceData={invoiceData}
                ></MakeBillModal>
              </div>
            </Modal>
          </div>

          {/* <div>
            <Modal
              style={config}
              footer={null}
              maskClosable={false}
              closable={false}
              width="md:w-[100%] sm:w-full"
              open={showWorkOrderModal}
              // onCancel={() => setShowWorkOrderModal(false)}
              className=" top-[1rem] m-auto z-10"
            >
              <div>
                <WorkOrderModal
                  handleInvoiceReFetch={workOrderModal}
                  workOrderData={workOrderData}
                ></WorkOrderModal>
              </div>
            </Modal>
          </div> */}

          <Drawer
            closable={true}
            width={870}
            onClose={() => setDrawer(false)}
            open={drawer}
          >
            <CastingItems data={castingItems}></CastingItems>
          </Drawer>
        </div>
      )}
    </div>
  );
}

export default CastingPage;
