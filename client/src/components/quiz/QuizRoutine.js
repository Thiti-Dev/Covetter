import React, { Component } from 'react';
import { Text, View, Button, TouchableOpacity, AsyncStorage } from 'react-native';
import styles from './Styles';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ScrollView } from 'react-native-gesture-handler';

import moment from 'moment';

import axios from 'axios';

export default class QuizRoutine extends Component {
	constructor(props) {
		super(props);
		this.onAnsweringRoutineQuiz = this.onAnsweringRoutineQuiz.bind(this);
	}

	//
	// ─── UTILS ──────────────────────────────────────────────────────────────────────
	//
	generateSuffixFromLocalTimeFormal(day, type) {
		if (day === 'today') {
			if (type === 'morning') {
				return moment().format('l') + ':' + 'morning';
			} else if (type === 'midday') {
				return moment().format('l') + ':' + 'midday';
			} else if (type === 'evening') {
				return moment().format('l') + ':' + 'evening';
			}
		}
	}
	// ────────────────────────────────────────────────────────────────────────────────

	async onAnsweringRoutineQuiz(quiz_data, answer) {
		const { quiz_id } = quiz_data;
		console.log(quiz_id);
		// On answering
		try {
			const _answer_res = await axios.post(`/api/routine/${quiz_id}/answer`, { answer });
			// If answering successfully
			let cycle_str;
			if (quiz_data.cycle === 1) {
				cycle_str = 'morning';
			} else if (quiz_data.cycle === 2) {
				cycle_str = 'midday';
			} else if (quiz_data.cycle === 3) {
				cycle_str = 'evening';
			}
			const staged_stamp_pointer = this.generateSuffixFromLocalTimeFormal('today', cycle_str);
			// Stamping phase
			await AsyncStorage.setItem(staged_stamp_pointer, 'true');
			this.props.on_answer(quiz_data.cycle);
		} catch (error) {
			console.log('errrrrr');
			console.log(error.response.data);
		}
	}

	render() {
		const { state_routine } = this.props;
		//console.log(state_routine);
		//
		// ─── MAPPING ROUTINE QUIZ ───────────────────────────────────────────────────────
		//
		const mapping = state_routine.map((data, index) => {
			return (
				<View key={data.quiz_id} style={styles.cardContainer}>
					<View style={styles.cardNumber}>
						<Text
							style={{
								color: '#ffffff',
								fontFamily: 'Baloo2-Bold',
								fontSize: 24
							}}
						>
							{index + 1}
						</Text>
					</View>
					<View style={styles.cardStyle}>
						<View style={styles.cardQuizStyle}>
							<Text
								style={{
									color: '#777777',
									fontFamily: 'Prompt-Bold',
									fontSize: 20
								}}
							>
								{data.quiz_txt}
							</Text>
						</View>
					</View>
					<View style={styles.cardButton}>
						<View style={styles.buttonStyle}>
							<TouchableOpacity
								onPress={() => this.onAnsweringRoutineQuiz(data, true)}
								style={[ styles.buttonCreateStyle, { backgroundColor: '#5bb86a' } ]}
							>
								<FontAwesomeIcon icon={faCheck} size={18} color="#fff" />
							</TouchableOpacity>
						</View>
						<View style={styles.buttonStyle}>
							<TouchableOpacity
								onPress={() => this.onAnsweringRoutineQuiz(data, false)}
								style={[ styles.buttonCreateStyle, { backgroundColor: '#b85b5b' } ]}
							>
								<FontAwesomeIcon icon={faTimes} size={18} color="#fff" />
							</TouchableOpacity>
						</View>
					</View>
				</View>
			);
		});
		return <View>{mapping}</View>;
	}
}
