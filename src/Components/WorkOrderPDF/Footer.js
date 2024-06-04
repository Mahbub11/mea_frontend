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
    marginTop: "40px",
   
  },
  dash: {
    border: "1px",
    borderStyle: "solid",
    width: "100%",
  },
  sapce: {
    height: "30px",
  },
  company: {
    fontWeight: "bold",
    fontFamily:'Helvetica-Bold'
  },
});

const Footer = () => (
  <View style={styles.row}>
    <View>
      <Text style={styles.company}>modern engineers </Text>
      <Text style={styles.company}>& architects ltd.</Text>
    </View>
    <View>
      <Text> +(8802) 48110246</Text>
      <Text>+(8802) 58156976</Text>
      <Text>Telefax: +(8802) 58156976;</Text>
      <Text>email:info@scs-rmcbd.com</Text>
      <Text>www.scs-rmcbd.com</Text>
    </View>

    <View>
      <Text>Office/Postal address:</Text>
      <Text>46 Kazi Nazrul Islam Avenue (3rd floor)</Text>
      <Text>Kawran Bazaar, Dhaka-1215,</Text>
      <Text>Bangladesh</Text>
    </View>
  </View>
);

export default Footer;
