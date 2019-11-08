import React, { useEffect, useState } from 'react';
import { Router, Route } from 'react-router-dom';
import { history } from 'helpers';
import { connect } from 'react-redux';
import Loader from 'components/Loader';
import routes from 'routes';
import UserContext from '../../UserContext';
import Alert from 'react-s-alert';

import { MuiThemeProvider, createMuiTheme, CssBaseline } from '@material-ui/core';
import evergentTheme from '../../themes/evergentTheme/evergentTheme.json';

import 'react-s-alert/dist/s-alert-default.css';

// optional - you can choose the effect you want
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';

function App(props) {
  const showLoader = props.app.showLoading;
  const [userData, setUserData] = useState({ sessionData: {}, buSelectionData: {} });
  let theme;
  const updateUserData = (newData) => {
    setUserData({ ...userData, ...newData });
  };
  const root = document.documentElement;
  const hex2rgba = (hex, alpha = 1) => {
    const [r, g, b] = hex.match(/\w\w/g).map((x) => parseInt(x, 16));
    return `rgba(${r},${g},${b},${alpha})`;
  };
  const hexVal = (hex, type) => {
    const [r, g, b] = hex.match(/\w\w/g).map((x) => parseInt(x, 16));
    return `${r},${g},${b}`;
  };


  if (props.app.primary && props.app.secondary && props.app.tertiary) {
    evergentTheme.palette.primary = {
      main: props.app.primary,
      dark: props.app.primary,
      light: props.app.primary
    };
    evergentTheme.palette.secondary = {
      main: props.app.secondary,
      dark: props.app.secondary,
      light: props.app.secondary
    };
    evergentTheme.primary = props.app.primary;

    evergentTheme.secondary = props.app.secondary;
    evergentTheme.tertiary = props.app.tertiary;

    root.style.setProperty('--themeprimarycolor', hex2rgba(props.app.primary));
    root.style.setProperty('--themeprimarycolorRGB', hexVal(props.app.primary));
    root.style.setProperty('--themesecondarycolor', hex2rgba(props.app.secondary));
    root.style.setProperty('--themesecondarycolorRGB', hexVal(props.app.secondary));
    root.style.setProperty('--themetertiarycolor', hex2rgba(props.app.tertiary));
    root.style.setProperty('--themetertiarycolorRGB', hexVal(props.app.tertiary));

    theme = createMuiTheme(evergentTheme);
    theme.primaryRGB = hexVal(props.app.primary);
    theme.secondaryRGB = hexVal(props.app.secondary);
    theme.tertiaryRGB = hexVal(props.app.tertiary);
  } else {
    theme = createMuiTheme(evergentTheme);
    theme.primaryRGB = hexVal(props.app.primary);
    theme.secondaryRGB = hexVal(props.app.secondary);
    theme.tertiaryRGB = hexVal(props.app.tertiary);
  }
  return (
    <MuiThemeProvider theme={theme}>
      <UserContext.Provider value={{ userData, updateUserData }} >
        <div className="wrap d-flex h-100">
          {showLoader && <Loader />}
          <Router history={history}>
            <Route>{routes}</Route>
          </Router>
          <Alert stack={{ limit: 1 }} />
        </div>
      </UserContext.Provider>
    </MuiThemeProvider>
  );
}

function mapStateToProps(state) {
  const { app } = state.appReducer;
  return {
    app
  };
}
export default connect(mapStateToProps, '')(App);
