/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Grid } from '@material-ui/core';
import Header from 'components/Header/Header';
import HeaderGlobal from 'components/Header/HeaderGlobal';
import './style.scss';

const preselectedBUData = localStorage.getItem('selectedBUData');
// if (preselectedBUData) {
//   if (typeof preselectedBUData !== 'object') {

//   }
// }
const Layout = (props) => {
  const HeaderDirection = '';
  const HeaderWrapClass = (HeaderDirection && (HeaderDirection !== '' || HeaderDirection !== undefined) ? `wrapPush${HeaderDirection}` : '');
  return (
    <Grid className="white_bg" id="layout">
      {HeaderDirection === '' ?
        <Header preselectedBUData={preselectedBUData} hideLogo={props.hideLogo} hideBu={props.hideBu} module={props.module} HeaderDirection={(HeaderDirection === '' ? 'left' : HeaderDirection)} />
        :
        <HeaderGlobal hideLogo={props.hideLogo} hideBu={props.hideBu} HeaderDirection={HeaderDirection} />}
      {/* <Grid className={`wrapper ${HeaderDirection === 'left' ? 'wrapPushLeft' : 'wrapPushRight'}`}> */}
      <Grid className={`wrapper ${HeaderWrapClass}`}>
        {props.children}
      </Grid>
    </Grid>
  );
};

export default Layout;
