import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Register from './src/components/register';
import Landing from './src/components/landing/Landing';
import Login from './src/components/login/Login';
import Awareness from './src/components/Awareness';

const Stack = createStackNavigator();

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

export default class App extends Component {
	render() {
		return (
			<NavigationContainer>
				<Stack.Navigator
					initialRouteName="LandingScreen"
					screenOptions={{
						gestureEnabled: true,
						gestureDirection: 'horizontal',
						cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
						transitionSpec: {
							open: config,
							close: config
						}
					}}
				>
					<Stack.Screen name="LandingScreen" component={Landing} options={{ headerShown: false }} />
					<Stack.Screen name="LoginScreen" component={Login} options={{ headerShown: false }} />
					<Stack.Screen name="RegisterFirstScreen" component={Register} options={{ headerShown: false }} />
					<Stack.Screen name="AwarenessScreen" component={Awareness} options={{ headerShown: false }} />
				</Stack.Navigator>
			</NavigationContainer>
		);
	}
}
