import {COURSE_DATA} from './actions';
import { Map } from 'immutable';
const user = {};
const course_list = [];

const initState = new Map({
  course_list,
});

export default function(state = initState, action) {
	switch(action.type) {

	}
	return state;
} 