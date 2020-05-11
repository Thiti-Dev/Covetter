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
export default class Profile extends Component {
	constructor() {
		super();
		this.state = {
			toggleState: false,
			user_profile: {
				name: 'admin',
				email: 'admin@mail.com',
				phone: '0991231213',
				photo_url: ''
			},
			staged_edit_data: {
				name: '',
				phone: ''
			}
		};
		this.onEditCredential = this.onEditCredential.bind(this);
		this.onEditHandler = this.onEditHandler.bind(this);
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
			this.setState({ user_profile: finalized_profile_data, staged_edit_data: _staged_edit });
		} catch (error) {}
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

	componentDidMount() {
		this.fetchUserCredential();
	}

	//
	// ─── CALLBACK ───────────────────────────────────────────────────────────────────
	//
	onEditCredential(value, key) {
		console.log(key + ' ' + value);
		this.setState((prevState) => ({
			staged_edit_data: {
				...prevState.staged_edit_data,
				[key]: value
			}
		}));
	}
	// ────────────────────────────────────────────────────────────────────────────────

	render() {
		const rendered_profile_image =
			this.state.user_profile.photo_url ||
			'https://cdn5.vectorstock.com/i/thumb-large/45/79/male-avatar-profile-picture-silhouette-light-vector-4684579.jpg';

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
							<View style={styles.cardBar}>
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
