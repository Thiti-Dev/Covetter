import React, {Component} from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import styles from './Styles';
import SignOut from './SignOut';
import LinearGradient from 'react-native-linear-gradient';
import ProfileDetails from './ProfileDetails';
import EditProfile from './EditProfile';
import {ScrollView} from 'react-native-gesture-handler';
import Axios from 'axios';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      toggleState: false,
      name: 'admin',
      email: 'admin@mail.com',
      phone: '0991231213',
    };
  }
  componentDidMount() {}
  render() {
    const imageUrl = {
      uri:
        'https://scontent.fbkk7-2.fna.fbcdn.net/v/t1.0-9/87174829_2721734137902520_2355997481222799360_o.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_eui2=AeE-5LJVzmMv8ZwW3cywz5c6ldjHzEffU8-V2MfMR99Tz-R6yl99ayiaP5tw2KAKkN7FlrIUyK6sfX5CAPO5grhF&_nc_oc=AQmk8oHcMsAIh26nULVhFe-DesxQQYe5-D1pAel8aBHyO6KH_78_4RBxTfq8lo0zpVI&_nc_ht=scontent.fbkk7-2.fna&oh=838964dfaa2d7187e767da654cdca5b7&oe=5EDC7C73',
    };

    return (
      <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
        <ScrollView>
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
              </View>
            </LinearGradient>
          </View>
          <View style={styles.middle}>
            {this.state.toggleState ? (
              <EditProfile user_state={this.state} />
            ) : (
              <ProfileDetails user_state={this.state} />
            )}
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity style={styles.createButtonEdit}>
                <Text
                  style={styles.detailsText}
                  onPress={() =>
                    this.setState({toggleState: !this.state.toggleState})
                  }>
                  {this.state.toggleState ? 'Save' : 'Edit profile'}
                </Text>
              </TouchableOpacity>
              <Image
                source={require('../../assets/images/earth.png')}
                style={styles.imageProps}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
