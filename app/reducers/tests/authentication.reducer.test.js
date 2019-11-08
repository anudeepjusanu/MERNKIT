import { authentication } from '../authentication.reducer';
import appConstants from '../../constants/app.constants';

describe('authentication reducer', () => {
  it('should handle login request', () => {
    expect(
      authentication([], {
        type: appConstants.LOGIN_REQUEST,
        loggingIn: true,
        user: {}
      })
    ).toEqual(
      {
        loggingIn: true,
        user: {}
      }
    );
  });
  it('should handle login success', () => {
    expect(
      authentication([], {
        type: appConstants.LOGIN_SUCCESS,
        loggedIn: true,
        user: {}
      })
    ).toEqual(
      {
        loggedIn: true,
        user: {}
      }
    );
  });
  it('should handle LOGIN_FAILURE', () => {
    expect(
      authentication([], {
        type: appConstants.LOGIN_FAILURE
      })
    ).toEqual(
      {
      }
    );
  });
  it('should handle REGISTER_REQUEST', () => {
    expect(
      authentication([], {
        type: appConstants.REGISTER_REQUEST,
        loggedIn: false,
        user: {}
      })
    ).toEqual(
      {
        loggedIn: false,
        user: {}
      }
    );
  });
  it('should handle REGISTER_SUCCESS', () => {
    expect(
      authentication([], {
        type: appConstants.REGISTER_SUCCESS,
        loggedIn: true,
        buConfig: {}
      })
    ).toEqual(
      {
        loggedIn: true,
        buConfig: {}
      }
    );
  });
  it('should handle GET_CHANNELPARTNER_REQUEST', () => {
    expect(
      authentication([], {
        type: appConstants.GET_CHANNELPARTNER_REQUEST,
        loggedIn: true,
        buConfig: {}
      })
    ).toEqual(
      {
        loggedIn: true,
        buConfig: {}
      }
    );
  });
  it('should handle GET_CHANNELPARTNER_SUCCESS', () => {
    expect(
      authentication([], {
        type: appConstants.GET_CHANNELPARTNER_SUCCESS,
        loggedIn: true,
        buConfig: {}
      })
    ).toEqual(
      {
        loggedIn: true,
        buConfig: {}
      }
    );
  });
  it('should handle UPDATE_CHANNELPARTNER_REQUEST', () => {
    expect(
      authentication([], {
        type: appConstants.UPDATE_CHANNELPARTNER_REQUEST,
        loggedIn: true,
        payload: {
          buConfig: {}
        }
      })
    ).toEqual(
      {
        loggedIn: true,
        buConfig: {}
      }
    );
  });
  it('should handle UPDATE_CSRPASSWORD_REQUEST', () => {
    expect(
      authentication([], {
        type: appConstants.UPDATE_CSRPASSWORD_REQUEST,
        loggedIn: true,
        payload: {
          buConfig: {}
        }
      })
    ).toEqual(
      {
        loggedIn: true,
        buConfig: {}
      }
    );
  });
  it('should handle UPDATE_CSRPASSWORD_SUCCESS', () => {
    expect(
      authentication([], {
        type: appConstants.UPDATE_CSRPASSWORD_SUCCESS,
        loggedIn: true,
        payload: {
          buConfig: {}
        }
      })
    ).toEqual(
      {
        loggedIn: true,
        buConfig: {}
      }
    );
  });
  it('should handle LOGOUT', () => {
    expect(
      authentication([], {
        type: appConstants.LOGOUT
      })
    ).toEqual(
      {
      }
    );
  });
});
