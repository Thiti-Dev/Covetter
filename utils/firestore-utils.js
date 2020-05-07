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

exports.getAllDataFromCollection = async (collection_name) => {
	let collectionRef = db.collection(collection_name);
	const _res = await collectionRef.get();
	const _data = _res.docs.map((doc) => {
		const docData = doc.data();
		docData.id = doc.id; // assign the id of every docs
		return docData;
	});
	return _data;
};
