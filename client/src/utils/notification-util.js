//
// ─── PUSH NOTIFICATION ──────────────────────────────────────────────────────────
//
import PushNotification from 'react-native-push-notification';
// ────────────────────────────────────────────────────────────────────────────────

function configure() {
	// Initialize the PushNotification with the custom attributes
	PushNotification.configure({
		onRegister: function(token) {
			console.log('TOKEN:', token);
		},

		onNotification: function(notification) {
			console.log('NOTIFICATION:', notification);
		},

		permissions: {
			alert: true,
			badge: true,
			sound: true
		},

		popInitialNotification: true,

		// eslint-disable-next-line no-undef
		// Setting true for an ios only ( prevent crash )
		requestPermissions: Platform.OS === 'ios'
	});
	// ────────────────────────────────────────────────────────────────────────────────
}

export { configure };
