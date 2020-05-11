import React, {Component} from 'react';
import {Text, View} from 'react-native';
import styles from './Styles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faUserAlt,
  faPhoneAlt,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import {TextInput} from 'react-native-gesture-handler';

export default class ProfileEdit extends Component {
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
          <View style={styles.formStyleText}>
            <TextInput
              style={styles.formTextInput}
              value={name}
              onChangeText={(value) => this.props.on_handler(value, 'name')}
            />
          </View>
        </View>
        <View style={styles.formStyle}>
          <View style={styles.formStyleText}>
            <TextInput
              style={styles.formTextInput}
              value={email}
              onChangeText={(value) => this.props.on_handler(value, 'email')}
            />
          </View>
        </View>
        <View style={styles.formStyle}>
          <View style={styles.formStyleText}>
            <TextInput
              style={styles.formTextInput}
              value={phone}
              onChangeText={(value) => this.props.on_handler(value, 'phone')}
            />
          </View>
        </View>
      </View>
    );
  }
}
