import { combineReducers } from '@reduxjs/toolkit';
import { HYDRATE } from "next-redux-wrapper";

import naver from './naver';

const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        return {
            ...state,
            ...action.payload
        }
    }
    return combineReducers([
        naver
    ])(state, action);
}

export default reducer;