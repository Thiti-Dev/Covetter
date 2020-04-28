var admin = require('firebase-admin');
var serviceAccount = require('../../config/covetter-service-firebase.json');
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://covetter-46323.firebaseio.com/'
});

module.exports = admin;
