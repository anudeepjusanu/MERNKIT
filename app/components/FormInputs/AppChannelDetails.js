/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import { Grid, Typography, Link, Button } from '@material-ui/core';
import Alert from 'react-s-alert';
import {
  TextInput, SelectInput, SwitchInput, EvDatePicker
} from 'components/FormInputs';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import closeIcon from 'images/close-wht_icon.svg';
import EditIcon from 'images/edit-wht_icon.svg';
import * as Yup from 'yup';
import masterData from '../../config/masterData';

import './style.scss';




const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  fullWidth: {
    width: '100%'
  },
  hiddenDiv: {
    display: 'none'
  },
  fullWidthLabel: {
    width: '100%',
    paddingBottom: '10px'
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  grid5: {
    [theme.breakpoints.up('lg')]: {
      maxWidth: '20%'
    }
  },
  align: {
    position: 'relative'
  },
  button: {
    margin: 5,
    '& span': {
      fontWeight: 'bold'
    },
    '&:hover': {
      background: 'red'
    }
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  },
  iconBtn: {
    height: '25px',
    width: '25px',
    backgroundColor: theme.palette.text.secondary,
    borderRadius: '4px',
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.text.secondary,
    }
  },
  iconBtn1: {
    height: '25px',
    width: '25px',
    backgroundColor: '#808080',
    borderRadius: '4px',
    color: 'white',
    '&:hover': {
      backgroundColor: '#808080',
    }
  },
  tableViewRow1: {
    backgroundColor: '#F0FCF0',
    // padding: '10px'
  },
  tableViewRow2: {
    backgroundColor: '#ffffff',
    // padding: '10px'
  },
  tableBody: {
    color: theme.palette.primary,
    '& span': {
      fontWeight: 700
    }
  }
});

// eslint-disable-next-line react/prefer-stateless-function
function AppChannelDetails(props) {
  const rData = [];
  if (props.appChannelData) {
    const temp = (Array.isArray(props.appChannelData) ? props.appChannelData : [props.appChannelData]);
    temp.forEach((l) => {
      if (l.appChannel && l.appID && l.appName) {
        rData.push({ appChannel: l.appChannel, appProductId: l.appID, appProductName: l.appName });
      }
    });
  }
  const [rowData, setRowData] = useState(rData);
  const masterAppChannelDataTemp = [];
  masterData.productMasterData.appChannel.forEach((c) => {
    masterAppChannelDataTemp.push({ value: c, label: c });
  });
  const [masterAppChannelData, setMasterAppChannelData] = useState(masterAppChannelDataTemp);
  const [formInitialData, setFormInitialData] = useState({
    appChannel: '',
    appProductId: '',
    appProductName: ''
  });
  const [countNumber, setCountNumber] = useState(1);

  let setFieldValueParent = false;
  const CustomInput = ({
    field,
    form: {
      touched, errors, setFieldValue, values
    },
    ...props1,
  }) => (
    <div>
      {setFieldValueParent = setFieldValue }
      <TextInput
        {...field}
        {...props}
        variant="filled"
        fullWidth
        className="hidden"
      />
    </div>
  );
  return (
    <Grid item xs={12} sm={12} md={12} lg={12} >
      <Grid className="hidden">
        <Field
          name={props.fieldName}
          component={CustomInput}
          className="hidden"
        />
      </Grid>
      <Grid className="lightBackground" container>
        <Formik
          initialValues={{
            appChannel: formInitialData.appChannel,
            appProductId: formInitialData.appProductId,
            appProductName: formInitialData.appProductName,
          }}
          enableReinitialize
          validationSchema={Yup.object().shape({
            appChannel: Yup.string().required('App channel is required'),
            appProductId: Yup.string().required('App Product ID is required'),
            appProductName: Yup.string().required('App Product Name is required'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            // props.formSchema.onsubmit(values);
            // setSubmitting(false);
            // setRowData(rowData.push(values));
          }}
          render={(formikProps) => {
          // bind the submission handler remotely
          const handleClick = () => {
            if (formikProps.values.appChannel
              && formikProps.values.appProductId
              && formikProps.values.appProductName) {
                const x = rowData;
                formikProps.values.id = countNumber;
                x.push(formikProps.values);
                setRowData([]);
                formikProps.resetForm();
                setTimeout(() => {
                  setRowData(x);
                  setFieldValueParent(props.fieldName, x);
                  setCountNumber(countNumber + 1);
                  setFormInitialData({
                    appChannel: '',
                    appProductId: '',
                    appProductName: '',
                  });
                }, 10);
                masterAppChannelData.forEach((m, i) => {
                    if (m.value === formikProps.values.appChannel) {
                      masterAppChannelData.splice(i, 1);
                    }
                });
                setMasterAppChannelData(masterAppChannelData);
              }
              else
              {
               Alert.error('Please fill App channel, App Product Id and App Product Name', {
              position: 'top-right',
              effect: 'stackslide',
              beep: false,
              timeout: 5000,
              offset: 100
            });
              }
          };
          const handleDeleteClick = (e) => {
            const { id } = e;
            rowData.forEach((r, i) => {
              if (r.id === id) {
                rowData.splice(i, 1);
                masterAppChannelData.push({ name: r.appChannel, value: r.appChannel });
              }
            });
            setRowData([]);
            setTimeout(() => {
              setRowData(rowData);
            }, 10);
          };
          const getDateTime = (d) => new Date(d).toString();
         const handleEditClick = (e) => {
            const { id } = e;
            let temp = {};
            rowData.forEach((r, i) => {
              if (r.id === id) {
                temp = r;
                rowData.splice(i, 1);
              }
            });
            setRowData([]);
            setTimeout(() => {
              setRowData(rowData);
              setFormInitialData(temp);
            }, 10);
          };

            return (
              <div className={props.classes.fullWidth} >
                <Grid>
                  <Form container autocomplete="off" className={props.classes.fullWidth} >
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={12} md={12} lg={12} >
                        <Grid container spacing={2} >
                          <Grid item xs={3} sm={3} md={3} lg={3} className={props.classes.grid5} >
                            <div className={props.classes.align}>
                              <SelectInput
                                fieldName="appChannel"
                                fieldID="appChannel"
                                fieldLabel="App Channel"
                                optionsList={masterAppChannelData}
                              />
                              <ErrorMessage name="appChannel" component="span" className="required" />
                            </div>
                          </Grid>

                          <Grid item xs={3} sm={3} md={3} lg={3} className={props.classes.grid5} >
                            <div className={props.classes.align}>
                              <TextInput fieldID="appProductId" fieldName="appProductId" fieldLabel="App Product ID" fieldType="text" />
                              <ErrorMessage name="appProductId" component="span" className="required" />
                            </div>
                          </Grid>
                          <Grid item xs={3} sm={3} md={3} lg={3} className={props.classes.grid5} >
                            <div className={props.classes.align}>
                              <TextInput fieldID="appProductName" fieldName="appProductName" fieldLabel="App Product Name" fieldType="text" />
                              <ErrorMessage name="appProductName" component="span" className="required" />
                            </div>
                          </Grid>
                          <Grid item xs={3} sm={3} md={3} lg={3} className={props.classes.grid5} >
                            <div>
                              <Button variant="contained" fieldID="addButton" fieldName="addButton" color="secondary" onClick={handleClick} type="button" id="priceSubmit" className="btn" >Add</Button>
                              <ErrorMessage name="addButton" component="span" className="required" />
                            </div>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Form>
                </Grid>
                <Grid>

                  <Table className="priceDetailTable">
                    <TableBody className={props.classes.tableBody}>
                      { rowData && rowData.length > 0 && rowData.map((item, key) =>
          (

            <TableRow key={key} className={key % 2 ? props.classes.tableViewRow1 : props.classes.tableViewRow2}>
              <TableCell className="font-600">{item.appChannel}</TableCell>
              <TableCell className="font-600">{item.appProductId}</TableCell>
              <TableCell>{item.appProductName}</TableCell>
              <TableCell className="text-right">
                <IconButton aria-label="Delete" data-param={item.id} onClick={() => handleDeleteClick(item)} className={props.classes.iconBtn1} size="small">
                  <img src={closeIcon} alt="close Icon" />
                </IconButton> &nbsp;&nbsp;
                <IconButton aria-label="Delete" size="small" onClick={() => handleEditClick(item)} className={props.classes.iconBtn} color="secondary" >
                  <img src={EditIcon} alt="Edit icon" />
                </IconButton>
              </TableCell>
            </TableRow>

                  )
                  )}
                    </TableBody>
                  </Table>
                </Grid>


              </div>
           );
        }}
        />
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(AppChannelDetails);
