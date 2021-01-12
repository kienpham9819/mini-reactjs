import * as types from './../constants/ActionTypes';
import { findIndex } from 'lodash';

let s4 = () => {
	return Math.floor((1+ Math.random()) * 0x10000).toString(16).substring(1);
}

let randomId = () => {
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-'+ s4() + s4() + s4();
}

let data = JSON.parse(localStorage.getItem('tasks'));
let intiState = data ? data : [];
let myReducer = (state = intiState, action) => {
	switch(action.type) {
		case types.LIST_ALL : 
			return state;
			
		case types.ADD_TASK :
			var newTask = {
				id : randomId(),
				name : action.task.name,
				status : action.task.status === 'true' ? true : false
			}
			state.push(newTask);
			localStorage.setItem('tasks', JSON.stringify(state));
			return [...state];
		case types.UPDATE_STATUS :
			var index = findIndex(state, function(item) { return item.id === action.id; });
			state[index] = {
				...state[index],
				status : !state[index].status
			};
			localStorage.setItem('tasks', JSON.stringify(state));
			return [...state];
		case types.DELETE_TASK :
			var index = findIndex(state, function (item) { return item.id ===action.id });
			state.splice(index, 1);
			localStorage.setItem('tasks', JSON.stringify(state));
			return [...state];

		default : return state;
	}
}

export default myReducer;