/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { Field } from 'formik';


// Component which will get rendered.
const renderSelectFieldSS = ({
  field, // { name, value, onChange, onBlur }
  onChange,
  form: {
    setFieldValue, touched, errors, values
  }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <React.Fragment>
    <div className="form-control">
      <FormControl variant="filled" fullWidth className={`select-field ${field.value ? 'filled' : ''}`}>
        <InputLabel htmlFor="filled-age-simple">{props.label}</InputLabel>
        <Select
          {...field}
          {...props}
          disabled={props.isdisabled}
          // eslint-disable-next-line no-restricted-globals
          onChange={(event) => {
            setFieldValue(event.target.name, event.target.value);

            if (onChange) {
              onChange(event.target.name, event.target.value, setFieldValue, values);
            }
          }}
          input={
            <FilledInput label={props.label} name={field.name} fullWidth />
          }
          MenuProps={{
            getContentAnchorEl: null,
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            }
          }}
        >
          { props.fieldvalues && props.fieldvalues.length > 0 && props.fieldvalues.map((option) => (
             (option.hasOwnProperty('value') ?
               <MenuItem className="uiSelectOption" key={option.value} value={option.value}>{option.label}</MenuItem>
              :
               <MenuItem className="uiSelectOption" key={option} value={option}>{option}</MenuItem>))
             )}
        </Select>
      </FormControl>
    </div>
  </React.Fragment>
);


// eslint-disable-next-line react/prefer-stateless-function
const SelectInput = (props) => {
  const selectField = (
    <Field
      name={props.fieldName}
      label={props.fieldLabel}
      id={props.fieldID}
      component={renderSelectFieldSS}
      fieldvalues={props.optionsList}
      onChange={props.fieldOnChange}
      isdisabled={props.isdisabled}
    />
  );

  return (<div>{selectField}</div>);
};


SelectInput.propTypes = {
  fieldName: PropTypes.string,
  fieldID: PropTypes.string,
  fieldLabel: PropTypes.string,
  fieldOnChange: PropTypes.func

};

SelectInput.defaultProps = {
  fieldName: '',
  fieldLabel: ' '
};

export default SelectInput;
