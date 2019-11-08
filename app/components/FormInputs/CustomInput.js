/* eslint-disable no-unused-vars */
import React from 'react';
import { TextField } from '@material-ui/core';





export const CustomInput = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors, values }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <div>
    <TextField
      {...field}
      {...props}
      variant="filled"
      fullWidth
      disabled={props.isDisabled}
      className={`text-field ${field.value ? 'filled' : ''}`}
    />
  </div>
);

