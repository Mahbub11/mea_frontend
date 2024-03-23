import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 36,
  },
  billTo: {
    marginTop: 20,
    paddingBottom: 3,
    fontFamily: "Helvetica-Oblique",
  },
  row: {
    fontSize: 12,
    fontWeight: "bold",
    width: "60%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  hr:{
    borderTop: "2px"
  }
});

const GrandCalculation = ({ invoice }) => (
  <View style={styles.headerContainer}>
    <View style={styles.row}>
      <Text>Items</Text>
      <Text>{invoice.sub_total} Tk</Text>
    </View>
    <View style={styles.row}>
      <Text>Pump Charge</Text>
      <Text>{invoice.pump_charge} Tk</Text>
    </View>
    <View style={styles.row}>
      <Text>Vat</Text>
      <Text>
        ({invoice.vatRate}%) {invoice.vat_amount} Tk
      </Text>
    </View>
    <View style={styles.row}>
      <Text>Previous Due</Text>
      <Text>{invoice.prev_due} Tk</Text>
    </View>
    <View style={styles.row}>
      <Text>Received Amount</Text>
      <Text>{invoice.rcv_amount} Tk</Text>
    </View>
    <View style={styles.hr}>

    </View>
    <View style={styles.row}>
      <Text>Net Payable</Text>
      <Text>{invoice.net_payable} Tk</Text>
    </View>
  </View>
);

export default GrandCalculation;
