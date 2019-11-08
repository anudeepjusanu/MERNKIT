import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Typography, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    flexGrow: 1,
  },
};
function CardComponent(props) {
  return (
    <div className="CategoriesList">
      <Paper className="list" component={RouterLink} to={props.path}>
        <img src={props.icon} width="60.475" height="60.475" alt="" />
        <Typography component="h4">{props.title}</Typography>
      </Paper>
    </div>
  );
}

export default withStyles(styles)(CardComponent);
