import React from 'react';
import {View, Text} from 'react-native';
import LoginAndRegisterButton from './LoginAndRegisterButton';
import styles from './Styles';

const Landing = () => {
  return (
    <View style={styles.container}>
      <View style={styles.firstContainer}>
        <Text>Covector</Text>
      </View>
      <LoginAndRegisterButton />
    </View>
  );
};

export default Landing;
