import React, {Component} from 'react';
import {Text, View} from 'react-native';
import styles from './Styles';
import {useNavigation} from '@react-navigation/native';
import Register from '../register';

const RegisterButton = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.registerButtonContainer}>
      <View style={styles.registerButtonView}>
        <Text
          style={{
            fontWeight: 'bold',
            color: '#3d3d3d',
          }}>
          {' '}
          New user ?{' '}
        </Text>
        <Text
          onPress={() => navigation.navigate('RegisterFirstScreen')}
          style={{
            fontWeight: 'bold',
            color: '#6846ff',
            textDecorationLine: 'underline',
          }}>
          Register
        </Text>
      </View>
    </View>
  );
};

export default RegisterButton;
