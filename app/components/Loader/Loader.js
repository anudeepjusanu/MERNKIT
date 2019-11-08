/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import './style.scss';

const styles = {
  root: {
    flexGrow: 1,
  },
};

function Loader() {
  return (
    <div className="linear_progress">
      <Typography variant="body2" gutterBottom>
        Please hold on, your action in progress...
      </Typography>
      <LinearProgress className="Custom_loader_color" />
    </div>
  );
}

Loader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loader);
