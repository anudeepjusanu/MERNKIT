import React from 'react';
// import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { history } from 'helpers';

const styles = (theme) => ({
  quickLink: {
    // flex: 1,
    display: 'inline-block',
    flexDirection: 'column',
    alignItems: 'center',
    // padding: '6px',
    paddingLeft: '15px',
    paddingRight: '25px',
    paddingBottom: '5px',
    paddingTop: '5px',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: 'rgba(39, 86, 130, 0.2)',
    borderStyle: 'solid',
    color: theme.palette.primary.main,
    outline: 'none',
    transition: 'border .24s ease-in-out',
    marginRight: '30px',
    lineHeight: '25px',
    cursor: 'pointer'
  }
});


function QuickLink(props) {
  const { classes } = props;

  const handleNavigate = () => {
    history.push({
      pathname: props.path,
      // state: { customData: props.data } murali commented because of this comp rerender issue coming
    });
  };
  return (
    <Link onClick={handleNavigate} className={classes.quickLink}>
      {props.content}
    </Link>
  );
}

export default withStyles(styles)(QuickLink);
