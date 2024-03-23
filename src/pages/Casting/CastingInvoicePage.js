import { Modal, Skeleton } from "antd";
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

function CastingInvoicePage(props) {
  const dispatch = useDispatch();
  const { sellsReportList } = useSelector((state) => state.sellsReport);
  const { sellsList } = useSelector((state) => state.sells);
  const { invoiceList } = useSelector((state) => state.invoice);
  const [busy, isBusy] = useState(true);
  const [filterData, setFilterData] = useState();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 720);
  const [showEdit, isShowEdit] = useState(false);
  const [editData, setEditData] = useState();
  const [invoiceData, setInvoiceData] = useState();
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [previousDue, setPreviousDue] = useState([]);
  const [alreadyInvoiced, setAlreadyInvoiced] = useState(false);
  const [alreadyInvoicedData, setAlreadyInvoicedData] = useState();
  const config = isMobile
    ? { maxWidth: "98vw", padding: 0 }
    : { maxWidth: "80vw" };

  useEffect(() => {
    dispatch(getSellsList());
    dispatch(getInvoiceList());
    setFilterData(sellsList);
    isBusy(false);
  }, [busy, dispatch]);

  useEffect(() => {
    setFilterData(sellsList);
  }, [sellsList]);

  const handleSearch = (e) => {
    if (e.target.value.length === 0) {
      setFilterData(sellsList);
    } else {
      const newData = sellsList.filter((val) =>
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

  const createInvoice = async (id) => {
    await axiosInstance
      .get(`${API_LEVEL}/sells-report/get-existing-report/${id}`)
      .then((response) => {
        if (response.data.success) {
          console.log(response.data);

          setAlreadyInvoicedData(response.data.data);
          setAlreadyInvoiced(true);
        } else {
          const data = sellsList.find((item) => item.id === id);
          setInvoiceData(data);

          const prevDue = sellsList.filter(
            (val) =>
            val.id !== id &&
              val.cid === data.company.id &&
              val.pid === data.project.id &&
              (val.status === 0 || val.state === 3)
          );

          const finalCalculateVal = prevDue.map((val) => ({
            ...val,
            due: val.total_amount - val.paid_amount,
          }));

          setPreviousDue(finalCalculateVal);
          setShowInvoiceModal(true);
        }

        console.log(response);
      })

      .catch((error) => {
        console.log(error);
        dispatch(
          ShowNotification({
            severity: "error",
            message: "Something went wrong!",
          })
        );
      });

    return;
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
              Casting Invoice
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
                createInvoice={createInvoice}
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
                <InvoiceModal
                  handleInvoiceReFetch={handleInvoiceReFetch}
                  invoiceList={invoiceList}
                  invoiceData={invoiceData}
                  previousDue={previousDue}
                ></InvoiceModal>
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
              open={alreadyInvoiced}
              onCancel={() => setAlreadyInvoiced(false)}
              className=" top-[1rem] m-auto z-10"
            >
              <div>
                <InvoiceFound data= {alreadyInvoicedData}></InvoiceFound>
              </div>
            </Modal>
          </div>
        </div>
      )}
    </div>
  );
}

export default CastingInvoicePage;
