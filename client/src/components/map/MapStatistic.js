import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import styles from './Styles';
import Axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCircleNotch} from '@fortawesome/free-solid-svg-icons';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native-gesture-handler';

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
    const {statisticsData} = this.state;
    return (
      <View style={styles.cardStatistics}>
        <LinearGradient
          start={{x: 0, y: 1}}
          end={{x: 1, y: 0}}
          colors={['#6846ff', '#9c46ff']}
          style={{
            flex: 0.8,
            borderRadius: 10,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }}>
          <View
            style={{
              flex: 1,
              padding: 20,
            }}>
            <Text
              style={{
                fontSize: 48,
                fontFamily: 'Prompt-Bold',
                color: '#e84848',
              }}>
              Covid
            </Text>
            <Text
              style={{
                fontSize: 36,
                fontFamily: 'Prompt-Bold',
                color: '#fff',
              }}>
              Dashboard
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontSize: 84,
                  fontFamily: 'Baloo2-Bold',
                  color: '#fff',
                  flex: 2,
                  textAlign: 'center',
                }}>
                {statisticsData !== null && statisticsData.total.confirmed}
              </Text>
              <Text
                style={{
                  fontSize: 60,
                  fontFamily: 'Baloo2-Bold',
                  color: '#fff',
                  flex: 1,
                  textAlign: 'center',
                }}>
                {statisticsData !== null && `+ ${statisticsData.new.confirmed}`}
              </Text>
            </View>
          </View>
        </LinearGradient>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <ScrollView horizontal={true} style={{padding: 5}}>
            <LinearGradient
              start={{x: 0, y: 1}}
              end={{x: 1, y: 0}}
              colors={['#ffac46', '#ffd146']}
              style={{
                margin: 10,
                borderRadius: 10,

                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                width: 300,
                elevation: 4,
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    flex: 4.5,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../assets/images/hospital.png')}
                    style={{
                      resizeMode: 'center',
                      height: 130,
                      width: 130,
                    }}
                  />
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 60,
                        fontFamily: 'Baloo2-Bold',
                        color: '#48b3e8',
                        textAlign: 'center',
                      }}>
                      {statisticsData !== null &&
                        `${statisticsData.total.hospitalized}`}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    margin: 10,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 28,
                      fontFamily: 'Baloo2-Bold',
                      color: '#777777',
                    }}>
                    {statisticsData !== null &&
                      `To day : ${
                        statisticsData.new.hospitalized !== undefined
                          ? statisticsData.new.hospitalized
                          : 0
                      }`}
                  </Text>
                </View>
              </View>
            </LinearGradient>

            <LinearGradient
              start={{x: 0, y: 1}}
              end={{x: 1, y: 0}}
              colors={['#46ff7d', '#46ffc1']}
              style={{
                margin: 10,
                borderRadius: 10,

                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                width: 300,
                elevation: 4,
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  flex: 1,
                }}>
                <View
                  style={{
                    flex: 4.5,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../assets/images/charity.png')}
                    style={{
                      resizeMode: 'center',
                      height: 130,
                      width: 130,
                    }}
                  />
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 60,
                        fontFamily: 'Baloo2-Bold',
                        color: '#48b3e8',
                        textAlign: 'center',
                      }}>
                      {statisticsData !== null &&
                        `${statisticsData.total.recovered}`}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    margin: 10,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 28,
                      fontFamily: 'Baloo2-Bold',
                      color: '#777777',
                    }}>
                    {statisticsData !== null &&
                      `To day : ${statisticsData.new.recovered}`}
                  </Text>
                </View>
              </View>
            </LinearGradient>

            <LinearGradient
              start={{x: 0, y: 1}}
              end={{x: 1, y: 0}}
              colors={['#ff4646', '#ff7e46']}
              style={{
                margin: 10,
                borderRadius: 10,

                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                width: 300,
                elevation: 4,
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  flex: 1,
                }}>
                <View
                  style={{
                    flex: 4.5,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../assets/images/bed.png')}
                    style={{
                      resizeMode: 'center',
                      height: 130,
                      width: 130,
                    }}
                  />
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 60,
                        fontFamily: 'Baloo2-Bold',
                        color: '#48b3e8',
                        textAlign: 'center',
                      }}>
                      {statisticsData !== null &&
                        `${statisticsData.total.death}`}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    margin: 10,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 28,
                      fontFamily: 'Baloo2-Bold',
                      color: '#777777',
                    }}>
                    {statisticsData !== null &&
                      `To day : ${statisticsData.new.death}`}
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </ScrollView>
        </View>
      </View>
    );
  }
}
