/**
 * Created by sf on 2017/9/17.
 */

import * as actionTypes from '../constants/index.jsx';

const initialState = {};

export default function userinfo(state = initialState, action) {
    switch (action.type) {
        case actionTypes.USERINFO_UPDATE:
            return action.data;
        default:
            return state;
    }
}
