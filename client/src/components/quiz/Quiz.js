import React, {Component} from 'react';
import {Text, View} from 'react-native';
import QuizHeader from './QuizHeader';
import QuizRoutine from './QuizRoutine';
import Axios from 'axios';
import {ScrollView} from 'react-native-gesture-handler';

export default class Quiz extends Component {
  constructor() {
    super();
    this.state = {
      routine: [],
    };
  }

  componentDidMount() {
    Axios.get('/api/routine').then(response => {
      console.log(response.data.data);
      this.setState({routine: response.data.data});
    });
  }
  render() {
    return (
      <ScrollView style={{backgroundColor: '#fff'}}>
        <QuizHeader />
        <QuizRoutine state_routine={this.state.routine} />
      </ScrollView>
    );
  }
}
