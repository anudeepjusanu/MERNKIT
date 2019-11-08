import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import AlertContent from './AlertContent';

function Alert(props) {
  let {
    // eslint-disable-next-line prefer-const
    open, variant, message, onRequestClose
  } = props;
  if (typeof message === 'object') {
    message = 'Something went wrong';
  }
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={open}
      autoHideDuration={6000}
      onClose={onRequestClose}
    >
      <AlertContent
        onClose={onRequestClose}
        variant={variant}
        message={message}
      />
    </Snackbar>
  );
}

export default Alert;
