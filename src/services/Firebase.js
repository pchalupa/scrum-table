/** @module Firebase */
import * as firebase from 'firebase/app';
import { firebaseConfig } from '../constants';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

/** Defines Firebase service */
class Firebase {
	/** @type {Firebase} */
	static get db() {
		return firebase.firestore();
	}

	/** Initialize Firebase services. */
	static initialize() {
		firebase.initializeApp(firebaseConfig);
	}

	static async updateTaskCollection(id, collection) {
		try {
			await this.db.collection('tasks').doc(id).update({
				collection: collection,
			});
		} catch (error) {
			console.error(error);
		}
	}
}

export default Firebase;