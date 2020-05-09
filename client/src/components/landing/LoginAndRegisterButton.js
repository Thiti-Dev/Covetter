import React from 'react';
import {View, Text} from 'react-native';
import {Button} from '@ant-design/react-native';
import styles from './Styles';
import {useNavigation} from '@react-navigation/native';

const LoginAndRegisterButton = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.secondContainer}>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonView}>
          <Button onPress={() => navigation.navigate('LoginScreen')}>
            Log In
          </Button>
        </View>
        <View style={styles.buttonView}>
          <Button onPress={() => navigation.navigate('RegisterFirstScreen')}>
            Register
          </Button>
        </View>
      </View>
    </View>
  );
};

export default LoginAndRegisterButton;
