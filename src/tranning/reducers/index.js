let initState = {
    status : false,
    sort : {
        by : 'name',
        value : 1
    }
}
let myReducer = (state = initState, action) => {
    let {status, sort} = state;
    if (action.type==='toggle') {
        return {
            status : !status,
            sort : sort
        };
    }
    console.log(state.status);
    if (action.type==='sort') {
        return {
            status : status,
            sort :action.sort
        }
    }
}


export default myReducer;
