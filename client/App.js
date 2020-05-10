import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

// ────────────────────────────────────────────────────────────────────────────────
// ─── FIREBASE CONFIGURING ────────────────────────────────────────────────────────────
//
import firebase from 'firebase';
import firebaseConfig from './src/config/config';

firebase.initializeApp(firebaseConfig);
// ────────────────────────────────────────────────────────────────────────────────

// ────────────────────────────────────────────────────────────────────────────────
// ─── ROUTES ─────────────────────────────────────────────────────────────────────
//
import Login from './src/components/login/Login';
import Register from './src/components/register';
import Main from './src/components/main/Main';
// ────────────────────────────────────────────────────────────────────────────────

// ────────────────────────────────────────────────────────────────────────────────
// ─── REDUX ──────────────────────────────────────────────────────────────────────
//
import {Provider} from 'react-redux';
import store from './src/redux/store';

import {setAuthenticated} from './src/redux/actions/authAction';
import {loadingAction} from './src/redux/actions/loadingAction';
// ────────────────────────────────────────────────────────────────────────────────

const Stack = createStackNavigator();

// ────────────────────────────────────────────────────────────────────────────────
// ─── CONFIGS ─────────────────────────────────────────────────────────────────────
const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
// ────────────────────────────────────────────────────────────────────────────────

const authStack = (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        transitionSpec: {
          open: config,
          close: config,
        },
      }}>
      <Stack.Screen
        name="LoginScreen"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterFirstScreen"
        component={Register}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
    };
  }
  componentDidMount() {
    store.dispatch(loadingAction(true));
    let _this = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        store.dispatch(setAuthenticated(true));
        _this.setState({isAuthenticated: true});
        store.dispatch(loadingAction(false));
      } else {
        store.dispatch(setAuthenticated(false));
        _this.setState({isAuthenticated: false});
        store.dispatch(loadingAction(false));
      }
    });
  }
  render() {
    return (
      <Provider store={store}>
        {this.state.isAuthenticated ? <Main /> : authStack}
      </Provider>
    );
  }
}
