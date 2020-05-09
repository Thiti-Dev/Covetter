import React from 'react';
import {View, Text} from 'react-native';
import styles from './Styles';

const LoadingTrue = (
  <View style={styles.container}>
    <Text style={styles.textStyle}>Loading</Text>
  </View>
);

const Loading = (bool = false) => {
  if (bool) {
    return LoadingTrue;
  } else {
    return;
  }
};

export default Loading;
