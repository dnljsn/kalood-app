const initialState = {
    user: {},
    modalIsOpen: false,
    activeSession: false
}

const LOGIN_USER = 'LOGIN_USER';
const LOGOUT_USER = 'LOGOUT_USER';
const MODAL_STATE = 'MODAL_STATE';
const SESSION_CHECK = 'SESSION_CHECK';

export function loginUser(user) {
    return {
        type: LOGIN_USER,
        payload: user
    }
}

export function logoutUser(user) {
    return {
        type: LOGOUT_USER,
        payload: user
    }
}

export function modalState(bool) {
    return {
        type: MODAL_STATE,
        payload: bool
    }
}

export function sessionCheck() {
    return {
        type: SESSION_CHECK
    }
}

export default function reducer(state = initialState, action) {
    let { type, payload } = action;
    switch (type) {
        case LOGIN_USER:
            return { ...state, user: payload }
        case LOGOUT_USER:
            return { ...state, user: payload }
        case MODAL_STATE:
            return { ...state, modalIsOpen: payload }
        case SESSION_CHECK:
            return {...state, activeSession: true}
        default:
            return state;
    }
}
