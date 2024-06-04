import {
  Button,
  DatePicker,
  Input,
  InputNumber,
  Modal,
  Select,
  Skeleton,
  Table,
  Tag,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { uid } from "uid";
import InvoiceItem from "./InvoiceItem";
import "./index.css";
import ReviewInvoice from "./ReviewInvoice";
import { useDispatch, useSelector } from "react-redux";
import {
  saveSellsReport,
  updateSellsReport,
} from "../../redux/slices/sellsReport";
import { CloseOutlined } from "@ant-design/icons";
import InvoiceFoundItem from "../Casting/InvoiceFoundItem";
import { ShowNotification } from "../../redux/actions";

export default function InvoiceModal({
  invoiceData: data,
  handleInvoiceReFetch,
  previousDue,
}) {

  const [showData,setShowData]= useState()

useEffect(()=>{

  setShowData(data)

},[data])
  const dispatch = useDispatch();
  const [customerName, setCustomerName] = useState();
  const [address, setAddress] = useState();

  const current = new Date();
  const [itemDes, setItemDes] = useState("c-35");
  const [projectName, setProjectName] = useState();
  const [dueDate, setDueDate] = useState();
  const [unit, setUnit] = useState();
  const [m3cft, setm3cft] = useState(35.315);
  const [unitRate, setUnitRate] = useState();
  const [total, setTotal] = useState(0);
  const [remarks, setRemarks] = useState("");
  const [unitcft, setUnitCft] = useState();
  const [vat, setVat] = useState(0);
  const [pumpCharge, setPumpCharge] = useState(0);
  const [rcvAmount, setRCVAmount] = useState(0);
  const [prevDue, setPrevDue] = useState(0);
  const [reviewInvoice, setReviewInvoice] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState();
  const [busy, isBusy] = useState(true);
  const [items, setItems] = useState([
    {
      id: uid(6),
      sno: uid(6),
      itemDes: itemDes,
      m3cft: m3cft,
      unit: data.unit,
      unitcft: unitcft,
      unitRate: data.unit_rate,
      total: total,
      remarks: remarks,
    },
  ]);

  useEffect(() => {
    setCustomerName(data.company.name);
    setProjectName(data.project.name);
    setAddress(data.company.address);
    // setUnit(data.items[0].cubic_meter);
    setItems(
      data.workOrderItems.map((data, key) => {
        return {
          id: uid(6),
          sno: uid(6),
          itemDes: itemDes,
          m3cft: 35.315,
          unit: data.cubic_meter,
          unitcft: data.materials_quantity,
          unitRate: data.materials_rate,
          total: data.work_order_amount,
          remarks: remarks,
        };
      })
    );
  
    data.workOrderItems.map(data=>{
      const convertDta= parseFloat(data.pump_charge)
      setPumpCharge((prev) => prev + parseFloat(convertDta))
    })

    isBusy(false);
  }, [data]);

 

    
  const subtotal = data.workorder.total_amount-pumpCharge;
  const vatRate = (vat * subtotal) / 100;
  const grandTotal =Math.floor( subtotal + pumpCharge + vatRate );
  const netPay = grandTotal + prevDue - rcvAmount;
  const payableAmount = Math.floor(netPay);


  // useEffect(() => {
  //   setUnit(items.unit);
  //   setUnitRate(items.unitRate);
  // }, [items]);

  useEffect(() => {
    setCustomerName(data.company.name);
    setProjectName(data.project.name);
    setAddress(data.company.address);
    setUnit(data.cubic_meter);
    setPrevDue(parseInt(data.prev_amount));
    setRCVAmount(data.paid_amount);
    setUnitRate(data.unit_rate);
    setVat(data.vat);
    // setInvoiceNumber(
    //   `C${data.company.id}P${data.project.id}N${invoiceList.length + 1}`
    // );
    setInvoiceNumber(11);
    if (data.unit < 1000) {
      setPumpCharge(15000);
    }

    isBusy(false);
  }, [data]);


  console.log(previousDue)
  const setPreviousDue = (val) => {
    setPrevDue((value) => value + parseInt(val));
  };

  const addItemHandler = () => {
    const id = uid(6);
    setItems((prevItem) => [
      ...prevItem,
      {
        id: id,
        itemDes: itemDes,
        m3cft: m3cft,
        unit: unit,
        unitcft: unitcft,
        unitRate: unitRate,
        total: total,
        remarks: remarks,
      },
    ]);
  };
  const deleteItemHandler = (id) => {
    setItems((prevItem) => prevItem.filter((item) => item.id !== id));
  };
  const edtiItemHandler = ({ event, flag = 1 }) => {
    if (flag === 1) {
      const editedItem = {
        id: event.target.id,
        name: event.target.name,
        value: event.target.value,
      };

      const newItems = items.map((items) => {
        for (const key in items) {
          if (key === editedItem.name && items.id === editedItem.id) {
            items[key] = editedItem.value;
          }
        }
        return items;
      });

      setItems(newItems);
    } else {
      const editedItem = {
        id: event.id,
        name: event.name,
        value: event.value,
      };

      const newItems = items.map((items) => {
        for (const key in items) {
          if (key === editedItem.name && items.id === editedItem.id) {
            items[key] = editedItem.value;
          }
        }
        return items;
      });

      setItems(newItems);
    }
  };

  const handleReview = () => {
    console.log(Date.now())
    if (!dueDate) {
      dispatch(
        ShowNotification({
          severity: "error",
          message: "Due Date is Required",
        })
      );
      return;
    }

    const SellsReportdata = {
      id: data.id,
      description: items[0].itemDes,
      unit: items[0].unit,
      unit_rate: items[0].unitRate,
      total_amount: payableAmount,
      remarks: items[0].remarks,
      vat: vat,
      due_date: dueDate,
      invoice_number: invoiceNumber,
      prev_amount: prevDue,
      paid_amount: rcvAmount? rcvAmount:0,
     last_print:current
    };

    dispatch(updateSellsReport(SellsReportdata));

    setReviewInvoice(true);
  };

  const onChange = (date, dateString) => {
    
    setDueDate(dateString);
  };

  return (
    <div>
      {busy ? (
        <Skeleton></Skeleton>
      ) : (
        <div className="font-poppins font-[500] md:text-[20px] mt-5">
          <div className="flex justify-end">
            <CloseOutlined onClick={handleInvoiceReFetch}></CloseOutlined>
          </div>
          <div className="px-3 py-3">
            <div className="flex flex-col justify-start gap-1">
              <h1>
                Current Date:{" "}
                <span className="font-[700] text-[17px]">
                  {current.getDate()}-{current.getMonth() + 1}-
                  {current.getFullYear()}
                </span>
              </h1>
              <div className=" md:absolute md:right-[30px] ">
                <h1>
                  Invoice Number:
                  <span className="font-[700] bg-gray-200 rounded-md px-1 py-1">
                    {data.id}
                  </span>
                </h1>
              </div>
              <div className="flex flex-col gap-1">
                <h1>Due Date: </h1>
                <div>
                  <DatePicker onChange={onChange}></DatePicker>
                </div>
              </div>
            </div>
            <hr className="px-2 py-2 mt-10"></hr>
            <div>
              <h1 className="font-poppinsBold md:text-[25px] sm:text-[22px] text-center">
                Invoice
              </h1>
              <div className="flex gap-3">
                <div className="w-[30%]">
                  <div className=" mt-3">
                    <h1>Customer Name: </h1>
                    <Input
                      onChange={(e) => setCustomerName(e.target.value)}
                      value={customerName}
                    ></Input>
                  </div>
                  <div className=" mt-3">
                    <h1>Project Name: </h1>
                    <Input
                      onChange={(e) => setProjectName(e.target.value)}
                      value={projectName}
                    ></Input>
                  </div>
                  <div className=" mt-3">
                    <h1>Address: </h1>
                    <TextArea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className=""
                      rows={2}
                    ></TextArea>
                  </div>
                </div>
                {previousDue.length > 0 ? (
                  <div className="w-[70%]  rounded-md">
                    <div className="px-1 py-1 w-full mt-2">
                      <h2 className=" text-center font-poppinsBold text-[20px]">
                        Previous Due
                      </h2>
                      <div>
                        <div className="mt-2 w-full">
                          <h1 className="font-[700]">ITEM</h1>
                          <hr></hr>

                          <div
                            id="journal-scroll"
                            className="font-poppins font-[300] text-[12px] mt-3 md:overflow-x-auto sm:overflow-x-scroll"
                          >
                            <table className="w-full p-4 text-left text-[13px]">
                              <thead></thead>
                              <tbody>
                                <div className=" flex-col gap-10  px-2 py-2">
                                  {previousDue.map((item) => (
                                    <InvoiceFoundItem
                                      mainInvoiceId={data.id}
                                      key={item.id}
                                      id={item.id}
                                      itemDes={item.description}
                                      unit={item.unit}
                                      m3cft={35.315}
                                      unitcft={item.unitcft}
                                      total_amount={item.total_amount}
                                      unitRate={item.unit_rate}
                                      remarks={item.remarks}
                                      pump_charge={item.pump_charge}
                                      vat={item.vat}
                                      setPreviousDue={setPreviousDue}
                                    />
                                  ))}
                                </div>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="mt-10">
              <h1 className="font-[700]">ITEM</h1>
              <hr></hr>

              <div
                id="journal-scroll"
                className="font-poppins font-[300] text-[17px] mt-3 md:overflow-x-auto sm:overflow-x-scroll"
               >
                {/* <Table pagination={false} columns={columns} dataSource={items} /> */}
                <table className="w-full p-4 text-left text-[15px]">
                  <thead>
                    {/* <tr className="border-b border-gray-300 bg-gray-100 px-2 py-2 flex gap-3 text-sm md:text-base">
                  <th className="w-[8rem]">Description</th>
                  <th className="text-start w-[5rem]">Unit(m3)</th>
                  <th className="text-start w-[5rem]">1m3=cft</th>
                  <th className="text-start w-[5rem]">Unit(cft)</th>
                  <th className="text-start w-[5rem]">Unit Rate</th>
                  <th className="text-start w-[5rem]">Total Amount</th>
                  <th className="text-start w-[5rem]">Remarks</th>
                </tr> */}
                  </thead>
                  <tbody>
                    <div className=" flex-col gap-10  px-2 py-2">
                      {items.map((item) => (
                        <InvoiceItem
                          key={item.id}
                          id={item.id}
                          itemDes={item.itemDes}
                          unit={item.unit}
                          m3cft={item.m3cft}
                          unitcft={item.unitcft}
                          total={item.total}
                          unitRate={item.unitRate}
                          remarks={item.remarks}
                          onDeleteItem={deleteItemHandler}
                          onEdtiItem={edtiItemHandler}
                        />
                      ))}
                    </div>
                  </tbody>
                </table>
              </div>
              <hr></hr>
              <div className="px-2 py-2 ml-1 md:flex md:flex-row sm:flex sm:flex-col justify-between">
                {/* <Button
              className="hover:bg-blue-400 bg-blue-200"
              onClick={addItemHandler}
            >
              Add Item
            </Button> */}
                <div className="flex gap-1 sm:mt-3 md:mt-0 self-end justify-end w-full">
                  <p>Vat Amount(%):</p>
                  <InputNumber
                    min={0}
                    className="font-[700]"
                    onChange={(e) => setVat(e)}
                    value={vat}
                    placeholder="Vat"
                  ></InputNumber>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end space-y-2 pt-6">
            <div className="flex w-full justify-between md:w-1/2">
              <span className="font-bold">Subtotal:</span>
              <span>{subtotal ? subtotal.toLocaleString() : 0}Tk</span>
            </div>
            <div className="flex w-full justify-between md:w-1/2">
              <span className="font-bold">Pump Charge:</span>
              <span>{pumpCharge ? pumpCharge : 0} Tk</span>
            </div>

            <div className="flex w-full justify-between md:w-1/2">
              <span className="font-bold">Vat:</span>
              <span>
                ({vat || "0"}%){vatRate ? vatRate.toLocaleString() : 0}
              </span>
            </div>

            <div className="flex w-full justify-between border-t border-gray-900/10 pt-2 md:w-1/2">
              <span className="font-bold">Total:</span>
              <span className="font-bold">
                {grandTotal ? grandTotal.toLocaleString() : 0} Tk
              </span>
            </div>
            <div className="flex w-full justify-between  pt-2 md:w-1/2">
              <span className="font-bold">Previous Due:</span>
              <span className="font-bold">
                <div className="flex gap-1">
                  <InputNumber
                    disabled
                    decimalSeparator={","}
                    id="rcvAmount"
                    controls={false}
                    style={{ textAlign: "end !important" }}
                    className="w-auto md:text-[20px] flex text-end"
                    value={prevDue}
                    onChange={(e) => setPrevDue(e)}
                    type="number"
                  ></InputNumber>
                  <p className="mt-1">Tk</p>
                </div>
              </span>
            </div>
            <div className="flex w-full justify-between  pt-2 md:w-1/2">
              <span className="font-bold">Received Amount:</span>
              <span className="font-bold">
                <div className="flex gap-1">
                  <InputNumber
                    id="rcvAmount"
                    controls={false}
                    style={{ textAlign: "end !important" }}
                    className="w-auto md:text-[20px] flex text-end"
                    value={rcvAmount}
                    onChange={(e) => setRCVAmount(e)}
                    type="number"
                  ></InputNumber>
                  <p className="mt-1">Tk</p>
                </div>
              </span>
             
            </div>

            <div className="flex w-full justify-between border-t border-gray-900/10 pt-2 md:w-1/2">
              <span className="font-bold">Net Payable Amount:</span>
              <span className="font-bold">
                {payableAmount ? payableAmount.toLocaleString() : 0} Tk
              </span>
            </div>
          </div>
          <Button className="w-full mt-10 font-[700] " onClick={handleReview}>
            Print Invoice
          </Button>

          <div>
            <Modal
              footer={false}
              onCancel={() => setReviewInvoice(false)}
              style={{ width: "50rem" }}
              open={reviewInvoice}
            >
              <ReviewInvoice
                calData={{
                  subtotal,
                  pumpCharge,
                  vatRate,
                  vat,
                  grandTotal,
                  payableAmount,
                  rcvAmount,
                  prevDue,
                }}
                items={items}
                invoice={showData}
                dueDate={dueDate}
              ></ReviewInvoice>
            </Modal>
          </div>
        </div>
      )}
    </div>
  );
}
