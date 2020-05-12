import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { faEnvelopeOpen } from '@fortawesome/free-regular-svg-icons';
import styles from './Styles';
import { TextInput } from 'react-native-gesture-handler';

export default class EditProfile extends Component {
	constructor(props) {
		super();
		this.state = {};
	}

	render() {
		const { edit_callback } = this.props;
		const { name, phone } = this.props.user_state;
		return (
			<View style={styles.cardForm}>
				<View style={styles.editContainer}>
					<TextInput
						style={styles.detailsText}
						value={name}
						onChangeText={(value) => edit_callback(value, 'name')}
					/>
				</View>
				<View style={styles.editContainer}>
					<TextInput
						style={styles.detailsText}
						value={phone}
						onChangeText={(value) => edit_callback(value, 'phone')}
					/>
				</View>
			</View>
		);
	}
}
