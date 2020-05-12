import React, {Component} from 'react';
import {Text, View, PermissionsAndroid, ScrollView} from 'react-native';
import {Flex, WhiteSpace} from '@ant-design/react-native';
import MapView, {
  Marker,
  AnimatedRegion,
  Animated,
  Circle,
} from 'react-native-maps';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';

//
// ─── UTIL ───────────────────────────────────────────────────────────────────────
//
import distance from '../../utils/distance';
import AddEventButton from './AddEventButton';
import ModalPop from './ModalPop';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
// ────────────────────────────────────────────────────────────────────────────────

export default class Awareness extends Component {
  constructor(props) {
    super(props);
    this.state = {
      awareness_locations: null,
      userLatitude: 0,
      userLogintude: 0,
      initialized: false,
      modalVisible: false,
    };
  }
  async getAllAwarenessData(lat, lng) {
    try {
      const _res = await axios.post(
        'https://covetter-api.herokuapp.com/api/awareness/nearest',
        {lat, lng},
      );
      const all_awareness_data = _res.data.data;
      this.setState({
        awareness_locations: all_awareness_data,
        initialized: true,
      });
    } catch (error) {}
  }
  async onMapLoaded() {
    //
    // ─── ASKING FOR PERMISSION ───────────────────────────────────────
    //
    let use_loc = false;
    let granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'App Geolocation Permission',
        message: "App needs access to your phone's location.",
      },
    );

    if (granted) {
      use_loc = true;
      console.log('Location permission granted!');
    } else {
      console.log('Location permission not granted!!!!');
    }
    // ─────────────────────────────────────────────────────────────────

    if (use_loc) {
      Geolocation.getCurrentPosition(
        position => {
          this.setState({
            userLatitude: position.coords.latitude,
            userLogintude: position.coords.longitude,
          });
          if (!this.state.initialized) {
            this.getAllAwarenessData(
              position.coords.latitude,
              position.coords.longitude,
            );
          }
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000},
      );
    }
  }
  componentDidMount() {
    this.locationWatchId = Geolocation.watchPosition(
      position => {
        this.setState({
          userLatitude: position.coords.latitude,
          userLogintude: position.coords.longitude,
        });
        //console.log(position.coords);
      },
      error => {
        // See error code charts below.
        console.warn(error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        interval: 1000,
        distanceFilter: 1,
        fastestInterval: 1000,
      },
    );
    //this.getAllAwarenessData();
  }
  componentWillUnmount = () => {
    Geolocation.clearWatch(this.locationWatchId);
  };

  render() {
    console.log('Worked');
    const setModalVisible = visible => {
      this.setState({modalVisible: visible});
    };
    const {awareness_locations, userLatitude, userLogintude} = this.state;
    let render_awareness_location, map_rendered_circle;
    if (awareness_locations) {
      render_awareness_location = awareness_locations.map((data, key) => {
        return (
          <View
            key={key}
            style={{
              backgroundColor: '#ffffff',
              minHeight: 100,
              padding: 10,
              marginBottom: 10,
              borderRadius: 15,
              justifyContent: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,

              elevation: 3,
            }}>
            <View>
              <Text
                style={{
                  fontFamily: 'Prompt-Bold',
                  fontSize: 16,
                  color: '#475055',
                }}>
                📣 {data.reason}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  color="#e84848"
                  style={{marginHorizontal: 10}}
                  size={20}
                />
                <Text
                  style={{
                    fontFamily: 'Prompt-Regular',
                    fontSize: 16,
                    color: '#475055',
                  }}>
                  {distance(
                    userLatitude,
                    userLogintude,
                    data.position.lat,
                    data.position.lng,
                    'K',
                  )}
                  {` Kilometer.`}
                </Text>
              </View>
            </View>
          </View>
        );
      });
      map_rendered_circle = awareness_locations.map((data, key) => {
        return (
          <Circle
            key={key}
            center={{latitude: data.position.lat, longitude: data.position.lng}}
            radius={25}
            strokeColor={'red'}
            fillColor={'rgba(255,0,0,0.3)'}
          />
        );
      });
    }
    return (
      <View style={{flex: 1, backgroundColor: '#ffffff'}}>
        <React.Fragment>
          <View
            style={{
              padding: 10,
              backgroundColor: '#ffffff',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,

              elevation: 5,
            }}>
            <Text
              style={{
                fontFamily: 'Prompt-Bold',
                fontSize: 20,
                color: '#475055',
              }}>
              🚀 Awareness Scanner
            </Text>
          </View>
          <View
            style={{
              height: '30%',
              backgroundColor: '#fff',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,

              elevation: 1.5,
            }}>
            <MapView
              style={{flex: 1}}
              provider={'google'}
              ref={map => {
                // Referencing the map
                this.map = map;
              }}
              track
              initialRegion={{
                latitude: 13.652944,
                longitude: 100.49525,
                latitudeDelta: 0.002,
                longitudeDelta: 0.002,
              }}
              onMapReady={this.onMapLoaded.bind(this)}
              showsUserLocation={true}>
              {map_rendered_circle}
            </MapView>
          </View>
          <ScrollView>
            <View
              style={{height: '50%', paddingHorizontal: 10, paddingTop: 10}}>
              {render_awareness_location}
            </View>
          </ScrollView>
          <AddEventButton
            modalVisible={this.state.modalVisible}
            setIsVisible={setModalVisible}
          />
          <ModalPop
            modalVisible={this.state.modalVisible}
            setIsVisible={setModalVisible}
          />
        </React.Fragment>
      </View>
    );
  }
}
