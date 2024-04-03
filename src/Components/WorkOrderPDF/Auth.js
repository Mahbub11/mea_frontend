import React from "react";
import { Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import SignatureKabir from "../../Assets/Image/signatureKabir.png";

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
    height: "50px",
  },
  company: {
    fontWeight: "bold",
    fontFamily:'Helvetica-Bold'
  },
  logo: {
    width: "60px",
    height: "60px",
  
  },
  
});

const Auth = () => (
  <View style={styles.row}>
    <View>
      <Text>Sincerely Yours,</Text>
      <View style={styles.sapce}>
      <Image style={styles.logo} src={SignatureKabir} />
      </View>
      <View>
        <Text style={styles.company}>A.H.M. AHSANUL KABIR</Text>
        <Text>Managing Director</Text>
        <Text>Modern Engineers & Architects</Text>
      </View>
    </View>
  </View>
);

export default Auth;
