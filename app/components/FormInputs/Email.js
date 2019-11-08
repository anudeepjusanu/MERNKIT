/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';
import { CustomInput } from './CustomInput';

const Email = (props) => (
  <React.Fragment>
    <Field
      name={props.fieldName}
      component={CustomInput}
      label={props.fieldLabel}
      type={props.fieldType}
      id={props.fieldID}
      disabled={props.isdisabled}
      validate={props.validateEmail}
    />
  </React.Fragment>
);

// Type Checking for the Props.
Email.propTypes = {
  fieldName: PropTypes.string,
  fieldID: PropTypes.string,
  fieldLabel: PropTypes.string,
  fieldType: PropTypes.string,
  // isdisabled: PropTypes.bool,
  validate: PropTypes.func
};

// Specify the default Props values.
Email.defaultProps = {
  fieldName: '',
  fieldLabel: ' ',
  fieldType: ' ',
  // isdisabled: false,
  validate: () => {}
};

export default Email;
