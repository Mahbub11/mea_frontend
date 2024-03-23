import React from "react";
import { Page, Document, Image, StyleSheet, Text } from "@react-pdf/renderer";
import InvoiceTitle from "./InvoiceTitle";
import BillTo from "./BillTo";
import InvoiceNo from "./InvoiceNo";
import InvoiceItemsTable from "./InvoiceItemsTable";
import InvoiceThankYouMsg from "./InvoiceThankYouMsg";
import GrandCalculation from "./GrandCalculation";
import Auth from "./Auth";
import logo from "../../Assets/Logo/logo.png";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  items: {
    textAlign: "center",
    fontSize: "20",
    fontWeight: "bold",
    marginTop: 24,
  },
  logo: {
    width: "60px",
    height: "60px",
    position: "absolute",
    marginTop: "45px",
    marginRight: "15px",
    right: 0,
  },
});

const Invoice = ({ invoice }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Image style={styles.logo} src={logo} />
      <InvoiceTitle title="Invoice" />
      <InvoiceNo invoice={invoice} />
      <BillTo invoice={invoice} />
      <Text style={styles.items}>Items</Text>
      <InvoiceItemsTable invoice={invoice} />
      <GrandCalculation invoice={invoice}></GrandCalculation>
      <Auth></Auth>
      <InvoiceThankYouMsg />
    </Page>
  </Document>
);

export default Invoice;
