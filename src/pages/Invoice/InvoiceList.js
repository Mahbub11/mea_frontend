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
import InvoiceListShow from "../../Components/InvoiceList/InvoiceListShow";
import { getSellsReportList } from "../../redux/slices/sellsReport";
import WorkOrderModal from "../../Components/WorkOrder/WorkOrderModal";
import CastingItems from "../../Components/Casting/CastingItems";
import InvoiceItem from "../../Components/Invoice/InvoiceItem";
import InvoiceBillItems from "../../Components/Invoice/InvoiceBillItems";

function InvoiceList(props) {
  const dispatch = useDispatch();
  const { billList } = useSelector((state) => state.sellsReport);
  // const { sellsList } = useSelector((state) => state.sells);
  const { invoiceList } = useSelector((state) => state.invoice);
  const [busy, isBusy] = useState(true);
  const [filterData, setFilterData] = useState();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 720);
  const [showEdit, isShowEdit] = useState(false);
  const [editData, setEditData] = useState();
  const [invoiceData, setInvoiceData] = useState();
  const [workOrderData, setworkOrderData] = useState();
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showWorkOrderModal, setShowWorkOrderModal] = useState(false);
  const [previousDue, setPreviousDue] = useState([]);
  const [drawer, setDrawer] = useState(false);
  const [castingItems, setCastingItems] = useState();

  const config = isMobile
    ? { maxWidth: "98vw", padding: 0 }
    : { maxWidth: "80vw" };

  useEffect(() => {
    // dispatch(getSellsList());
    // dispatch(getInvoiceList());
    dispatch(getSellsReportList());
    isBusy(false);
  }, [busy, dispatch]);

  console.log(billList);

  useEffect(() => {
    setFilterData(billList);
  }, [billList]);

  const handleSearch = (e) => {
    if (e.target.value.length === 0) {
      setFilterData(billList);
    } else {
      const newData = billList.filter((val) =>
        val.company.name
          .toLocaleLowerCase()
          .includes(e.target.value.toLocaleLowerCase())
      );

      setFilterData(newData);
    }
  };

  const handleReFetch = () => {
    isBusy(true);
    isShowEdit(false);

    // window.location.reload();
  };

  const createWorkOrder = (id) => {
    const data = billList.find((item) => item.id === id);

    console.log(data);
    setworkOrderData(data);
    setShowWorkOrderModal(true);
  };

  const workOrderModal = () => {
    isBusy(true);
    setShowWorkOrderModal(false);
  };

  const createInvoice = async (id) => {
    const data = billList.find((item) => item.id === id);
    setInvoiceData(data);

    const prevDue = billList.filter(
      (val) =>
        val.id !== id &&
        val.cid === data.company.id &&
        val.pid === data.project.id &&
        (val.status === 1 || val.state === 3) &&
        data.due_date > val.due_date
    );

    // const finalCalculateVal = prevDue.map((val) => ({
    //   ...val,
    //   due: val.total_amount - val.paid_amount,
    // }));

    setPreviousDue(prevDue);
    setShowInvoiceModal(true);
  };

  const handleInvoiceReFetch = () => {
    isBusy(true);
    setShowInvoiceModal(false);
  };
  const openItems = (id) => {
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
              Invoice
            </h2>
            <div className="w-full flex justify-center mt-5">
              <Search
                className="md:w-[40%] sm:w-full px-2 sm:h-[10%] rounded-md "
                placeholder="Search Company"
                onChange={handleSearch}
              />
            </div>
            <div className="mt-2 md:w-[90%] sm:w-full m-auto">
              <InvoiceListShow
                openItems={openItems}
                createInvoice={createInvoice}
                // createWorkOrder={createWorkOrder}
                list={filterData}
                handleReFetch={handleReFetch}
              ></InvoiceListShow>
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
                <InvoiceModal
                  handleInvoiceReFetch={handleInvoiceReFetch}
                  // sellsReportList={billList}
                  invoiceData={invoiceData}
                  previousDue={previousDue}
                ></InvoiceModal>
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
            width={1024}
            onClose={() => setDrawer(false)}
            open={drawer}
          >
            <InvoiceBillItems data={castingItems}></InvoiceBillItems>
          </Drawer>
        </div>
      )}
    </div>
  );
}

export default InvoiceList;
