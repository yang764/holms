import courseActions from './actions';
import { Map } from 'immutable';
const course_data = {};
const { COURSE_DATA, COURSE_UPDATE, COURSE_MAT_UPDATE, REMOVED_MATERIAL, RETRIEVE_COURSE, COURSE_ASSIGN_UPDATE} = courseActions;



const initState = new Map({
	course_data,
});

export default function(state = initState, action) {
	switch(action.type) {
		case COURSE_UPDATE:
			const { courseId, newCourse } = action.payload;
			let data = state.get('course_data');
			data[courseId] = newCourse;
			state.set('course_data', data);
			return state.set('course_data', data);
			break;

 		case COURSE_DATA:
			const { course, id } = action;
			let old_state = state.get('course_data');
			return state.set('course_data', { ...old_state, [id]: course});
			break;

		case COURSE_MAT_UPDATE:
			const { materials, cId} = action;
			let courseData = state.get('course_data');
			courseData[cId].materials = materials;
			return state.set('course_data', courseData);

		case REMOVED_MATERIAL:
			let cData = state.get('course_data');
			cData[action.id].materials = action.materials;
			return state.set('course_data', cData);
			break;

		case RETRIEVE_COURSE:
			const { aCourse, rId} = action;
			let r_state = state.get('course_data');
			state.get()
			if(r_state[rId]) {
				r_state[rId] = aCourse
				return state.set('course_data', r_state);
			}
			else {
				return state.set('course_data', {...r_state, [rId]: aCourse});
			}
			break;

		case COURSE_ASSIGN_UPDATE:
			const { aBoxes, iDC} = action;
			let coData = state.get('course_data');
			coData[iDC].aBoxes = aBoxes;
			return state.set('course_data', coData);


	}
	return state;
}