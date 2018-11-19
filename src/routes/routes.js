import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import Home from '../App';
import Account from '../components/Account/Account';

export default (
  <Switch>
    <Route exact path='/' component={Home} />
    <ProtectedRoute path='/account' component={Account} />
  </Switch>
)