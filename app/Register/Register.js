import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Typography, Link, Button } from '@material-ui/core';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Email, TextInput } from 'components/FormInputs';
import { userActions } from 'actions';
import UserContext from '../UserContext';
import './style.scss';

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

function Register(props) {

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
                props.addUser(values);
            }}
            isSubmitting={false}
            render={({ isSubmitting }) => (
                <React.Fragment>
                    <UserContext.Consumer>
                        {() => {

                        }}
                    </UserContext.Consumer>
                    <div className="sign_wrapper sign-btm-pg">
                        <div className="container">
                            <Grid container spacing={3} className="sign_wrapper_in">
                                <Grid item xs={12}>
                                    <Grid container spacing={3} className="sign_header">
                                        <Grid item xs={12} sm={8} md={8} className="sign_list_main">

                                        </Grid>
                                        <Grid item xs={12} sm={4} md={4}>
                                            <div className="sign_logo">
                                                <Link to="/login" component={RouterLink}>
                                                    MERN APP
                        </Link>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container spacing={3} className="sign_body">
                                        <Grid item xs={12} sm={12} md={8} lg={6}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={12}>
                                                    <Form className="" noValidate autoComplete="off">
                                                        <div className="mobile-sign-innner-bg mobile-signin-innner-pd">
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={12} className="header-widget">
                                                                    <Typography component="h1" variant="h1" color="primary" className="sign_head_noBorder">
                                                                        Welcome! <br /> <span>Please register to your account</span>
                                                                    </Typography>
                                                                </Grid>
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
                                                            </Grid>
                                                        </div>
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} md={12} className="signup-btn">
                                                                <Button variant="contained" color="secondary" type="submit" id="submit" disabled={isSubmitting} className="btn large">Sign Up</Button>
                                                            </Grid>
                                                        </Grid>
                                                    </Form>
                                                </Grid>

                                                <Grid item xs={12} md={12}>
                                                    <div className="sign_bottom signin_foo">
                                                        {/* <p>Having trouble signing in? <Link component={RouterLink} to="/login">Reset Password</Link></p> */}
                                                        {/* <h6>Don&apos;t have an account, <Link component={RouterLink} to="/register">Click here</Link></h6> */}
                                                    </div>
                                                </Grid>

                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Register);
