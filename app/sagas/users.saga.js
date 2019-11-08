/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */
/* eslint-disable no-mixed-operators */
/* eslint-disable func-names */
/* eslint-disable import/first */
import {
    call, put, takeLatest, delay
} from 'redux-saga/effects';
import request from 'utils/request';
import Alert from 'react-s-alert';
import { userActions } from 'actions';
import { history, authHeader } from 'helpers';
import { appConstants } from '../constants';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* getUsers(payload) {
    const requestOptions = {
        url: 'users',
        method: 'GET'
    };
    try {
        const usersObj = yield call(request, requestOptions);
        if (usersObj) {
            // yield call(getAPIKey, payload.user.values.email, payload.user.values.password, payload.user.actions);
            yield put(userActions.getUsersSuccess(usersObj));
        } else {
            const errorObj = { variant: 'error', message: 'Something went wrong!! Please contact admin' };
            // TODO ADD ALERT MESSAGE
            Alert.error(errorObj.message, {
                position: 'top-right',
                effect: 'stackslide',
                beep: false,
                timeout: 5000,
                offset: 50
            });
        }
    } catch (err) {
        const errorObj = { variant: 'error', message: err };
        // TODO ADD ALERT MESSAGE
        Alert.error(errorObj.message, {
            position: 'top-right',
            effect: 'stackslide',
            beep: false,
            timeout: 5000,
            offset: 50
        });
    }
}
function* addUser(payload) {
    const requestOptions = {
        url: 'users',
        method: 'POST',
        body: payload.newUser
    };
    try {
        const usersObj = yield call(request, requestOptions);
        console.log(usersObj);
        if (usersObj && usersObj._id) {
            // yield call(getAPIKey, payload.user.values.email, payload.user.values.password, payload.user.actions);
            yield call(history.push, '/dashboard');
        } else {
            const errorObj = { variant: 'error', message: 'Something went wrong!! Please contact admin' };
            // TODO ADD ALERT MESSAGE
            Alert.error(errorObj.message, {
                position: 'top-right',
                effect: 'stackslide',
                beep: false,
                timeout: 5000,
                offset: 50
            });
        }
    } catch (err) {
        const errorObj = { variant: 'error', message: err };
        // TODO ADD ALERT MESSAGE
        Alert.error(errorObj.message, {
            position: 'top-right',
            effect: 'stackslide',
            beep: false,
            timeout: 5000,
            offset: 50
        });
    }
}

/*
  Alternatively you may use takeLatest.
  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* usersSaga() {
    yield takeLatest(appConstants.USERS_LIST, getUsers);
    yield takeLatest(appConstants.USER_ADD, addUser);
}

export default usersSaga;
