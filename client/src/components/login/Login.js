import React, {Component} from 'react';
import {View, Text} from 'react-native';

import LoginInput from './LoginInput';
import RegisterButton from './RegisterButton';

import styles from './Styles';
import Loading from '../common/loadingScreen/Loading';

class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Loading />
        <LoginInput />
        <RegisterButton />
      </View>
    );
  }
}
export default Login;
