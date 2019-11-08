import React from 'react';
import { withStyles, InputAdornment, IconButton } from '@material-ui/core';
import { Field } from 'formik';
import PropTypes from 'prop-types';
import SearchIcon from 'images/Search.svg';
import { CustomInput } from './CustomInput';

const styles = {

  iconButton: {
    padding: 10,
    width: '70px'
  }
};

function SearchInput(props) {
  const {
    classes
  } = props;
  return (
    <React.Fragment>
      <Field
        name={props.fieldName}
        component={CustomInput}
        label={props.fieldLabel}
        type={props.fieldType}
        id={props.fieldID}
        // onChange={(event) => props.searchChange(event)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton className={classes.iconButton} aria-label="Search" onClick={(event) => props.searchChange(event)}>
                <img src={SearchIcon} alt="search icon" style={{ width: '25px' }} />
              </IconButton>
            </InputAdornment>)
        }}
      />
    </React.Fragment>
  );
}

// Type Checking for the Props.
SearchInput.propTypes = {
  fieldName: PropTypes.string,
  fieldID: PropTypes.string,
  fieldLabel: PropTypes.string,
  fieldType: PropTypes.string
};

// Specify the default Props values.
SearchInput.defaultProps = {
  fieldName: ' ',
  fieldID: ' ',
  fieldLabel: ' ',
  fieldType: ' '
};

export default withStyles(styles)(SearchInput);
