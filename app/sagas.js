import { all } from 'redux-saga/effects';
import authenticationSaga from './sagas/authentication.saga';
import usersSaga from './sagas/users.saga';
export default function* rootSaga() {
  yield all([
    authenticationSaga(),
    usersSaga()
  ]);
}
