import React, {Component} from 'react';
import {Text, View} from 'react-native';
import MapStatistic from './MapStatistic';

export default class Map extends Component {
  render() {
    return (
      <View>
        <MapStatistic />
        <Text> Map </Text>
      </View>
    );
  }
}
