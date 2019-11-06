import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { PrivateRoute } from '../utils/authenticatedRoute';
import Landing from './Landing/index';
import Register from './Register/index';
import Login from './Login';
import Dashboard from './Dashboard';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Landing} />
      <Route path='/register' component={Register} />
      <Route path='/login' component={Login} />
      <PrivateRoute path='/dashboard' component={Dashboard} />
    </Switch>
  </BrowserRouter>
  );

export default App;
