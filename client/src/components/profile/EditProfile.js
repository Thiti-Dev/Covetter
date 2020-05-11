import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHeart, faMobileAlt} from '@fortawesome/free-solid-svg-icons';
import {faEnvelopeOpen} from '@fortawesome/free-regular-svg-icons';
import styles from './Styles';
import {TextInput} from 'react-native-gesture-handler';

export default class EditProfile extends Component {
  constructor(props) {
    super();
    this.state = {
      nameEdit: props.user_state.name,
      phoneEdit: props.user_state.phone,
    };
  }

  render() {
    return (
      <View style={styles.cardForm}>
        <View style={styles.editContainer}>
          <TextInput
            style={styles.detailsText}
            value={this.state.nameEdit}
            onChangeText={value => this.setState({nameEdit: value})}
          />
        </View>
        <View style={styles.editContainer}>
          <TextInput
            style={styles.detailsText}
            value={this.state.phoneEdit}
            onChangeText={value => this.setState({phoneEdit: value})}
          />
        </View>
      </View>
    );
  }
}
