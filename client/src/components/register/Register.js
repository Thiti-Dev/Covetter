import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import RegisterI from './firstScreen/RegisterI';
import RegisterII from './secondScreen/RegisterII';
import Axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Loading from '../common/loadingScreen/Loading';

const Register = () => {
	const navigation = useNavigation();
	const [ credentials, setCredential ] = useState({
		email: '',
		password: '',
		confirmPassword: '',
		firstName: '',
		lastName: '',
		phone: '',
		state: false
	});

	const [ isLoading, setLoading ] = useState(false);

	const createTwoButtonAlert = () =>
		Alert.alert('', '✉️ This email already used', [ { text: 'OK', onPress: () => console.log('OK Pressed') } ], {
			cancelable: false
		});

	useEffect(
		() => {
			if (credentials.state === true) {
				Axios.post('/api/auth/register', credentials)
					.then((res) => {
						navigation.navigate('LoginScreen');
						setLoading(false);
					})
					.catch((err) => {
						createTwoButtonAlert();
						setLoading(false);
					});
			}
		},
		[ credentials ]
	);

	// ────────────────────────────────────────────────────────────────────────────────
	// ─── CALL BACK ──────────────────────────────────────────────────────────────────
	const mergeCredentials = (data, bool) => {
		if (!bool)
			setCredential((prevState) => {
				return { ...prevState, ...data };
			});
		if (bool)
			setCredential((prevState) => {
				return { ...prevState, ...data, state: true };
			});
	};
	// ─────────────────────────────────────────────────────────────────

	const [ step, setStep ] = useState(0);

	let rendered_content;
	switch (step) {
		case 0:
			rendered_content = <RegisterI set_step={setStep} merge_function={mergeCredentials} />;
			break;
		case 1:
			rendered_content = (
				<RegisterII set_step={setStep} merge_function={mergeCredentials} set_loading={setLoading} />
			);
			break;
		default:
			break;
	}
	return <View>{rendered_content}</View>;
};

export default Register;
