let initState = false;

let myReducer = (state = initState, action) => {
	if (action.type === 'toggle') {
		var state = !state;
		return state;
	}

	return state;
}

export default myReducer;