import React from 'react';
import {View, Text} from 'react-native';
import LoginHeader from './LoginHeader';
import LoginInput from './LoginInput';

const Login = () => {
  return (
    <View>
      <LoginHeader />
      <Text>Login</Text>
      <LoginInput />
    </View>
  );
};

export default Login;
