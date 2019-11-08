/* eslint-disable arrow-body-style */
/* eslint-disable no-shadow */
import config from 'config';
import axios from 'axios';
import { history } from 'helpers';
import Alert from 'react-s-alert';
import { store } from '../store';
import { appActions } from '../actions';


// eslint-disable-next-line no-unused-vars
function sendLogsRequestResponseLogsToServer(logs, type) {
  const data = JSON.stringify({
    logs,
    type
  });

  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/logs');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(data);
}

// Add a request interceptor
axios.interceptors.request.use((config) => {
  store.dispatch(appActions.showLoader(true));
  // sendLogsRequestResponseLogsToServer(config, 'Request');
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use((response) => {
  if (response && response.data) {
    // eslint-disable-next-line no-restricted-syntax
    for (const res in response.data) {
      if (response.data[res] &&
        response.data[res].responseCode == 0 && JSON.stringify(response.data[res]).search('Authentication Failed') >= 0) {
        response.status = 401;
        response.statusText = 'Session expired please login again to continue';
      }
    }
  }
  store.dispatch(appActions.hideLoader(false));
  // sendLogsRequestResponseLogsToServer(response, 'Response');
  return response;
}, (error) => {
  // Do something with response error
  store.dispatch(appActions.hideLoader(false));
  return Promise.reject(error);
});


/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.data;
}

function clearSession() {
  localStorage.removeItem('user');
  localStorage.removeItem('selectedBUData');
  history.push('/login');
  setTimeout(() => {
    // clear react context
    window.location.reload();
  }, 1000);
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else if (response.status === 401) {
    clearSession();
    Alert.error('Session expired please login again to continue', {
      position: 'top-right',
      effect: 'stackslide',
      beep: false,
      timeout: 700,
      offset: 50
    });
    return response;
  }
  return response;

  // const error = new Error(response.statusText);
  // error.response = response;
  // throw error;
}

let userObj = localStorage.getItem('user');
if (userObj) {
  userObj = JSON.parse(userObj);
  axios.defaults.headers.common.Authorization = `Bearer ${userObj.apiKey}`;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(options) {
  if (options.accessToken) {
    // Add Oauth Token
    axios.defaults.headers.common.Authorization = `Bearer ${options.accessToken}`;
    options.accessToken = undefined;
  }
  options.url = options.url.trim();
  return axios({
    method: options.method,
    url: `${config.API_URL}/api/v1/${options.url}`,
    headers: { 'Content-Type': 'application/json' },
    data: options.body
  })
    .then(checkStatus)
    .then(parseJSON);
}
