import { app } from '../app.reducer';
import appConstants from '../../constants/app.constants';

describe('app reducer', () => {
  it('should handle Loader show', () => {
    expect(
      app([], {
        type: appConstants.LOADER_SHOW,
        showLoading: true,
        navigateDashboard: true
      })
    ).toEqual(
      {
        showLoading: true
      }
    );
  });
  it('should handle Loader hide', () => {
    expect(
      app([], {
        type: appConstants.LOADER_HIDE,
        showLoading: false,
        navigateDashboard: true
      })
    ).toEqual(
      {
        showLoading: false
      }
    );
  });
  it('should handle NAVIGATOR', () => {
    expect(
      app([], {
        type: appConstants.NAVIGATOR,
        showLoading: false,
        navigateDashboard: true
      })
    ).toEqual(
      {
        navigateDashboard: true
      }
    );
  });
});
