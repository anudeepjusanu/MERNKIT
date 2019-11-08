/* eslint-disable no-unused-vars */
import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Field } from 'formik';
import { Checkbox, Tooltip } from '@material-ui/core';
import HelpIcon from 'images/help-icon.svg';

const renderCheckbox = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors, values }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
    <div>
      <Checkbox
        className="EVCheckbox"
        {...field}
        {...props}
        style={{ width: 48, height: 48 }}
        checked={field.value}
        value={field.name}
        disabled={props.disabled}
      />
    </div>
  );
// eslint-disable-next-line react/prefer-stateless-function
const CheckboxInput = (props) => (
  <div>
    <FormControlLabel
      control={
        <Field
          name={props.fieldName}
          component={renderCheckbox}
          // label={this.props.myLabel}
          checked={props.checked}
          color={props.fieldColor}
          disabled={props.isdisabled}

        />
      }
      label={props.fieldLabel}
      labelPlacement={props.labelPlacement}
      className="checkbox_field"
    />
    {props.tooltip ?
      <Tooltip title={props.tooltip} placement="bottom" disableFocusListener disableTouchListener>
        <img alt="help" src={HelpIcon} className="help_icons" />
      </Tooltip>
      : ''}
  </div>
);

export default CheckboxInput;
