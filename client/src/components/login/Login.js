import React from 'react';
import {View, Text} from 'react-native';
import LoginHeader from './LoginHeader';
import LoginInput from './LoginInput';
import styles from './Styles';

const Login = () => {
  return (
    <View style={styles.container}>
      <LoginHeader />
      <LoginInput />
    </View>
  );
};

export default Login;
