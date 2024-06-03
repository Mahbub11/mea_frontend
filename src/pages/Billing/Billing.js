import { Drawer, Modal, Skeleton } from "antd";
import Search from "antd/es/input/Search";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInvoiceList } from "../../redux/slices/invoice";
import { getSellsReportList } from "../../redux/slices/sellsReport";
import BillingList from "../../Components/Billing/BillingList";
import EditBillData from "../../Components/Billing/EditBillData";
import CastingItems from "../../Components/Casting/CastingItems";

function Billing(props) {
  const dispatch = useDispatch();
  const { sellsReportList } = useSelector((state) => state.sellsReport);
  const { invoiceList } = useSelector((state) => state.invoice);
  const [busy, isBusy] = useState(true);
  const [filterData, setFilterData] = useState();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 720);
  const [showEdit, isShowEdit] = useState(false);
  const [editData, setEditData] = useState();
  const [drawer, setDrawer] = useState(false);
  const [castingItems, setCastingItems] = useState();
  const [projectDetails, setProjectDetails] = useState()
  const config = isMobile
    ? { maxWidth: "98vw", padding: 0 }
    : { maxWidth: "80vw" };

    console.log(sellsReportList)

  useEffect(() => {
    dispatch(getSellsReportList());
    dispatch(getInvoiceList());
    setFilterData(sellsReportList);
    isBusy(false);
  }, [busy, dispatch]);

  useEffect(() => {
    setFilterData(sellsReportList);
  }, [sellsReportList]);

  const handleSearch = (e) => {
    if (e.target.value.length === 0) {
      setFilterData(sellsReportList);
    } else {
      const newData = sellsReportList.filter((val) =>
        val.company.name
          .toLocaleLowerCase()
          .includes(e.target.value.toLocaleLowerCase())
      );

      setFilterData(newData);
    }
  };

  const handleEditBill = (id) => {
    setEditData();
    const data = filterData.filter((data) => data.id === id);
    setEditData(data[0]);
    isShowEdit(true);
  };

  const handleReFetch = () => {
    isBusy(true);
  };

  const handleCloseModal = () => {
    isBusy(true);
    isShowEdit(false);
  };
  const openProjectList = (id) => {
    const data = filterData.filter((val) => val.id === id)[0];
    setCastingItems(data.workorder);
    setProjectDetails(data.project)
       setDrawer(true);
  };


  return (
    <div>
      {busy ? (
        <Skeleton></Skeleton>
      ) : (
        <div>
          <div className="mt-5">
            <h2 className="text-center font-poppinsBold text-[35px]">
              Billing List
            </h2>
            <div className="w-full flex justify-center mt-5">
              <Search
                className="md:w-[40%] sm:w-full px-2 sm:h-[10%] rounded-md "
                placeholder="Search Company"
                onChange={handleSearch}
              />
            </div>
            <div className="mt-2  sm:w-full m-auto">
              <BillingList
                openProjectList={openProjectList}
                handleEditBill={handleEditBill}
                list={filterData}
                handleReFetch={handleReFetch}
              ></BillingList>
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
                <EditBillData
                  data={editData}
                  handleInvoiceReFetch={handleCloseModal}
                ></EditBillData>
              </div>
            </Modal>
          </div>

          <Drawer
            closable={true}
            width={1024}
            onClose={() => setDrawer(false)}
            open={drawer}
          >
            <CastingItems project={projectDetails} data={castingItems}></CastingItems>
          </Drawer>
        </div>
      )}
    </div>
  );
}

export default Billing;
