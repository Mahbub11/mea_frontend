import { Button, InputNumber, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import { API_LEVEL } from "../../config";
import { useDispatch } from "react-redux";
import { ShowNotification } from "../../redux/actions";
import PaymentList from "../../Components/Payment/PaymentList";
import "./index.css";

export default function Payment() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [busy, isBusy] = useState(true);
  const [invoiceId, setInvoiceId] = useState();
  const [totalAmount, setTotalAmount] = useState(0);
  const [rcvAmount, setRcvAmount] = useState(0);
  const [remainAmount, setRemainAmount] = useState(0);

  const [showBox, setShowBox] = useState(false);

  useEffect(() => {
    setRemainAmount(totalAmount - rcvAmount);
  }, [rcvAmount, totalAmount]);

  useEffect(() => {
    setRemainAmount();
    setRcvAmount();
    setTableData(data);
    setTotalAmount(data[0]?.total_amount);
    isBusy(false);
  }, [data, busy, showBox, tableData]);

  const getPaymentInfo = async () => {
    if (!invoiceId) {
      dispatch(
        ShowNotification({
          severity: "error",
          message: "Provide Invoice Id",
        })
      );

      return;
    }
    isBusy(true);
    await axiosInstance
      .get(`${API_LEVEL}/payment/info-get/${invoiceId}`)
      .then((response) => {
        setData(response.data.data);
        setShowBox(true);
        dispatch(
          ShowNotification({
            severity: "success",
            message: "Bill Info Received",
          })
        );
      })

      .catch((error) => {
        setTableData([]);
        setShowBox(false);
        console.log(error);
        dispatch(
          ShowNotification({ severity: "error", message: error.message })
        );
      });
  };

  const pay = async () => {
    const Cashdata = {
      id: data[0].id,
      received_amount: parseFloat(data[0].paid_amount) + parseFloat(rcvAmount),
      remaining_amount: parseInt(remainAmount),
    };
    await axiosInstance
      .put(`${API_LEVEL}/payment/pay`, Cashdata)
      .then((response) => {
        dispatch(
          ShowNotification({
            severity: "success",
            message: "Payment Successfull!",
          })
        );
      })

      .catch((error) => {
        console.log(error);
        dispatch(
          ShowNotification({ severity: "error", message: error.message })
        );
      });
  };

  console.log(tableData);
  return (
    <div className="mt-10 h-screen">
      <div>
        <h1 className="text-center text-[30px] font-poppinsBold">Payment</h1>

        <div className="w-[70%] m-auto  px-2 py-2">
          <div className="flex justify-center">
            <div className="flex flex-col gap-2">
              <InputNumber
                onChange={(e) => setInvoiceId(e)}
                id="invoiceId"
                className="w-full m-auto"
                placeholder="Enter Invoice Number"
              ></InputNumber>
              <Button onClick={getPaymentInfo}>GET</Button>
            </div>
          </div>
        </div>
      </div>

      <div>
        {busy ? (
          <Skeleton></Skeleton>
        ) : (
          <div className={`${showBox ? "block" : "hidden"}`}>
            <div className="mt-2 md:w-[90%] sm:w-full m-auto">
              <PaymentList list={tableData}></PaymentList>
            </div>

            <div className="w-[40%] m-auto mt-10">
              <div className="flex justify-between text-[25px] gap-10">
                <h2 className="">Total Amount:</h2>
                <span className="font-[700]">
                  {totalAmount <= 0 ? (
                    <span className="text-green-400">PAID</span>
                  ) : (
                    <span>
                      {totalAmount?.toLocaleString()} {""}Tk{" "}
                    </span>
                  )}
                </span>
              </div>
              <div className="flex justify-between text-[25px] gap-10 mt-5">
                <h2 className="">Received Amount:</h2>
                <InputNumber
                  id="rcvAmount"
                  type="number"
                  controls={false}
                  style={{ textAlign: "end !important" }}
                  className="w-auto font-[700] md:text-[20px] flex text-end justify-end"
                  onChange={(e) => setRcvAmount(e)}
                ></InputNumber>
              </div>

              <hr className="mt-5"></hr>
              <div className="flex justify-between text-[25px] ">
                <h2 className="">Remaining Amount:</h2>
                <span className="font-[700]">
                  {remainAmount?.toLocaleString()} {""}Tk
                </span>
              </div>

              <Button
                onClick={pay}
                className="mt-10 w-full border border-blue-400"
              >
                Save Bill Info
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
