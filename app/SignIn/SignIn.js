import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Typography, Link, Button } from '@material-ui/core';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Email, TextInput } from 'components/FormInputs';
import { authenticationActions } from 'actions';
import { store } from '../store';
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

// eslint-disable-next-line react/display-name
const withContext = (Component) => (props) => (
  <UserContext.Consumer>
    {(context) => <Component {...props} context={context} />}
  </UserContext.Consumer>
);

function SignIn(props) {
  const [isContextCleared, setIsContextCleared] = useState(false);
  useEffect(() => {
    if (!isContextCleared) {
      if ((JSON.stringify(props.context.userData) !== JSON.stringify({ sessionData: {}, buSelectionData: {} }))) {
        props.context.updateUserData({});
      }
      setIsContextCleared(true);
    }
  }, []);

  return (
    <Formik
      enableReinitialize
      validationSchema={schema}
      initialValues={{
        email: props.email || '',
        password: props.password || ''
      }}
      onSubmit={(values, actions) => {
        store.dispatch(authenticationActions.login({ values, actions }));
        actions.setSubmitting(true);
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
                      {/* <div className="sign_list">
                        <ul>
                          <li>
                            <Link component={RouterLink} to="/register">
                              Sign Up
                            </Link>
                          </li>
                          <li>
                            <Link component={RouterLink} to="/login" className="active">
                              Sign In
                            </Link>
                          </li>
                        </ul>
                      </div> */}
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
                                    Welcome! <br /> <span>Please login to your account</span>
                                  </Typography>
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
                                <Button variant="contained" color="secondary" type="submit" id="submit" disabled={isSubmitting} className="btn large">Sign In</Button>
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
export default withContext(SignIn);
