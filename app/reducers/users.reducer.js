import { appConstants } from '../constants';
const initialState = {
    users: [],
    status: '',
    newUser: {

    }
};
export function users(state = initialState, action) {
    console.log(action.type)
    switch (action.type) {
        case appConstants.USERS_LIST:
            return {
                ...state,
                users: action.users,
                status: ''
            };
        case appConstants.USERS_LIST_SUCCESS:
            return {
                ...state,
                users: action.users,
                status: action.type
            };
        case appConstants.USERS_LIST_ERROR:
            return {
                ...state,
                users: action.users,
                status: action.type
            };
        case appConstants.USER_ADD:
            return {
                ...state,
                newUser: action.newUser,
                status: action.type
            };
        case appConstants.USER_UPDATE:
            return {
                ...state,
                newUser: action.newUser,
                status: action.type
            };
        case appConstants.USER_DELETE:
            return {
                ...state,
                newUser: action.newUser,
                status: action.type
            };
        default:
            return state;
    }
}
