import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "#90e5fc";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    fontStyle: "bold",
  },
  inner_row: {
    gap:5,
    flexDirection: "row",
    alignItems: "center",
    marginTop:'3px'
  },
});

const ItemsInfo = ({ items }) => {
  const rows = items.map((item) => (
    <View style={styles.row}>
      <View style={styles.inner_row}>
        <Text>{item.name}</Text>
        <Text>:</Text>
        <Text>{item.value}</Text>
      </View>
    </View>
  ));
  return <Fragment>{rows}</Fragment>;
};

export default ItemsInfo;
