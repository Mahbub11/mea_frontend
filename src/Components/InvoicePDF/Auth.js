import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  row: {
    fontSize: 12,
    fontWeight: "bold",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop:'100px'
  },
  dash: {
    border: "1px",
    borderStyle: "solid",
    width: "100%",
  },
});

const Auth = () => (
  <View style={styles.row}>
    <View>
      <View style={styles.dash}></View>
      <Text style={styles.reportTitle}>Received By</Text>
    </View>
    <View>
      <View style={styles.dash}></View>
      <Text style={styles.reportTitle}>Authorized Signature</Text>
    </View>
  </View>
);

export default Auth;
