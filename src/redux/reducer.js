const initialState = {
    user: {},
    session: false,
    modal: false
}

const USER_AUTH = 'USER_AUTH';
// const LOGOUT_USER = 'LOGOUT_USER';
const MODAL_STATE = 'MODAL_STATE';
// const SESSION_STATE = 'SESSION_STATE';
const UPDATE_USER_IMG = 'UPDATE_USER_IMG';
const UPDATE_USER_INFO = 'UPDATE_USER_INFO';
const UPDATE_USER_EMAIL = 'UPDATE_USER_EMAIL';

export function userAuth(user) {
    return {
        type: USER_AUTH,
        payload: user
    }
}

// export function logoutUser(user) {
//     return {
//         type: LOGOUT_USER,
//         payload: user
//     }
// }

export function modalState(bool) {
    return {
        type: MODAL_STATE,
        payload: bool
    }
}

// export function sessionState(bool) {
//     return {
//         type: SESSION_STATE,
//         payload: bool
//     }
// }

export function updateUserImg(userImg) {
    return {
        type: UPDATE_USER_IMG,
        payload: userImg
    }
}

export function updateUserInfo(userInfo) {
    return {
        type: UPDATE_USER_INFO,
        payload: userInfo
    }
}

export function updateUserEmail(userEmail) {
    return {
        type: UPDATE_USER_EMAIL,
        payload: userEmail
    }
}

export default function reducer(state = initialState, action) {
    let { type, payload } = action;
    switch (type) {
        case USER_AUTH:
            const { user, session } = payload;
            return { ...state, user, session }
        // case LOGOUT_USER:
        //     return { ...state, user: {}, session: payload }
        case MODAL_STATE:
            return { ...state, modal: payload }
        // case SESSION_STATE:
        //     return { ...state, session: payload }
        case UPDATE_USER_IMG:
            let tempUserImg = { ...state.user }
            tempUserImg.userImg = payload;
            return { ...state, user: tempUserImg }
        case UPDATE_USER_INFO:
            const { firstName, lastName } = payload;
            let tempUserInfo = { ...state.user }
            tempUserInfo.firstName = firstName;
            tempUserInfo.lastName = lastName;
            return { ...state, user: tempUserInfo }
        case UPDATE_USER_EMAIL:
            let tempUserEmail = { ...state.user }
            tempUserEmail.email = payload;
            return { ...state, user: tempUserEmail }
        default:
            return state;
    }
}