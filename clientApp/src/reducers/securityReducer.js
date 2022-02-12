import { SET_CURRENT_USER } from '../actions/types';

const initialState = {
    user: {},
    validToken: false
};

const checkPayload = (payload) => {
    if(payload) return true;
    return false;
}

export default function securityReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                validToken: checkPayload(action.payload),
                user: action.payload
            }
        default:
            return state;
    }
}
