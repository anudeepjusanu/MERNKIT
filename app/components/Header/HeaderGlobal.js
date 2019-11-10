/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useRef } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Link, Menu, MenuItem, Hidden, List, ListItem, ListItemText, Button } from '@material-ui/core';
import { Logout } from 'components/Logout';
import MenuSideBar from 'components/MenuSideBar';
import { connect } from 'react-redux';
import { store } from 'store';
import { appActions, authenticationActions } from 'actions';
import MenuIcon from 'images/explore_icon.svg';
import UserIcon from 'images/profile-icon.svg';
import BackArrow from 'images/go-back-arrow.svg';
import NotificationIcon from 'images/Notification_icon.svg';
import SearchIcon from 'images/search-icon.svg';
import BUSelectionIcon from 'images/BU-dot-selection-icon.svg';
import { history } from 'helpers';
import UserContext from '../../UserContext';

import './style.scss';

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
});

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}
// eslint-disable-next-line react/display-name
const withContext = (Component) => (props) => (
  <UserContext.Consumer>
    {(context) => <Component {...props} context={context} />}
  </UserContext.Consumer>
);
function HeaderGlobal(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [menuPosition, setMenuPosition] = useState(false);

  const pathMatch = () => {
    const path = history.location.pathname;
    const routes = [
      '/', '/dashboard', '/configuration/manageAccount', '/configuration/payment', '/configuration/changepassword', '/configuration/widget'];
    return !routes.find((value) => value === path);
  };
  const theme = useTheme();

  const width =
    [...theme.breakpoints.keys].reverse().reduce((output, key) => {
      const matches = useMediaQuery(theme.breakpoints.only(key));

      return !output && matches ? key : output;
    }, null) || 'xs';
  const handleUser = (event) => {
    // this.setState({ anchorEl: event.currentTarget });
    setAnchorEl(event.currentTarget);
  };

  const handleUserClose = () => {
    // this.setState({ anchorEl: null });
    setAnchorEl(null);
  };

  const MenutoggleDrawer = (side, open) => () => {
    // this.setState({ [side]: open });
    setMenuPosition(open);
  };

  /*
  * Handle Back navigation based on the add/update form is opened
  */
  const handleNavigation = () => {
    props.history.go(-1);
    // if (!props.app.navigateDashboard) {
    //   store.dispatch(appActions.navigte(true));
    // } else {
    //   history.push('/dashboard');
    // }
  };
  const showBackArrow = pathMatch();

  return (
    <React.Fragment>
      <AppBar color="secondary" className={`headerGlobal ${props.HeaderDirection === 'left' ? 'headerLeft' : 'headerRight'}`}>
        <Toolbar className="header_in pl-0 pr-0">
          <div className="header-left-icons">
            {showBackArrow &&
              <IconButton className="header_back_arrow" onClick={handleNavigation} color="primary" aria-label="Menu">
                <img src={BackArrow} alt="Back Nav" />
              </IconButton>}

            {width === 'md' || width === 'lg' || width === 'xl' ?
              <IconButton onClick={MenutoggleDrawer('menuPosition', true)} color="primary" aria-label="Menu" className="menu_icon">
                <img src={MenuIcon} alt="Menu Icon" />
              </IconButton> : ''}
            {(width === 'sm' || width === 'xs') && !pathMatch() ?
              <IconButton onClick={MenutoggleDrawer('menuPosition', true)} color="primary" aria-label="Menu" className="menu_icon">
                <img src={MenuIcon} alt="Menu Icon" />
              </IconButton> : ''}
          </div>

          <div className="header-right-icons">
            {/* onClick={toggleDrawer('right', true)} */}
            <IconButton color="primary" >
              <img src={SearchIcon} alt="Search" width="22" />
            </IconButton>
            {/* <IconButton color="primary">
              <img src={NotificationIcon} alt="Notification" />
            </IconButton> */}
            <div color="primary" className="userdrop">
              <IconButton
                color="primary"
                className="userinfo-icon"
                aria-owns={open ? 'simple-menu' : undefined}
                aria-label="Profile"
                aria-haspopup="true"
                onClick={handleUser}
              >
                <img src={UserIcon} alt="User Icon" width="22" />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={open}
                className="userMenu"
                onClose={handleUserClose}
                PaperProps={{
                  style: {
                    width: 200,
                  }
                }}
              >
                {/* <MenuItem onClick={handleUserClose}><span>Profile</span></MenuItem> */}
                <MenuItem className="uiSelectOption" onClick={handleUserClose} component={RouterLink} to="/configuration/manageAccount"><span>My account</span></MenuItem>
                <MenuItem className="uiSelectOption" onClick={handleUserClose}><Logout /></MenuItem>
              </Menu>
            </div>
          </div>
        </Toolbar>
        <MenuSideBar MenuDirection={props.HeaderDirection} MenuPosition={menuPosition} MenutoggleDrawer={MenutoggleDrawer} />
      </AppBar>
    </React.Fragment>
  );
}


function mapStateToProps(state) {
  const { app } = state.appReducer;
  const buList = state.appReducer.authentication.buList || [];
  return {
    app,
    buList
  };
}
const mapDispatchToProps = (dispatch) => ({
  getBUAndMarketAreasList: () => {
    dispatch(authenticationActions.buAndMarketAreasList({}));
  },
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withContext(HeaderGlobal)));

