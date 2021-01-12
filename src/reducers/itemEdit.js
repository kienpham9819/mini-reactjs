import * as types from './../constants/ActionTypes';

let initState = {};

let myReducer = (state = initState, action) => {
	switch (action.type) {
		case types.EDIT_TASK :
			return action.task;
		default : return state;
	}
}

export default myReducer;