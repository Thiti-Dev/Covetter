import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from './Styles';
import LinearGradient from 'react-native-linear-gradient';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUserAlt, faKey} from '@fortawesome/free-solid-svg-icons';

const LoginInput = () => {
  return (
    <View
      style={{
        backgroundColor: '#ffffff',
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 40,
      }}>
      <View>
        <View style={styles.formInput}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#6846ff', '#56ffd5']}
            style={styles.linearGradient}>
            <TextInput style={styles.inputStyle} placeholder="Email Address" />
          </LinearGradient>
        </View>

        <View style={styles.formInput}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#6846ff', '#56ffd5']}
            style={styles.linearGradient}>
            <TextInput style={styles.inputStyle} placeholder="Password" />
          </LinearGradient>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '10%',
        }}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#6846ff', '#56ffd5']}
          style={[styles.linearGradient, {marginTop: 20, borderRadius: 5}]}>
          <TouchableOpacity
            style={{
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#ffffff'}}>SIGN IN</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
};

export default LoginInput;
