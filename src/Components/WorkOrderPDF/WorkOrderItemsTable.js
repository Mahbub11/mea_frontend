import React from 'react';
import {View, StyleSheet,Text } from '@react-pdf/renderer';
import InvoiceTableHeader from './InvoiceTableHeader'
import InvoiceTableBlankSpace from './InvoiceTableBlankSpace'
import InvoiceTableFooter from './InvoiceTableFooter'
import MaterialsTableRow from './MaterialsTableRow';

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

  const WorkOrderItemsTable = ({data}) => (
    <View style={styles.tableContainer}>
     
        <InvoiceTableHeader />
       <MaterialsTableRow items={data.items}></MaterialsTableRow>
        <InvoiceTableBlankSpace rowsCount={ 0} />
        <InvoiceTableFooter amount={data.amount} />
    </View>
  );
  
  export default WorkOrderItemsTable