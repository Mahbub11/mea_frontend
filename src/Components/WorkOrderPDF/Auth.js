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
    marginTop: "30px",
  },
  dash: {
    border: "1px",
    borderStyle: "solid",
    width: "100%",
  },
  sapce: {
    height: "50px",
  },
  company: {
    fontWeight: "bold",
    fontFamily:'Helvetica-Bold'
  },
  
});

const Auth = () => (
  <View style={styles.row}>
    <View>
      <Text>Sincerely Yours,</Text>
      <View style={styles.sapce}></View>
      <View>
        <Text style={styles.company}>A.H.M. AHSANUL KABIR</Text>
        <Text>Managing Director</Text>
        <Text>Modern Engineers & Architects</Text>
      </View>
    </View>
  </View>
);

export default Auth;
