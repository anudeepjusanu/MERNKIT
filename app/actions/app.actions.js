import { appConstants } from '../constants';

function showLoader(showLoading) {
  return { type: appConstants.LOADER_SHOW, showLoading };
}

function hideLoader(showLoading) {
  return { type: appConstants.LOADER_HIDE, showLoading };
}

function navigte(navigateDashboard) {
  return { type: appConstants.NAVIGATOR, navigateDashboard };
}

function changeColor(colorObj) {
  return { type: 'theme', colorObj };
}
const appActions = {
  showLoader,
  hideLoader,
  navigte,
  changeColor
};
export default appActions;
