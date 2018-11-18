import Firebase from '../../helpers/firebase/index';

export const COURSE_DATA = "COURSE_DATA";



 export function fetchCourse(course) {
	 let courseDoc = Firebase.firestore.collection("courses").doc(course);


	 const data = Promise.resolve(courseDoc.get().then(doc => {
		 if (doc.exists) {
			 return doc.data();
		 } else {
			 // doc.data() will be undefined in this case
			 console.log("No such document!");
		 }
	 }).catch(function(error) {
		 console.log("Error getting document:", error);
	 }));
 	return {
 		type: COURSE_DATA,
 		payload: data
 	};
 }
