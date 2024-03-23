import { Modal, Skeleton } from "antd";
import Search from "antd/es/input/Search";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CastingList from "../../Components/Casting/CastingList";
import { getSellsList } from "../../redux/slices/sells";
import EditSell from "../../Components/Casting/EditSell";
import InvoiceModal from "../../Components/Invoice/InvoiceModal";
import { getInvoiceList } from "../../redux/slices/invoice";
import { getSellsReportList } from "../../redux/slices/sellsReport";
import CastingAnalysisList from "../../Components/Casting/CastingAnalysisList";

function CastingAnalysis(props) {
  const dispatch = useDispatch();
  const { sellsReportList } = useSelector((state) => state.sellsReport);
  const { invoiceList } = useSelector((state) => state.invoice);
  const [busy, isBusy] = useState(true);
  const [filterData, setFilterData] = useState();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 720);
  const [showEdit, isShowEdit] = useState(false);
  const [editData, setEditData] = useState();
  const [invoiceData, setInvoiceData] = useState();
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
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

  const handleInvoiceReFetch = () => {
    isBusy(true);
    setShowInvoiceModal(false);
  };

  return (
    <div>
      {busy ? (
        <Skeleton></Skeleton>
      ) : (
        <div>
          <div className="mt-5">
            <h2 className="text-center font-poppinsBold text-[35px]">
              Casting Analysis
            </h2>
            <div className="w-full flex justify-center mt-5">
              <Search
                className="md:w-[40%] sm:w-full px-2 sm:h-[10%] rounded-md "
                placeholder="Search Company"
                onChange={handleSearch}
              />
            </div>
            <div className="mt-2 md:w-[90%] sm:w-full m-auto">
              <CastingAnalysisList
                // createInvoice={createInvoice}
                handleEditCompany={handleEditCompany}
                list={filterData}
                handleReFetch={handleReFetch}
              ></CastingAnalysisList>
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
                {/* <EditSell
                  handleReFetch={handleReFetch}
                  data={editData}
                  handleCloseModal={handleCloseModal}
                ></EditSell> */}
              </div>
            </Modal>
          </div>
        </div>
      )}
    </div>
  );
}

export default CastingAnalysis;
