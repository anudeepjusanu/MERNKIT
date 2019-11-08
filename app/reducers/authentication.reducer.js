import { appConstants } from '../constants';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = user ? { loggedIn: true, user } : { loggedIn: false, user };
export function authentication(state = initialState, action) {
  switch (action.type) {
    case appConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case appConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case appConstants.LOGIN_FAILURE:
      return {};
    case appConstants.REGISTER_REQUEST:
      return {
        loggedIn: false,
        user: action.user
      };
    case appConstants.REGISTER_SUCCESS:
      return {
        loggedIn: true,
        buConfig: action.buConfig
      };
    case appConstants.LOGOUT:
      return {};
    default:
      return state;
  }
}
