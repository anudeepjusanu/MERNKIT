/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Grid, Typography, Button } from '@material-ui/core';
import './style.scss';
import DynamicTable from 'components/DynamicTable';
import { userActions } from 'actions';
import { Formik, Form, ErrorMessage } from 'formik';
import { Email, TextInput } from 'components/FormInputs';
import * as Yup from 'yup';

const schema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Invalid email address'),
    password: Yup.string()
        .required('Password is required')
    //  .min(8, 'Password must contain minimum 8 characters')
    // .matches(Form
    //   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    //   'Password must contain atleast 1 Uppercase, 1 Lowercase, 1 Special Character'
    // ),
});

function AddUser(props) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // catalogue search
    return (
        <Formik
            enableReinitialize
            validationSchema={schema}
            initialValues={{
                firstName: props.firstName || '',
                lastName: props.lastName || '',
                email: props.email || '',
                password: props.password || ''
            }}
            onSubmit={(values, actions) => {
                props.addUser(values)
            }}
            isSubmitting={false}
            render={({ isSubmitting }) => (
                <React.Fragment>
                    <Typography component="h6" className="content_title">
                        Add User
                    </Typography>
                    <Grid xs={6}></Grid>
                    <Form className="" noValidate autoComplete="off">
                        <Grid xs={6}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6} md={6} lg={6}>
                                            <div className="form-control">
                                                <Email fieldID="firstName" fieldName="firstName" fieldLabel="First Name *" fieldType="text" />
                                                <ErrorMessage name="firstName" component="span" className="required" />
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6} md={6} lg={6}>
                                            <div className="form-control">
                                                <Email fieldID="lastName" fieldName="lastName" fieldLabel="Last Name *" fieldType="text" />
                                                <ErrorMessage name="lastName" component="span" className="required" />
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6} md={6} lg={6}>
                                            <div className="form-control">
                                                <Email fieldID="email" fieldName="email" fieldLabel="Email *" fieldType="email" />
                                                <ErrorMessage name="email" component="span" className="required" />
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6} md={6} lg={6}>
                                            <div className="form-control">
                                                <TextInput fieldID="password" fieldName="password" fieldLabel="Password *" fieldType="password" showPassword />
                                                <ErrorMessage name="password" component="span" className="required" />
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={12} className="signup-btn">
                                        <Button variant="contained" color="secondary" type="submit" id="submit" disabled={isSubmitting} className="btn large">Sign In</Button>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Form>
                </React.Fragment>
            )}
        />
    );
}

function mapStateToProps(state) {
    const { app } = state.appReducer;
    return {
        app,
        users: state.appReducer.users.users,
        status: state.appReducer.users.status,
        newUser: state.appReducer.users.newUser
    };
}

const mapDispatchToProps = (dispatch) => ({
    addUser: (values) => {
        dispatch(userActions.addUser(values));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);

