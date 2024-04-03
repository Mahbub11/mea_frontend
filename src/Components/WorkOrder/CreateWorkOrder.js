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
  TimePicker,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { uid } from "uid";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import {
  saveSellsReport,
  updateSellsReport,
} from "../../redux/slices/sellsReport";
import { CloseOutlined } from "@ant-design/icons";
import InvoiceFoundItem from "../Casting/InvoiceFoundItem";
import { ShowNotification } from "../../redux/actions";
import WorkOrderItem from "./WorkOrderItem";
import AddressLine from "./AddressLine";
import ReviewWorkOrder from "./ReviewWorkOrder";
import { saveWorkOrder, updateworkOrder } from "../../redux/slices/workOrder";
import moment from "moment";

export default function CreateWorkOrder({
  workOrderData: data,
  // handleInvoiceReFetch,
}) {
  const dispatch = useDispatch();

  const current = new Date();

  const [dueDate, setDueDate] = useState();
  const [reviewInvoice, setReviewInvoice] = useState(false);
  const [busy, isBusy] = useState(true);
  const [subject, setSubject] = useState(
    "Work  Order For Supply Of Shah Cement Ready Mix Concrete"
  );
  const [message, setMessage] = useState(
    "In response of your price quotation and verbal discussion we are pleased to Place the work order for supply Shah Cement Ready Mix under the following terms and conditions(100% advanced Paymnet)"
  );
  const [orderDate, setOrderDate] = useState();
  const [deliveryDate, setDeliveryDate] = useState();
  const [deliveryTime, setDeliveryTime] = useState();
  const [deliveryAddress, setDeliveryAddress] = useState(data?.address);
  const [contactName, setContactName] = useState();
  const [contactNo, setContactNo] = useState();
  const [workOrderData, setWorkOrderData] = useState();
  const [disabled, setDisabled] = useState(false);
  const [dynamicInput, setDynamicInput] = useState(false);
  const [totalAmount, setTotalAmount] = useState();
  const [items, setItems] = useState([
    {
      id: uid(6),
      sno: uid(6),
      materials_Name: "MPA",
      materials_category: 25,
      materials_quantity: 0,
      materials_rate: 0,
      cubic_meter: 0,
      work_order_amount: 0,
    },
  ]);
  const [addressLine, setAddressLine] = useState([
    {
      id: uid(6),
      sno: uid(6),
      address: "",
    },
  ]);

  useEffect(() => {
    const amount = items.reduce(
      (n, { work_order_amount }) => n + work_order_amount,
      0
    );
    setTotalAmount(amount);
  }, [items, totalAmount]);

  useEffect(() => {
    setDeliveryAddress(data.project.address);
    setContactName(data.project.site_eng_name);
    setContactNo(data.project.site_eng_phone);
  }, [data]);

  const addItemHandler = () => {
    const id = uid(6);
    setItems((prevItem) => [
      ...prevItem,
      {
        id: uid(6),
        sno: uid(6),
        materials_Name: "MPA",
        materials_category: 25,
        materials_quantity: 0,
        cubic_meter: 0,
        materials_rate: 0,
        work_order_amount: 0,
        disabled: true,
      },
    ]);
  };
  const addAddressLine = () => {
    const id = uid(6);
    setAddressLine((prevItem) => [
      ...prevItem,
      {
        id: uid(6),
        address: "",
        disabled: true,
      },
    ]);
  };
  const deleteItemHandler = (id) => {
    setItems((prevItem) => prevItem.filter((item) => item.id !== id));
  };
  const deleteAddressLine = (id) => {
    setAddressLine((prevItem) => prevItem.filter((item) => item.id !== id));
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
  console.log(items);
  const editAddressLine = ({ event, flag = 1 }) => {
    console.log(event.target.value);
    if (flag === 1) {
      const editedItem = {
        id: event.target.id,
        name: event.target.name,
        value: event.target.value,
      };

      const newItems = addressLine.map((items) => {
        for (const key in items) {
          if (key === editedItem.name && items.id === editedItem.id) {
            items[key] = editedItem.value;
          }
        }
        return items;
      });

      setAddressLine(newItems);
    } else {
      const editedItem = {
        id: event.target.id,
        name: event.target.name,
        value: event.target.value,
      };

      const newItems = addressLine.map((items) => {
        for (const key in items) {
          if (key === editedItem.name && items.id === editedItem.id) {
            items[key] = editedItem.value;
          }
        }
        return items;
      });

      setAddressLine(newItems);
    }
  };

  console.log(addressLine);

  const handleReview = () => {
    // if (!dueDate) {
    //   dispatch(
    //     ShowNotification({
    //       severity: "error",
    //       message: "All Data is Required",
    //     })
    //   );
    //   return;
    // }

    const orderData = {
      cid: data.company.id,
      pid: data.project.id,
      issue_date: dueDate,
      address: addressLine,
      subject: subject,
      message: message,
      items: items,
      amount: totalAmount,
      order_date: orderDate,
      delivery_date: deliveryDate,
      delivery_time: deliveryTime,
      delivery_address: deliveryAddress,
      site_eng_name: contactName,
      site_eng_phone: contactNo,
      total_amount:totalAmount,
      status: 0,
    };

    dispatch(saveWorkOrder(orderData));
    setWorkOrderData(orderData);

    setReviewInvoice(true);
  };

  const onChange = (date, dateString) => {
    setDueDate(dateString);
  };

  const onChangeOrderDate = (date, dateString) => {
    setOrderDate(dateString);
  };
  const onChangeDelivaryDate = (date, dateString) => {
    setDeliveryDate(dateString);
  };

  const onChangeDelivaryTime = (time, timeString) => {
    console.log(time);
    setDeliveryTime();
    setDeliveryTime(timeString);
  };

  console.log(deliveryTime);

  return (
    <div>
      {false ? (
        <Skeleton></Skeleton>
      ) : (
        <div className="font-poppins font-[500] md:text-[20px] mt-2">
          <div className="flex justify-end"></div>
          <div className="px-3 py-3">
            <div className="flex flex-col justify-start gap-1">
              <div className=" md:absolute md:right-[30px] ">
                {/* <h1>
                    Work Order Number:
                    <span className="font-[700] bg-gray-200 rounded-md px-1 py-1">
                      --
                    </span>
                  </h1> */}
              </div>
              <div className="flex flex-col gap-1">
                <div>
                  <DatePicker
                    disabled={disabled ? true : false}
                    // defaultValue={moment(dueDate)}
                    onChange={onChange}
                  ></DatePicker>
                </div>
              </div>
            </div>
            <hr className="px-2 py-2 mt-3"></hr>
            <div>
              <div className="">
                <Button
                  onClick={() => setDisabled(false)}
                  className={`${disabled ? "block" : "hidden"} bg-red-300`}
                >
                  Edit WorkOrder
                </Button>
                <h1 className="font-poppinsBold md:text-[25px] sm:text-[22px] text-center">
                  Work Order
                </h1>
              </div>

              <div className="w-full">
                <div className="flex-col gap-2 w-[50%] mt-3">
                  <h2>To,</h2>

                  <div
                    id="journal-scroll"
                    className="font-poppins font-[300] text-[17px] md:overflow-x-auto sm:overflow-x-scroll"
                  >
                    {/* <Table pagination={false} columns={columns} dataSource={items} /> */}
                    <table className="w-full p-4 text-left text-[15px]">
                      <thead></thead>
                      <tbody>
                        <div className=" flex-col gap-10  px-2 py-2">
                          {addressLine.map((item) => (
                            <AddressLine
                              disabled={dynamicInput}
                              key={item.id}
                              id={item.id}
                              name={item.address}
                              address={item.address}
                              disabledNew={item.disabled}
                              onDeleteItem={deleteAddressLine}
                              onEdtiItem={editAddressLine}
                            />
                          ))}
                        </div>
                      </tbody>
                    </table>
                    <Button
                      className="hover:bg-blue-400 bg-blue-200 ml-3"
                      onClick={addAddressLine}
                    >
                      Add Address Line
                    </Button>
                  </div>
                </div>

                <div className="flex-col gap-2 w-[60%] mt-3">
                  <h2>Subject</h2>
                  <TextArea
                    disabled={disabled ? true : false}
                    value={subject}
                    onChange={(e) => setSubject(e.target.value.trim())}
                    rows={1}
                  ></TextArea>
                </div>
                <div className="flex-col gap-2 w-[60%] mt-3">
                  <h2>Dear Sir,</h2>
                  <TextArea
                    disabled={disabled ? true : false}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                  ></TextArea>
                </div>

                <div className="flex-col gap-2 w-full mt-3">
                  <h2>Item Info,</h2>

                  <div
                    id="journal-scroll"
                    className="font-poppins font-[300] text-[17px] md:overflow-x-auto sm:overflow-x-scroll"
                  >
                    {/* <Table pagination={false} columns={columns} dataSource={items} /> */}
                    <table className="w-full p-4 text-left text-[15px]">
                      <thead></thead>
                      <tbody>
                        <div className=" flex gap-10  px-2 py-2 flex-wrap">
                          {items.map((item) => (
                            <WorkOrderItem
                              disabled={dynamicInput}
                              disabledNew={item.disabled}
                              key={item.id}
                              id={item.id}
                              materials_name={item.materials_Name}
                              materials_category={item.materials_category}
                              materials_quantity={item.materials_quantity}
                              materials_rate={item.materials_rate}
                              work_order_amount={item.work_order_amount}
                              cubic_meter={item.cubic_meter}
                              onDeleteItem={deleteItemHandler}
                              onEdtiItem={edtiItemHandler}
                            />
                          ))}
                        </div>
                      </tbody>
                    </table>
                    <div className="ml-3 mt-5">
                      <h2 className="font-poppinsBold text-[20px]">
                        Total Amount :
                        {totalAmount ? totalAmount.toLocaleString() : 0}
                      </h2>
                      <Button
                        className="hover:bg-blue-400 bg-blue-200  mt-3"
                        onClick={addItemHandler}
                      >
                        Add Item
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="mt-5 w-[30%] flex-col gap-3">
                  <div className="mt-2">
                    <h2>Purchase Order Date</h2>
                    <DatePicker
                      disabled={disabled ? true : false}
                      defaultValue={orderDate ? moment(orderDate) : ""}
                      style={{ color: "red" }}
                      onChange={onChangeOrderDate}
                    ></DatePicker>
                  </div>
                  <div className="mt-2">
                    <h2>Delivery Date</h2>
                    <DatePicker
                      disabled={disabled ? true : false}
                      defaultValue={deliveryDate ? moment(deliveryDate) : ""}
                      style={{ color: "red" }}
                      onChange={onChangeDelivaryDate}
                    ></DatePicker>
                  </div>
                  <div className="mt-2">
                    <h2>Delivery Time</h2>
                    <TimePicker
                      disabled={disabled ? true : false}
                      defaultValue={
                        deliveryTime ? moment(deliveryTime, "HH:mm") : ""
                      }
                      style={{ color: "red" }}
                      needConfirm={false}
                      onChange={onChangeDelivaryTime}
                      use12Hours
                    />
                  </div>

                  <div className="mt-2">
                    <h2>Delivery Site Address</h2>
                    <TextArea
                      disabled={disabled ? true : false}
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      rows={3}
                    ></TextArea>
                  </div>

                  <div className="mt-2">
                    <h2>Contact Name</h2>
                    <Input
                      disabled={disabled ? true : false}
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                    ></Input>
                  </div>
                  <div className="mt-2">
                    <h2>Contact No</h2>
                    <Input
                      disabled={disabled ? true : false}
                      value={contactNo}
                      onChange={(e) => setContactNo(e.target.value)}
                    ></Input>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Button
            className="w-full mt-10 font-[700] border-blue-400"
            onClick={handleReview}
          >
            Print Work Order
          </Button>

          <div>
            <Modal
              footer={false}
              onCancel={() => setReviewInvoice(false)}
              style={{ width: "70rem" }}
              open={reviewInvoice}
            >
              <ReviewWorkOrder
                cName={data}
                workOrderData={workOrderData}
              ></ReviewWorkOrder>
            </Modal>
          </div>
        </div>
      )}
    </div>
  );
}
