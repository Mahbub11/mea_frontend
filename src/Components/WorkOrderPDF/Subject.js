import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
   
    titleContainer:{
        flexDirection: 'row',
        marginTop: 10,
        width:'90%'
    },
    reportTitle:{
        fontSize: 17,
        fontWeight:'ultrabold',
       
    },
    subject:{
        fontWeight:'ultrabold',
        textDecoration:'underline',
        marginLeft:'2px'
      
    },
  });


  const Subject = ({subject}) => (
    <View style={styles.titleContainer}>
         <Text style={styles.reportTitle}>Sub:</Text>
        <Text style={styles.subject}>{subject}</Text>
    </View>
  );
  
  export default Subject