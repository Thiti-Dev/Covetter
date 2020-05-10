import React, {Component} from 'react';
import {Text, View} from 'react-native';
import QuizHeader from './QuizHeader';
import QuizRoutine from './QuizRoutine';
import Axios from 'axios';

export default class Quiz extends Component {
  constructor() {
    super();
    this.state = {
      routine: [],
    };
  }

  componentDidMount() {
    Axios.get('https://covetter-api.herokuapp.com/api/routine').then(
      (response) => {
        console.log(response.data.data);
        this.setState({routine: response.data.data});
      },
    );
  }
  render() {
    return (
      <View>
        <QuizHeader />
        <QuizRoutine state_routine={this.state.routine} />
      </View>
    );
  }
}
