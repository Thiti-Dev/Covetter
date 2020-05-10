import React, {Component} from 'react';
import {Text, View} from 'react-native';

import styles from './Styles';

export default class Header extends Component {
  render() {
    const {title} = this.props;
    return (
      <View style={styles.header}>
        <Text style={styles.headerTitile}>{title}</Text>
      </View>
    );
  }
}
