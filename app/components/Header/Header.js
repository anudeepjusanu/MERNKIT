/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useRef } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { AppBar, Typography, Toolbar, IconButton, Link, Menu, MenuItem, Hidden, List, ListItem, ListItemText, Button } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import { Logout } from 'components/Logout';
import { connect } from 'react-redux';
import MenuSideBar from 'components/MenuSideBar';
import EvergentLogo from 'images/Evergent-logo.svg';
import MenuIcon from 'images/explore_icon.svg';
import UserIcon from 'images/profile-icon.svg';
import BackArrow from 'images/go-back-arrow.svg';
import SearchIcon from 'images/search-icon.svg';
import BUSelectionIcon from 'images/BU-dot-selection-icon.svg';
import BagIcon from 'images/Shopcart.svg';
import { history } from 'helpers';
import UserContext from '../../UserContext';
import './style.scss';


const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
});

// check header path
const catalogueMenuSwitchWarning = () => {
  const path = history.location.pathname;
  const routes = [
    '/catalogue/updatePromotion', '/catalogue/createPromotion', '/catalogue/promotion', '/catalogue/updateProduct', '/catalogue/createProduct', '/catalogue/product', '/catalogue/updatePackage', '/catalogue/createPackage', '/catalogue/package'];
  return routes.find((value) => value === path);
};

const pageRefreshWarning = () => {
  const path = history.location.pathname;
  const routes = [
    '/catalogue/updatePromotion', '/catalogue/createPromotion', '/catalogue/updateProduct', '/catalogue/createProduct', '/catalogue/updatePackage', '/catalogue/createPackage'];
  return routes.find((value) => value === path);
};

const pageRefreshHandler = () => {
  window.addEventListener('beforeunload', (e) => {
    // Cancel the event
    //  e.preventDefault();
    // Chrome requires returnValue to be set
    e.returnValue = 'Leaving this page will reset the wizard';
  });
};
function ListItemLink(props) {
  // eslint-disable-next-line no-alert
  return <ListItem button component="a" {...props} />;
}
// eslint-disable-next-line react/display-name
const withContext = (Component) => (props) => (
  <UserContext.Consumer>
    {(context) => <Component {...props} context={context} />}
  </UserContext.Consumer>
);

const StyledBadge = withStyles((theme) => ({
  badge: {
    top: '50%',
    right: -3,
    color: '#ffffff',
    // The border color match the background color.
    border: `2px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
      }`,
  },
}))(Badge);

function Header(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [menuPosition, setMenuPosition] = useState(false);
  const [sideBarType, setSideBarType] = useState('buSelection');
  const [csrActiveIndex, setCsrActiveIndex] = useState(null);
  const [showCart, setShowCart] = useState(false);
  // if (pageRefreshWarning()) {
  //   pageRefreshHandler();
  // }

  const preselectedBUData = JSON.parse(props.preselectedBUData);
  if ((JSON.stringify(props.context.userData.buSelectionData) !== JSON.stringify(preselectedBUData)) && props.buData && props.buData[0]) {
    props.context.updateUserData({ buSelectionData: { data: props.buData[0], selectedData: preselectedBUData } });
  }
  const [selectedBUData, setSelectedBUData] = useState(props.preselectedBUData);
  const [searchState, setSearchState] = useState({
    right: false, isChildTryingToOpen: false
  });
  const pathMatch = () => {
    const path = history.location.pathname;
    const routes = [
      '/', '/dashboard', '/configuration/manageAccount', '/configuration/payment', '/configuration/changepassword', '/configuration/widget', ''];
    return !routes.find((value) => value === path);
  };
  const theme = useTheme();
  useEffect(() => {
    // props.loadOrderSummary();
  }, []);
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

  const MenutoggleDrawer = (side, open) => {
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
  const handleThemeRoute = () => {
    history.push('/theme');
  };
  const showBackArrow = pathMatch();
  const stepdata = ['Pre-qualification', 'Offers/Products', 'Checkout'];

  // CSROffer cart
  const [csrOfferCartIsOpen, setCsrOfferCartIsOpen] = React.useState({
    right: false,
  });
  const CSROfferCartHandleDrawerOpen = (side) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setCsrOfferCartIsOpen({ ...csrOfferCartIsOpen, [side]: true });
  };
  const CSROfferCartHandleDrawerClose = (side) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setCsrOfferCartIsOpen({ ...csrOfferCartIsOpen, [side]: false });
  };

  // const CSROfferCartOrderSummaryClose = (side) => () => {
  //   setCsrOfferCartIsOpen({ ...csrOfferCartIsOpen, [side]: false });
  // };
  const CSROfferCartOrderSummaryClose = (event, side, open) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setCsrOfferCartIsOpen({ ...csrOfferCartIsOpen, [side]: open });
  };

  // search
  const toggleDrawer = (side, isOpen) => (event) => {
    setSideBarType('search');
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setSearchState({ ...searchState, [side]: isOpen, isChildTryingToOpen: false });
  };
  const toggleDrawerBUSelection = (side, isOpen) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setSideBarType('buSelection');
    setSearchState({ ...searchState, [side]: isOpen, isChildTryingToOpen: false });
  };
  const closeDrawer = (type, status, data) => {
    setSearchState({ ...searchState, right: false, isChildTryingToOpen: false });
    // setSelectedBUData(data.buSelectionData);
  };
  const openDrawer = () => {
    setSearchState({ ...searchState, right: true, isChildTryingToOpen: true });
  };
  const removeTextAfterhipen = (name) => {
    const x = name.split('-');
    if (x.length > 1) { x.pop(); }
    return x.join('');
  };
  const getName = (value) => {
    let name = '';
    if (preselectedBUData) {
      if (preselectedBUData.data.parentMarketArea.code === value) {
        // eslint-disable-next-line prefer-destructuring
        name = preselectedBUData.data.parentMarketArea.name;
      }

      preselectedBUData.data.parentMarketArea.childMarketAreas.forEach((child) => {
        if (child.code === value) {
          // eslint-disable-next-line prefer-destructuring
          name = child.name;
        }
      });
    } else {
      if (selectedBUData.data.parentMarketArea.code === value) {
        // eslint-disable-next-line prefer-destructuring
        name = selectedBUData.data.parentMarketArea.name;
      }

      selectedBUData.data.parentMarketArea.childMarketAreas.forEach((child) => {
        if (child.code === value) {
          // eslint-disable-next-line prefer-destructuring
          name = child.name;
        }
      });
    }


    return name;
  };
  const getCsrActiveIndex = () => {
    if (props.location.pathname.indexOf('/createAccount/prequalification') >= 0) {
      setCsrActiveIndex(0);
    } else if (props.location.pathname.indexOf('/createAccount/offers/') >= 0) {
      setCsrActiveIndex(1);
    } else if (props.location.pathname.indexOf('/createAccount/checkout/') >= 0) {
      setCsrActiveIndex(2);
    }
  };

  return (
    <React.Fragment>
      <UserContext.Consumer>
        {(data) => {
          setSelectedBUData(data.userData.buSelectionData);
          if (data.userData.buSelectionData && data.userData.buSelectionData.data && data.userData.buSelectionData.selectedData) {
            const temp = JSON.stringify(data.userData.buSelectionData);
            localStorage.setItem('selectedBUData', temp);
          }
        }}
      </UserContext.Consumer>
      <AppBar position="relative" color="inherit" className="header">
        <Toolbar className="header_in">
          <div className="header-left-icons">

            {width === 'md' || width === 'lg' || width === 'xl' ?
              <IconButton onClick={() => { MenutoggleDrawer('menuLeft', true); }} color="primary" aria-label="Menu" className="menu_icon">
                <img src={MenuIcon} alt="Menu Icon" />
              </IconButton> : ''}
            {(width === 'sm' || width === 'xs') && !pathMatch() ?
              <IconButton onClick={() => { MenutoggleDrawer('menuLeft', true); }} color="primary" aria-label="Menu" className="menu_icon">
                <img src={MenuIcon} alt="Menu Icon" />
              </IconButton> : ''}
          </div>
          <div className="header-right-icons">
            <div color="primary" className="userdrop">
              <IconButton
                color="primary"
                className="userinfo-icon"
                aria-owns={open ? 'simple-menu' : undefined}
                aria-label="Profile"
                aria-haspopup="true"
                onClick={handleUser}
              >
                <img src={UserIcon} alt="User Icon" width="18" />
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
                {/* <MenuItem className="uiSelectOption" onClick={handleUserClose} component={RouterLink} to="/configuration/manageAccount"><span>My account</span></MenuItem> */}
                <MenuItem className="uiSelectOption" onClick={handleUserClose}>
                  <span className="logout_btn" color="link" onClick={handleThemeRoute}>
                    Change Theme
                  </span>
                </MenuItem>
                <MenuItem className="uiSelectOption" onClick={handleUserClose}>
                  <Logout />
                </MenuItem>
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
    app
  };
}
const mapDispatchToProps = (dispatch) => ({

});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withContext(Header)));

