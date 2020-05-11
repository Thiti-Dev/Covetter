import React, { Component } from 'react';
import { Text, View, PermissionsAndroid } from 'react-native';
import { Flex, WhiteSpace } from '@ant-design/react-native';
import MapView, { Marker, AnimatedRegion, Animated, Circle } from 'react-native-maps';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';

//
// ─── UTIL ───────────────────────────────────────────────────────────────────────
//
import distance from '../../utils/distance';
// ────────────────────────────────────────────────────────────────────────────────

export default class Awareness extends Component {
	constructor(props) {
		super(props);
		this.state = {
			awareness_locations: null,
			userLatitude: 0,
			userLogintude: 0,
			initialized: false
		};
	}
	async getAllAwarenessData(lat, lng) {
		try {
			const _res = await axios.post('https://covetter-api.herokuapp.com/api/awareness/nearest', { lat, lng });
			const all_awareness_data = _res.data.data;
			this.setState({ awareness_locations: all_awareness_data, initialized: true });
		} catch (error) {}
	}
	async onMapLoaded() {
		//
		// ─── ASKING FOR PERMISSION ───────────────────────────────────────
		//
		let use_loc = false;
		let granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
			title: 'App Geolocation Permission',
			message: "App needs access to your phone's location."
		});

		if (granted) {
			use_loc = true;
			console.log('Location permission granted!');
		} else {
			console.log('Location permission not granted!!!!');
		}
		// ─────────────────────────────────────────────────────────────────

		if (use_loc) {
			Geolocation.getCurrentPosition(
				(position) => {
					this.setState({
						userLatitude: position.coords.latitude,
						userLogintude: position.coords.longitude
					});
					if (!this.state.initialized) {
						this.getAllAwarenessData(position.coords.latitude, position.coords.longitude);
					}
				},
				(error) => {
					// See error code charts below.
					console.log(error.code, error.message);
				},
				{ enableHighAccuracy: true, timeout: 15000 }
			);
		}
	}
	componentDidMount() {
		this.locationWatchId = Geolocation.watchPosition(
			(position) => {
				this.setState({
					userLatitude: position.coords.latitude,
					userLogintude: position.coords.longitude
				});
				//console.log(position.coords);
			},
			(error) => {
				// See error code charts below.
				console.warn(error.code, error.message);
			},
			{
				enableHighAccuracy: true,
				timeout: 15000,
				maximumAge: 10000,
				interval: 1000,
				distanceFilter: 1,
				fastestInterval: 1000
			}
		);
		//this.getAllAwarenessData();
	}
	componentWillUnmount = () => {
		Geolocation.clearWatch(this.locationWatchId);
	};
	render() {
		const { awareness_locations, userLatitude, userLogintude } = this.state;
		let render_awareness_location, map_rendered_circle;
		if (awareness_locations) {
			render_awareness_location = awareness_locations.map((data, key) => {
				return (
					<React.Fragment key={key}>
						<Text>{data.reason}</Text>
						<Text>
							distance: {distance(userLatitude, userLogintude, data.position.lat, data.position.lng, 'K')}
						</Text>
						<Text>{'\n'}</Text>
					</React.Fragment>
				);
			});
			map_rendered_circle = awareness_locations.map((data, key) => {
				return (
					<Circle
						key={key}
						center={{ latitude: data.position.lat, longitude: data.position.lng }}
						radius={25}
						strokeColor={'red'}
						fillColor={'rgba(255,0,0,0.3)'}
					/>
				);
			});
		}
		return (
			<React.Fragment>
				<View style={{ height: '50%' }}>
					<MapView
						style={{ flex: 1 }}
						provider={'google'}
						ref={(map) => {
							// Referencing the map
							this.map = map;
						}}
						track
						initialRegion={{
							latitude: 13.652944,
							longitude: 100.49525,
							latitudeDelta: 0.002,
							longitudeDelta: 0.002
						}}
						onMapReady={this.onMapLoaded.bind(this)}
						showsUserLocation={true}
					>
						{map_rendered_circle}
					</MapView>
				</View>
				<View style={{ height: '50%' }}>{render_awareness_location}</View>
			</React.Fragment>
		);
	}
}
