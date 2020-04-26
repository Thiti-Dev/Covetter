import React, {Component} from 'react';
import {Text, View} from 'react-native';
import styles from './Styles';
import RegisterHeader from './RegisterHeader';
import RegisterLebel from './RegisterLebel';
import RegisterInput from './RegisterInput';

export default class Register extends Component {
  render() {
    return (
      <View>
        <RegisterHeader />
        <RegisterLebel />
        <RegisterInput />
      </View>
    );
  }
}
