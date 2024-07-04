import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  titleContainer: {
  
    marginTop: 20,
    lineHeight: 1.2,
  },
  message:{
    width: "80%",
    lineHeight: 1.4,
    fontSize:'12px'
  }
 
});

const Message = ({ message }) => (
  <View style={styles.titleContainer}>
    <Text>Dear Sir,</Text>
    <Text style={styles.message}>{message}</Text>
  </View>
);

export default Message;
