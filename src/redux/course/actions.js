import Firebase from '../../helpers/firebase/index';
import notesAction from "../notes/actions";



const courseActions = {
	COURSE_REQUEST: 'COURSE_REQUEST',
	COURSE_DATA: 'COURSE_DATA',
	COURSE_GET: 'COURSE_GET',
	COURSE_UPDATE: 'COURSE_UPDATE',
	COURSE_MAT_UPDATE: 'COURSE_MAT_UPDATE',
	COURSE_EDIT: 'COURSE_EDIT',
	COURSE_DELETE: 'COURSE_DELETE',
	COURSE_CREATE: 'COURSE_CREATE',
	COURSE_ERROR: 'COURSE_ERROR',
	ADD_MATERIAL: 'ADD_MATERIAL',
	REMOVE_MATERIAL: 'REMOVE_MATERIAL',
	REMOVED_MATERIAL: 'REMOVED_MATERIAL',
	RETRIEVE_COURSE: 'RETRIEVE_COURSE',
	ADD_ASSIGN_BOX: 'ADD_ASSIGN_BOX',
	COURSE_ASSIGN_UPDATE: 'COURSE_ASSIGN_UPDATE',
	COURSE_ASSIGN_DELETE: 'COURSE_ASSIGN_DELETE',
	DISABLE_ASSIGN_BOX: 'DISABLE_ASSIGN_BOX',
	OPEN_COURSE_PAGE: 'OPEN_COURSE_PAGE',

	createCourse: (values, uID, tID) => ({
		type: courseActions.COURSE_CREATE,
		payload: {
			values
		}
	}),

	fetchCourse: (id) => ({
		type: courseActions.COURSE_REQUEST,
		payload: {
			id
		}
	}),

	updateCourse: (courseId, newCourse) => ({
		type: courseActions.COURSE_UPDATE,
		payload: {
			courseId,
			newCourse
		}
	}),

	removeMaterial: (id, key, materials, callback) =>({
		type: courseActions.REMOVE_MATERIAL,
		payload: {
			id,
			key,
			materials,
			callback
		}
	}),

	getCourse: (id, update) => ({
		type: courseActions.COURSE_GET,
		payload: {
			id,
			update
		}
	}),

	addMaterial: (filesAdded, id, desc, topic, materials, callback) => ({
			type: courseActions.ADD_MATERIAL,
			payload: {
				filesAdded,
				id,
				desc,
				topic,
				materials,
				callback
			}
		}),


	addABox: (id, aTitle, aDueDateString, aDesc, aBoxes, callback) => ({
		type: courseActions.ADD_ASSIGN_BOX,
		payload: {
			id, aTitle, aDueDateString, aDesc, aBoxes, callback
		}
	}),

	removeABox: (id, key, aBoxes, callback) =>({
		type: courseActions.COURSE_ASSIGN_DELETE,
		payload: {
			id,
			key,
			aBoxes,
			callback
		}
	}),

	toggleAssignBox: (id, key, aBoxes, callback) => ({
		type: courseActions.DISABLE_ASSIGN_BOX,
		payload: {
			id, key, aBoxes, callback
		}
	}),

	openCoursePage: (id) => ({
		type: courseActions.OPEN_COURSE_PAGE,
		payload: {
			id
		}
	})

	};


export default courseActions;


// export function fetchCourse(course) {
// 	let courseDoc = Firebase.firestore.collection("courses").doc(course);
//
//
// 	const data = Promise.resolve(courseDoc.get().then(doc => {
// 		if (doc.exists) {
// 			return doc.data();
// 		} else {
// 			// doc.data() will be undefined in this case
// 			console.log("No such document!");
// 		}
// 	}).catch(function(error) {
// 		console.log("Error getting document:", error);
// 	}));
// 	return {
// 		type: COURSE_DATA,
// 		payload: data
// 	};

// return (dispatch, getState) => {
// 	const notes = getState().Notes.get('notes');
// 	const seectedColor = notes[notes.findIndex(note => note.id === id)].color;
// 	dispatch({
// 		type: notesAction.CHANGE_NOTE,
// 		selectedId: id,
// 		seectedColor,
// 	});
// };
// }



