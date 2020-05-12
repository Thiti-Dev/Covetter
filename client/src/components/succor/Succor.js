import React, { Component } from 'react';
import { Text, View, PermissionsAndroid, ScrollView, Image } from 'react-native';
import { Flex, WhiteSpace } from '@ant-design/react-native';
import MapView, { Marker, AnimatedRegion, Animated, Circle } from 'react-native-maps';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';

//
// ─── UTIL ───────────────────────────────────────────────────────────────────────
//
import distance from '../../utils/distance';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons';
import AddEventButton from './AddEventButton';
import ModalPop from './ModalPop';
import dynamicSort from '../../utils/dynamicSort';
import ModalLocationDetails from './ModalLocationDetails';
// ────────────────────────────────────────────────────────────────────────────────

export default class Succor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			charity_locations: null,
			userLatitude: 0,
			userLongitude: 0,
			initialized: false,
			modalVisible: false,
			statusBarHeight: 0,
			specificDetial: null,
			isViewingModal: false
		};
		this.onViewLocation = this.onViewLocation.bind(this);
	}
	async getAllCharityData(lat, lng) {
		try {
			const _res = await axios.post('https://covetter-api.herokuapp.com/api/succor/nearest', { lat, lng });
			const all_charity_data = _res.data.data;
			this.setState({
				charity_locations: all_charity_data,
				initialized: true
			});
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
						userLongitude: position.coords.longitude
					});
					if (!this.state.initialized) {
						this.getAllCharityData(position.coords.latitude, position.coords.longitude);
					}
				},
				(error) => {
					// See error code charts below.
					console.log(error.code, error.message);
				},
				{ enableHighAccuracy: true, timeout: 15000 }
			);
		}

		setTimeout(() => {
			this.followUserLocation();
		}, 2000);
	}
	componentDidMount() {
		// Fixed showMyLocationButton for react-native-maps problem on some devices
		setTimeout(() => this.setState({ statusBarHeight: 2 }), 500); // DO NOT DELETE
		// ─────────────────────────────────────────────────────────────────
		//
		// ─── REGISTERING POSITION WATCHER───────────────────────────────────────
		//
		this.locationWatchId = Geolocation.watchPosition(
			(position) => {
				this.setState({
					userLatitude: position.coords.latitude,
					userLongitude: position.coords.longitude
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
		// ────────────────────────────────────────────────────────────────────────────────

		//
		// ─── SUBSCRIBING FOR NAVIGATION ─────────────────────────────────────
		//
		this.focusListener = this.props.navigation.addListener('focus', () => {
			this.followUserLocation();
		});
		// ─────────────────────────────────────────────────────────────────
	}
	componentWillUnmount = () => {
		Geolocation.clearWatch(this.locationWatchId);
		this.focusListener(); // clearing the event
	};

	//
	// ─── FREQ USED ──────────────────────────────────────────────────────────────────
	//
	followUserLocation() {
		const { userLatitude, userLongitude } = this.state;
		this.map.animateToRegion(
			{
				longitude: userLongitude,
				latitude: userLatitude,
				longitudeDelta: 0.002,
				latitudeDelta: 0.002
			},
			1000
		);
	}
	// ────────────────────────────────────────────────────────────────────────────────
	//
	// ─── CALLBACK ───────────────────────────────────────────────────────────────────
	//
	onCommitSuccess() {
		const { userLatitude, userLongitude } = this.state;
		// On commit success => fetch new nearest charity data
		this.getAllCharityData(userLatitude, userLongitude);
		this.setModalVisible(false);
	}
	setModalVisible(visible) {
		this.setState({ modalVisible: visible });
	}
	// ────────────────────────────────────────────────────────────────────────────────

	//
	// ─── ON VIEW LOCATION ───────────────────────────────────────────────────────────
	//
	onViewLocation(location_data) {
		this.setState({ specificDetial: location_data, isViewingModal: true });
	}

	// CALLBACK
	onHidingViewLocation() {
		this.setState({ isViewingModal: false, specificDetial: null });
	}
	// ────────────────────────────────────────────────────────────────────────────────
	render() {
		const { charity_locations, userLatitude, userLongitude, isViewingModal, specificDetial } = this.state;
		let render_charity_location, map_rendered_circle;
		if (charity_locations) {
			//
			// ─── SORTING ─────────────────────────────────────────────────────
			//

			let _staged_distance_charity_location = charity_locations;
			charity_locations.forEach((data, index) => {
				_staged_distance_charity_location[index].distance = distance(
					data.position.lat,
					data.position.lng,
					userLatitude,
					userLongitude
				);
			});

			_staged_distance_charity_location.sort(dynamicSort('distance', 'asc'));

			// ─────────────────────────────────────────────────────────────────
			render_charity_location = _staged_distance_charity_location.map((data, key) => {
				return (
					<View
						onStartShouldSetResponder={() => this.onViewLocation(data)}
						key={key}
						style={{
							backgroundColor: '#ffffff',
							maxHeight: 200,
							minHeight: 200,
							padding: 10,
							marginBottom: 10,
							borderRadius: 15,
							shadowColor: '#000',
							shadowOffset: {
								width: 0,
								height: 1
							},
							flexDirection: 'row',
							shadowOpacity: 0.22,
							shadowRadius: 2.22,

							elevation: 3
						}}
					>
						<View style={{ flex: 1 }}>
							<Image
								source={{ uri: data.photo_url }}
								style={{
									height: '100%',
									width: '100%',
									borderRadius: 10
								}}
								resizeMode="cover"
							/>
						</View>
						<View style={{ padding: 10 }}>
							<Text
								style={{
									fontFamily: 'Prompt-Bold',
									fontSize: 16,
									color: '#475055'
								}}
							>
								📣 {data.description}
							</Text>

							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'flex-start',
									alignItems: 'center',
									marginTop: 10
								}}
							>
								<FontAwesomeIcon
									icon={faBullhorn}
									color="green"
									style={{ marginHorizontal: 10 }}
									size={20}
								/>
								<Text
									style={{
										fontFamily: 'Prompt-Regular',
										fontSize: 16,
										color: '#475055'
									}}
								>
									{distance(
										userLatitude,
										userLongitude,
										data.position.lat,
										data.position.lng,
										'K'
									).toFixed(2)}
									{` Kilometer.`}
								</Text>
							</View>
						</View>
					</View>
				);
			});
			map_rendered_circle = charity_locations.map((data, key) => {
				return (
					<Circle
						key={key}
						center={{ latitude: data.position.lat, longitude: data.position.lng }}
						radius={25}
						strokeColor={'green'}
						fillColor={'rgba(0,255,0,0.3)'}
					/>
				);
			});
		}
		return (
			<View style={{ flex: 1, backgroundColor: '#ffffff' }}>
				<React.Fragment>
					<View
						style={{
							padding: 10,
							backgroundColor: '#ffffff',
							shadowColor: '#000',
							shadowOffset: {
								width: 0,
								height: 1
							},
							shadowOpacity: 0.22,
							shadowRadius: 2.22,

							elevation: 5
						}}
					>
						<Text
							style={{
								fontFamily: 'Prompt-Bold',
								fontSize: 20,
								color: '#475055'
							}}
						>
							🚀 Succor Charity
						</Text>
					</View>
					<View
						style={{
							height: '30%',
							backgroundColor: '#fff',
							shadowColor: '#000',
							shadowOffset: {
								width: 0,
								height: 1
							},
							shadowOpacity: 0.22,
							shadowRadius: 2.22,

							elevation: 1.5,
							paddingTop: this.state.statusBarHeight
						}}
					>
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
					<ScrollView>
						<View style={{ height: '50%', paddingHorizontal: 10, paddingTop: 10 }}>
							{render_charity_location}
						</View>
					</ScrollView>
					<AddEventButton
						modalVisible={this.state.modalVisible}
						setIsVisible={this.setModalVisible.bind(this)}
					/>
					<ModalPop
						modalVisible={this.state.modalVisible}
						setIsVisible={this.setModalVisible.bind(this)}
						user_position={{ lat: userLatitude, lng: userLongitude }}
						on_success={this.onCommitSuccess.bind(this)}
					/>

					<ModalLocationDetails
						is_visible={isViewingModal}
						location_data={specificDetial}
						on_hiding={this.onHidingViewLocation.bind(this)}
					/>
				</React.Fragment>
			</View>
		);
	}
}
