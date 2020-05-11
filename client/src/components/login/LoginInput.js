import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import styles from './Styles';

import firebase from 'firebase';

// ─── AUTH FUNCTION ──────────────────────────────────────────────────────────────
import Auth from '../../utils/auth/';
// ────────────────────────────────────────────────────────────────────────────────

//
// ─── REDUX ──────────────────────────────────────────────────────────────────────
import {connect} from 'react-redux';
import {setAuthenticated} from '../../redux/actions/authAction';
import {loadingAction} from '../../redux/actions/loadingAction';
//

class LoginInput extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      emailError: null,
      passwordError: null,
    };
  }
  render() {
    const {email, password} = this.state;

    //
    // ─── ON BUTTON CLICK ─────────────────────────────────────────────
    const onSubmitHandler = () => {
      this.props.loadingAction(true);
      Auth(email, password).then(res => {
        console.log(res);
        this.props.setAuthenticated(true);
        this.props.loadingAction(false);
      });
    };
    // ─────────────────────────────────────────────────────────────────

    return (
      <View
        style={{
          backgroundColor: '#ffffff',
          flex: 8,
          justifyContent: 'center',
          paddingHorizontal: 40,
        }}>
        <View>
          <View style={styles.formInput}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#6846ff', '#56ffd5']}
              style={styles.linearGradient}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Email Address"
                value={this.state.email}
                onChangeText={value => this.setState({email: value})}
              />
            </LinearGradient>
          </View>
          <Text>{this.state.emailError}</Text>
          <View style={styles.formInput}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#6846ff', '#56ffd5']}
              style={styles.linearGradient}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Password"
                value={this.state.password}
                onChangeText={value => this.setState({password: value})}
              />
            </LinearGradient>
          </View>
          <Text>{this.state.passwordError}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '10%',
          }}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#6846ff', '#56ffd5']}
            style={[styles.linearGradient, {marginTop: 20, borderRadius: 5}]}>
            <TouchableOpacity
              onPress={() => onSubmitHandler()}
              style={{
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: '#ffffff'}}>SIGN IN</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    );
  }
}

export default connect(
  null,
  {setAuthenticated, loadingAction},
)(LoginInput);
