import React from "react";
import { Text, View, StyleSheet,Image } from "@react-pdf/renderer";
import SignatureKabir from "../../Assets/Image/signatureKabir.png"; 

const styles = StyleSheet.create({
  row: {
    fontSize: 12,
    fontWeight: "bold",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop:'100px',
  },
  dash: {
    border: "1px",
    borderStyle: "solid",
    width: "100%",
  },
  logo: {
    width: "60px",
    height: "60px",
  
  },
  rcv: {
    bottom:0,
    alignSelf:'flex-end'
  
  },
  
});

const Auth = () => (
  <View style={styles.row}>
    <View  style={styles.rcv} >
      <View style={styles.dash}></View>
      <Text style={styles.reportTitle}>Received By</Text>
    </View>
    <View>
    <View style={styles.sapce}>
      <Image style={styles.logo} src={SignatureKabir} />
      </View>
      <View style={styles.dash}></View>
      <Text style={styles.reportTitle}>Authorized Signature</Text>
    </View>
  </View>
);

export default Auth;
