import React, {Component} from 'react';
import {Text, View} from 'react-native';
import styles from './Styles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHeart, faMobileAlt} from '@fortawesome/free-solid-svg-icons';
import {faEnvelopeOpen} from '@fortawesome/free-regular-svg-icons';

export default class ProfileDetails extends Component {
  render() {
    const {name, email, phone} = this.props.user_state;
    return (
      <View style={styles.cardForm}>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsText}>{name}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderRightWidth: 0.6,
              flex: 1,
              borderColor: '#cdcdcd',
            }}>
            <FontAwesomeIcon icon={faEnvelopeOpen} color="#522BFF" />
            <Text style={styles.detailsText}>{email}</Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}>
            <FontAwesomeIcon icon={faMobileAlt} color="#522BFF" />
            <Text style={styles.detailsText}>{phone}</Text>
          </View>
        </View>
      </View>
    );
  }
}
