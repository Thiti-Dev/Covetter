import React from 'react';
import {View, Text} from 'react-native';
import styles from './Styles';
import {Button} from '@ant-design/react-native';

const RegisterHeader = () => {
  return (
    <View style={styles.header}>
      <Button style={styles.buttonStyle}>Back</Button>
      <Text style={styles.headerText}>Register</Text>
    </View>
  );
};

export default RegisterHeader;
