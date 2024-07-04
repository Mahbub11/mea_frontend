import React, {Fragment} from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 20,
        fontSize:'12px',
        fontStyle: 'bold',
    },
    description: {
        width: '14%',
        textAlign: 'left',
        
    },
    rate0: {
        width: '14%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    rate1: {
        width: '14%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    rate2: {
        width: '14%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    rate3: {
        width: '14%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
   
    rate4: {
        width: '16%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    rate5: {
        width: '14%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
  });


const WorkOrderAddressLine = ({items}) => {
    const rows = items.map( item => 
        <View style={styles.row} >
            <Text >{item.address}</Text>
            {/* <Text style={styles.rate0}>{item.unit}</Text>
            <Text style={styles.rate1}>{item.m3cft}</Text>
            <Text style={styles.rate2}>{item.unitcft}</Text>
            <Text style={styles.rate3}>{item.unitRate}</Text>
            <Text style={styles.rate4}>{(item.unitRate * item.unitcft).toFixed(2)}</Text>
            <Text style={styles.rate5}>{item.remarks}</Text> */}
        </View>
    )
    return (<Fragment>{rows}</Fragment> )
};
  
  export default WorkOrderAddressLine