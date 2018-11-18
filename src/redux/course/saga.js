import { all, takeEvery, put, fork, take, cancelled, call} from 'redux-saga/effects';
import { eventChannel, delay} from 'redux-saga';
import { push } from 'react-router-redux';
import { clearToken } from '../../helpers/utility';
import actions from './actions';
import Firebase from '../../helpers/firebase/index';
import { getPersistor } from "../store";
import _ from 'lodash';


export function* courseRequest() {
	yield takeEvery('COURSE_REQUEST', function*(action) {

		const { payload: {id} } = action;

		let course = yield Promise.resolve(Firebase.firestore.collection("courses").doc(id).get().then(doc => {
			if(doc.exists) {
				return doc.data();
			}
		}));


		yield put({
				type: actions.COURSE_DATA,
				course,
				id
			})


	});
}


export function* courseData() {
	yield takeEvery(actions.COURSE_DATA, function*(payload) {
		// yield localStorage.setItem('id_token', payload.token);
		yield put(push(`courses/${payload.id}`));
	});
}

export function* removeMaterial() {
	yield takeEvery(actions.REMOVE_MATERIAL, function*(action) {
		const { id, key, materials, callback } = action.payload;
		let mat = _.mapKeys(materials, 'key');

		let obj = _.omit(mat, key);

		let mater = _.values(obj);


		yield Promise.resolve(Firebase.firestore.collection("courses").doc(id).update({
			materials: mater
		}).then(function () {

		}));
		yield put({
			type: actions.REMOVED_MATERIAL,
			materials: mater,
			id,
			callback
		})
	});
}

export function* removedMaterial() {
	yield takeEvery(actions.REMOVED_MATERIAL, function*(action) {
		const {callback} = action;
		callback();
	});
}

export function* addAssignBox() {
	yield takeEvery(actions.ADD_ASSIGN_BOX, function*(action) {
		const { id, aTitle, aDueDateString, aDesc, aBoxes, callback } = action.payload;

		const timestamp =  Math.floor(Date.now() / 1000);
		aBoxes.push({
				aTitle,
				aDueDateString,
				aDesc,
				key: '_' + Math.random().toString(36).substr(2, 9),
				timestamp,
				enabled: true,
				submissions: []
			});


			yield Promise.resolve(Firebase.firestore.collection("courses").doc(id).update({
				aBoxes
			}).then(function () {

			}));

			yield put({
				type: actions.COURSE_ASSIGN_UPDATE,
				aBoxes,
				iDC: id,
				callback
			})

	});
}

export function* removeABox() {
	yield takeEvery(actions.COURSE_ASSIGN_DELETE, function*(action) {
		const {
			id,
			key,
			aBoxes,
			callback
		} = action.payload;

		let mat = _.mapKeys(aBoxes, 'key');

		let obj = _.omit(mat, key);

		let boxArr = _.values(obj);

		yield Promise.resolve(Firebase.firestore.collection("courses").doc(id).update({
			aBoxes: boxArr
		}).then(function () {

		}));

		yield put({
			type: actions.COURSE_ASSIGN_UPDATE,
			aBoxes: boxArr,
			iDC: id,
			callback
		})

	});
}

export function* updateABox() {
	yield takeEvery(actions.COURSE_ASSIGN_UPDATE, function*(action) {
		const {callback} = action;
		let secs = 1;
		while (secs > 0) {
			yield call(delay, 1000);
			secs--;
		}
		// const flushData = persistor => persistor.flush();
		// const persistor = yield call(getPersistor);
		callback();
		yield put(getPersistor().flush);
	});
}

export function* courseAddMaterial() {
	yield takeEvery(actions.ADD_MATERIAL, function*(action) {
		const { filesAdded, id, desc, topic, materials, callback } = action.payload;
		let urlList = [];
		const storageRef = Firebase.storage.ref();
		Firebase.storage.ref().constructor.prototype.putFiles = function(files) {
			var ref = this;
			return Promise.all(files.map(function(file) {
				return ref.child(file.name).put(file);
			}));
		}

		yield Promise.resolve(Firebase.storage.ref().putFiles(filesAdded).then(function(metadatas) {
			// Get an array of file metadata
			metadatas.forEach(meta => {
				console.log(meta.metadata.fullPath);
				urlList.push({
					name: meta.metadata.fullPath,
					url: meta.downloadURL
				})
			})
		}).catch(function(error) {
			// If any task fails, handle this
		}));
		console.log(`List of URLS: ${urlList.length}`);
		if(urlList.length === filesAdded.length) {
			yield put({
				type: 'COURSE_COLL_UPDATE',
				urlList,
				desc,
				topic,
				id,
				materials,
				callback
			})
		}

	});
}

export function* updateCollection() {
	yield takeEvery('COURSE_COLL_UPDATE', function*(action) {
		const { urlList, desc, topic, id, materials, callback} = action;
		const timestamp =  Math.floor(Date.now() / 1000);

		if(urlList.length !== 0) {
			materials.push({
				desc,
				files: urlList,
				key: '_' + Math.random().toString(36).substr(2, 9),
				timestamp,
				topic
			});


			yield Promise.resolve(Firebase.firestore.collection("courses").doc(id).update({
				materials
			}).then(function () {
				callback();
			}));


			yield put({
				type: actions.COURSE_MAT_UPDATE,
				materials,
				cId: id
			})
		}


	});
}

export function* materialUpdate() {
	yield takeEvery(actions.COURSE_MAT_UPDATE, function*() {
		let secs = 2;
		while (secs > 0) {
			yield call(delay, 1000);
			secs--;
		}
		// const flushData = persistor => persistor.flush();
		// const persistor = yield call(getPersistor);
		yield put(getPersistor().flush);
	});
}

export function* getCourse() {
	yield takeEvery(actions.COURSE_GET, function*(action) {

		const { payload: {id, update} } = action;

		let aCourse = yield Promise.resolve(Firebase.firestore.collection("courses").doc(id).get().then(doc => {
			if(doc.exists) {
				return doc.data();
			}
		}));


		yield put({
			type: actions.RETRIEVE_COURSE,
			aCourse,
			rId: id,
			update
		})
	});
}

export function* retCourse() {
	yield takeEvery(actions.RETRIEVE_COURSE, function*(action) {
		const { update } = action;

		update();
	});
}

export function* courseError() {
	yield takeEvery(actions.COURSE_ERROR, function*() {});
}

export function* courseDelete() {
	yield takeEvery(actions.COURSE_DELETE, function*() {
		// Firebase.auth().signOut().then(function() {
		// 	clearToken();
		// }, function(error) {
		// 	console.error('Sign Out Error', error);
		// });
		// yield put(push('/'));
	});
}

export function* disableABox() {
	yield takeEvery(actions.DISABLE_ASSIGN_BOX, function*(action) {
		const { id, key, aBoxes, callback } = action.payload;
		let assign = _.mapKeys(aBoxes, 'key');

		if(assign[key]) {

				if(assign[key].enabled) {
					assign[key].enabled = false;
				}
				else {
					assign[key].enabled = true;
				}

		}

		let boxArr = _.values(assign);

		yield Promise.resolve(Firebase.firestore.collection("courses").doc(id).update({
			aBoxes: boxArr
		}).then(function () {

		}));

		yield put({
			type: actions.COURSE_ASSIGN_UPDATE,
			aBoxes: boxArr,
			iDC: id,
			callback
		})
	});
}

export function* openCoursePage() {
	yield takeEvery(actions.OPEN_COURSE_PAGE, function*(action) {
		const { id } = action.payload;
		yield put(push(`courses/${id}`));
	});
}



export default function* rootSaga() {
	yield all([
		fork(courseRequest),
		fork(courseData),
		fork(courseError),
		fork(courseDelete),
		fork(courseAddMaterial),
		fork(updateCollection),
		fork(removeMaterial),
		fork(removedMaterial),
		fork(materialUpdate),
		fork(getCourse),
		fork(retCourse),
		fork(addAssignBox),
		fork(updateABox),
		fork(removeABox),
		fork(disableABox),
		fork(openCoursePage)
	]);
}
