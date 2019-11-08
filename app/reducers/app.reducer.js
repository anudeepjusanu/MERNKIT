/* eslint-disable no-multi-spaces */
import { appConstants } from '../constants';

const initialState = {
  showLoading: false,
  navigateDashboard: true,
  primary: '#275682',
  secondary: '#00A6FF',
  tertiary: '#EFBA46'
};
export function app(state = initialState, action) {
  switch (action.type) {
    case appConstants.LOADER_SHOW:
      return {
        ...state,
        showLoading: action.showLoading
      };
    case appConstants.LOADER_HIDE:
      return {
        ...state,
        showLoading: action.showLoading
      };
    case appConstants.NAVIGATOR:  {
      return {
        ...state,
        navigateDashboard: action.navigateDashboard
      };
    }
    case 'theme':
      return {
        ...state,
        primary: action.colorObj.primary,
        secondary: action.colorObj.secondary,
        tertiary: action.colorObj.tertiary,
      };
    default:
      return state;
  }
}
