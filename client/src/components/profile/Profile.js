import React, { Component } from 'react';
import { Text, View, KeyboardAvoidingView, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import styles from './Styles';
import SignOut from './SignOut';
import LinearGradient from 'react-native-linear-gradient';
import ProfileDetails from './ProfileDetails';
import EditProfile from './EditProfile';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import firebase from 'firebase';

import ImagePicker from 'react-native-image-picker';

//
// ─── UTIL ───────────────────────────────────────────────────────────────────────
//
import createFormData from '../../utils/createFormData';
// ────────────────────────────────────────────────────────────────────────────────

export default class Profile extends Component {
	constructor() {
		super();
		this.state = {
			toggleState: false,
			user_profile: {
				name: '. . .',
				email: '. . .',
				phone: '. . .',
				photo_url: ''
			},
			staged_edit_data: {
				name: '',
				phone: ''
			}
		};
		this.onEditCredential = this.onEditCredential.bind(this);
		this.onEditHandler = this.onEditHandler.bind(this);
		this.onSelectImageFromLibrary = this.onSelectImageFromLibrary.bind(this);
	}
	async fetchUserCredential() {
		try {
			const _res = await axios.get('/api/auth');
			const profile_data = _res.data.data;
			console.log(profile_data);
			//
			// ─── GETTING FIREBASE-USER CREDENTIAL ────────────────────────────
			//
			const user_email = await firebase.auth().currentUser.email;
			// ─────────────────────────────────────────────────────────────────
			const finalized_profile_data = {
				name: profile_data.firstName + ' ' + profile_data.lastName,
				email: user_email,
				phone: profile_data.phone,
				photo_url: profile_data.photo_url
			};
			const _staged_edit = {
				name: profile_data.firstName + ' ' + profile_data.lastName,
				phone: profile_data.phone
			};
			this.setState({
				user_profile: finalized_profile_data,
				staged_edit_data: _staged_edit
			});
		} catch (error) {
			// If failed to load proifle
			// @TODO show an error / infinite spinning
		}
	}

	async onEditHandler() {
		const { toggleState, staged_edit_data, user_profile } = this.state;

		if (toggleState) {
			if (staged_edit_data.name !== user_profile.name || staged_edit_data.phone !== user_profile.phone) {
				//
				// FINALIZE THE NAME FORMAT IN TO THE FORM OF FIRSTNAME AND LASTNAME
				//
				let firstName, lastName;
				const splited_name = staged_edit_data.name.split(' ');
				splited_name.forEach((val, index) => {
					if (index === 0) {
						firstName = val;
					} else if (index === 1) {
						lastName = val;
					} else {
						lastName = lastName + ' ' + val;
					}
				});

				lastName = lastName || '';

				// • • • • •

				try {
					const _update_res = await axios.put('/api/auth', {
						firstName,
						lastName,
						phone: staged_edit_data.phone
					});
					// If updating succeed
					this.setState((prevState) => ({
						user_profile: {
							...prevState.user_profile,
							name: prevState.staged_edit_data.name,
							phone: prevState.staged_edit_data.phone
						},
						toggleState: !prevState.toggleState
					}));
				} catch (error) {
					// If updating has failed
					// @TODO show error modal
					console.log(error);
				}
			} else {
				// If found that nothings have changed
				this.setState({ toggleState: !this.state.toggleState });
			}
		} else {
			this.setState({ toggleState: !this.state.toggleState });
		}
	}

	async onSelectImageFromLibrary() {
		console.log('selecting image');
		const options = {
			title: 'Select Avatar',
			//customButtons: [ { name: 'fb', title: 'Choose Photo from Facebook' } ],
			storageOptions: {
				skipBackup: true,
				path: 'images'
			}
		};
		ImagePicker.showImagePicker(options, async (response) => {
			//console.log('Response = ', response.data);

			if (response.didCancel) {
				console.log('User cancelled image picker');
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			} else if (response.customButton) {
				//console.log('User tapped custom button: ', response.customButton);
			} else {
				/*
				// A method for using fetch ( Example by Thiti Mahawannakit )
				// Hard debugging
				let formData = new FormData();
				const _image = {
					name: response.fileName,
					type: response.type,
					path: response.path,
					uri: response.uri
				};
				formData.append('file', _image);
				
				const userToken = await firebase.auth().currentUser.getIdToken();
				fetch('http://192.168.1.35:5000/api/auth/upload_photo', {
					method: 'PUT',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'multipart/form-data',
						Authorization: userToken
					},
					body: formData
				})
					.then((response) => console.log(response.json()))
					.catch((err) => console.log(err));
				*/

				// Creating the from data from a response
				// FLIPPER MUST BE VERSION 0.41.0 WITH REACT 0.62 ( IF NOT THIS REQUEST METHOD WILL THROW AN NETWORK ERROR ) ( use me like 6 hrs to findout that it was react falut lol)
				// Problem solved by [Thiti Mahawannakit ]
				const formData = createFormData(response);
				try {
					const _upload_res = await axios.put('/api/auth/upload_photo', formData);
					// If uploading complete
					const _uploaded_url = _upload_res.data.data;

					console.log(_uploaded_url);

					// Updating photo
					this.setState((prevState) => ({
						user_profile: {
							...prevState.user_profile,
							photo_url: _uploaded_url
						}
					}));
				} catch (error) {
					// If uploading failed
					// @TODO show an modal error / error message
				}
			}
		});
	}

	componentDidMount() {
		this.fetchUserCredential();
	}

	//
	// ─── CALLBACK ───────────────────────────────────────────────────────────────────
	//
	onEditCredential(value, key) {
		//console.log(key + ' ' + value);
		this.setState((prevState) => ({
			staged_edit_data: {
				...prevState.staged_edit_data,
				[key]: value
			}
		}));
	}
	// ────────────────────────────────────────────────────────────────────────────────

	render() {
		// Rendering the image url
		// Also generate a random string for disabling react-image-cached
		const rendered_profile_image = this.state.user_profile.photo_url
			? !this.state.toggleState
				? `${this.state.user_profile.photo_url}#${new Date().toISOString()}`
				: this.state.user_profile.photo_url
			: 'https://cdn5.vectorstock.com/i/thumb-large/45/79/male-avatar-profile-picture-silhouette-light-vector-4684579.jpg';

		console.log(rendered_profile_image);
		return (
			<KeyboardAvoidingView style={styles.container} behavior="height" enabled>
				<ScrollView>
					<SignOut />
					<View style={styles.top}>
						<LinearGradient
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 0 }}
							colors={[ '#6846ff', '#56ffd5' ]}
							style={[ styles.cardForm, { justifyContent: 'center' } ]}
						>
							<View style={styles.cardBar} onStartShouldSetResponder={this.onSelectImageFromLibrary}>
								<Image
									//source={require('../../assets/images/user.png')}
									source={{ uri: rendered_profile_image }}
									style={styles.imageStyles}
								/>
							</View>
						</LinearGradient>
					</View>
					<View style={styles.middle}>
						{this.state.toggleState ? (
							<EditProfile
								user_state={this.state.staged_edit_data}
								edit_callback={this.onEditCredential}
							/>
						) : (
							<ProfileDetails user_state={this.state.user_profile} />
						)}
						<View style={{ justifyContent: 'center', alignItems: 'center' }}>
							<TouchableOpacity style={styles.createButtonEdit}>
								<Text style={styles.detailsText} onPress={this.onEditHandler}>
									{this.state.toggleState ? 'Save' : 'Edit profile'}
								</Text>
							</TouchableOpacity>
							<Image source={require('../../assets/images/earth.png')} style={styles.imageProps} />
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		);
	}
}
