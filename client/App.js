import React, {Component, Profiler} from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMapMarkedAlt, faTasks} from '@fortawesome/free-solid-svg-icons';
import {faUser, faNewspaper} from '@fortawesome/free-regular-svg-icons';

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
import Map from './src/components/map/Map';
import News from './src/components/news/News';
import Quiz from './src/components/quiz/Quiz';
import Profile from './src/components/profile/Profile';
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
const Tab = createBottomTabNavigator();

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
		restSpeedThreshold: 0.01
	}
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

const appStack = (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let iconName;
          let iconColor;

          if (route.name === 'Map') {
            iconName = faMapMarkedAlt;
            iconColor = focused ? '#39167e' : 'gray';
          } else if (route.name === 'News') {
            iconName = faNewspaper;
            iconColor = focused ? '#39167e' : 'gray';
          } else if (route.name === 'Quiz') {
            iconName = faTasks;
            iconColor = focused ? '#39167e' : 'gray';
          } else if (route.name === 'Profile') {
            iconName = faUser;
            iconColor = focused ? '#39167e' : 'gray';
          }

          // You can return any component that you like here!
          return (
            <FontAwesomeIcon icon={iconName} size={28} color={iconColor} />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: '#39167e',
        inactiveTintColor: 'gray',
        showLabel: false,
        style: {
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        },
      }}>
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen name="News" component={News} />
      <Tab.Screen name="Quiz" component={Quiz} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
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
        {this.state.isAuthenticated ? appStack : authStack}
      </Provider>
    );
  }
}
