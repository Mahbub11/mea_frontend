import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "#90e5fc";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontStyle: "bold",
  },
  description: {
    width: '15%',
    
    textAlign:'center'
},
rate0: {
    width: '15%',
  
     textAlign:'center'
},
rate1: {
    width: '14.5%',
  
    textAlign:'center'
},

rate3: {
    width: '14.5%',
 
    textAlign:'center'
},
rate4: {
    width: '18%',

    textAlign:'center'
},

rate6: {
    width: '16%',

    textAlign:'center'
},
});

const MaterialsTableRow = ({ items }) => {
  const rows = items.map((item) => (
    <View style={styles.row}>
      <Text style={styles.description}>{item.materials_Name}</Text>
      <Text style={styles.rate0}>{item.materials_category}</Text>
      <Text style={styles.rate1}>{item.materials_quantity}</Text>
      <Text style={styles.rate3}>{item.materials_rate}</Text>
      <Text style={styles.rate6}>{item.cubic_meter}</Text>

      <Text style={styles.rate4}>{item.work_order_amount}</Text>
    </View>
  ));
  return <Fragment>{rows}</Fragment>;
};

export default MaterialsTableRow;
