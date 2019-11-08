import React from 'react';
import { Field } from 'formik';
import { FormControlLabel } from '@material-ui/core';
import { Switch } from 'formik-material-ui';

const SwitchInput = (props) => (
  <React.Fragment>
    <FormControlLabel
      control={
        <Field
          label={props.fieldLabel}
          onChange={(event) => {
            props.setFieldValue(event.target.name, event.target.value);
            if (props.onChange) {
              props.onChange(event.target.name, event.target.value, props.setFieldValue, props.values);
            }
          }}
          name={props.fieldName}
          component={Switch}
          disabled={props.isdisabled}
          color={props.fieldColor}
        />
      }
      label={props.fieldLabel}
      labelPlacement={props.fieldLabelPlacement}

    />

  </React.Fragment>
);


export default SwitchInput;
