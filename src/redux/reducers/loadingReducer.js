import {REDUX_CONSTANTS} from '../../constants/reduxConstants';
let initialState = false;

export default function (state = initialState, action) {
    switch (action.type) {
        case REDUX_CONSTANTS.SET_LOADING_STATUS:
            return action.payload.status;
        default:
            return state;
    }
}