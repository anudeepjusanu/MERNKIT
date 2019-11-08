/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { Field } from 'formik';
import Chip from '@material-ui/core/Chip';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    marginBottom: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
    height: 'auto',
    '& span': {
      fontSize: '9pt',
      color: theme.palette.primary.main,
      fontFamily: 'acumin-pro, sans-serif',
      fontWeight: 400,
      paddingTop: '2px',
      paddingBottom: '2px',
    }
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      // eslint-disable-next-line no-mixed-operators
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 100,
    },
  },
  getContentAnchorEl: null,
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'left',
  }
};

// Component which will get rendered.
function renderSelectFieldSS(props) {
  const {
    field, // { name, value, onChange, onBlur }
    onChange,
    form: {
      setFieldValue, touched, errors, values
    }
  } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  function handleChange(event) {
    setPersonName(event.target.value);
    setFieldValue(field.name, event.target.value);
  }
  return (
    <React.Fragment>
      <div className={classes.formControl} >
        <FormControl variant="filled" fullWidth className={`select-field ${field.value ? 'filled' : ''}`}>
          <InputLabel htmlFor="filled-age-simple">{props.label}</InputLabel>
          <Select
            multiple
            {...field}
            {...props}
            disabled={props.isDisabled}
          // eslint-disable-next-line no-restricted-globals
            value={field.value ? field.value : []}
            onChange={handleChange}
            className="multiSelect"
            input={
              <FilledInput label={props.label} name={field.name} fullWidth />
            }
            renderValue={(selected) => (
              <div>
                {(selected.map((value) => (
                  <Chip key={value} label={value} className={classes.chip} />
              )))}
              </div>
          )}
            MenuProps={MenuProps}

          >
            {props.fieldvalues ? props.fieldvalues.map((option) => (
              (option.hasOwnProperty('value') ?
                <MenuItem className="uiSelectOption" key={option.value} value={option.value} style={getStyles(name, personName, theme)}>{option.label}</MenuItem>
             :
                <MenuItem className="uiSelectOption" key={option} value={option} style={getStyles(name, personName, theme)}>{option}</MenuItem>))

            ) : ''}


          </Select>
        </FormControl>
      </div>
    </React.Fragment>
  );
}

// eslint-disable-next-line react/prefer-stateless-function
const MultipleSelectInput = (props) => {
  const selectField = (
    <Field
      name={props.fieldName}
      label={props.fieldLabel}
      id={props.fieldID}
      component={renderSelectFieldSS}
      fieldvalues={props.optionsList}
      onChange={props.fieldOnChange}
    />
  );

  return (<div>{selectField}</div>);
};


MultipleSelectInput.propTypes = {
  fieldName: PropTypes.string,
  fieldID: PropTypes.string,
  fieldLabel: PropTypes.string,
  fieldOnChange: PropTypes.func

};

MultipleSelectInput.defaultProps = {
  fieldLabel: ''
};

export default MultipleSelectInput;
