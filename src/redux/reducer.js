const initialState = {
    email: '',
    modalIsOpen: false
}

const LOGIN_USER = 'LOGIN_USER';
const LOGOUT_USER = 'LOGOUT_USER';
const MODAL_STATE = 'MODAL_STATE'

export function loginUser(email) {
    return {
        type: LOGIN_USER,
        payload: email
    }
}

export function logoutUser(email) {
    return {
        type: LOGOUT_USER,
        payload: email
    }
}

export function modalState(bool) {
    return {
        type: MODAL_STATE,
        payload: bool
    }
}

export default function reducer(state = initialState, action) {
    let { type, payload } = action;
    switch (type) {
        case LOGIN_USER:
            return { ...state, email: payload }
        case LOGOUT_USER:
            return { ...state, email: payload }
        case MODAL_STATE:
            return { ...state, modalIsOpen: payload }
        default:
            return state;
    }
}
