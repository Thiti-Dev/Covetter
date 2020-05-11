import React, {Component} from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from './Styles';
import SignOut from './SignOut';
import LinearGradient from 'react-native-linear-gradient';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUserAlt} from '@fortawesome/free-solid-svg-icons';

export default class Profile extends Component {
  render() {
    const imageUrl = {
      uri:
        'https://scontent.fbkk7-2.fna.fbcdn.net/v/t1.0-9/87174829_2721734137902520_2355997481222799360_o.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_eui2=AeE-5LJVzmMv8ZwW3cywz5c6ldjHzEffU8-V2MfMR99Tz-R6yl99ayiaP5tw2KAKkN7FlrIUyK6sfX5CAPO5grhF&_nc_oc=AQmk8oHcMsAIh26nULVhFe-DesxQQYe5-D1pAel8aBHyO6KH_78_4RBxTfq8lo0zpVI&_nc_ht=scontent.fbkk7-2.fna&oh=838964dfaa2d7187e767da654cdca5b7&oe=5EDC7C73',
    };
    return (
      <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
        <SignOut />
        <View style={styles.top}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#6846ff', '#56ffd5']}
            style={[styles.cardForm, {justifyContent: 'center'}]}>
            <View style={styles.cardBar}>
              <Image
                //source={require('../../assets/images/user.png')}
                source={imageUrl}
                style={styles.imageStyles}
              />
              <TouchableOpacity style={styles.createButtonEdit}>
                <Text style={{color: '#3d3d3d'}}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
        <View style={styles.middle}>
          <View style={styles.cardForm}>
            <View>
              <Text
                style={{
                  fontSize: 38,
                  fontWeight: '500',
                  color: '#6846ff',
                  fontFamily: 'Prompt-Regular',
                  textAlign: 'center',
                }}>
                Blue Bearrii
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
