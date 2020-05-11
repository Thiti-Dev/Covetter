import React, {Component} from 'react';
import {Text, View} from 'react-native';
import styles from './Styles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import firebase from 'firebase';

export default class SignOut extends Component {
  render() {
    return (
      <View style={styles.signOutContainer}>
        <FontAwesomeIcon
          icon={faSignOutAlt}
          size={28}
          color="#39167e"
          style={styles.logOutIcon}
          onPress={() => firebase.auth().signOut()}
        />
      </View>
    );
  }
}
