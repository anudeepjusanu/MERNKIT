/* eslint-disable react/no-unused-prop-types */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-indent */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Typography, Link, Button } from '@material-ui/core';
import NopageImage from 'images/404-page-artwork.png';
import { history } from 'helpers';
import './style.scss';

const styles = {
  root: {
    flexGrow: 1,
  },
};

function PageNotFound() {
  const navigateBack = () => {
    history.push('/login');
  };
  return (
    <React.Fragment>
      <div className="sign_wrapper">
        <div className="container">
          <Grid container spacing={3} className="sign_wrapper_in pb-0">
            <Grid item xs={12}>
              <Grid container spacing={3} className="sign_header">
                <Grid item sm={12}>
                  <div className="sign_logo">
                    <Link component={RouterLink} to="/">

                    </Link>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                spacing={3}
                className="sign_body noPage_content"
              >
                <Grid item xs={12}>
                  <img src={NopageImage} alt="404 image" className="img_error" />
                  <Typography className="" variant="h2" color="primary">
                    Whoops looks like you are lost
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    404: Page cannot be found
                  </Typography>
                  <Button onClick={navigateBack} variant="contained" color="secondary" type="submit" className="btn large">Home</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    </React.Fragment>
  );
}

PageNotFound.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PageNotFound);
