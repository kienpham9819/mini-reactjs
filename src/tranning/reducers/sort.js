let initState = {
	by : 'name',
	value : 1
}

let myReducer = (state = initState, action) => {
	if (action.type ==='sort') {
		var { by, value } = action.sort;
		return {by, value};
	}

	return state;
}

export default myReducer;