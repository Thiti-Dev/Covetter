import React, {Component} from 'react';
import {Text, View} from 'react-native';
import styles from './Styles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faUserAlt,
  faPhoneAlt,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';

export default class ProfileName extends Component {
  render() {
    //
    // ─── PROPS FROM PROFILE PARENT ───────────────────────────────────
    //
    const {name, email, phone} = this.props.state_user;
    //
    // ─────────────────────────────────────────────────────────────────

    return (
      <View style={styles.nameContainer}>
        <View style={styles.formStyle}>
          <View style={styles.formStyleIcon}>
            <FontAwesomeIcon icon={faUserAlt} size={28} />
          </View>
          <View style={styles.formStyleText}>
            <Text style={styles.formText}>{name}</Text>
          </View>
        </View>
        <View style={styles.formStyle}>
          <View style={styles.formStyleIcon}>
            <FontAwesomeIcon icon={faEnvelope} size={28} />
          </View>
          <View style={styles.formStyleText}>
            <Text style={styles.formText}>{email}</Text>
          </View>
        </View>
        <View style={styles.formStyle}>
          <View style={styles.formStyleIcon}>
            <FontAwesomeIcon icon={faPhoneAlt} size={28} />
          </View>
          <View style={styles.formStyleText}>
            <Text style={styles.formText}>{phone}</Text>
          </View>
        </View>
      </View>
    );
  }
}
