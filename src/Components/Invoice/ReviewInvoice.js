import React from "react";
import { PDFViewer, PDFDownloadLink, pdf } from "@react-pdf/renderer";
// import invoice from "../../data/invoice";
import Invoice from "../InvoicePDF/Invoice";
import moment from "moment";
import axiosInstance from "../../utils/axios";
import { API_LEVEL, LIVE_URL } from "../../config";
import { Input } from "antd";
import { useDispatch } from "react-redux";
import { ShowNotification } from "../../redux/actions";

export default function ReviewInvoice({ dueDate, items, calData, invoice }) {
  const current = new Date();
  const dispatch= useDispatch()

  console.log(invoice);

  const invoiceData = {
    id: "5df3180a09ea16dc4b95f910",
    invoice_no: invoice.id,
    customer: invoice.company.name,
    email: invoice.company.email,
    phone: invoice.company.phone,
    address: invoice.company.address,
    due_date: moment(dueDate).format("DD-MM-YYYY"),
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

  // const sendMail = async (file) => {

  //     var transporter = nodemailer.createTransport({
  //       host: process.env.SMPT_HOST,
  //       secure: true,
  //       secureConnection: false, // TLS requires secureConnection to be false
  //       tls: {
  //         ciphers: "SSLv3",
  //       },
  //       requireTLS: true,
  //       port: process.env.SMPT_PORT,
  //       debug: true,
  //       auth: {
  //         user: process.env.SMPT_MAIL,
  //         pass: process.env.SMPT_PASSWORD,
  //       },
  //     });

  //     const mailOptions = {
  //       from: "PracticeCompanions <info@practicecompanions.com>",
  //       to: 'mahbubrahim926@gmail.com',
  //       subject: 'AS',
  //       text: "AS",
  //       attachments: [{
  //         filename: 'dd',
  //         streamSource: file
  //     }]
  //     };

  //     await transporter.sendMail(mailOptions);
  //   };
  const sentEmail = async () => {
    pdf(<Invoice invoice={invoiceData}></Invoice>)
      .toBlob()
      .then((blob) => {
        const formData = new FormData();
        formData.append("myfile", blob, `Invoice ${invoice.company.name}`);
        formData.append("name", `Invoice ${invoice.company.name}`);
        formData.append("subject", `Invoice from SMART-CONSTRUCTIONS`);
        formData.append("text", `Please find the attached PDF invoice`);

        axiosInstance.post(`${API_LEVEL}/sells/pdf`, formData).then((res)=>{
          dispatch(ShowNotification({
            severity:'success',message:'Email Sent!'
          }))
          
        }).catch((err)=>{
          dispatch(ShowNotification({
            severity:'error',message:'Email Sent Failed'
          }))
        })
      });

  };

  return (
    <div className="mt-10">
      <div className="flex justify-center gap-5 bg-gray-100 px-2 py-2">
        <h2
          className="bg-home px-2 py-2 rounded-md font-[700]
        "
        >
          {invoice.company.email}
        </h2>
        <button
          className="bg-tahiti rounded-md px-2 py-2 text-white"
          onClick={sentEmail}
        >
          Send Email
        </button>
      </div>
      <div className="w-full flex justify-center px-2 py-5">
        <PDFViewer width="sm:w-[300] md:w-[600]" height="600" className="app">
          <Invoice invoice={invoiceData}></Invoice>
        </PDFViewer>
      </div>

      <div className="px-2 py-2 w-full flex justify-center text-[20px] font-[700] bg-home rounded-md">
        <PDFDownloadLink
          document={<Invoice invoice={invoiceData}></Invoice>}
          fileName={`Invoice ${invoice.company.name}`}
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : console.log(blob)
          }
          Download
        </PDFDownloadLink>
      </div>
    </div>
  );
}
