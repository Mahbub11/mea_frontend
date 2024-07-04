import { Drawer, Modal, Skeleton } from "antd";
import Search from "antd/es/input/Search";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInvoiceList } from "../../redux/slices/invoice";
import { getSellsReportList } from "../../redux/slices/sellsReport";
import CastingAnalysisList from "../../Components/Casting/CastingAnalysisList";
import CastingItems from "../../Components/Casting/CastingItems";
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;

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
  const [drawer, setDrawer] = useState(false);
  const [castingItems, setCastingItems] = useState();
  const [projectDetails, setProjectDetails] = useState();
  const [dateRange, setDateRange] = useState([]);
  const [dateRange1, setDateRange1] = useState([]);
  const config = isMobile
    ? { maxWidth: "98vw", padding: 0 }
    : { maxWidth: "80vw" };

  console.log(sellsReportList);

  useEffect(() => {
    dispatch(getSellsReportList());
    dispatch(getInvoiceList());
    setFilterData(sellsReportList);
    isBusy(false);
  }, [busy, dispatch]);

  useEffect(() => {
    
    setFilterData(sellsReportList);
  }, [sellsReportList]);
  useEffect(()=>{
    const sortedData = getData(dateRange[0], dateRange[1], sellsReportList);
    setFilterData(sortedData)
  },[dateRange])

  useEffect(()=>{
    const sortedData = getData(dateRange1[0], dateRange1[1], sellsReportList);
    setFilterData(sortedData)
  },[dateRange1])

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
  const openProjectList = (id) => {
    setDrawer(true);
    const data = filterData.filter((val) => val.id === id)[0];
    setCastingItems(data);
  };
  const onChange = (date, dateString) => {
    setDateRange(dateString);
  };
  const onChange1 = (date, dateString) => {
    setDateRange1(dateString);
  };
  
  function getData(start, end, data) {
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();

    return data.filter((item) => {
      console.log(item);
      const itemTime = new Date(item.due_date).getTime();

      return itemTime >= startTime && itemTime <= endTime;
    });
  }
  function getData1(start, end, data) {
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();

    return data.filter((item) => {
      console.log(item);
      const itemTime = new Date(item.createdAt).getTime();

      return itemTime >= startTime && itemTime <= endTime;
    });
  }
  return (
    <div>
      {busy ? (
        <Skeleton></Skeleton>
      ) : (
        <div>
          <div className="mt-5">
            <h2 className="text-center font-poppinsBold text-[35px]">
              Sells Analysis
            </h2>
            <div className="w-full flex justify-center mt-5">
              <Search
                className="md:w-[40%] sm:w-full px-2 sm:h-[10%] rounded-md "
                placeholder="Search Company"
                onChange={handleSearch}
              />
            </div>
            <div className="flex justify-center">
              <div className="px-2 py-2">
                <RangePicker  onChange={onChange} />
                <h2 className="text-center font-[700]">Sort by Due Date</h2>
              </div>
              <div className="px-2 py-2">
                <RangePicker  onChange={onChange1} />
                <h2 className="text-center font-[700]">Sort by Issue Date</h2>
              </div>
            </div>
            <div className="mt-2 md:w-[90%] sm:w-full m-auto">
              <CastingAnalysisList
                // createInvoice={createInvoice}
                openProjectList={openProjectList}
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

          <Drawer
            closable={true}
            width={1024}
            onClose={() => setDrawer(false)}
            open={drawer}
          >
            <CastingItems
             
              data={castingItems}
            ></CastingItems>
          </Drawer>
        </div>
      )}
    </div>
  );
}

export default CastingAnalysis;
