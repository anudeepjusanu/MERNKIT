/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Formik, Field, Form, FieldProps } from 'formik';
import PropTypes from 'prop-types';
import MuiTextField from '@material-ui/core/TextField';

import { fieldToTextField } from 'formik-material-ui';
import { TextField } from '@material-ui/core';

const EmailTextField = (props) => (
  <TextField
    {...fieldToTextField(props)}
    onChange={(event) => {
      const { value } = event.target;
      props.form.setFieldValue(
        props.field.name,
        value || ''
      );
      props.validatefn(value, props.form);
    }}
  />
);


const ValidateEmail = (props) => (
  <React.Fragment>
    <Field
      component={EmailTextField}
      name="email"
      type="email"
      label="Email *"
      disabled={props.isdisabled}
      validate={props.validateEmail}
      variant="filled"
      className={`text-field text-email ${props.filled === true || props.filled === false ? 'filled' : ''}`}
      // className="text-field text-email"
      validatefn={props.validate}
    />
  </React.Fragment>
);


// Type Checking for the Props.
ValidateEmail.propTypes = {
  fieldName: PropTypes.string,
  fieldID: PropTypes.string,
  fieldLabel: PropTypes.string,
  fieldType: PropTypes.string,
  // isdisabled: PropTypes.bool,
  validate: PropTypes.func,
  filled: PropTypes.bool
};

// Specify the default Props values.
ValidateEmail.defaultProps = {
  fieldName: ' ',
  fieldID: ' ',
  fieldLabel: ' ',
  fieldType: ' ',
  // isdisabled: false,
  validate: () => { },
  filled: false
};

export default ValidateEmail;
