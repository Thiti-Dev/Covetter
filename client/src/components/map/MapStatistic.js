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
    Axios.get('/api/covid/today').then(response => {
      this.setState({
        statisticsData: response.data.data,
      });
    });
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
          All infected people
        </Text>
        <Text
          style={{
            fontSize: 48,
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
          <View style={styles.dataDetailsContainer}>
            <View style={styles.dataDetails}>
              <Text>Healing</Text>
              <Text
                style={{fontWeight: 'bold', fontSize: 28, color: '#3D3D3D'}}>
                {this.state.statisticsData === null
                  ? '❤️'
                  : this.state.statisticsData.total.hospitalized}
              </Text>
              <View style={styles.dataDetailsSecond}>
                <Text />
              </View>
            </View>
          </View>
          <View style={styles.dataDetailsContainer}>
            <View style={styles.dataDetails}>
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
            <View style={styles.dataDetails}>
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
