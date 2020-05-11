import React, {Component} from 'react';
import {Text, View} from 'react-native';
import styles from './Styles';

export default class QuizHeader extends Component {
  render() {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}> Routine Quiz </Text>
      </View>
    );
  }
}
