import React, {Component} from 'react';
import {Text, View, Modal, TouchableOpacity, TextInput} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faRadiation} from '@fortawesome/free-solid-svg-icons';

export default class AddEventButton extends Component {
  render() {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 15,
          right: 15,
          zIndex: 10,
        }}>
        <TouchableOpacity
          onPress={() => this.props.setIsVisible(true)}
          style={{
            backgroundColor: '#fff',
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 25,

            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 3,
          }}>
          <FontAwesomeIcon icon={faRadiation} color="red" />
        </TouchableOpacity>
      </View>
    );
  }
}
