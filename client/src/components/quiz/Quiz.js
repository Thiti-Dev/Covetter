import React, { Component } from 'react';
import { Text, View, Button, AsyncStorage } from 'react-native';
import QuizHeader from './QuizHeader';
import QuizRoutine from './QuizRoutine';
import Axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import PushNotification from 'react-native-push-notification';

//
// ─── MOMENT ─────────────────────────────────────────────────────────────────────
//
import moment from 'moment';
// ────────────────────────────────────────────────────────────────────────────────

//
// ─── IMPORTING QUIZ LISTS ───────────────────────────────────────────────────────
//
import { MORNING_QUESTION, MIDDAY_QUESTION, EVENING_QUESTION } from './covid-questions';
// ────────────────────────────────────────────────────────────────────────────────

//
// ─── CONST ──────────────────────────────────────────────────────────────────────
//
const UPDATE_INTERVAL_MS = 1 * 1000; // 1 second [ for checking ]
// ────────────────────────────────────────────────────────────────────────────────

export default class Quiz extends Component {
	constructor() {
		super();
		this.state = {
			routines: []
		};
		this.quizInterval = undefined; // undefined at first
		this.onAnswerHandler = this.onAnswerHandler.bind(this);
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

	initializeInterval() {
		console.log('[QUIZ][INTERVAL-ID]: ' + this.quizInterval); // should return undefined
		//Check if timer is undefined ( not assign yet)
		if (!this.quizInterval) {
			//
			// ─── INITALIZE WATCHER ───────────────────────────────────────────
			//
			this.quizInterval = setInterval(async () => {
				const { routines } = this.state;
				// Checking phase to rendering the right question in the specific time ( that should be popped up to the stack list )
				console.log('[QUIZ]:Intervaled'); // for dev

				// Initialize time cycle
				const _storage_today_morning_date_format = this.generateSuffixFromLocalTimeFormal('today', 'morning'); // 13/5/2020:morning
				const _storage_today_midday_date_format = this.generateSuffixFromLocalTimeFormal('today', 'midday'); // 13/5/2020:midday
				const _storage_today_evening_date_format = this.generateSuffixFromLocalTimeFormal('today', 'evening'); // 13/5/2020:evening

				// Checking if user has done the morning , midday , evening task or not
				const is_today_morning_stamp = await AsyncStorage.getItem(_storage_today_morning_date_format);
				const is_today_midday_stamp = await AsyncStorage.getItem(_storage_today_midday_date_format);
				const is_today_evening_stamp = await AsyncStorage.getItem(_storage_today_evening_date_format);

				// • • • • •

				// MAPPING TIME EXACT
				var morning_date = moment().startOf('day').toDate();
				morning_date.setHours(6);
				morning_date.setMinutes(0);
				morning_date.setSeconds(0);
				morning_date.setMilliseconds(0);

				var midday_date = moment().startOf('day').toDate();
				midday_date.setHours(12);
				midday_date.setMinutes(0);
				midday_date.setSeconds(0);
				midday_date.setMilliseconds(0);

				var evening_date = moment().startOf('day').toDate();
				evening_date.setHours(18);
				evening_date.setMinutes(0);
				evening_date.setSeconds(0);
				evening_date.setMilliseconds(0);

				const today_date_now = new Date();

				/*console.log(typeof morning_date);
				console.log(typeof today_date_now);
				console.log(midday_date);
				console.log(evening_date);*/

				// Render phase
				let did_morning_routine, did_midday_routine, did_evening_routine;
				routines.forEach((data, index) => {
					if (data.cycle === 1) {
						did_morning_routine = true;
					}
					if (data.cycle === 2) {
						did_midday_routine = true;
					}
					if (data.cycle === 3) {
						did_evening_routine = true;
					}
				});
				// Iterate all over 3 cycles
				if (!did_morning_routine && !is_today_morning_stamp) {
					this.setState((prevState) => ({
						routines: [ ...prevState.routines, MORNING_QUESTION ]
					}));
				}
				if (!did_midday_routine && !is_today_midday_stamp) {
					this.setState((prevState) => ({
						routines: [ ...prevState.routines, MIDDAY_QUESTION ]
					}));
				}
				if (!did_evening_routine && !is_today_evening_stamp) {
					this.setState((prevState) => ({
						routines: [ ...prevState.routines, EVENING_QUESTION ]
					}));
				}
				/*console.log('[morning]: ' + is_today_morning_stamp);
				console.log('[midday]: ' + is_today_midday_stamp);
				console.log('[evening]: ' + is_today_evening_stamp);*/
				// • • • • •
			}, UPDATE_INTERVAL_MS);

			console.log('[QUIZ][INTERVAL-ID][ASSIGNED]: ' + this.quizInterval);
			// ─────────────────────────────────────────────────────────────────
		}
	}

	async clearAllTodayStamp() {
		await AsyncStorage.removeItem(this.generateSuffixFromLocalTimeFormal('today', 'morning'));
		await AsyncStorage.removeItem(this.generateSuffixFromLocalTimeFormal('today', 'midday'));
		await AsyncStorage.removeItem(this.generateSuffixFromLocalTimeFormal('today', 'evening'));
	}

	sendPushNotification() {
		// Testing in sending push notification
		PushNotification.localNotification({
			title: 'My notification title',
			message: 'My notification message',
			actions: '["Yes", "No"]' // (Android only) See the doc for notification actions to know more
		});
	}

	componentDidMount() {
		// NO NEEDED FOR NOW
		// MIGHT BE IN THE FUTURE FEATURE
		/*Axios.get('/api/routine').then((response) => {
			console.log(response.data.data);
			this.setState({ routine: response.data.data });
		});*/

		//
		// ─── INITIALIZE WATCHER ──────────────────────────────────────────
		//
		this.quizInterval = undefined;
		this.initializeInterval();
		// ─────────────────────────────────────────────────────────────────
	}
	componentWillUnmount() {
		//
		// ─── CLEARING THE INTERVAL ───────────────────────────────────────
		//
		this.quizInterval = undefined; // Prevent the random number that automatically assigned after some timer has been initialized
		clearInterval(this.quizInterval); // clear the interval
		// ─────────────────────────────────────────────────────────────────
	}

	//
	// ─── CALLBACK ───────────────────────────────────────────────────────────────────
	//
	onAnswerHandler(cycle) {
		console.log('[CALLBACK]: RAN > CYCLE :' + cycle);
		const { routines } = this.state;
		const newArray = routines.filter((item) => item.cycle !== cycle);

		this.setState({
			routines: newArray
		});
	}
	// ────────────────────────────────────────────────────────────────────────────────

	render() {
		return (
			<ScrollView style={{ backgroundColor: '#fff' }}>
				<QuizHeader />
				<QuizRoutine state_routine={this.state.routines} on_answer={this.onAnswerHandler} />
				{/* <Button title="Test push notification" primary onPress={this.sendPushNotification.bind(this)} /> */}
				<Button title="Clear all today stamp" primary onPress={this.clearAllTodayStamp.bind(this)} />
			</ScrollView>
		);
	}
}
