import { createStore } from 'redux';
import { status, sort } from './actions/index';
import myReducer from './reducers/index';

const store = createStore(myReducer);


store.dispatch(status());
// console.log('toggle', store.getState());

store.dispatch(sort({
        by : 'name',
        value : -1
    }));
// console.log('sort',store.getState());
