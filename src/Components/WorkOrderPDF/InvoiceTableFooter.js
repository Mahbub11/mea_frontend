import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "#90e5fc";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontSize: 12,
    fontStyle: "bold",
  },
  description: {
    width: "72%",
    textAlign: "right",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingRight: 8,
  },
  total: {
    width: "28%",
    textAlign: "left",
    paddingRight: 8,
    marginLeft:'10px'
  },
});

const InvoiceTableFooter = ({ amount }) => {
  return (
    <View style={styles.row}>
      <Text style={styles.description}>TOTAL</Text>
      <Text style={styles.total}>
        {Number.parseFloat(amount).toFixed(2)}{" "}
      </Text>
    </View>
  );
};

export default InvoiceTableFooter;
