import React, {Component} from 'react';
import {Text, View} from 'react-native';
import MapStatistic from './MapStatistic';

export default class Map extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <MapStatistic />
      </View>
    );
  }
}
