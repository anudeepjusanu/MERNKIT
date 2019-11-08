/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import { Grid, Typography, Link, Button } from '@material-ui/core';
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
    color: theme.palette.primary.main,
    '& span': {
      fontWeight: 700
    }
  },
  removeMargin: {
    marginLeft: '-10px'
  }
});

// eslint-disable-next-line react/prefer-stateless-function
function PriceDetails(props) {
  const [rowData, setRowData] = useState([]);
  const [formInitialData, setFormInitialData] = useState({
    priceType: '',
    rate: '',
    startDate: new Date()
  });
  const [advancePrice, setAdvancePrice] = useState(true);
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
      {setFieldValueParent = setFieldValue}
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
            priceType: formInitialData.priceType,
            rate: formInitialData.rate,
            startDate: formInitialData.startDate,
            advancePrice: false
          }}
          enableReinitialize
          validationSchema={Yup.object().shape({
            priceType: Yup.string().required('Price Type is required'),
            rate: Yup.string().required('Rate is required'),
            startDate: Yup.string().required('Start Date is required').nullable(),
          })}
          onSubmit={(values, { setSubmitting }) => {
            // props.formSchema.onsubmit(values);
            // setSubmitting(false);
            // setRowData(rowData.push(values));
          }}
          render={(formikProps) => {
            // bind the submission handler remotely
            const hanbleClick = () => {
              if (formikProps.values.priceType
                && formikProps.values.rate
                && formikProps.values.startDate) {
                const x = rowData;
                formikProps.values.startDate = formikProps.values.startDate.getTime();
                formikProps.values.id = countNumber;
                x.push(formikProps.values);
                setRowData([]);
                formikProps.resetForm();
                setAdvancePrice(true);
                setTimeout(() => {
                  setRowData(x);
                  setFieldValueParent(props.fieldName, x);
                  setCountNumber(countNumber + 1);
                  setFormInitialData({
                    priceType: '',
                    rate: '',
                    startDate: new Date()
                  });
                  setAdvancePrice(true);
                }, 10);
              }
            };
            const handleDeleteClick = (e) => {
              const { id } = e;
              rowData.forEach((r, i) => {
                if (r.id === id) {
                  rowData.splice(i, 1);
                }
              });
              setRowData([]);
              setTimeout(() => {
                setRowData(rowData);
              }, 10);
            };
            const getDateTime = (d) => {
              let x = new Date(d);
              x = x.toJSON().slice(0, 10).split('-').reverse();
              return x.join('-');
            };
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
                temp.startDate = new Date(temp.startDate);
                setFormInitialData(temp);
              }, 10);
            };

            return (
              <div className={`${props.classes.fullWidth} ${props.classes.removeMargin}`} >
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} md={12} lg={12} >
                    <Typography variant="span" color="primary" className="switchButtonText medium" >
                      Do you want to add more Price &nbsp;&nbsp;&nbsp;
                      <SwitchInput fieldName="advancePrice" fieldColor="primary" />
                    </Typography>
                  </Grid>
                </Grid>
                {formikProps.values.advancePrice ?
                  <Form container autocomplete="off" className={props.classes.fullWidth} >

                    <Grid container spacing={2} >
                      <Grid item xs={3} sm={3} md={3} lg={3} className={props.classes.grid5} >
                        <div className={props.classes.align}>
                          <SelectInput
                            fieldName="priceType"
                            fieldID="priceType"
                            fieldLabel="Price Type"
                            fieldValue="Retail Price"
                            isdisabled="true"
                            optionsList={[
                            {
                              value: 'Retail Price',
                              label: 'Retail Price'
                            },
                            {
                              value: 'Setup Fee',
                              label: 'Setup Fee'
                            },
                            {
                              value: 'Shipment Fee',
                              label: 'Shipment Fee'
                            },
                             {
                                  value: 'Suggested Retail Price',
                                  label: 'Suggested Retail Price'
                                },
                                {
                                  value: 'Prompt Payment Price',
                                  label: 'Prompt Payment Price'
                                },
                                {
                                  value: 'Minimum / Floor Price',
                                  label: 'Minimum / Floor Price'
                                },
                                {
                                  value: 'Base Wholesale Price',
                                  label: 'Base Wholesale Price'
                                },
                                {
                                  value: 'Early Termination Fee',
                                  label: 'Early Termination Fee'
                                },
                                {
                                  value: 'App Store Billing Price',
                                  label: 'App Store Billing Price'
                                },
                                {
                                  value: 'Google Wallet Price',
                                  label: 'Google Wallet Price'
                                }]}
                          />
                          <ErrorMessage name="priceType" component="span" className="required" />
                        </div>
                      </Grid>

                      <Grid item xs={3} sm={3} md={3} lg={3} className={props.classes.grid5} >
                        <div className={props.classes.align}>
                          <TextInput fieldID="rate" fieldName="rate" isdisabled="true" fieldLabel="Rate" fieldType="text" />
                          <ErrorMessage name="rate" component="span" className="required" />
                        </div>
                      </Grid>
                      {/* <Grid item xs={3} sm={3} md={3} lg={3} className={props.classes.grid5} > */}
                      {/* <div className={props.classes.align}> */}
                      {/* <TextInput fieldID="units" fieldName="units" fieldLabel="Units" fieldType="text" /> */}
                      {/* <ErrorMessage name="units" component="span" className="required" /> */}
                      {/* </div> */}
                      {/* </Grid> */}
                      <Grid item xs={3} sm={3} md={3} lg={3} className={props.classes.grid5} >
                        <div className={props.classes.align}>
                          <EvDatePicker
                            name="startDate"
                            fieldID="startDate"
                            clearable
                            disablepast
                            disabledate={false}
                            dateformat="dd/MM/yyyy"
                            isdisabled="true"
                            datetype="date"
                            label="Start Date"
                            datemask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                          />
                          <ErrorMessage name="startDate" component="span" className="required" />
                        </div>
                      </Grid>

                      <Grid item xs={3} sm={3} md={3} lg={3} className={props.classes.grid5} >
                        <div>
                          <Button variant="contained" color="secondary" onClick={hanbleClick} type="button" id="priceSubmit" className="btn" >Add</Button>
                        </div>
                      </Grid>

                    </Grid>

                  </Form>
                  : ''}
                <Grid >
                  <Table className="priceDetailTable">
                    <TableBody className={props.classes.tableBody}>
                      {advancePrice && rowData.map((item, key) =>
                      (
                        // eslint-disable-next-line react/no-array-index-key
                        <React.Fragment key={key}>
                          <TableRow className={key % 2 ? props.classes.tableViewRow1 : props.classes.tableViewRow2}>
                            <TableCell className="font-600">{item.priceType}</TableCell>
                            <TableCell className="font-600">{item.rate}</TableCell>
                            {/* <TableCell>{item.units}</TableCell> */}
                            <TableCell> {getDateTime(item.startDate)}</TableCell>
                            <TableCell className="text-right">
                              <IconButton aria-label="Delete" data-param={item.id} onClick={() => handleDeleteClick(item)} className={props.classes.iconBtn1} size="small">
                                <img src={closeIcon} alt="close Icon" />
                              </IconButton> &nbsp;&nbsp;
                              <IconButton aria-label="Delete" size="small" onClick={() => handleEditClick(item)} className={props.classes.iconBtn} color="secondary" >
                                <img src={EditIcon} alt="Edit icon" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        </React.Fragment>
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

export default withStyles(styles)(PriceDetails);
