/* eslint-disable no-undef */
import React, { useState } from 'react';
import { Field, FastField } from 'formik';
import PropTypes from 'prop-types';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';


// const styles = theme => ({
//   formControl: {
//     margin: theme.spacing.unit,
//   },
//   formLabel: {
//     background: primary
//   }
// });

const renderTextField = ({
  field, // { name, value, onChange, onBlur }
  // eslint-disable-next-line no-unused-vars
  form: { touched, errors, values }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (<TextareaAutosize
  {...field}
  {...props}
  rows={props.rowsMax}
  multiline
  variant="filled"
  disabled={props.isdisabled}
  aria-label={props.label}
  // className={`text-field ${field.value ? 'filled' : ''}`}
/>);

// eslint-disable-next-line react/prefer-stateless-function
const TextArea = (props) => (
  <Field
    name={props.fieldName}
    component={renderTextField}
    label={props.fieldLabel}
    type={props.fieldType}
    id={props.fieldID}
    isdisabled={props.isdisabled}
    rowsMax={props.rowsMax}
    multiline
  />
);


// Type Checking for the Props.
TextArea.propTypes = {
  fieldName: PropTypes.string,
  fieldID: PropTypes.string,
  fieldLabel: PropTypes.string,
  fieldType: PropTypes.string,
  // isdisabled: PropTypes.bool
};

// Specify the default Props values.
TextArea.defaultProps = {
  fieldName: ' ',
  fieldID: ' ',
  fieldLabel: ' ',
  fieldType: ' ',
  // isdisabled: false
};

export default TextArea;
