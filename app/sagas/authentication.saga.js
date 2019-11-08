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
import { authenticationActions } from 'actions';
import { history, authHeader } from 'helpers';
import { appConstants } from '../constants';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* login(payload) {
  const { resetForm, setErrors, setSubmitting } = payload.user.actions;
  const requestOptions = {
    url: 'authenticate/login',
    method: 'POST',
    body: {
      email: payload.user.values.email,
      password: payload.user.values.password
    }
  };
  try {
    const loginObj = yield call(request, requestOptions);
    if (loginObj && loginObj.token) {
      // yield call(getAPIKey, payload.user.values.email, payload.user.values.password, payload.user.actions);
      localStorage.setItem('user', JSON.stringify({
        apiKey: loginObj.token
      }));
      yield call(resetForm);
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
      yield call(setSubmitting, false);
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
    yield call(setSubmitting, false);
  }
}

/*
  Alternatively you may use takeLatest.
  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* authenticationSaga() {
  yield takeLatest(appConstants.LOGIN_REQUEST, login);
}

export default authenticationSaga;
