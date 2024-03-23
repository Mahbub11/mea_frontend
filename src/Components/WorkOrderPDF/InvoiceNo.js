import React, { Fragment } from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    invoiceNoContainer: {
        flexDirection: 'column',
        marginTop: 36,
        justifyContent:'flex-end'
    },
    invoiceDateContainer: {
        flexDirection: 'row',
        gap:'5px'
    },
    invoiceDate: {
            fontSize: 12,
            fontStyle: 'bold',
    },
    label: {
        width: 60
    }
    
  });


  const InvoiceNo = ({invoice}) => (
    
        <Fragment>
           <View style={styles.invoiceNoContainer}>
           <View style={styles.invoiceDateContainer}>
                <Text style={styles.label}>Invoice No:</Text>
                <Text style={styles.invoiceDate}>{invoice.invoice_no}</Text>
            </View >
            <View style={styles.invoiceDateContainer}>
                <Text style={styles.label}>Date: </Text>
                <Text >{invoice.trans_date}</Text>
            </View >
            <View style={styles.invoiceDateContainer}>
                <Text style={styles.label}>Due Date: </Text>
                <Text >{invoice.due_date}</Text>
            </View >
           </View>
        </Fragment>
  );
  
  export default InvoiceNo