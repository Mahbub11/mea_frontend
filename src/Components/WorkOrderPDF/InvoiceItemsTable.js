import React from 'react';
import {View, StyleSheet,Text } from '@react-pdf/renderer';
import InvoiceTableHeader from './InvoiceTableHeader'
// import InvoiceTableRow from './InvoiceTableRow'
import InvoiceTableBlankSpace from './InvoiceTableBlankSpace'
import InvoiceTableFooter from './InvoiceTableFooter'

const tableRowsCount = 11;

const styles = StyleSheet.create({
    tableContainer: {
      fontSize:10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 2,
        borderWidth: 1,
        borderColor: '#bff0fd',
    },
 
});

  const InvoiceItemsTable = ({invoice}) => (
    <View style={styles.tableContainer}>
     
        <InvoiceTableHeader />
        {/* <InvoiceTableRow items={invoice.items} /> */}
        <InvoiceTableBlankSpace rowsCount={ 0} />
        <InvoiceTableFooter invoice={invoice} />
    </View>
  );
  
  export default InvoiceItemsTable