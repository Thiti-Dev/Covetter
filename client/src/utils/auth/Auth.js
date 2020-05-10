import React from 'react';
import {View, Text} from 'react-native';
import firebase from 'firebase';
import firebaseConfig from '../../config/config';

const Auth = (email, password) => {
  const auth = firebase.auth().signInWithEmailAndPassword(email, password);
  return auth;
};

export default Auth;
