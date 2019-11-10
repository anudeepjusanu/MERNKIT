import React, { useState, useContext } from 'react';
import { SwipeableDrawer, Grid, Link, Typography } from '@material-ui/core';
import BackArrow from 'images/go-back-arrow.svg';
import './style.scss';
import UserContext from '../../UserContext';

function MenuSideBar(props) {
  return (
    <div>
      <SwipeableDrawer
        anchor={props.MenuDirection}
        open={props.MenuPosition}
        onClose={() => { props.MenutoggleDrawer('menuPosition', false); }}
        onOpen={() => { props.MenutoggleDrawer('menuPosition', true); }}
      >
        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="stretch"
          tabIndex={0}
          className={`sidemenu ${props.MenuDirection === 'left' ? 'sidebarLeft' : 'sidebarRight'}`}
          // onClick={() => { props.MenutoggleDrawer('menuPosition', true); }}
          onKeyDown={() => { props.MenutoggleDrawer('menuPosition', false); }}
        >
          <Grid item className="sidemenu_content">
            <div className="menu-header">
              <Link></Link>
            </div>
            <Typography className="head_backnav" variant="h3">
              <Link className="back_nav" onClick={() => props.MenutoggleDrawer('menuLeft', false)}>
                <img src={BackArrow} alt="back navigation" />
              </Link>
              Explore
            </Typography>
          </Grid>
          {/* <Grid item className="sidemenu_footer">
          <Typography component="h5" variant="h5" gutterBottom>
            Upgrade your account
          </Typography>
          <Typography gutterBottom>
            {`
              Request a demo to see what you’re missing out on!
            `}
          </Typography>
        </Grid> */}
        </Grid>
      </SwipeableDrawer>
    </div>
  );
}

export default MenuSideBar;
