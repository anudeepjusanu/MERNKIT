/* eslint-disable no-unused-vars */
import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Field } from 'formik';

// Function that renders Radio button group
const renderRadioButton = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors, values }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <React.Fragment>
    <FormLabel>{props.radioGroupLabel}</FormLabel>
    <RadioGroup
      {...field}
      {...props}
      aria-label="Gender"
      name={field.name}
      // onChange={() => {
      //   values[field.name] = event.target.value;
      // }}
    >
      {props.fieldvalues.map((option) => (
        // <FormControlLabel
        //   value={option.value}
        //   key={option.value}
        //   control={<Radio />}
        //   label={option.label}
        // />
        <FormControlLabel
          value={option.value}
          control={<Radio color="primary" />}
          label={option.label}
          key={option.label}
          labelPlacement="end"
        />
      ))}
    </RadioGroup>
  </React.Fragment>
);

const RadioInput = (props) => (
  <div>
    <Field
      name={props.fieldName}
      component={renderRadioButton}
      id={props.fieldID}
      fieldvalues={props.radioValues}
      radioGroupLabel={props.radioGroupLabel}
    />
  </div>
);

export default RadioInput;
