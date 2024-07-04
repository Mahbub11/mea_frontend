import React from "react";
import {
  Page,
  Document,
  Image,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import InvoiceTitle from "./InvoiceTitle";
import Auth from "./Auth";
import WorkOrderAddressLine from "./WorkOrderAddressLine";
import Subject from "./Subject";
import Message from "./Message";
import ItemsInfo from "./ItemsInfo";
import Footer from "./Footer";
import logo from "../../Assets/Logo/smartConsLogo.jpeg";
import WorkOrderItemsTable from "./WorkOrderItemsTable";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 15,
    paddingTop: 30,
    paddingLeft: 15,
    paddingRight: 10,
    lineHeight: 1,
    flexDirection: "column",
  },
  itemsSpace: {
    textAlign: "center",
    fontSize: "20",
    fontWeight: "bold",
    marginTop: "15px",
  },
  subject: {
    textDecoration: "underline",
    marginTop: 10,
  },
  billTo: {
    marginTop: 40,
    fontSize:'14px'
  },
  lineView: {
    display: "flex",
    flexDirection: "column",
    marginTop: 5,
  },
  secondStep: {
    gap: 5,
    display: "flex",
    flexDirection: "column",
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold",
  },
  second: {
    marginTop: 10,
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold",
  },
  metaData: {
    marginTop: '20px',
    lineHeight: 1.3,
    fontSize:'12px'
  },
  inner_row: {
    gap: 5,
    flexDirection: "row",
    alignItems: "center",
    marginTop: "3px",
  },
  text: {
    fontWeight: "light",
    fontSize:'10px',
    marginTop: "8px",
    lineHeight: 1.2,
  },
  logo: {
    width: "60px",
    height: "60px",
    position: "absolute",
    marginTop: "35px",
    marginRight: "15px",
    right: 0,
  },
});

const WorkOrder = ({ data }) => (
  <Document>
    {console.log(data)}
    <Page size="A4" style={styles.page}>
      <InvoiceTitle title="Work Order" />
      <Image style={styles.logo} src={logo} />
      {/* <InvoiceNo invoice={invoice}/> */}
      <Text style={styles.billTo}>To,</Text>
      <WorkOrderAddressLine items={data.addressLine}></WorkOrderAddressLine>

      <Subject subject={data.subject}></Subject>
      <Message message={data.message}></Message>
      <View style={styles.second}>
        <WorkOrderItemsTable data={data}></WorkOrderItemsTable>
      </View>

      <View>
        <View style={styles.text}>
          <Text style={styles.inner_row}>
            Purchase Order Date: {data.orderDate}
          </Text>
          <Text style={styles.inner_row}>
            Delivery Date: {data.deliveryDate}
          </Text>
          <Text style={styles.inner_row}>
            Delivery Time: {data.deliveryTime}
          </Text>
          <Text style={styles.inner_row}>
            Delivery Site Address: {data.deliveryAddress}
          </Text>
           <Text style={styles.inner_row}>
          Project Manager: {data.contactName}
          </Text>
          <Text style={styles.inner_row}>
          Project Manager Contact: {data.contactNo}
          </Text>
        </View>
      </View>
      <Text style={styles.metaData}>
        Therefore, we cordially requested you to disburse the readymix concrete
        at your earliest. Thanking you in anticipation.
      </Text>
      <Auth></Auth>
      <Footer></Footer>

      {/* <InvoiceThankYouMsg /> */}
    </Page>
  </Document>
);

export default WorkOrder;
