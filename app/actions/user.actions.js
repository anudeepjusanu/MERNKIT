import { appConstants } from '../constants';

const getUsers = (users) => ({
    type: appConstants.USERS_LIST,
    users
});

function getUsersSuccess(users) {
    return {
        type: appConstants.USERS_LIST_SUCCESS,
        users
    };
}

const getUsersError = () => ({
    type: appConstants.USERS_LIST_ERROR,
    users: []
});

const addUser = (newUser) => ({
    type: appConstants.USER_ADD,
    newUser
});
const addUserSuccess = (newUser) => ({
    type: appConstants.USER_ADD_SUCCESS,
    newUser
});
const addUserError = () => ({
    type: appConstants.USER_ADD_ERROR,
    newUser: {}
});

const userActions = {
    getUsers,
    getUsersSuccess,
    getUsersError,
    addUser,
    addUserSuccess,
    addUserError
};


export default userActions;
