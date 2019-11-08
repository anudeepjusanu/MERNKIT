import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignIn from 'SignIn';
import { PrivateRoute } from 'components/PrivateRoute';
import { PublicRoute } from 'components/PublicRoute';
import PageNotFound from 'components/PageNotFound';
import {
  Dashboard
} from './asyncLoad';
import AddUser from 'Dashboard/AddUser';

const routes = (
  <Switch>
    <PublicRoute path="/login" exact component={SignIn} />
    <PrivateRoute exact path="/" component={Dashboard} hideLogo={false} hideBu={false} />
    <PrivateRoute exact path="/dashboard" component={Dashboard} hideLogo={false} hideBu={false} />
    <PrivateRoute exact path="/addUser" component={AddUser} hideLogo={false} hideBu={false} />
    <Route component={PageNotFound} />
  </Switch>
);

export default routes;
