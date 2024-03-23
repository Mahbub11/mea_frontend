import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        backgroundColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
    },
    description: {
        width: '14.30%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    rate0: {
        width: '14%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    rate1: {
        width: '14%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    rate2: {
        width: '14%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    rate3: {
        width: '14%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    rate4: {
        width: '14%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    rate5: {
        width: '14%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    rate6: {
        width: '16%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
  });

  const InvoiceTableHeader = () => (
    <View style={styles.container}>
        <Text style={styles.description}>Description</Text>
        <Text style={styles.rate0}>unit(m3)</Text>
        <Text style={styles.rate1}>1m3=cft</Text>
        <Text style={styles.rate3}>Unit(cft)</Text>
        <Text style={styles.rate4}>Unit Rate</Text>
        <Text style={styles.rate6}>Total Amount</Text>
        <Text style={styles.rate5}>Remarks</Text>
    </View>
  );
  
  export default InvoiceTableHeader