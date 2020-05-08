const admin = require('../utils/firebase/firebase-service');
const db = admin.firestore();

//
// ─── CLASSES UTILS ──────────────────────────────────────────────────────────────
//
class Gdfc {
	constructor(_data = null) {
		this.empty = _data.empty;
		if (!this.empty) {
			this.records = _data.docs.map((doc) => {
				const docData = doc.data();
				docData.id = doc.id; // assign the id of every docs
				return docData;
			});
		}
	}

	//Getting the first element of datas
	first() {
		return this.records ? this.records[0] : null;
	}

	// Getting the records length
	get length() {
		return this.records ? this.records.length : 0;
	}
}
// ────────────────────────────────────────────────────────────────────────────────

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

exports.getDataFromCollection = async (collection_name, option) => {
	let collectionRef = db.collection(collection_name);
	// executing each option has passed
	if (option) {
		if (option.limit) {
			collectionRef = collectionRef.limit(option.limit);
		}
		if (option.query) {
			//Extracting value
			const { key, operator, matchValue } = option.query;
			collectionRef = collectionRef.where(key, operator, matchValue);
		}
	}

	collectionRef = collectionRef.get();

	const _res = await collectionRef;
	return new Gdfc(_res);
};

exports.extractDataFromCollectionToObjWithKeyReady = async (collection_name, foreign_key) => {
	let collectionRef = db.collection(collection_name);
	const _res = await collectionRef.get();
	const finalized_data = {};
	_res.docs.forEach((doc) => {
		const doc_data = doc.data();
		finalized_data[doc_data[foreign_key]] = { ...doc_data, id: doc.id };
	});

	return finalized_data;
};
