import { combineReducers } from 'redux';
import { app } from './app.reducer';
import { authentication } from './authentication.reducer';
import { users } from './users.reducer';

const appReducer = combineReducers({
  app,
  authentication,
  users
});

export default appReducer;
