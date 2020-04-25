import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Register from './src/components/register/';

export default class App extends Component {
  render() {
    return (
      <View>
        <Register />
      </View>
    );
  }
}
