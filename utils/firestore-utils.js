const admin = require('../utils/firebase/firebase-service');
const db = admin.firestore();

exports.addMultipleDocFromData = async (data, collection_name) => {
	let batch = db.batch(); // creating a new batch for executing the multiple tasks
	data.forEach((doc) => {
		var docRef = db.collection(collection_name).doc(); //automatically generate unique id
		batch.set(docRef, doc);
	});

	return await batch.commit();
};
