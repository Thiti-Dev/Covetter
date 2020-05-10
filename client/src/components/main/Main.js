import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';
import firebase from 'firebase';
export default class Main extends Component {
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
        <Button title="Log Out" onPress={() => firebase.auth().signOut()} />
      </View>
    );
  }
}
