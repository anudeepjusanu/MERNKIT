import React from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';
import { CustomInput } from './CustomInput';

const PhoneNumber = (props) => (
  <React.Fragment>
    <Field
      name={props.fieldName}
      component={CustomInput}
      label={props.fieldLabel}
      type={props.fieldType}
      id={props.fieldID}
    />
  </React.Fragment>
);

// Type Checking for the Props.
PhoneNumber.propTypes = {
  fieldName: PropTypes.string,
  fieldID: PropTypes.string,
  fieldLabel: PropTypes.string,
  fieldType: PropTypes.string
};

// Specify the default Props values.
PhoneNumber.defaultProps = {
  fieldName: '',
  fieldLabel: ' ',
  fieldType: ' '
};

export default PhoneNumber;
