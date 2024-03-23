import { Button, Input, Table, Tag } from "antd";
import React, { useState } from "react";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
// import invoice from "../../data/invoice";
import WorkOrder from "../WorkOrderPDF/WorkOrder";


export default function ReviewWorkOrder({ workOrderData:data,cName }) {
  const current = new Date();

  console.log(cName)

  const[workOrderData,setworkOrderData]= useState()


  useState(()=>{
    setworkOrderData(data)

  },[current])
  console.log(workOrderData);

  const invoiceData = {
    id: "5df3180a09ea16dc4b95f910",
    invoice_no: 22,
    addressLine: workOrderData?.address,
    buildingStatus: workOrderData?.b_status,
    contactName: workOrderData?.c_name,
    contactNo: workOrderData?.c_no,
    date: workOrderData?.issue_date,
    delivaryAddress: workOrderData?.delivery_address,
    delivaryDate: workOrderData?.delivery_date,
    delivaryTime: workOrderData?.delivery_time,
    items: workOrderData?.items,
    message: workOrderData?.message,
    orderDate: workOrderData?.order_date,
    subject: workOrderData?.subject,
  };

  return (
    <div className="mt-10">
      <PDFViewer width="500" height="600" className="app">
        <WorkOrder data={invoiceData}></WorkOrder>
      </PDFViewer>

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
