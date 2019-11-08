/* eslint-disable no-undef */
import React, { useState } from 'react';
import { Field, FastField } from 'formik';
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import MaskedInput from 'react-text-mask';
// const styles = theme => ({
//   formControl: {
//     margin: theme.spacing.unit,
//   },
//   formLabel: {
//     background: primary
//   }
// });
import NumberFormat from 'react-number-format';


const renderTextField = ({
  field, // { name, value, onChange, onBlur }
  // eslint-disable-next-line no-unused-vars
  form: {
    setFieldValue, touched, errors, values
  },
  // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
    <TextField
      {...field}
      {...props}
      variant="filled"
      fullWidth
      disabled={props.isdisabled}
      className={`text-field ${field.value ? 'filled' : ''}`}
    />
  );

const phoneNumberMask = [/[1-9]/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
// '(',
// /[1-9]/,
// /\d/,
// /\d/,
// ')',
// ' ',
// /\d/,
// /\d/,
// /\d/,
// '-',
// /\d/,
// /\d/,
// /\d/,
// /\d/
const renderTextMask = ({
  field, // { name, value, onChange, onBlur }
  // eslint-disable-next-line no-unused-vars
  form: {
    setFieldValue, touched, errors, values
  },
  ...props
}) => (
    <div className={`text-field maskTextField ${(values[field.name]) ? 'filled' : ''}`}>
      <MaskedInput
        {...field}
        {...props}
        mask={props.mask}
        id={field.name}
        type="text"
        // onChange={handleChange}
        // onBlur={handleBlur}
        className={`maskTextFieldInput ${field.value ? 'filled' : ''}`}
      />
      <label>{props.label}</label>
      <span className="maskTextFieldFocus"></span>
    </div>
  );


// textMaskCustom.propTypes = {
//   inputRef: PropTypes.func.isRequired,
// };


// eslint-disable-next-line react/prefer-stateless-function


const TextInput = (props) => {
  const selectedField = props.fieldType;
  let field;
  // eslint-disable-next-line prefer-const
  let [showPassword, setShowPassword] = useState(false);
  const handleNext = () => {
    showPassword = !showPassword;
    setShowPassword(showPassword);
  };
  switch (selectedField) {
    case 'email':
      field = (
        <FastField
          name={props.fieldName}
          component={renderTextField}
          label={props.fieldLabel}
          type={props.fieldType}
          id={props.fieldID}
          isdisabled={props.isdisabled}
          InputProps={{
            startAdornment: custom.startadornment ? (
              <InputAdornment position="start">
                {custom.startadornment}
              </InputAdornment>
            ) : (
                ''
              ),
          }}
        />
      );
      break;
    case 'password':
      field = (
        <Field
          name={props.fieldName}
          component={renderTextField}
          label={props.fieldLabel}
          id={props.fieldID}
          isdisabled={props.isdisabled}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={handleNext}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      );
      break;

    case 'number':
      field = (
        <FastField
          name={props.fieldName}
          component={renderTextField}
          label={props.fieldLabel}
          type={props.fieldType}
          id={props.fieldID}
          isdisabled={props.isdisabled}
          InputProps={{
            startAdornment: custom.startadornment ? (
              <InputAdornment position="start">
                {custom.startadornment}
              </InputAdornment>
            ) : (
                ''
              ),
          }}
        />
      );
      break;

    case 'text':
      field = (
        <FastField
          name={props.fieldName}
          component={renderTextField}
          label={props.fieldLabel}
          type={props.fieldType}
          id={props.fieldID}
          startadornment={props.startadornment}
          isdisabled={props.isdisabled}
          // class={props.className}
          InputProps={{
            startAdornment: props.startadornment ? (
              <InputAdornment position="start" className="startadornment_start">
                {props.startadornment}
              </InputAdornment>
            ) : (
                ''
              ),
          }}

        // onChange={handleChange('TextMaskCustom')}
        />
      );
      break;
    case 'mask':
      field = (
        <Field
          name={props.fieldName}
          component={renderTextMask}
          label={props.fieldLabel}
          type="text"
          id={props.fieldID}
          startadornment={props.startadornment}
          isdisabled={props.isdisabled}
          mask={props.fieldMask}
          InputProps={{
            startAdornment: props.startadornment ? <InputAdornment position="start" className="startadornment_start">{props.startadornment}</InputAdornment> : '',
          }}
        />
      );
      break;
    case 'mask':
      field = (
        <Field
          name={props.fieldName}
          component={renderTextMask}
          label={props.fieldLabel}
          type="text"
          id={props.fieldID}
          startadornment={props.startadornment}
          isdisabled={props.isdisabled}
          mask={props.fieldMask}
          InputProps={{
            startAdornment: props.startadornment ? (
              <InputAdornment position="start" className="startadornment_start">
                {props.startadornment}
              </InputAdornment>
            ) : (
                ''
              ),
          }}
        />
      );
      break;

    default:
      field = (
        <FastField
          name={props.fieldName}
          component={renderTextField}
          label={props.fieldLabel}
          type={props.fieldType}
          id={props.fieldID}
          startadornment={props.startadornment}
          isdisabled={props.isdisabled}
          InputProps={{
            startAdornment: props.startadornment ? (
              <InputAdornment position="start" className="startadornment_start">
                {props.startadornment}
              </InputAdornment>
            ) : (
                ''
              ),
          }}
        />
      );
  }

  return <React.Fragment>{field}</React.Fragment>;
};

// Type Checking for the Props.
TextInput.propTypes = {
  fieldName: PropTypes.string,
  fieldID: PropTypes.string,
  fieldLabel: PropTypes.string,
  fieldType: PropTypes.string,
  fieldMask: PropTypes.any
  // isdisabled: PropTypes.bool
};

// Specify the default Props values.
TextInput.defaultProps = {
  fieldName: ' ',
  fieldID: ' ',
  fieldLabel: ' ',
  fieldType: ' ',
  fieldMask: ''
  // isdisabled: false
};


export default TextInput;
