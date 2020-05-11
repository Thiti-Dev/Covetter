import React, {Component} from 'react';
import {Text, View, Button, TouchableOpacity} from 'react-native';
import styles from './Styles';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';
import {ScrollView} from 'react-native-gesture-handler';

export default class QuizRoutine extends Component {
  render() {
    const {state_routine} = this.props;
    console.log(state_routine);
    //
    // ─── MAPPING ROUTINE QUIZ ───────────────────────────────────────────────────────
    //
    const mapping = state_routine.map((data, index) => {
      return (
        <View key={data.id} style={styles.cardContainer}>
          <View style={styles.cardStyle}>
            <View style={styles.cardNumber}>
              <Text style={{color: '#ffffff', fontWeight: 'bold'}}>
                {index + 1}
              </Text>
            </View>
            <View style={styles.cardQuizStyle}>
              <Text style={{color: '#3d3d3d', fontWeight: 'bold'}}>
                {data.quiz_txt}
              </Text>
            </View>
          </View>
          <View style={styles.cardButton}>
            <View style={styles.buttonStyle}>
              <TouchableOpacity style={styles.buttonCreateStyle}>
                <FontAwesomeIcon icon={faCheck} size={18} color="green" />
              </TouchableOpacity>
            </View>
            <View style={styles.buttonStyle}>
              <TouchableOpacity style={styles.buttonCreateStyle}>
                <FontAwesomeIcon icon={faTimes} size={18} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    });
    return <ScrollView style={{marginBottom: 50}}>{mapping}</ScrollView>;
  }
}
