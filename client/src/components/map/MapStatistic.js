import React, {Component} from 'react';
import {Text, View} from 'react-native';
import styles from './Styles';
import Axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCircleNotch} from '@fortawesome/free-solid-svg-icons';

export default class MapStatistic extends Component {
  constructor() {
    super();
    this.state = {statisticsData: null};
  }
  componentDidMount() {
    Axios.get('https://covetter-api.herokuapp.com/api/covid/today').then(
      (response) => {
        this.setState({
          statisticsData: response.data.data,
        });
      },
    );
  }
  render() {
    return (
      <View style={styles.cardStatistics}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            color: '#3D3D3D',
          }}>
          {' '}
          All infected people{' '}
        </Text>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 48,
            color: '#39167e',
            marginVertical: 10,
          }}>
          {this.state.statisticsData === null ? (
            <FontAwesomeIcon icon={faCircleNotch} size={30} />
          ) : (
            this.state.statisticsData.total.confirmed
          )}
          {this.state.statisticsData === null
            ? ''
            : ` +${this.state.statisticsData.new.confirmed}`}
        </Text>
        <View style={styles.statistics}>
          {/* <View style={[styles.crop, {backgroundColor: '#DFCE30'}]}>
            <Text> Healing </Text>
          </View>
          <View style={[styles.crop, {backgroundColor: '#74FF68'}]}>
            <Text> Healed </Text>
          </View>
          <View style={[styles.crop, {backgroundColor: '#FF6161'}]}>
            <Text style={styles.border}> die </Text>
          </View> */}

          <View style={styles.dataDetailsContainer}>
            <View style={[styles.dataDetails, {backgroundColor: '#DFCE30'}]}>
              <Text>Healing</Text>
              <Text
                style={{fontWeight: 'bold', fontSize: 28, color: '#3D3D3D'}}>
                {this.state.statisticsData === null
                  ? '❤️'
                  : this.state.statisticsData.total.hospitalized}
              </Text>
              <View style={styles.dataDetailsSecond}>
                <Text></Text>
              </View>
            </View>
          </View>
          <View style={styles.dataDetailsContainer}>
            <View style={[styles.dataDetails, {backgroundColor: '#74FF68'}]}>
              <Text>Healed</Text>
              <Text
                style={{fontWeight: 'bold', fontSize: 28, color: '#3D3D3D'}}>
                {this.state.statisticsData === null
                  ? '❤️'
                  : this.state.statisticsData.total.recovered}
              </Text>
              <View style={styles.dataDetailsSecond}>
                <Text>
                  {this.state.statisticsData === null
                    ? ''
                    : ` + ${this.state.statisticsData.new.recovered}`}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.dataDetailsContainer}>
            <View style={[styles.dataDetails, {backgroundColor: '#FF6161'}]}>
              <Text>Die</Text>
              <Text
                style={{fontWeight: 'bold', fontSize: 28, color: '#3D3D3D'}}>
                {this.state.statisticsData === null
                  ? '❤️'
                  : this.state.statisticsData.total.death}
              </Text>
              <View style={styles.dataDetailsSecond}>
                <Text>
                  {this.state.statisticsData === null
                    ? ''
                    : ` + ${this.state.statisticsData.new.death}`}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
