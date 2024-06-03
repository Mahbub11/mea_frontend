import { Button, Input, Table, Tag } from "antd";
import React, { useState } from "react";
import { PDFViewer, PDFDownloadLink, pdf } from "@react-pdf/renderer";
// import invoice from "../../data/invoice";
import WorkOrder from "../WorkOrderPDF/WorkOrder";
import axiosInstance from "../../utils/axios";
import { API_LEVEL } from "../../config";
import { useDispatch } from "react-redux";
import { ShowNotification } from "../../redux/actions";

export default function ReviewWorkOrder({ workOrderData: data, cName }) {
  const current = new Date();
  const dispatch = useDispatch();

  console.log(cName);

  const [workOrderData, setworkOrderData] = useState();

  useState(() => {
    setworkOrderData(data);
  }, [current]);
  console.log(workOrderData);

  const invoiceData = {
    id: "5df3180a09ea16dc4b95f910",
    invoice_no: 22,
    addressLine: workOrderData?.address,
    buildingStatus: workOrderData?.b_status,
    contactName: workOrderData?.site_eng_name,
    contactNo: workOrderData?.site_eng_phone,
    date: workOrderData?.order_date,
    deliveryAddress: workOrderData?.delivery_address,
    deliveryDate: workOrderData?.delivery_date,
    deliveryTime: workOrderData?.delivery_time,
    items: workOrderData?.items,
    amount: workOrderData?.amount,
    message: workOrderData?.message,
    orderDate: workOrderData?.order_date,
    subject: workOrderData?.subject,
  };
  const sentEmail = async () => {
    pdf(<WorkOrder data={invoiceData}></WorkOrder>)
      .toBlob()
      .then((blob) => {
        const formData = new FormData();
        formData.append("myfile", blob, `WorkOrder ${cName.company.name}`);
        formData.append("name", `WorkOrder ${cName.company.name}`);
        formData.append("subject", `WorkOrder  SMART-CONSTRUCTIONS`);
        formData.append("text", `Please find the attached PDF WorkOrder`);

        axiosInstance
          .post(`${API_LEVEL}/sells/pdf`, formData)
          .then((res) => {
            dispatch(
              ShowNotification({
                severity: "success",
                message: "Email Sent!",
              })
            );
          })
          .catch((err) => {
            dispatch(
              ShowNotification({
                severity: "error",
                message: "Email Sent Failed",
              })
            );
          });
      });

    return;
  };

  return (
    <div className="mt-10">
      <div className="flex justify-center gap-5 bg-gray-100 px-2 py-2">
        <h2
          className="bg-home px-2 py-2 rounded-md font-[700]
        "
        >
          {cName.company.email}
        </h2>
        <button
          className="bg-tahiti rounded-md px-2 py-2 text-white"
          onClick={sentEmail}
        >
          Send Email
        </button>
      </div>
      <div className="flex justify-center px-2 py-5">
        <PDFViewer width="500" height="600" className="app">
          <WorkOrder data={invoiceData}></WorkOrder>
        </PDFViewer>
      </div>

      <div className="px-2 py-2 w-full flex justify-center text-[20px] font-[700] bg-home rounded-md">
        <PDFDownloadLink
          document={<WorkOrder data={invoiceData}></WorkOrder>}
          fileName={`work_order ${cName}`}
        >
          Download
        </PDFDownloadLink>
      </div>
    </div>
  );
}
