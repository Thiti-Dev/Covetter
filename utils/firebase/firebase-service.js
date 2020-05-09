var admin = require('firebase-admin');
//var serviceAccount = require('../../config/covetter-service-firebase.json');
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_JSON_STRINGIFY);
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://covetter-46323.firebaseio.com/',
	storageBucket: 'gs://covetter-46323.appspot.com'
});

module.exports = admin;
