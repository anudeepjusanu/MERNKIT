import { appConstants } from '../constants';

const login = (user) => ({
  type: appConstants.LOGIN_REQUEST,
  user
});

const register = (user) => ({
  type: appConstants.REGISTER_REQUEST,
  user
});

const registerSuccess = (buConfig) => ({
  type: appConstants.REGISTER_SUCCESS,
  buConfig
});

const logout = () =>
  ({ type: appConstants.LOGOUT });

const authenticationActions = {
  login,
  register,
  registerSuccess,
  logout
};


export default authenticationActions;
