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
          <View style={styles.cardNumber}>
            <Text
              style={{
                color: '#ffffff',
                fontFamily: 'Baloo2-Bold',
                fontSize: 24,
              }}>
              {index + 1}
            </Text>
          </View>
          <View style={styles.cardStyle}>
            <View style={styles.cardQuizStyle}>
              <Text
                style={{
                  color: '#777777',
                  fontFamily: 'Prompt-Bold',
                  fontSize: 20,
                }}>
                {data.quiz_txt}
              </Text>
            </View>
          </View>
          <View style={styles.cardButton}>
            <View style={styles.buttonStyle}>
              <TouchableOpacity
                style={[
                  styles.buttonCreateStyle,
                  {backgroundColor: '#5bb86a'},
                ]}>
                <FontAwesomeIcon icon={faCheck} size={18} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.buttonStyle}>
              <TouchableOpacity
                style={[
                  styles.buttonCreateStyle,
                  {backgroundColor: '#b85b5b'},
                ]}>
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
