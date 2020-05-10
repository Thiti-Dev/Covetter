import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import styles from './Styles';

export default class LogOut extends Component {
  render() {
    return (
      <View style={styles.logOut}>
        <Text style={styles.logOutText}>Log Out</Text>
        <FontAwesomeIcon
          icon={faSignOutAlt}
          size={28}
          color="#39167e"
          style={styles.logOutIcon}
        />
      </View>
    );
  }
}
