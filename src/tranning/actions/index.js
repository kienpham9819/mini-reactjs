import * as types from './../constants/actionType';

export const status = () => {
    return {
        type : types.Toggle
    }
}

export const sort = (sort) => {
    return {
        type : types.Sort,
        sort : sort
    }
}
