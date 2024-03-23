import React from "react";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
// import invoice from "../../data/invoice";
import Invoice from "../InvoicePDF/Invoice";
import moment from "moment";

export default function ReviewInvoice({ items, calData, invoice }) {
  const current = new Date();

  console.log(invoice);

  const invoiceData = {
    id: "5df3180a09ea16dc4b95f910",
    invoice_no: invoice.id,
    customer: invoice.company.name,
    email: invoice.company.email,
    phone: invoice.company.phone,
    address: invoice.company.address,
    due_date: moment(invoice.due_date).format("DD-MM-YYYY"),
    trans_date: moment(current).format("DD-MM-YYYY"),
    sub_total: calData.subtotal,
    pump_charge: calData.pumpCharge,
    vatRate: calData.vat,
    vat_amount: calData.vatRate,
    prev_due: Math.floor(calData.prevDue),
    rcv_amount: calData.rcvAmount,
    net_payable: Math.floor(calData.payableAmount),
    items: items,
  };

  return (
    <div className="mt-10">
      <PDFViewer width="sm:w-[300] md:w-[600]" height="600" className="app">
        <Invoice invoice={invoiceData}></Invoice>
      </PDFViewer>

      <div className="px-2 py-2 w-full flex justify-center text-[20px] font-[700] bg-home rounded-md">
        <PDFDownloadLink
          document={<Invoice invoice={invoiceData}></Invoice>}
          fileName={`Invoice ${invoice.company.name}`}
        >
          Download
        </PDFDownloadLink>
      </div>
    </div>
  );
}
